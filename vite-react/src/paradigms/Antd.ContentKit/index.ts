import { Content as ContentKit } from './content';
import { CkDialog } from './dialog';
import { Mecha } from './mecha';
import { CkButton } from './button';

type ContentType = typeof ContentKit;
type CompoundedComponent = ContentType & { Dialog: typeof CkDialog; Mecha: typeof Mecha; Button: typeof CkButton };

const Content = ContentKit as CompoundedComponent;
Content.Dialog = CkDialog;
Content.Mecha = Mecha;
Content.Button = CkButton;

export { Content };
