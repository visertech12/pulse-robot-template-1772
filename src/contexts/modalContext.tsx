
import {useState, createContext, useContext, ReactNode} from 'react';

interface ModalContextType {
    modal: string | null;
    open: boolean;
    handleOpen: (id: string) => void;
    handleClose: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export const ModalProvider = ({children}: ModalProviderProps) => {
    const [modal, setModal] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (id: string) => {
        setModal(id);
        setOpen(true);
    }

    const handleClose = () => {
        setModal(null);
        setOpen(false);
    }

    return (
        <ModalContext.Provider value={{modal, open, handleOpen, handleClose}}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
