import { useState, createContext, useContext, PropsWithChildren, useLayoutEffect } from 'react';

const initialTheme = () => localStorage.getItem("APP_THEME");

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => {},
});




export const ThemeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [theme, setTheme] = useState(initialTheme() ?? 'light');

  useLayoutEffect(()=>{
    localStorage.setItem("APP_THEME", theme);
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#111111';
    } else {
      document.body.style.backgroundColor = 'white';
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
