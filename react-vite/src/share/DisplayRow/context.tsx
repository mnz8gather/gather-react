import { createContext } from 'react';
import type { DisplayRowProps } from '@/share/DisplayRow/interface';

export const Context = createContext<Omit<DisplayRowProps, 'label' | 'children'>>({});

export const ContextProvider = Context.Provider;
