import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductDetails from './ProductDetails';
import './styles.css';

// Fonction de montage pour l'initialisation du MFE
const mount = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error('Container #root not found');
    return;
  }
  const root = createRoot(container);
  root.render(<ProductDetails />);
};

// Monter l'application en mode standalone
mount();

// Exporter la fonction de montage pour le shell
export { mount }; 