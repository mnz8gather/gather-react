import { useEffect, useMemo, useCallback } from 'react';
import { Modal } from 'antd';
import { useRequest, useSafeState } from 'ahooks';
import CheckboxColumns from './CheckboxColumns';
import SortableColumns from './SortableColumns';
import { getCustom, setCustom } from '@/services/custom-setting';
import type { ModalProps } from 'antd';
import type { CustomProps, ColumnsMap, CustomGroupColumns } from './types';
import styles from './CustomColumnModal.less';

const CustomColumnModal = (props: ModalProps & CustomProps) => {
  const { allLabelColumns, customKey, setOpen, open } = props;
  const [customColumn, setCustomColumn] = useSafeState<CustomGroupColumns['member']>([]);
  const { data, refresh: getColumns } = useRequest(getCustom, {
    defaultParams: [customKey],
  });

  const allColumnsMap = useMemo(() => {
    const allColumnsMapTmp: ColumnsMap = {};
    if (allLabelColumns) {
      allLabelColumns
        .flatMap((ele) => ele.member)
        .forEach((ele) => {
          allColumnsMapTmp[ele.value] = ele;
        });
    }
    return allColumnsMapTmp;
  }, [allLabelColumns]);

  useEffect(() => {
    setCustomColumn(data!.map((ele: string) => allColumnsMap[ele]));
  }, [allColumnsMap, data, setCustomColumn]);

  const { loading: confirmLoading, run: updateColumns } = useRequest(setCustom, {
    manual: true,
    onFinally: () => {
      setOpen(false);
    },
  });

  const saveCustom = useCallback(() => {
    updateColumns(
      customKey,
      customColumn.map((cele) => cele.value),
    );
  }, [customColumn, customKey, updateColumns]);

  useEffect(() => {
    if (open) {
      getColumns();
    }
  }, [getColumns, open]);

  return (
    <Modal
      title="自定义列"
      okText="保存"
      bodyStyle={{ display: 'flex', padding: 0 }}
      className="custom-column-modal"
      onCancel={() => {
        setOpen(false);
      }}
      onOk={saveCustom}
      confirmLoading={confirmLoading}
      {...props}
    >
      <div className={styles['modal-left']}>
        <CheckboxColumns columns={allLabelColumns} current={customColumn} setCurrent={setCustomColumn} allColumnsMap={allColumnsMap} />
      </div>
      <div className={styles['modal-right']}>
        <SortableColumns columns={customColumn} setCurrent={setCustomColumn} />
      </div>
    </Modal>
  );
};

export default CustomColumnModal;
