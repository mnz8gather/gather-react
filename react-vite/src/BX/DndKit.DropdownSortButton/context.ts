import { createContext } from 'react';
import type { DropdownSortButtonProps, SortConditionsProps } from './interface';

export const SortFieldsContext = createContext<DropdownSortButtonProps['sortFields'] | null>(null);

export const SortFieldsContextProvider = SortFieldsContext.Provider;

export const ConditionsContext = createContext<SortConditionsProps | null>(null);

export const ConditionsContextProvider = ConditionsContext.Provider;
