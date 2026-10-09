import { createClient } from '@supabase/supabase-js';

// Supabase 配置
// 優先從 localStorage 讀取（配置精靈），其次從環境變數讀取
const getSupabaseConfig = () => {
  // 嘗試從 localStorage 讀取
  const localUrl = localStorage.getItem('supabase_url');
  const localKey = localStorage.getItem('supabase_anon_key');
  
  if (localUrl && localKey) {
    return {
      url: localUrl,
      anonKey: localKey,
    };
  }
  
  // 嘗試從環境變數讀取
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (envUrl && envKey) {
    return {
      url: envUrl,
      anonKey: envKey,
    };
  }
  
  // 如果都沒有配置，返回 null
  return null;
};

const config = getSupabaseConfig();

// 檢查是否已配置
export const isSupabaseConfigured = () => {
  return config !== null && 
         config.url !== 'https://your-project.supabase.co' && 
         config.anonKey !== 'your-anon-key';
};

// 如果沒有配置，顯示警告
if (!isSupabaseConfigured()) {
  console.warn(
    '%c⚠️ Supabase 未配置！',
    'color: orange; font-size: 16px; font-weight: bold;'
  );
  console.warn(
    '請前往 /setup 頁面配置您的 Supabase 專案資訊。\n' +
    '或設定環境變數 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY'
  );
}

// 創建 Supabase 客戶端（使用配置的資訊或預設值）
export const supabase = createClient(
  config?.url || 'https://placeholder.supabase.co',
  config?.anonKey || 'placeholder-key'
);

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
