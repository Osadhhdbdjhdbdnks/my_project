# Google 登入、註冊和登出功能

## 🎉 功能完成！

已成功實現完整的 Google 帳號登入、註冊和登出功能，包含真實的 OAuth 2.0 流程。

## 📦 新增的檔案

### 核心組件
1. **`src/contexts/AuthContext.tsx`** - 認證上下文
   - 管理用戶登入狀態
   - 提供登入、登出、更新用戶資訊功能
   - 使用 LocalStorage 持久化用戶資訊

2. **`src/components/GoogleAuthButton.tsx`** - Google 登入按鈕
   - 使用 `@react-oauth/google` 套件
   - 處理 Google OAuth 流程
   - 解碼 JWT Token 獲取用戶資訊

3. **`src/components/UserMenu.tsx`** - 用戶選單
   - 顯示用戶頭像和資訊
   - 提供快速操作（個人資料、設定、登出）
   - 點擊外部自動關閉

### 頁面
4. **`src/pages/LoginPage.tsx`** - 登入頁面
   - Google 登入
   - Email 登入
   - 手機號碼登入（含驗證碼）
   - 美觀的 UI 設計

5. **`src/pages/RegisterPage.tsx`** - 註冊頁面
   - Google 註冊
   - Email 註冊
   - 手機號碼註冊（含驗證碼）
   - 表單驗證

### 路由配置
6. **`src/App.tsx`** - 更新為使用 React Router
   - 公開路由：`/`, `/login`, `/register`
   - 受保護路由：`/dashboard`, `/profile`, `/settings`
   - 自動重定向未登入用戶

## 🔧 安裝的套件

```bash
npm install @react-oauth/google jwt-decode react-router-dom
```

- **@react-oauth/google** - Google OAuth React 組件
- **jwt-decode** - 解碼 JWT Token
- **react-router-dom** - 路由管理

## 🚀 使用方式

### 1. 設定 Google Client ID

請參考 `GOOGLE_AUTH_SETUP.md` 文件獲取詳細的設置步驟。

簡要步驟：
1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 建立新專案
3. 設定 OAuth 同意畫面
4. 建立 OAuth 2.0 用戶端 ID
5. 複製 Client ID
6. 貼到 `src/components/GoogleAuthButton.tsx` 中的 `GOOGLE_CLIENT_ID`

### 2. 啟動開發伺服器

```bash
npm run dev
```

### 3. 測試登入

1. 訪問 `http://localhost:5173`
2. 點擊右上角的「登入」按鈕
3. 選擇「Google」分頁
4. 點擊「使用 Google 帳號登入」
5. 選擇您的 Google 帳號
6. 授權應用程式
7. 登入成功！

## 📋 功能詳情

### 登入頁面 (`/login`)

提供三種登入方式：

#### Google 登入
- 使用官方 Google 登入按鈕
- 一鍵登入，無需輸入密碼
- 自動獲取用戶資訊（姓名、Email、頭像）

#### Email 登入
- 輸入 Email 和密碼
- 「記住我」功能
- 「忘記密碼」連結

#### 手機登入
- 輸入手機號碼
- 發送驗證碼（演示：123456）
- 輸入驗證碼完成登入

### 註冊頁面 (`/register`)

提供三種註冊方式：

#### Google 註冊
- 使用 Google 帳號快速註冊
- 自動獲取用戶資訊
- 無需填寫表單

#### Email 註冊
- 填寫姓名、Email、密碼
- 密碼強度驗證（至少 8 個字元）
- 確認密碼驗證
- 同意服務條款

#### 手機註冊
- 填寫姓名、手機號碼
- 發送驗證碼
- 輸入驗證碼完成註冊
- 同意服務條款

### 用戶選單

登入後，右上角顯示用戶頭像，點擊展開選單：

- **用戶資訊區**
  - 頭像
  - 姓名
  - Email
  - 登入方式標籤（Google/Email/手機）
  - 角色標籤（用戶/跑腿員/管理員）

- **選單項目**
  - 個人資料
  - 設定
  - 統計數據（任務數、評分、讚賞數）
  - 登出

### 受保護的路由

以下頁面需要登入才能存取：

- `/dashboard` - 儀表板
- `/profile` - 個人資料
- `/settings` - 設定

未登入用戶會自動重定向到 `/login` 頁面。

## 🔒 安全性

### JWT Token

Google 登入後返回的 JWT Token 包含：
- `sub` - 用戶唯一 ID
- `name` - 用戶姓名
- `email` - 用戶 Email
- `picture` - 用戶頭像 URL
- `given_name` - 名字
- `family_name` - 姓氏

### LocalStorage

用戶資訊儲存在瀏覽器的 LocalStorage：
- Key: `user`
- Value: JSON 格式的用戶資訊

### 登出

登出時：
1. 清除 LocalStorage 中的用戶資訊
2. 重定向到登入頁面

## 🎨 UI 設計

### 登入頁面
- 漸層背景（藍色到紫色）
- 卡片式設計
- 三種登入方式的 Tab 切換
- 響應式設計
- 錯誤訊息顯示
- 載入狀態

### 註冊頁面
- 與登入頁面一致的設計風格
- 表單驗證
- 密碼強度提示
- 服務條款同意

### 用戶選單
- 圓形頭像
- 下拉式選單
- 漸層背景資訊區
- 統計數據網格
- 懸停效果
- 點擊外部關閉

## 📊 用戶資訊結構

```typescript
interface User {
  id: string;              // 用戶唯一 ID
  name: string;            // 用戶姓名
  email: string;           // 用戶 Email
  picture: string;         // 用戶頭像 URL
  given_name?: string;     // 名字（Google 登入）
  family_name?: string;    // 姓氏（Google 登入）
  provider: 'google' | 'email' | 'phone';  // 登入方式
  role: 'user' | 'runner' | 'admin';       // 用戶角色
}
```

## 🔄 路由結構

```
/                    → 首頁（公開）
/login              → 登入頁面（公開）
/register           → 註冊頁面（公開）
/dashboard          → 儀表板（需登入）
/profile            → 個人資料（需登入）
/settings           → 設定（需登入）
*                   → 重定向到首頁
```

## 🎯 核心功能

### AuthContext

```typescript
// 使用 useAuth Hook
const { user, isLoading, isAuthenticated, login, logout, updateUser } = useAuth();

// 登入
login({
  id: 'user123',
  name: '王小明',
  email: 'wang@example.com',
  picture: 'https://...',
  provider: 'google',
  role: 'user'
});

// 登出
logout();

// 更新用戶資訊
updateUser({ name: '新名字' });
```

### 受保護的路由

```typescript
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

如果用戶未登入，會自動重定向到 `/login`。

## 🐛 疑難排解

### 問題：Google 登入按鈕沒有顯示

**解決方案：**
1. 檢查 `GOOGLE_CLIENT_ID` 是否正確設定
2. 確認已在 Google Cloud Console 啟用 API
3. 檢查瀏覽器控制台錯誤訊息

### 問題：登入後顯示「存取遭拒」

**解決方案：**
1. 確認您的 Google 帳號已新增為測試使用者
2. 檢查 OAuth 同意畫面設定

### 問題：重新導向 URI 不匹配

**解決方案：**
1. 在 Google Cloud Console 新增正確的重新導向 URI
2. 開發環境：`http://localhost:5173`
3. 正式環境：`https://yourdomain.com`

## 📚 參考文件

- [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md) - 詳細的 Google OAuth 設置指南
- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [@react-oauth/google](https://github.com/MomenSherif/react-oauth)
- [React Router](https://reactrouter.com/)

## ✅ 功能檢查清單

- [x] Google 登入功能
- [x] Google 註冊功能
- [x] Email 登入功能
- [x] Email 註冊功能
- [x] 手機登入功能
- [x] 手機註冊功能
- [x] 登出功能
- [x] 用戶選單
- [x] 受保護的路由
- [x] 認證狀態管理
- [x] LocalStorage 持久化
- [x] JWT Token 解碼
- [x] 錯誤處理
- [x] 載入狀態
- [x] 表單驗證
- [x] 響應式設計
- [x] 美觀的 UI

## 🎉 總結

已成功實現完整的 Google 帳號登入、註冊和登出功能！

**主要特色：**
- ✅ 真實的 Google OAuth 2.0 流程
- ✅ 三種登入方式（Google、Email、手機）
- ✅ 三種註冊方式（Google、Email、手機）
- ✅ 完整的用戶選單
- ✅ 受保護的路由
- ✅ 認證狀態管理
- ✅ 美觀的 UI 設計
- ✅ 詳細的設置文件

現在您可以讓用戶使用 Google 帳號快速登入和註冊您的應用程式！
