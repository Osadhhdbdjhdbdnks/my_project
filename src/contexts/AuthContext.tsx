import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 用戶資訊介面
export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  provider: 'google' | 'email' | 'phone';
  role: 'user' | 'runner' | 'admin';
}

// Auth Context 介面
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// 創建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider 組件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化時從 localStorage 讀取用戶資訊
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // 登入
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('User logged in:', userData);
  };

  // 登出
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User logged out');
  };

  // 更新用戶資訊
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 自定義 Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
