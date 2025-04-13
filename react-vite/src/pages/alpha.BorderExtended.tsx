import { GeneralContainer } from '@/share/GeneralContainer';
import styles from './alpha.BorderExtended.module.scss';

function BorderExtended() {
  return (
    <>
      <div className={styles['border-extended-leftRight']}>Content Here. 2px</div>
      <br />
      <div className={styles['border-extended-topBottom']}>Your content here. 1px, width 为 1px 存在 before 的伪类元素显示为 2px</div>
    </>
  );
}

export function BorderExtendedPage() {
  return (
    <GeneralContainer style={{ height: '100%' }}>
      <BorderExtended />
    </GeneralContainer>
  );
}
