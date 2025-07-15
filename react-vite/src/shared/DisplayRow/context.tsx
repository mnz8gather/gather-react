import { createContext } from 'react';
import type { DisplayRowProps } from '@/shared/DisplayRow/interface';

export const Context = createContext<Omit<DisplayRowProps, 'label' | 'children'>>({});

export const ContextProvider = Context.Provider;
