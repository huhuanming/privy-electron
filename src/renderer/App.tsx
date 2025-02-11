import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  PrivyProvider,
  useLoginWithEmail,
  usePrivy,
} from '@privy-io/react-auth';
import icon from '../../assets/icon.svg';

export type IPrivyState =
  | { status: 'initial' }
  | {
      status: 'error';
      error: Error | null;
    }
  | { status: 'sending-code' }
  | { status: 'awaiting-code-input' }
  | { status: 'submitting-code' }
  | { status: 'done' };

export interface IUsePrivyUniversalV2 {
  logout: () => Promise<void>;
  isReady: boolean;
  getAccessToken: () => Promise<string | null>;
  useLoginWithEmail: (props?: {
    onComplete?: () => void;
    onError?: (error: any) => void;
  }) => {
    state: IPrivyState;
    sendCode: (args: { email: string }) => Promise<void>;
    loginWithCode: (args: { code: string; email?: string }) => Promise<void>;
  };
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
  };
}

export function usePrivyUniversalV2(): IUsePrivyUniversalV2 {
  const { logout, ready, getAccessToken, authenticated, user } = usePrivy();

  return {
    useLoginWithEmail: (args) => {
      const { onComplete, onError } = args || {};
      const { sendCode, loginWithCode, state } = useLoginWithEmail({
        onComplete,
        onError: (error) => {
          onError?.(error);
        },
      });

      return {
        state,
        sendCode: async (...sendCodeArgs) => {
          await sendCode(...sendCodeArgs);
        },
        loginWithCode: async (...loginWithCodeArgs) => {
          await loginWithCode(...loginWithCodeArgs);
        },
      };
    },
    logout,
    isReady: ready,
    getAccessToken,
    authenticated,
    user: authenticated
      ? {
          id: user?.id || '',
          email: user?.email?.address || '',
        }
      : undefined,
  };
}

function Login() {
  const { user, isReady } = usePrivyUniversalV2();
  console.log('result---', user, isReady);
  return null;
}

function Hello() {
  const appId = 'cm5599w1609v7kfpecfmser60';
  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: [
          'email',
          // 'apple', 'google', 'facebook', 'github'
        ],
        intl: {
          defaultCountry: 'CN',
        },
      }}
    >
      <div>
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <h1>electron-react-boilerplate</h1>
        <div className="Hello">
          <a
            href="https://electron-react-boilerplate.js.org/"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="books">
                📚
              </span>
              Read our docs
            </button>
          </a>
          <a
            href="https://github.com/sponsors/electron-react-boilerplate"
            target="_blank"
            rel="noreferrer"
          >
            <button type="button">
              <span role="img" aria-label="folded hands">
                🙏
              </span>
              Donate
            </button>
          </a>
        </div>
      </div>
      <Login />
    </PrivyProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
