import InternalDisplayRow from './DisplayRow';
import { ContextProvider } from './context';

type InternalDisplayRowType = typeof InternalDisplayRow;

type CompoundedComponent = InternalDisplayRowType & {
  Provider: typeof ContextProvider;
};

const DisplayRow = InternalDisplayRow as CompoundedComponent;

DisplayRow.Provider = ContextProvider;

export default DisplayRow;
