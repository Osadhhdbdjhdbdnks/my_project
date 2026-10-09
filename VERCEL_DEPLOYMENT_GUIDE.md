# Vercel 部署完整指南

## 🎯 解決 404 NOT_FOUND 錯誤

這個指南將幫助你解決部署到 Vercel 後遇到的 404 錯誤問題。

## 📋 問題原因

404 錯誤通常是因為：
1. **Supabase 的 Redirect URL 沒有正確配置 Vercel 域名**
2. **Vercel 環境變數沒有設定**
3. **SPA 路由沒有正確處理**
4. **Google Cloud Console 的 Authorized redirect URIs 配置不正確**

## 🚀 完整解決方案

### 步驟 1：設定 Vercel 環境變數

#### 1.1 在 Vercel 專案中設定環境變數

1. 登入 [Vercel Dashboard](https://vercel.com/dashboard)
2. 選擇你的專案
3. 點擊 "Settings" > "Environment Variables"
4. 添加以下環境變數：

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**重要提示：**
- 變數名稱必須以 `VITE_` 開頭
- 需要在 **Production**、**Preview**、**Development** 三個環境都設定
- 重新部署專案以套用環境變數

#### 1.2 獲取 Supabase 憑證

1. 登入 [Supabase Dashboard](https://supabase.com/dashboard/)
2. 選擇你的專案
3. 點擊 "Settings" > "API"
4. 複製：
   - **Project URL**: `https://your-project.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 步驟 2：配置 Supabase Redirect URLs

#### 2.1 添加 Vercel 域名到 Supabase

1. 在 Supabase Dashboard 中，點擊 "Authentication" > "Providers"
2. 點擊 "Google" 展開設定
3. 在 "Redirect URLs" 中，添加以下 URL：

```
# 正式環境（替換為你的 Vercel 域名）
https://your-app.vercel.app/auth/callback

# Preview 環境（Vercel 自動生成的預覽域名）
https://your-app-*.vercel.app/auth/callback

# 本地開發環境
http://localhost:5173/auth/callback
```

**重要提示：**
- 必須精確匹配，包括協議（https://）和路徑（/auth/callback）
- 可以添加多個 URL，用逗號分隔
- 建議同時添加正式域名和 preview 域名

#### 2.2 驗證 Google Cloud Console 配置

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 選擇你的專案
3. 點擊 "APIs & Services" > "Credentials"
4. 點擊你的 OAuth 2.0 Client ID
5. 在 "Authorized redirect URIs" 中，確認包含：

```
# Supabase 的回調 URL（從 Supabase Dashboard 複製）
https://your-project.supabase.co/auth/v1/callback
```

**重要提示：**
- 這個 URL 可以從 Supabase 的 Google Provider 設定頁面複製
- 格式必須是：`https://your-project.supabase.co/auth/v1/callback`
- 不要添加你自己的域名到這裡

### 步驟 3：驗證 vercel.json 配置

你的專案已經包含 `vercel.json` 配置文件，它會：
- 將所有路由重定向到 `index.html`（SPA 路由支援）
- 添加安全 headers

確認 `vercel.json` 內容：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 步驟 4：重新部署專案

1. 在 Vercel Dashboard 中，點擊 "Deployments"
2. 找到最新的部署
3. 點擊 "Redeploy"
4. 等待部署完成

### 步驟 5：測試 Google 登入

1. 訪問你的 Vercel 域名：`https://your-app.vercel.app`
2. 點擊「登入」按鈕
3. 選擇「Google」分頁
4. 點擊「使用 Google 帳號登入」
5. 應該會：
   - 重定向到 Google 登入頁面
   - 選擇帳號後重定向回 Supabase
   - 最後重定向到你的應用程式的 `/auth/callback`
   - 自動登入並跳轉到儀表板

## 🔍 除錯指南

### 問題 1：仍然出現 404 錯誤

**檢查項目：**
1. ✅ Supabase 的 Redirect URLs 是否包含你的 Vercel 域名？
2. ✅ 環境變數是否已設定並重新部署？
3. ✅ Google Cloud Console 的 redirect URI 是否正確？
4. ✅ 瀏覽器控制台是否有錯誤訊息？

**解決方案：**
```bash
# 在瀏覽器控制台執行以下命令檢查環境變數
console.log(import.meta.env.VITE_SUPABASE_URL)
console.log(import.meta.env.VITE_SUPABASE_ANON_KEY)
```

### 問題 2：登入後沒有重定向

**檢查項目：**
1. ✅ `/auth/callback` 路由是否在 App.tsx 中定義？
2. ✅ AuthCallbackPage 是否正確處理 token？
3. ✅ 瀏覽器控制台是否有錯誤？

**解決方案：**
1. 打開瀏覽器開發者工具（F12）
2. 切換到 Console 分頁
3. 嘗試登入並查看控制台輸出
4. 檢查是否有錯誤訊息

### 問題 3：顯示「登入失敗」錯誤

**可能的錯誤訊息：**
- `Invalid OAuth state` - OAuth state 驗證失敗
- `Access denied` - 用戶拒絕授權
- `Invalid redirect URI` - 重定向 URI 不正確

**解決方案：**
1. 確認 Supabase 的 Redirect URLs 配置正確
2. 確認 Google Cloud Console 的配置正確
3. 清除瀏覽器快取和 Cookie
4. 使用無痕模式測試

### 問題 4：環境變數沒有載入

**檢查項目：**
1. ✅ 環境變數名稱是否以 `VITE_` 開頭？
2. ✅ 是否在 Vercel 中設定了環境變數？
3. ✅ 是否重新部署了專案？

**解決方案：**
```bash
# 在 Vercel CLI 中檢查環境變數
vercel env ls

# 重新部署
vercel --prod
```

## 📊 完整的配置檢查清單

### Supabase 配置
- [ ] 已創建 Supabase 專案
- [ ] 已啟用 Google Provider
- [ ] 已填入 Google Client ID 和 Client Secret
- [ ] 已添加 Vercel 域名到 Redirect URLs
- [ ] 已添加 localhost 到 Redirect URLs（開發環境）

### Google Cloud Console 配置
- [ ] 已建立 OAuth 2.0 Client ID
- [ ] 已設定 OAuth 同意畫面
- [ ] 已添加 Supabase 的 callback URL 到 Authorized redirect URIs
- [ ] 已新增測試使用者

### Vercel 配置
- [ ] 已設定 `VITE_SUPABASE_URL` 環境變數
- [ ] 已設定 `VITE_SUPABASE_ANON_KEY` 環境變數
- [ ] 已在 Production、Preview、Development 環境都設定
- [ ] 已重新部署專案
- [ ] `vercel.json` 配置文件存在且正確

### 程式碼配置
- [ ] `src/lib/supabase.ts` 正確讀取環境變數
- [ ] `src/pages/AuthCallbackPage.tsx` 正確處理回調
- [ ] `src/App.tsx` 包含 `/auth/callback` 路由
- [ ] 所有路由都有正確的 rewrites 配置

## 🛠️ 進階除錯

### 查看 Supabase 日誌

1. 在 Supabase Dashboard 中，點擊 "Logs"
2. 選擇 "Auth" 日誌
3. 查看 OAuth 相關的錯誤訊息

### 查看 Vercel 日誌

1. 在 Vercel Dashboard 中，點擊 "Deployments"
2. 選擇最新的部署
3. 點擊 "Functions" 或 "Logs"
4. 查看錯誤訊息

### 使用瀏覽器開發者工具

1. 打開開發者工具（F12）
2. 切換到 Network 分頁
3. 嘗試登入
4. 查看所有請求和回應
5. 特別關注 `/auth/callback` 請求

### 測試 OAuth 流程

使用以下步驟手動測試 OAuth 流程：

```javascript
// 在瀏覽器控制台執行
import { supabase } from './lib/supabase';

// 測試 Google 登入
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://your-app.vercel.app/auth/callback',
  },
});

console.log('Sign in result:', { data, error });
```

## 📚 參考資源

- [Supabase Auth 文件](https://supabase.com/docs/guides/auth)
- [Supabase Google Login](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Vercel 環境變數](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel SPA 路由](https://vercel.com/docs/concepts/routes/rewrites)
- [Google OAuth 疑難排解](https://developers.google.com/identity/protocols/oauth2/web-server#troubleshooting)

## ✅ 成功標準

完成所有配置後，你應該能夠：

1. ✅ 在 Vercel 上成功部署專案
2. ✅ 點擊「Google 登入」按鈕
3. ✅ 重定向到 Google 登入頁面
4. ✅ 選擇帳號後重定向回你的應用程式
5. ✅ 自動登入並顯示用戶資訊
6. ✅ 沒有 404 錯誤

## 🎉 常見問題解答

### Q: 我可以在多個環境使用同一個 Supabase 專案嗎？

**A:** 可以，但需要為每個環境設定不同的 Redirect URLs。建議：
- Production: `https://your-app.vercel.app/auth/callback`
- Preview: `https://your-app-*.vercel.app/auth/callback`
- Development: `http://localhost:5173/auth/callback`

### Q: 為什麼需要同時設定 Supabase 和 Google Cloud Console？

**A:** 因為 OAuth 流程涉及兩個服務：
1. Google 需要知道可以重定向到哪裡（Google Cloud Console）
2. Supabase 需要知道可以接收哪些重定向（Supabase Redirect URLs）

### Q: 環境變數設定後為什麼沒有生效？

**A:** 需要重新部署專案。Vercel 在部署時會將環境變數注入到構建過程中。

### Q: 可以使用自定義域名嗎？

**A:** 可以，但需要：
1. 在 Vercel 中設定自定義域名
2. 在 Supabase 中添加自定義域名到 Redirect URLs
3. 重新部署專案

## 📞 獲取幫助

如果仍然遇到問題：

1. 查看瀏覽器控制台的錯誤訊息
2. 查看 Supabase 和 Vercel 的日誌
3. 確認所有配置都正確
4. 嘗試使用無痕模式測試
5. 清除瀏覽器快取和 Cookie

如果問題仍然存在，請提供：
- 完整的錯誤訊息
- 瀏覽器控制台的輸出
- Supabase 和 Vercel 的相關日誌
- 你的配置（隱藏敏感資訊）
