import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth, User } from '../contexts/AuthContext';

// Google Client ID - 請替換為你的真實 Client ID
// 獲取方式：https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

interface GoogleAuthButtonProps {
  onSuccess?: (user: User) => void;
  onError?: () => void;
}

// Google 用戶資訊介面（從 JWT 解碼）
interface GoogleUserInfo {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}

export function GoogleAuthButton({ onSuccess, onError }: GoogleAuthButtonProps) {
  const { login } = useAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential received');
      onError?.();
      return;
    }

    try {
      // 解碼 JWT token
      const decoded = jwtDecode<GoogleUserInfo>(credentialResponse.credential);
      console.log('Google user info:', decoded);

      // 創建用戶物件
      const user: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        provider: 'google',
        role: 'user',
      };

      // 登入
      login(user);
      onSuccess?.(user);
    } catch (error) {
      console.error('Failed to decode credential:', error);
      onError?.();
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    onError?.();
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          logo_alignment="left"
          width="280"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

// 自定義 Google 登入按鈕（不使用官方樣式）
export function CustomGoogleLoginButton({ onSuccess, onError }: GoogleAuthButtonProps) {
  const { login } = useAuth();

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      console.error('No credential received');
      onError?.();
      return;
    }

    try {
      const decoded = jwtDecode<GoogleUserInfo>(credentialResponse.credential);
      console.log('Google user info:', decoded);

      const user: User = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        given_name: decoded.given_name,
        family_name: decoded.family_name,
        provider: 'google',
        role: 'user',
      };

      login(user);
      onSuccess?.(user);
    } catch (error) {
      console.error('Failed to decode credential:', error);
      onError?.();
    }
  };

  const handleError = () => {
    console.error('Google Login Failed');
    onError?.();
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="pill"
        width="100%"
      />
    </GoogleOAuthProvider>
  );
}
