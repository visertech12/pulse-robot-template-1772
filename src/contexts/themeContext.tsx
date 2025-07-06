
import {useState, createContext, useContext, useEffect, ReactNode} from 'react';

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
    fontScale: number;
    setFontScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const persisted = localStorage.getItem('ui') ? JSON.parse(localStorage.getItem('ui')!) : null;
    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const [theme, setTheme] = useState(persisted !== null ? persisted.theme : (browserTheme.matches ? 'dark' : 'light'));
    const [fontScale, setFontScale] = useState(persisted !== null ? persisted.scale : 1);

    const page = document.documentElement;

    useEffect(() => {
        localStorage.setItem('ui', JSON.stringify({theme: theme, scale: fontScale}));
        page.style.setProperty('--font-scale', fontScale.toString());
        page.classList.add('no-transition');
        setTimeout(() => document.documentElement.classList.remove('no-transition'), 100);
    }, [theme, fontScale]);

    return (
        <ThemeContext.Provider value={{theme, setTheme, fontScale, setFontScale}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeProvider = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeProvider must be used within a ThemeProvider');
    }
    return context;
};
