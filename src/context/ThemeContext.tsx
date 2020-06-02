import React, { useState, createContext } from 'react';

export enum themes {
  light = 'light',
  dark = 'dark'
}

interface ThemeContextInterface {
  theme: themes;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: themes.dark,
  toggleTheme: () => {}
});

export default ThemeContext;
