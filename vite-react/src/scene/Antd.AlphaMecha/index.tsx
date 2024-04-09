import InternalAlpha from './Alpha';
import AlphaModal from './Modal';
import AlphaMecha from './Mecha';
import AlphaButton from './Button';

type InternalAlphaType = typeof InternalAlpha;

type CompoundedComponent = InternalAlphaType & { Modal: typeof AlphaModal; Mecha: typeof AlphaMecha; Button: typeof AlphaButton };

const Alpha = InternalAlpha as CompoundedComponent;
Alpha.Modal = AlphaModal;
Alpha.Mecha = AlphaMecha;
Alpha.Button = AlphaButton;

export default Alpha;
