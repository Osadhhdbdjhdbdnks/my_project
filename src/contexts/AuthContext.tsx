import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, onAuthStateChange } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// 用戶資訊介面
export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  provider: 'google' | 'email' | 'phone';
  role: 'user' | 'runner' | 'admin';
  user_metadata?: any;
}

// Auth Context 介面
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

// 創建 Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 將 Supabase 用戶轉換為我們的用戶格式
const convertSupabaseUser = (supabaseUser: SupabaseUser): User => {
  const metadata = supabaseUser.user_metadata || {};
  
  return {
    id: supabaseUser.id,
    name: metadata.full_name || metadata.name || supabaseUser.email?.split('@')[0] || '用戶',
    email: supabaseUser.email || '',
    picture: metadata.avatar_url || metadata.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(metadata.full_name || '用戶')}&background=4285f4&color=fff`,
    provider: supabaseUser.app_metadata?.provider === 'google' ? 'google' : 'email',
    role: metadata.role || 'user',
    user_metadata: metadata,
  };
};

// Provider 組件
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化時檢查用戶狀態
  useEffect(() => {
    // 獲取當前用戶
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(convertSupabaseUser(user));
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // 監聽認證狀態變化
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (event === 'SIGNED_IN' && session?.user) {
        setUser(convertSupabaseUser(session.user));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(convertSupabaseUser(session.user));
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser(convertSupabaseUser(session.user));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 登入（手動設置用戶）
  const login = (userData: User) => {
    setUser(userData);
  };

  // 登出
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // 更新用戶資訊
  const updateUser = async (updates: Partial<User>) => {
    if (user) {
      try {
        const { data, error } = await supabase.auth.updateUser({
          data: updates,
        });

        if (error) throw error;

        if (data.user) {
          setUser(convertSupabaseUser(data.user));
        }
      } catch (error) {
        console.error('Update user error:', error);
        throw error;
      }
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
