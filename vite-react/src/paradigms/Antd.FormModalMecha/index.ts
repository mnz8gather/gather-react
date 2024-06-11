import InternalForm from './form';
import InternalModal from './modal';
import Mecha from './mecha';

type InternalFormType = typeof InternalForm;
type CompoundedComponent = InternalFormType & { Modal: typeof InternalModal; Mecha: typeof Mecha };

const FormModalMecha = InternalForm as CompoundedComponent;
FormModalMecha.Modal = InternalModal;
FormModalMecha.Mecha = Mecha;

export { FormModalMecha };
