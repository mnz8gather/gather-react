import { useState } from "react";
import { Button, Table } from "antd";
import CustomColumnModal from "@/components/CustomColumnModal";
import { allColumns } from "@/../mock/custom-setting";

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        自定义列
      </Button>
      <CustomColumnModal
        allLabelColumns={allColumns}
        customKey="demo-key"
        destroyOnClose
        width={1000}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};
