import React from 'react';
import { BrowserRouter } from 'react-router';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';

const themeConfig = {
  token: {
    colorPrimary: '#4338CA',
    colorSuccess: '#16A34A',
    colorWarning: '#D97706',
    colorError: '#DC2626',
    colorInfo: '#4338CA',
    colorBgBase: '#FFFFFF',
    colorBgLayout: '#F8FAFC',
    colorTextBase: '#0F172A',
    colorTextSecondary: '#64748B',
    borderRadius: 10,
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  components: {
    Button: {
      controlHeight: 38,
      borderRadius: 10,
    },
    Card: {
      borderRadiusLG: 14,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 10,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 10,
    },
    Table: {
      borderRadius: 12,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
