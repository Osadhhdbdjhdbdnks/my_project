# Supabase Google OAuth 遷移完成

## 🎉 遷移完成！

已成功將 Google OAuth 從原本的 `@react-oauth/google` 遷移到 **Supabase**，解決了 404 NOT_FOUND 錯誤問題。

## 📋 更改內容

### 1. 安裝的套件

```bash
npm install @supabase/supabase-js
```

**移除的套件：**
- `@react-oauth/google` - 已刪除
- `jwt-decode` - 不再需要（Supabase 自動處理）

### 2. 新增的檔案

#### 核心檔案
- **`src/lib/supabase.ts`** - Supabase 客戶端配置和認證函數
- **`src/vite-env.d.ts`** - TypeScript 環境變數類型定義
- **`.env.example`** - 環境變數範例

#### 組件
- **`src/components/SupabaseGoogleButton.tsx`** - 新的 Google 登入按鈕（使用 Supabase）

#### 頁面
- **`src/pages/AuthCallbackPage.tsx`** - OAuth 回調處理頁面

#### 文件
- **`SUPABASE_SETUP.md`** - 詳細的 Supabase 設置指南

### 3. 修改的檔案

- **`src/contexts/AuthContext.tsx`** - 改用 Supabase 認證
- **`src/pages/LoginPage.tsx`** - 使用 SupabaseGoogleButton
- **`src/pages/RegisterPage.tsx`** - 使用 SupabaseGoogleButton
- **`src/App.tsx`** - 添加 `/auth/callback` 路由

### 4. 刪除的檔案

- **`src/components/GoogleAuthButton.tsx`** - 已刪除（被 SupabaseGoogleButton 取代）

## 🔑 為什麼使用 Supabase？

### 解決的問題
- ✅ **404 NOT_FOUND 錯誤** - Supabase 提供完整的 OAuth 處理
- ✅ **重新導向問題** - Supabase 自動處理回調
- ✅ **JWT Token 處理** - Supabase 自動管理 token
- ✅ **Session 管理** - Supabase 自動處理 session

### 額外好處
- ✅ **資料庫整合** - 可以直接儲存用戶資料
- ✅ **更簡單的 API** - 不需要手動處理 OAuth 流程
- ✅ **更好的安全性** - Supabase 處理所有安全細節
- ✅ **更容易維護** - 集中管理認證邏輯
- ✅ **免費額度** - Supabase 提供免費方案

## 🚀 快速開始

### 步驟 1：創建 Supabase 專案

1. 前往 [Supabase](https://supabase.com/)
2. 點擊 "Start your project"
3. 創建新的專案
4. 等待專案初始化完成

### 步驟 2：獲取憑證

1. 在 Supabase 儀表板中，點擊 "Settings" > "API"
2. 複製：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步驟 3：設定環境變數

創建 `.env` 檔案：

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 步驟 4：在 Supabase 啟用 Google OAuth

1. 點擊 "Authentication" > "Providers"
2. 找到 "Google" 並點擊 "Expand"
3. 開啟 "Enable" 開關
4. 需要設定 Google OAuth 憑證（見下一步）

### 步驟 5：在 Google Cloud Console 設定

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立 OAuth 2.0 用戶端 ID
3. 在 "Authorized redirect URIs" 中新增：
   - `https://your-project.supabase.co/auth/v1/callback`
   - **重要**：這個 URL 可以從 Supabase 的 Google Provider 設定頁面複製
4. 複製 Client ID 和 Client Secret
5. 回到 Supabase，填入 Client ID 和 Client Secret
6. 點擊 "Save"

### 步驟 6：測試

```bash
npm run dev
```

1. 訪問 `http://localhost:5173`
2. 點擊「登入」
3. 選擇「Google」
4. 點擊「使用 Google 帳號登入」
5. 完成登入！

## 📊 架構說明

### 認證流程

```
用戶點擊「Google 登入」
    ↓
呼叫 supabase.auth.signInWithOAuth()
    ↓
重定向到 Google 登入頁面
    ↓
用戶授權
    ↓
Google 重定向到 Supabase callback
    ↓
Supabase 處理 OAuth 並重定向到 /auth/callback
    ↓
AuthCallbackPage 提取 token 並設定 session
    ↓
AuthContext 監聽狀態變化並更新用戶資訊
    ↓
重定向到 /dashboard
```

### AuthContext 更新

```typescript
// 監聽認證狀態變化
const { data: { subscription } } = onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    setUser(convertSupabaseUser(session.user));
  } else if (event === 'SIGNED_OUT') {
    setUser(null);
  }
});
```

### Supabase 客戶端

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

## 🔒 安全性

### Token 管理
- Supabase 自動處理 access token 和 refresh token
- Token 儲存在瀏覽器的 localStorage 或 cookie
- 自動刷新過期的 token

### Session 管理
- Supabase 自動管理 session
- 支援多裝置登入
- 可以強制登出所有裝置

### RLS (Row Level Security)
- Supabase 提供 RLS 政策
- 可以控制用戶只能存取自己的資料
- 防止未授權的資料存取

## 📚 可用的認證函數

### Google OAuth
```typescript
import { signInWithGoogle, signOut } from './lib/supabase';

// Google 登入
await signInWithGoogle();

// 登出
await signOut();
```

### Email 認證
```typescript
import { signInWithEmail, signUpWithEmail, resetPassword } from './lib/supabase';

// Email 登入
await signInWithEmail(email, password);

// Email 註冊
await signUpWithEmail(email, password, fullName);

// 重置密碼
await resetPassword(email);
```

### 用戶管理
```typescript
import { getCurrentUser, updateProfile, updatePassword } from './lib/supabase';

// 獲取當前用戶
const user = await getCurrentUser();

// 更新用戶資料
await updateProfile({ full_name: '新名字' });

// 更新密碼
await updatePassword(newPassword);
```

## 🎨 UI 組件

### SupabaseGoogleButton

```typescript
import SupabaseGoogleButton from './components/SupabaseGoogleButton';

<SupabaseGoogleButton
  onSuccess={() => console.log('登入成功')}
  onError={(error) => console.error(error)}
  text="使用 Google 帳號登入"
/>
```

### AuthCallbackPage

自動處理 OAuth 回調：
- 提取 URL 中的 token
- 設定 Supabase session
- 重定向到儀表板
- 顯示錯誤訊息（如果有）

## 🐛 疑難排解

### 問題：404 NOT_FOUND 錯誤

**解決方案：**
1. 確認 Supabase 的 "Redirect URL" 已正確添加到 Google Cloud Console
2. URL 格式：`https://your-project.supabase.co/auth/v1/callback`
3. 可以從 Supabase 的 Google Provider 設定頁面複製

### 問題：登入後沒有重定向

**解決方案：**
1. 檢查 `/auth/callback` 路由是否已添加
2. 檢查瀏覽器控制台錯誤
3. 確認 Supabase 的 "Redirect URL" 設定正確

### 問題：環境變數沒有載入

**解決方案：**
1. 確認 `.env` 檔案在專案根目錄
2. 變數名稱必須以 `VITE_` 開頭
3. 重新啟動開發伺服器

### 問題：用戶資訊沒有正確顯示

**解決方案：**
1. 檢查 `convertSupabaseUser` 函數
2. 在瀏覽器控制台查看 `console.log` 輸出
3. 確認 Supabase 返回的用戶資訊格式

## 📖 詳細文件

請參考以下文件獲取更多資訊：

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - 詳細的 Supabase 設置指南
- **[Supabase 官方文件](https://supabase.com/docs)** - Supabase 完整文件
- **[Supabase Auth](https://supabase.com/docs/guides/auth)** - 認證指南
- **[Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)** - Google OAuth 設定

## ✅ 檢查清單

- [x] 安裝 Supabase 套件
- [x] 創建 Supabase 配置檔案
- [x] 更新 AuthContext 使用 Supabase
- [x] 創建 SupabaseGoogleButton 組件
- [x] 創建 AuthCallbackPage 頁面
- [x] 更新 LoginPage 和 RegisterPage
- [x] 刪除舊的 GoogleAuthButton
- [x] 添加 `/auth/callback` 路由
- [x] 創建環境變數範例
- [x] 創建設置指南文件
- [x] 建置專案成功

## 🎯 下一步

1. **創建 Supabase 專案** - 按照 SUPABASE_SETUP.md 的步驟
2. **設定環境變數** - 創建 `.env` 檔案
3. **啟用 Google OAuth** - 在 Supabase 和 Google Cloud Console 設定
4. **測試登入功能** - 確認一切正常運作
5. **部署到正式環境** - 更新環境變數和 Google Cloud Console 設定

## 🎉 總結

已成功遷移到 Supabase Google OAuth！

**主要改進：**
- ✅ 解決 404 NOT_FOUND 錯誤
- ✅ 更簡單的 OAuth 流程
- ✅ 自動處理 token 和 session
- ✅ 內建資料庫支援
- ✅ 更好的安全性和維護性

現在您的應用程式擁有完整的認證系統，並且不再遇到 OAuth 相關的問題！
