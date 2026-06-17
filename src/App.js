import React, { useState } from 'react';
import './App.css';
import Configurator from './components/Configurator';
import FAQ from './components/FAQ';
import Contacts from './components/Contacts';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>3D печать бетоном</h1>
        <p className="subtitle">Малых архитектурных форм</p>
        <p className="description">
          Моделируем, печатаем, доставляем
        </p>
      </header>

      <main>
        <Configurator />
        <FAQ />
        <Contacts />
      </main>

      <footer className="app-footer">
        <p>© 2026 3D печать МАФ. Все права защищены.</p>
      </footer>
    </div>
  );
}

export default App;