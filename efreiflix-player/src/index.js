import React from 'react';
import { createRoot } from 'react-dom/client';
import Player from './Player';

const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Container #root not found');
    return;
  }
  const root = createRoot(container);
  root.render(<Player />);
};

mount();

export { mount }; 