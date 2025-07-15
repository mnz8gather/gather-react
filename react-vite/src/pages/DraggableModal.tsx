import { GeneralContainer } from '@/shared/GeneralContainer';
import styles from '../style/alpha.DraggableModal.module.scss';

function DraggableModal() {
  return <>从长计议</>;
}

export function DraggableModalPage() {
  return (
    <GeneralContainer title='拖拽对话框'>
      <DraggableModal />
    </GeneralContainer>
  );
}
