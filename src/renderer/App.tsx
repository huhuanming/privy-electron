import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import icon from '../../assets/icon.svg';

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
