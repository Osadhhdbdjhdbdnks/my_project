# 🚨 快速修復 404 NOT_FOUND 錯誤

## 問題描述

部署到 Vercel 後，使用 Google 登入時出現 404 NOT_FOUND 錯誤。

## ⚡ 快速解決方案（5 分鐘修復）

### 第一步：檢查 Supabase Redirect URLs（最常見的問題）

1. 登入 [Supabase Dashboard](https://supabase.com/dashboard/)
2. 選擇你的專案
3. 點擊 "Authentication" > "Providers" > "Google"
4. 在 "Redirect URLs" 中，**添加你的 Vercel 域名**：

```
https://your-app.vercel.app/auth/callback
```

**重要：** 
- 替換 `your-app.vercel.app` 為你的實際 Vercel 域名
- 必須包含 `/auth/callback` 路徑
- 可以添加多個 URL，用逗號分隔

### 第二步：設定 Vercel 環境變數

1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案
3. 點擊 "Settings" > "Environment Variables"
4. 添加以下環境變數（在 **Production** 環境）：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**如何獲取這些值：**
1. 在 Supabase Dashboard 中，點擊 "Settings" > "API"
2. 複製 "Project URL" 和 "anon public key"

### 第三步：重新部署

1. 在 Vercel Dashboard 中，點擊 "Deployments"
2. 找到最新的部署
3. 點擊 "Redeploy"
4. 等待部署完成

### 第四步：測試

1. 訪問你的 Vercel 域名
2. 點擊「登入」
3. 選擇「Google」
4. 點擊「使用 Google 帳號登入」
5. 應該成功登入！

## 🔍 如果還是出現 404 錯誤

### 檢查清單

請逐一檢查以下項目：

#### ✅ Supabase 配置
- [ ] 已啟用 Google Provider
- [ ] 已填入 Google Client ID 和 Client Secret
- [ ] Redirect URLs 包含 `https://your-app.vercel.app/auth/callback`
- [ ] Redirect URLs 包含 `http://localhost:5173/auth/callback`（開發環境）

#### ✅ Google Cloud Console 配置
- [ ] OAuth 2.0 Client ID 已建立
- [ ] Authorized redirect URIs 包含 Supabase 的 callback URL：
  ```
  https://your-project.supabase.co/auth/v1/callback
  ```
  **注意：** 這個 URL 可以從 Supabase 的 Google Provider 設定頁面複製

#### ✅ Vercel 配置
- [ ] 環境變數 `VITE_SUPABASE_URL` 已設定
- [ ] 環境變數 `VITE_SUPABASE_ANON_KEY` 已設定
- [ ] 已在 Production 環境設定環境變數
- [ ] 已重新部署專案
- [ ] `vercel.json` 檔案存在且包含 rewrites 配置

#### ✅ 程式碼配置
- [ ] `src/lib/supabase.ts` 正確讀取環境變數
- [ ] `src/App.tsx` 包含 `/auth/callback` 路由
- [ ] `src/pages/AuthCallbackPage.tsx` 存在且正確處理回調

## 🛠️ 常見問題快速修復

### 問題 1：環境變數沒有生效

**症狀：** 登入時顯示「無法獲取登入資訊」

**解決方案：**
```bash
# 1. 確認環境變數已設定
vercel env ls

# 2. 重新部署
vercel --prod

# 3. 清除瀏覽器快取
# 或使用無痕模式測試
```

### 問題 2：Redirect URL 不匹配

**症狀：** 顯示「Invalid redirect URI」錯誤

**解決方案：**
1. 在 Supabase 中檢查 Redirect URLs
2. 確認包含你的 Vercel 域名（精確匹配）
3. 確認包含 `/auth/callback` 路徑
4. 等待 5 分鐘讓配置生效

### 問題 3：Google 登入後沒有重定向

**症狀：** 登入後停留在 Google 頁面

**解決方案：**
1. 檢查 Google Cloud Console 的 Authorized redirect URIs
2. 確認包含 Supabase 的 callback URL
3. 格式：`https://your-project.supabase.co/auth/v1/callback`

### 問題 4：404 錯誤仍然存在

**症狀：** 訪問 `/auth/callback` 時顯示 404

**解決方案：**
1. 確認 `vercel.json` 檔案存在
2. 確認內容包含：
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```
3. 重新部署專案
4. 等待 2-3 分鐘讓 CDN 更新

## 📊 除錯步驟

### 步驟 1：檢查瀏覽器控制台

1. 打開開發者工具（F12）
2. 切換到 Console 分頁
3. 嘗試登入
4. 查看錯誤訊息

**常見的錯誤訊息：**
- `Invalid OAuth state` → Redirect URL 配置錯誤
- `Access denied` → 用戶拒絕授權（正常）
- `Invalid redirect URI` → Redirect URL 不匹配

### 步驟 2：檢查 Network 分頁

1. 打開開發者工具（F12）
2. 切換到 Network 分頁
3. 嘗試登入
4. 查看所有請求

**關注的請求：**
- `/auth/v1/authorize` → Supabase 授權請求
- `/auth/callback` → OAuth 回調
- 檢查回應狀態碼和內容

### 步驟 3：檢查 Supabase 日誌

1. 在 Supabase Dashboard 中，點擊 "Logs"
2. 選擇 "Auth" 日誌
3. 查看 OAuth 相關的錯誤

### 步驟 4：手動測試 OAuth 流程

在瀏覽器控制台執行：

```javascript
// 測試 Supabase 連接
import { supabase } from '/src/lib/supabase';

const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://your-app.vercel.app/auth/callback',
  },
});

console.log('Result:', { data, error });
```

## 🎯 完整的配置範例

### Supabase Redirect URLs

```
https://your-app.vercel.app/auth/callback,https://your-app-*.vercel.app/auth/callback,http://localhost:5173/auth/callback
```

### Google Cloud Console Authorized redirect URIs

```
https://your-project.supabase.co/auth/v1/callback
```

### Vercel 環境變數

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## ✅ 成功標準

完成所有配置後，你應該能夠：

1. ✅ 訪問 Vercel 域名
2. ✅ 點擊「Google 登入」按鈕
3. ✅ 重定向到 Google 登入頁面
4. ✅ 選擇帳號後重定向回你的應用程式
5. ✅ 自動登入並顯示用戶資訊
6. ✅ **沒有 404 錯誤**

## 📞 獲取幫助

如果仍然遇到問題：

1. **查看完整的部署指南**：[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
2. **查看 Supabase 設置指南**：[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
3. **查看瀏覽器控制台**的錯誤訊息
4. **查看 Supabase 和 Vercel 的日誌**
5. **嘗試使用無痕模式**測試

## 🎉 最後的檢查

在提交問題之前，請確認：

- [ ] 已閱讀並執行所有快速修復步驟
- [ ] 已檢查所有配置清單
- [ ] 已查看瀏覽器控制台的錯誤訊息
- [ ] 已嘗試使用無痕模式測試
- [ ] 已清除瀏覽器快取和 Cookie
- [ ] 已重新部署專案

如果問題仍然存在，請提供：
- 完整的錯誤訊息
- 瀏覽器控制台的輸出
- 你的 Vercel 域名（可以隱藏）
- Supabase 專案 ID（可以隱藏）
