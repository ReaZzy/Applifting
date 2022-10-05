import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@src/App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App.tsx', async () => {
    root.render(<App />);
  });
}
