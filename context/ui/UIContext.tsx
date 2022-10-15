import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;
    setIsAddingEntry: (value: boolean) => void;

    startDragging: () => void;
    endDragging: () => void;
}


export const UIContext = createContext({} as ContextProps );

