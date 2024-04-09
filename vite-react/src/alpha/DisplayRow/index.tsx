import InternalDisplayRow from '@/alpha/DisplayRow/DisplayRow';
import { ContextProvider } from '@/alpha/DisplayRow/context';

type InternalDisplayRowType = typeof InternalDisplayRow;

type CompoundedComponent = InternalDisplayRowType & {
  Provider: typeof ContextProvider;
};

const DisplayRow = InternalDisplayRow as CompoundedComponent;

DisplayRow.Provider = ContextProvider;

export default DisplayRow;
