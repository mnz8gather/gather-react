import { ForwardActual } from './actual';
import { Window } from './window';
import { Mecha } from './mecha';
import { ActualButton } from './button';

type ForwardActualType = typeof ForwardActual;

type CompoundedComponent = ForwardActualType & { Window: typeof Window; Mecha: typeof Mecha; Button: typeof ActualButton };

const Actual = ForwardActual as CompoundedComponent;
Actual.Window = Window;
Actual.Mecha = Mecha;
Actual.Button = ActualButton;

export { Actual };
