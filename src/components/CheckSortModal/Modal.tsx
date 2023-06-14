import { useMemo } from 'react';
import { Modal } from 'antd';
import { useSafeState } from 'ahooks';
import Checkbox from './Check';
import Sort from './Sort';
import { groupsConvertItems } from './utils';
import type { ModalProps } from 'antd';
import type { CheckSortModalProps, ItemsMap, Group } from './types';
import styles from './Modal.module.less';

const CheckSortModal = (props: ModalProps & CheckSortModalProps) => {
  const { allGroups, setOpen, defaultGroups } = props;
  const [currentItems, setCurrentItems] = useSafeState<Group['member']>(groupsConvertItems(defaultGroups) || []);

  const allItemsMap = useMemo(() => {
    const allItemsMapTmp: ItemsMap = {};
    if (allGroups) {
      allGroups
        .flatMap((ele) => ele.member)
        .forEach((ele) => {
          allItemsMapTmp[ele.value] = ele;
        });
    }
    return allItemsMapTmp;
  }, [allGroups]);

  return (
    <Modal
      title="自定义列"
      okText="保存"
      bodyStyle={{ display: 'flex', padding: 0 }}
      className="custom-sort-modal"
      onCancel={() => {
        setOpen(false);
      }}
      {...props}
    >
      <div className={styles['modal-left']}>
        <Checkbox current={currentItems} setCurrent={setCurrentItems} allGroups={allGroups} allItemsMap={allItemsMap} />
      </div>
      <div className={styles['modal-right']}>
        <Sort items={currentItems} setCurrent={setCurrentItems} />
      </div>
    </Modal>
  );
};

export default CheckSortModal;
