import InternalDisplayRow from '@/share/DisplayRow/DisplayRow';
import { ContextProvider } from '@/share/DisplayRow/context';

type InternalDisplayRowType = typeof InternalDisplayRow;

type CompoundedComponent = InternalDisplayRowType & {
  Provider: typeof ContextProvider;
};

const DisplayRow = InternalDisplayRow as CompoundedComponent;

DisplayRow.Provider = ContextProvider;

export { DisplayRow };
