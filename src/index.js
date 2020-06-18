import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ErrorBoundary} from 'react-error-boundary';
import ErrorBoundaryFallback from './utils/ErrorBoundaryFallback';
import './Fonts/Abel-Regular.ttf';
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from './utils/MaterialCustomTheme';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
