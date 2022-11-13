import { useMemo } from 'react';
import { Modal } from 'antd';
import { useSafeState } from 'ahooks';
import ItemCheckbox from './ItemCheckbox';
import ItemSorting from './ItemSorting';
import { groupsConvertItems } from './utils';
import type { ModalProps } from 'antd';
import type { SortModalProps, ItemsMap, Group } from './types';
import styles from './SortModal.less';

const SortModal = (props: ModalProps & SortModalProps) => {
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
        <ItemCheckbox current={currentItems} setCurrent={setCurrentItems} allGroups={allGroups} allItemsMap={allItemsMap} />
      </div>
      <div className={styles['modal-right']}>
        <ItemSorting items={currentItems} setCurrent={setCurrentItems} />
      </div>
    </Modal>
  );
};

export default SortModal;
