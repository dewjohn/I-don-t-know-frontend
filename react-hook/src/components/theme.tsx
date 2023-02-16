import React, { createContext, useCallback, useContext, useState } from 'react';

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

const ThemeContext = createContext(themes.light);

type mode = 'light' | 'dark';

export default function Theme() {
  const [theme, setTheme] = useState<mode>('light');

  const toggle = useCallback(() => {
    setTheme((preTheme) => (preTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <>
      <button onClick={toggle}>change</button>
      <ThemeContext.Provider value={themes[theme]}>
        <Toolbar />
      </ThemeContext.Provider>
    </>
  );
}

function Toolbar(props: any) {
  return <ThemeButton />;
}

function ThemeButton() {
  const theme = useContext(ThemeContext);
  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      hello world
    </button>
  );
}
