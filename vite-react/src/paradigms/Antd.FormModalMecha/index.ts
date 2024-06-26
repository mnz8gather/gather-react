import { ForwardCkForm } from './form';
import { CkModal } from './modal';
import { Mecha } from './mecha';

type ForwardCkFormType = typeof ForwardCkForm;
type CompoundedComponent = ForwardCkFormType & { Modal: typeof CkModal; Mecha: typeof Mecha };

const Content4Form = ForwardCkForm as CompoundedComponent;
Content4Form.Modal = CkModal;
Content4Form.Mecha = Mecha;

export { Content4Form };
