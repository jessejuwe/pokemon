import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Fonts from './fonts/Fonts';
import { Providers } from './providers';
import { ScrollToTop } from './exports/exports';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Providers>
    <BrowserRouter>
      <ScrollToTop />
      <Fonts />
      <App />
    </BrowserRouter>
  </Providers>
);
