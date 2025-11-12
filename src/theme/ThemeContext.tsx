import React, { createContext, useEffect, useState, useMemo, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LightTheme } from '../theme/LightTheme';
import { Darktheme } from '../theme/DarkTheme';

export type ThemeType = typeof LightTheme | typeof Darktheme;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => Promise<void>;
  isDarkMode: boolean;
  isThemeLoaded: boolean;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: LightTheme,
  toggleTheme: async () => {},
  isDarkMode: false,
  isThemeLoaded: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<ThemeType>(LightTheme);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // Load theme from storage or system
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        let isDark = false;

        if (storedTheme === 'dark') {
          isDark = true;
        } else if (storedTheme === 'light') {
          isDark = false;
        } else {
          // If nothing stored, follow system theme
          const colorScheme = Appearance.getColorScheme();
          isDark = colorScheme === 'dark';
        }

        setIsDarkMode(isDark);
        setTheme(isDark ? Darktheme : LightTheme);
      } catch (error) {
        console.log('Error loading theme:', error);
        setTheme(LightTheme);
      } finally {
        setIsThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // Optional: react to system changes
  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setIsDarkMode(colorScheme === 'dark');
      setTheme(colorScheme === 'dark' ? Darktheme : LightTheme);
    });
    return () => listener.remove();
  }, []);

  const toggleTheme = async () => {
    const newIsDark = !isDarkMode;
    setIsDarkMode(newIsDark);
    setTheme(newIsDark ? Darktheme : LightTheme);
    await AsyncStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const value = useMemo(
    () => ({ theme, toggleTheme, isDarkMode, isThemeLoaded }),
    [theme, isDarkMode, isThemeLoaded],
  );

  return (
    <ThemeContext.Provider value={value}>{isThemeLoaded ? children : null}</ThemeContext.Provider>
  );
};
