// App.tsx
import { ThemeProvider } from '@mui/material';
import { theme } from './config/theme';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './config/routes';
import { AuthProvider } from './config/contextLogin'; // Modifique aqui
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthProvider> {/* Modifique aqui */}
            <AppRouter />
          </AuthProvider> {/* Modifique aqui */}
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
