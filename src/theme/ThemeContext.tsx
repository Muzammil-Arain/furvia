// src/context/ThemeContext.js
import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Darktheme } from './DarkTheme';
import { DarkTheme, LightTheme } from './CommonTheme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(LightTheme);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        setTheme(savedTheme === 'dark' ? Darktheme : LightTheme);
      } else {
        // Auto-detect system preference if not saved
        const colorScheme = Appearance.getColorScheme();
        setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
      }
    };

    loadTheme();

    // Listen for system theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? DarkTheme : LightTheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme.mode === 'light' ? DarkTheme : LightTheme;
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
