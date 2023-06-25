import { createContext } from 'react';
import { DisplayRowProps } from './interface';

export const Context = createContext<Omit<DisplayRowProps, 'label' | 'children'>>({});

export const ContextProvider = Context.Provider;
