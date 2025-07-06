
import {useState, createContext, useContext, useEffect, ReactNode} from 'react';
import {useLocation} from 'react-router-dom';

interface SidebarContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider = ({children}: SidebarProviderProps) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // close sidebar when route changes
    useEffect(() => {
        setOpen(false);
    }, [location]);

    return (
        <SidebarContext.Provider value={{open, setOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
