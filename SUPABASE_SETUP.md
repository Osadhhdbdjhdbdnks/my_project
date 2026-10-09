# Supabase Google OAuth 設置指南

## 🎉 為什麼使用 Supabase？

使用 Supabase 的 Google OAuth 可以解決原本的 404 NOT_FOUND 錯誤問題，並且提供：
- ✅ 完整的認證系統
- ✅ 內建資料庫支援
- ✅ 更容易管理和維護
- ✅ 不需要自己處理 JWT Token
- ✅ 自動處理 OAuth 流程

## 📋 設置步驟

### 步驟 1：創建 Supabase 專案

1. 前往 [Supabase](https://supabase.com/)
2. 點擊 "Start your project"
3. 使用 GitHub 帳號登入（或創建帳號）
4. 點擊 "New Project"
5. 填寫專案資訊：
   - **Name**: 跑腿幫（或您喜歡的名稱）
   - **Database Password**: 設定一個強密碼（請記下來！）
   - **Region**: 選擇最接近您的地區（例如：Northeast Asia (Tokyo)）
6. 點擊 "Create new project"
7. 等待專案創建完成（約 1-2 分鐘）

### 步驟 2：獲取 Supabase 憑證

1. 在專案儀表板中，點擊左側選單的 "Settings"（齒輪圖示）
2. 點擊 "API"
3. 複製以下資訊：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步驟 3：設定環境變數

1. 在專案根目錄創建 `.env` 檔案：

```bash
# Supabase 配置
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. 將步驟 2 複製的資訊填入：
   - `VITE_SUPABASE_URL` = Project URL
   - `VITE_SUPABASE_ANON_KEY` = anon public key

### 步驟 4：在 Supabase 啟用 Google OAuth

1. 在 Supabase 儀表板中，點擊左側選單的 "Authentication"
2. 點擊 "Providers"
3. 找到 "Google" 並點擊 "Expand"
4. 開啟 "Enable" 開關
5. 您需要設定 Google OAuth 憑證（見步驟 5）

### 步驟 5：在 Google Cloud Console 設定 OAuth

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇您的專案（或創建新專案）

#### 5.1 設定 OAuth 同意畫面

1. 在左側選單中，選擇 "APIs & Services" > "OAuth consent screen"
2. 選擇 "External" 使用者類型，點擊 "Create"
3. 填寫應用程式資訊：
   - **App name**: 跑腿幫
   - **User support email**: 您的 Email
   - **Developer contact information**: 您的 Email
4. 點擊 "SAVE AND CONTINUE"
5. 在 "Scopes" 頁面，點擊 "ADD OR REMOVE SCOPES"
6. 搜尋並勾選以下範圍：
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
7. 點擊 "UPDATE"，然後 "SAVE AND CONTINUE"
8. 在 "Test users" 頁面，點擊 "ADD USERS"
9. 輸入您的 Google Email（用於測試）
10. 點擊 "ADD"，然後 "SAVE AND CONTINUE"
11. 點擊 "BACK TO DASHBOARD"

#### 5.2 建立 OAuth 2.0 用戶端 ID

1. 在左側選單中，選擇 "APIs & Services" > "Credentials"
2. 點擊 "+ CREATE CREDENTIALS" > "OAuth client ID"
3. 選擇 "Application type": **Web application**
4. 輸入名稱：「跑腿幫 Web Client」
5. 在 "Authorized JavaScript origins" 中，新增：
   - `http://localhost:5173`（開發環境）
   - `https://yourdomain.com`（正式環境）
6. 在 "Authorized redirect URIs" 中，新增：
   - **重要**：從 Supabase 獲取重新導向 URI
   - 回到 Supabase 儀表板 > Authentication > Providers > Google
   - 複製 "Redirect URL"（格式如：`https://your-project.supabase.co/auth/v1/callback`）
   - 將這個 URL 貼到 Google Cloud Console
7. 點擊 "CREATE"
8. 複製顯示的 **Client ID** 和 **Client Secret**

### 步驟 6：在 Supabase 填入 Google OAuth 憑證

1. 回到 Supabase 儀表板
2. 點擊 "Authentication" > "Providers" > "Google"
3. 填入：
   - **Client ID**: 從 Google Cloud Console 複製的 Client ID
   - **Client Secret**: 從 Google Cloud Console 複製的 Client Secret
4. 點擊 "Save"

### 步驟 7：測試 Google 登入

1. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

2. 開啟瀏覽器，訪問 `http://localhost:5173`

3. 點擊右上角的「登入」按鈕

4. 選擇「Google」分頁

5. 點擊「使用 Google 帳號登入」按鈕

6. 會跳轉到 Google 登入頁面

7. 選擇您的 Google 帳號（必須是測試使用者）

8. 授權應用程式存取您的資訊

9. 會自動重定向回您的應用程式

10. 登入成功！

## 🔧 程式碼說明

### Supabase 配置 (`src/lib/supabase.ts`)

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Google OAuth 登入

```typescript
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};
```

### Auth Callback 處理

當 Google OAuth 完成後，Supabase 會重定向到 `/auth/callback`，該頁面會：
1. 從 URL hash 中提取 access_token 和 refresh_token
2. 使用 `supabase.auth.setSession()` 設定 session
3. 重定向到儀表板

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

## 📊 資料庫設定（選填）

如果您需要儲存額外的用戶資訊，可以創建 users 表：

1. 在 Supabase 儀表板中，點擊 "Table Editor"
2. 點擊 "New Table"
3. 設定表名：`profiles`
4. 新增欄位：
   - `id` (uuid, primary key, references auth.users)
   - `full_name` (text)
   - `avatar_url` (text)
   - `role` (text, default: 'user')
   - `created_at` (timestamp, default: now())
5. 點擊 "Save"

### 設定 RLS (Row Level Security)

1. 點擊 "Authentication" > "Policies"
2. 為 `profiles` 表新增政策：
   - **Select**: Users can view their own profile
   - **Insert**: Users can insert their own profile
   - **Update**: Users can update their own profile

## 🐛 常見問題

### 問題 1：404 NOT_FOUND 錯誤

**原因**：Google Cloud Console 的重新導向 URI 設定不正確

**解決方案**：
1. 確認 Supabase 的 "Redirect URL" 已正確添加到 Google Cloud Console
2. 格式應為：`https://your-project.supabase.co/auth/v1/callback`
3. 不要忘記新增 `http://localhost:5173` 用於開發環境

### 問題 2：登入後沒有重定向

**原因**：Auth callback 頁面沒有正確處理

**解決方案**：
1. 檢查 `/auth/callback` 路由是否已添加到 App.tsx
2. 檢查瀏覽器控制台是否有錯誤訊息
3. 確認 Supabase 的 "Redirect URL" 設定正確

### 問題 3：用戶資訊沒有正確顯示

**原因**：用戶元資料沒有正確轉換

**解決方案**：
1. 檢查 `convertSupabaseUser` 函數
2. 確認 Supabase 返回的用戶資訊格式
3. 在瀏覽器控制台查看 `console.log` 輸出

### 問題 4：環境變數沒有載入

**原因**：`.env` 檔案沒有正確設定

**解決方案**：
1. 確認 `.env` 檔案在專案根目錄
2. 確認變數名稱以 `VITE_` 開頭
3. 重新啟動開發伺服器
4. 檢查 `import.meta.env` 是否包含變數

## 🚀 正式環境部署

### 更新環境變數

在正式環境中，需要更新 `.env` 檔案：

```env
VITE_SUPABASE_URL=https://your-production-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

### 更新 Google Cloud Console

1. 在 "Authorized JavaScript origins" 中新增正式網域
2. 在 "Authorized redirect URIs" 中新增正式網域

### 更新 Supabase

1. 確認 "Redirect URL" 包含正式網域
2. 更新 CORS 設定（如果需要）

## 📚 參考資源

- [Supabase 文件](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Google Login](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console](https://console.cloud.google.com/)

## ✅ 檢查清單

在部署前，請確認以下項目：

- [ ] 已創建 Supabase 專案
- [ ] 已獲取 Project URL 和 anon key
- [ ] 已設定 `.env` 檔案
- [ ] 已在 Supabase 啟用 Google OAuth
- [ ] 已在 Google Cloud Console 設定 OAuth 同意畫面
- [ ] 已建立 OAuth 2.0 用戶端 ID
- [ ] 已將 Supabase Redirect URL 添加到 Google Cloud Console
- [ ] 已將 Client ID 和 Client Secret 填入 Supabase
- [ ] 已新增測試使用者
- [ ] 已在開發環境測試登入功能
- [ ] 已在開發環境測試登出功能
- [ ] 已更新正式環境的環境變數
- [ ] 已更新正式環境的 Google Cloud Console 設定

## 🎉 完成

恭喜！您已成功設置 Supabase Google OAuth 登入功能。

現在您的應用程式可以：
- ✅ 使用 Google 帳號快速登入
- ✅ 自動處理 OAuth 流程
- ✅ 儲存用戶資訊到 Supabase
- ✅ 解決原本的 404 錯誤問題

如有任何問題，請查看常見問題部分或參考 Supabase 官方文件。
