import { createClient } from '@supabase/supabase-js';

// Supabase 配置
// 請替換為您的實際 Supabase 專案資訊
// 獲取方式：https://supabase.com/dashboard/
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// 創建 Supabase 客戶端
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Google OAuth 登入
export const signInWithGoogle = async () => {
  // 動態獲取當前域名，支援 Vercel 部署
  const origin = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:5173';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) {
    console.error('Google sign in error:', error);
    throw error;
  }

  return data;
};

// Google OAuth 登出
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

// 獲取當前用戶
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Get user error:', error);
    return null;
  }

  return user;
};

// 監聽認證狀態變化
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};

// Email 登入
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Email sign in error:', error);
    throw error;
  }

  return data;
};

// Email 註冊
export const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error('Email sign up error:', error);
    throw error;
  }

  return data;
};

// 重置密碼
export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });

  if (error) {
    console.error('Reset password error:', error);
    throw error;
  }

  return data;
};

// 更新密碼
export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error('Update password error:', error);
    throw error;
  }

  return data;
};

// 更新用戶資料
export const updateProfile = async (updates: any) => {
  const { data, error } = await supabase.auth.updateUser({
    data: updates,
  });

  if (error) {
    console.error('Update profile error:', error);
    throw error;
  }

  return data;
};
