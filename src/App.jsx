/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Header from "./Header.jsx";
import Api from "./Api.jsx";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
      if (darkMode) {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
      } else {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark-mode');
      }
  }, [darkMode]);

  return (
    <main>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Api />
    </main>
  );
}
