import { GeneralContainer } from '@/shared/GeneralContainer';
import styles from '../style/alpha.BorderExtended.module.scss';

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
    <GeneralContainer title='画边线'>
      <BorderExtended />
    </GeneralContainer>
  );
}
