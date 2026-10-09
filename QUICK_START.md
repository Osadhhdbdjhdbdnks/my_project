# 🚀 快速開始配置指南

## ⚠️ 您遇到的問題

您看到的錯誤訊息：
```
This site can't be reached
DNS_PROBE_FINISHED_NXDOMAIN
```

這是因為程式碼中使用了佔位符 `your-project.supabase.co`，您需要填入**真實的 Supabase 專案資訊**。

## ✅ 解決方案（3 個步驟）

### 步驟 1：創建 Supabase 專案（5 分鐘）

1. **前往 Supabase**
   - 打開 [https://supabase.com](https://supabase.com)
   - 點擊 "Start your project"
   - 使用 GitHub 帳號登入（或創建一個新帳號）

2. **創建新專案**
   - 點擊 "New Project"
   - 填寫以下資訊：
     - **Name**: 跑腿幫（或您喜歡的名稱）
     - **Database Password**: 設定一個強密碼（**請記下來！**）
     - **Region**: 選擇最接近您的地區（例如：Northeast Asia (Tokyo)）
   - 點擊 "Create new project"
   - 等待 1-2 分鐘讓專案初始化

3. **獲取專案資訊**
   - 專案創建完成後，點擊左側選單的 "Settings"（齒輪圖示）
   - 點擊 "API"
   - 複製以下兩個資訊：
     - **Project URL**: 格式為 `https://abcdefg.supabase.co`
     - **anon public key**: 一個很長的 JWT token（以 `eyJ...` 開頭）

### 步驟 2：配置專案（2 分鐘）

#### 方法 A：使用配置精靈（推薦）

1. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

2. **訪問配置頁面**
   - 打開瀏覽器
   - 訪問 `http://localhost:5173/setup`
   - 按照頁面上的指示操作

3. **填入 Supabase 資訊**
   - 貼上您剛才複製的 **Project URL**
   - 貼上您剛才複製的 **anon public key**
   - 點擊 "儲存配置"

4. **完成！**
   - 配置會自動儲存到您的瀏覽器
   - 點擊 "前往登入頁面" 開始使用

#### 方法 B：使用環境變數（進階）

1. **創建 `.env.local` 檔案**
   在專案根目錄創建一個名為 `.env.local` 的檔案

2. **填入配置**
   ```env
   VITE_SUPABASE_URL=https://abcdefg.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   （替換為您的實際資訊）

3. **重新啟動開發伺服器**
   ```bash
   # 停止伺服器（Ctrl+C）
   npm run dev
   ```

### 步驟 3：啟用 Google 登入（10 分鐘）

#### 3.1 在 Supabase 啟用 Google Provider

1. 在 Supabase Dashboard 中，點擊左側選單的 "Authentication"
2. 點擊 "Providers"
3. 找到 "Google" 並點擊展開
4. 開啟 "Enable" 開關
5. 您需要設定 Google OAuth 憑證（見下一步）

#### 3.2 在 Google Cloud Console 設定 OAuth

1. **前往 Google Cloud Console**
   - 打開 [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - 登入您的 Google 帳號

2. **創建新專案**（或選擇現有專案）
   - 點擊頂部的專案選擇器
   - 點擊 "新專案"
   - 輸入專案名稱（例如：跑腿幫）
   - 點擊 "建立"

3. **設定 OAuth 同意畫面**
   - 在左側選單，選擇 "API 和服務" > "OAuth 同意畫面"
   - 選擇 "外部" 使用者類型
   - 點擊 "建立"
   - 填寫應用程式資訊：
     - **應用程式名稱**: 跑腿幫
     - **使用者支援電子郵件**: 您的 Email
     - **開發人員聯絡資訊**: 您的 Email
   - 點擊 "儲存並繼續"
   - 在 "範圍" 頁面，點擊 "新增或移除範圍"
   - 搜尋並勾選：
     - `../auth/userinfo.email`
     - `../auth/userinfo.profile`
     - `openid`
   - 點擊 "更新"，然後 "儲存並繼續"
   - 在 "測試使用者" 頁面，點擊 "新增使用者"
   - 輸入您的 Google Email（用於測試）
   - 點擊 "新增"，然後 "儲存並繼續"

4. **建立 OAuth 2.0 用戶端 ID**
   - 在左側選單，選擇 "API 和服務" > "憑證"
   - 點擊 "+ 建立憑證" > "OAuth 用戶端 ID"
   - 選擇 "應用程式類型": **網頁應用程式**
   - 輸入名稱：跑腿幫 Web Client
   - 在 "已授權的 JavaScript 來源" 中，新增：
     - `http://localhost:5173`（開發環境）
     - `https://your-app.vercel.app`（正式環境，替換為您的 Vercel 域名）
   - 在 "已授權的重新導向 URI" 中，新增：
     - **重要**：從 Supabase 複製
     - 回到 Supabase Dashboard > Authentication > Providers > Google
     - 複製 "Redirect URL"（格式：`https://abcdefg.supabase.co/auth/v1/callback`）
     - 貼到 Google Cloud Console
   - 點擊 "建立"
   - 複製顯示的 **用戶端 ID** 和 **用戶端密碼**

5. **在 Supabase 填入 Google OAuth 憑證**
   - 回到 Supabase Dashboard
   - 點擊 "Authentication" > "Providers" > "Google"
   - 填入：
     - **Client ID**: 從 Google Cloud Console 複製的用戶端 ID
     - **Client Secret**: 從 Google Cloud Console 複製的用戶端密碼
   - 點擊 "Save"

## 🎉 測試登入

1. 訪問 `http://localhost:5173`
2. 點擊「登入」按鈕
3. 選擇「Google」分頁
4. 點擊「使用 Google 帳號登入」
5. 選擇您的 Google 帳號（必須是測試使用者）
6. 授權應用程式
7. 登入成功！

## 📋 配置檢查清單

完成所有步驟後，請確認：

- [ ] 已創建 Supabase 專案
- [ ] 已複製 Project URL 和 anon key
- [ ] 已在配置精靈或 `.env.local` 中填入資訊
- [ ] 已在 Supabase 啟用 Google Provider
- [ ] 已在 Google Cloud Console 設定 OAuth 同意畫面
- [ ] 已建立 OAuth 2.0 用戶端 ID
- [ ] 已將 Supabase Redirect URL 添加到 Google Cloud Console
- [ ] 已將 Client ID 和 Client Secret 填入 Supabase
- [ ] 已新增測試使用者
- [ ] 已成功測試 Google 登入

## 🐛 常見問題

### 問題 1：仍然出現 DNS 錯誤

**原因**：Supabase URL 沒有正確配置

**解決方案**：
1. 訪問 `/setup` 頁面
2. 確認 Supabase URL 格式正確：`https://xxxxx.supabase.co`
3. 確認已點擊 "儲存配置"
4. 重新整理頁面

### 問題 2：Google 登入後顯示錯誤

**原因**：Google Cloud Console 的 Redirect URL 配置不正確

**解決方案**：
1. 在 Supabase Dashboard 中，點擊 "Authentication" > "Providers" > "Google"
2. 複製 "Redirect URL"
3. 在 Google Cloud Console 中，確認這個 URL 已添加到 "已授權的重新導向 URI"

### 問題 3：環境變數沒有生效

**原因**：需要重新啟動開發伺服器

**解決方案**：
```bash
# 停止伺服器（Ctrl+C）
npm run dev
```

## 📚 需要更多幫助？

- **[QUICK_FIX_404.md](./QUICK_FIX_404.md)** - Vercel 部署問題修復
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - 詳細的 Supabase 設置指南
- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - 完整的 Vercel 部署指南

## 🎯 總結

您只需要做 3 件事：

1. ✅ **創建 Supabase 專案**（5 分鐘）
2. ✅ **配置專案資訊**（2 分鐘，使用 `/setup` 頁面）
3. ✅ **啟用 Google 登入**（10 分鐘）

完成後，您就可以使用 Google 帳號快速登入了！
