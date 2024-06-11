import InternalActual from './Actual';
import ActualWindow from './Window';
import ActualMecha from './Mecha';
import ActualButton from './Button';

type InternalActualType = typeof InternalActual;

type CompoundedComponent = InternalActualType & { Window: typeof ActualWindow; Mecha: typeof ActualMecha; Button: typeof ActualButton };

const Actual = InternalActual as CompoundedComponent;
Actual.Window = ActualWindow;
Actual.Mecha = ActualMecha;
Actual.Button = ActualButton;

export { Actual };
