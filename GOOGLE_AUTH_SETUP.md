# Google 登入功能設置指南

## 📋 概述

本專案已實現完整的 Google 帳號登入、註冊和登出功能，使用 **Google Identity Services API** 和 **@react-oauth/google** 套件。

## 🔑 獲取 Google Client ID

### 步驟 1：前往 Google Cloud Console

1. 訪問 [Google Cloud Console](https://console.cloud.google.com/)
2. 登入您的 Google 帳號
3. 點擊頂部的專案選擇器，選擇「新增專案」
4. 輸入專案名稱（例如：「跑腿幫」）
5. 點擊「建立」

### 步驟 2：設定 OAuth 同意畫面

1. 在左側選單中，選擇「API 和服務」>「OAuth 同意畫面」
2. 選擇「外部」使用者類型，點擊「建立」
3. 填寫應用程式資訊：
   - **應用程式名稱**：跑腿幫
   - **使用者支援電子郵件**：您的 Email
   - **應用程式圖示**：可上傳您的 Logo（選填）
4. 點擊「儲存並繼續」
5. 在「範圍」頁面，點擊「新增或移除範圍」
6. 搜尋並勾選以下範圍：
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`
7. 點擊「更新」，然後「儲存並繼續」
8. 在「測試使用者」頁面，點擊「新增使用者」
9. 輸入您的 Google Email（用於測試）
10. 點擊「儲存並繼續」，然後「返回儀表板」

### 步驟 3：建立 OAuth 2.0 用戶端 ID

1. 在左側選單中，選擇「API 和服務」>「憑證」
2. 點擊「+ 建立憑證」>「OAuth 用戶端 ID」
3. 選擇「應用程式類型」：**網頁應用程式**
4. 輸入名稱：「跑腿幫 Web Client」
5. 在「已授權的 JavaScript 來源」中，新增：
   - `http://localhost:5173`（開發環境）
   - `https://yourdomain.com`（正式環境，請替換為您的網域）
6. 在「已授權的重新導向 URI」中，新增：
   - `http://localhost:5173`（開發環境）
   - `https://yourdomain.com`（正式環境）
7. 點擊「建立」
8. 複製顯示的 **用戶端 ID**（格式如：`123456789.apps.googleusercontent.com`）

### 步驟 4：設定專案

1. 開啟 `src/components/GoogleAuthButton.tsx`
2. 找到以下程式碼：

```typescript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
```

3. 將 `'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'` 替換為您剛才複製的用戶端 ID

```typescript
const GOOGLE_CLIENT_ID = '123456789-abcdefg.apps.googleusercontent.com';
```

4. 儲存檔案

## 🚀 測試 Google 登入

### 開發環境測試

1. 啟動開發伺服器：
   ```bash
   npm run dev
   ```

2. 開啟瀏覽器，訪問 `http://localhost:5173`

3. 點擊右上角的「登入」按鈕

4. 選擇「Google」分頁

5. 點擊「使用 Google 帳號登入」按鈕

6. 選擇您的 Google 帳號（必須是您在 OAuth 同意畫面中新增的測試使用者）

7. 授權應用程式存取您的資訊

8. 登入成功後，會自動跳轉到儀表板頁面

## 📝 功能說明

### 登入頁面 (`/login`)

提供三種登入方式：
- **Google 登入**：使用 Google 帳號快速登入
- **Email 登入**：使用 Email 和密碼登入
- **手機登入**：使用手機號碼和驗證碼登入

### 註冊頁面 (`/register`)

提供三種註冊方式：
- **Google 註冊**：使用 Google 帳號快速註冊
- **Email 註冊**：使用 Email 和密碼註冊
- **手機註冊**：使用手機號碼和驗證碼註冊

### 用戶選單

登入後，右上角會顯示用戶頭像，點擊可展開選單：
- **個人資料**：查看和編輯個人資料
- **設定**：應用程式設定
- **登出**：登出帳號

### 受保護的路由

以下頁面需要登入才能存取：
- `/dashboard` - 儀表板
- `/profile` - 個人資料
- `/settings` - 設定

未登入用戶會自動重定向到 `/login` 頁面。

## 🔒 安全性

### JWT Token

Google 登入後會返回一個 JWT Token，包含以下資訊：
- `sub`：用戶唯一 ID
- `name`：用戶姓名
- `email`：用戶 Email
- `picture`：用戶頭像 URL
- `given_name`：名字
- `family_name`：姓氏

### LocalStorage

用戶資訊會儲存在瀏覽器的 LocalStorage 中：
- Key：`user`
- Value：JSON 格式的用戶資訊

### 登出

登出時會：
1. 清除 LocalStorage 中的用戶資訊
2. 重定向到登入頁面

## 🎨 UI 組件

### GoogleAuthButton

使用 `@react-oauth/google` 提供的官方 Google 登入按鈕：
- 符合 Google 品牌規範
- 支援多種樣式和尺寸
- 自動處理 OAuth 流程

### UserMenu

用戶選單組件，包含：
- 用戶頭像和姓名
- 用戶角色標籤
- 統計數據（任務數、評分、讚賞數）
- 快速操作按鈕（個人資料、設定、登出）

## 🐛 常見問題

### 問題 1：Google 登入按鈕沒有顯示

**原因**：Client ID 設定錯誤

**解決方案**：
1. 檢查 `GoogleAuthButton.tsx` 中的 `GOOGLE_CLIENT_ID` 是否正確
2. 確認已在 Google Cloud Console 中啟用 Google Identity Services API
3. 檢查瀏覽器控制台是否有錯誤訊息

### 問題 2：登入後顯示「存取遭拒」

**原因**：您的 Google 帳號不在測試使用者列表中

**解決方案**：
1. 前往 Google Cloud Console
2. 選擇「API 和服務」>「OAuth 同意畫面」
3. 在「測試使用者」分頁中新增您的 Google Email

### 問題 3：重新導向 URI 不匹配

**原因**：Google Cloud Console 中設定的重新導向 URI 與實際不符

**解決方案**：
1. 前往 Google Cloud Console
2. 選擇「API 和服務」>「憑證」
3. 編輯您的 OAuth 用戶端 ID
4. 在「已授權的重新導向 URI」中新增正確的 URI

### 問題 4：登出後仍然顯示已登入

**原因**：LocalStorage 沒有正確清除

**解決方案**：
1. 開啟瀏覽器開發者工具（F12）
2. 選擇「應用程式」分頁
3. 在左側選擇「LocalStorage」
4. 刪除 `user` 項目
5. 重新整理頁面

## 📚 參考資源

- [Google Identity Services 文件](https://developers.google.com/identity/gsi/web/guides/overview)
- [@react-oauth/google 文件](https://github.com/MomenSherif/react-oauth)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 文件](https://developers.google.com/identity/protocols/oauth2)

## 🔄 正式環境部署

### 更新重新導向 URI

在正式環境部署時，需要更新 Google Cloud Console 中的重新導向 URI：

1. 前往 Google Cloud Console
2. 選擇「API 和服務」>「憑證」
3. 編輯您的 OAuth 用戶端 ID
4. 在「已授權的 JavaScript 來源」中新增：
   - `https://yourdomain.com`
5. 在「已授權的重新導向 URI」中新增：
   - `https://yourdomain.com`
6. 點擊「儲存」

### 環境變數（建議）

為了安全性，建議將 Client ID 存放在環境變數中：

1. 建立 `.env` 檔案：
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here
   ```

2. 更新 `GoogleAuthButton.tsx`：
   ```typescript
   const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
   ```

3. 在 `.gitignore` 中新增：
   ```
   .env
   ```

## ✅ 檢查清單

在部署前，請確認以下項目：

- [ ] 已在 Google Cloud Console 建立專案
- [ ] 已設定 OAuth 同意畫面
- [ ] 已建立 OAuth 2.0 用戶端 ID
- [ ] 已將 Client ID 設定到專案中
- [ ] 已新增測試使用者
- [ ] 已設定正確的重新導向 URI
- [ ] 已在開發環境測試登入功能
- [ ] 已在開發環境測試登出功能
- [ ] 已更新正式環境的重新導向 URI

## 🎉 完成

恭喜！您已成功設置 Google 登入功能。現在用戶可以使用 Google 帳號快速登入和註冊您的應用程式。

如有任何問題，請查看常見問題部分或參考官方文件。
