import { useState } from 'react';
import { Button } from 'antd';
import { GeneralContainer } from '@/shared/GeneralContainer';
import { Content } from '@/FK/Antd.ContentKit';

export default function () {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <GeneralContainer>
      <Content.Button modalProps={{ title: 'Content.Button' }}>按钮</Content.Button>
      <Content.Mecha
        render={(click) => (
          <div style={{ padding: 20, border: '1px solid darkseagreen', color: 'darkseagreen' }} onClick={click}>
            Mecha
          </div>
        )}
        modalProps={{ title: 'Content.Mecha' }}
      />
      <Content.Dialog
        modalProps={{
          title: 'Content.Dialog',
          open: dialogOpen,
          onCancel: () => {
            setDialogOpen((p) => !p);
          },
          onOk: () => {
            setDialogOpen((p) => !p);
          },
        }}
      />
      <Button
        onClick={() => {
          setDialogOpen((p) => !p);
        }}
      >
        Dialog Button
      </Button>
    </GeneralContainer>
  );
}
