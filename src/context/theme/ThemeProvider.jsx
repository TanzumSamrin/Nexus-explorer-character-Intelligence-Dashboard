import {
  useEffect,
  useRef,
  useState,
} from "react";

import ThemeContext from "./ThemeContext";

const THEME_STORAGE_KEY = "nexus-theme";

function getInitialTheme() {
  const savedTheme =
    localStorage.getItem(THEME_STORAGE_KEY);

  if (
    savedTheme === "light" ||
    savedTheme === "dark"
  ) {
    return savedTheme;
  }

  return "light";
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    getInitialTheme
  );

  // [REQ-1] useRef touches the DOM by updating
  // the data-theme attribute on the <html> element.
  const documentElementRef = useRef(
    document.documentElement
  );

  useEffect(() => {
    const root = documentElementRef.current;

    // [REQ-1] setAttribute is used to switch
    // the <html> element's data-theme attribute.
    root.setAttribute("data-theme", theme);

    localStorage.setItem(
      THEME_STORAGE_KEY,
      theme
    );
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light"
        ? "dark"
        : "light"
    );
  }

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;