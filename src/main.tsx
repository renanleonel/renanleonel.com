import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/app';
import { whenStylesheetsReady } from '@/shared/adapters/stylesheets-ready';
import '@/styles.css';

void whenStylesheetsReady().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
      <Analytics />
      <SpeedInsights />
    </StrictMode>,
  );
});
