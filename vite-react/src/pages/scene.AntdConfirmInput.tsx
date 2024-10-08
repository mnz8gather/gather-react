import { message } from 'antd';
import { ConfirmInput } from '@/scene/Antd.ConfirmInput';
import { GeneralContainer } from '@/alpha/layout/GeneralContainer';

export default () => {
  return (
    <GeneralContainer>
      <div style={{ width: 200, height: 200, backgroundColor: 'floralwhite' }}>
        支持大小写字母和数字，长度不能超过100
        <ConfirmInput
          confirmProps={{
            title: 'sure',
            content: (v) => v,
            onOk(v, focus) {
              // 这里做操作
              if (v) {
                // 操作成功 reload 页面
                message.success('设置成功');
              } else {
                // 聚焦
                focus?.({
                  cursor: 'end',
                });
              }
            },
          }}
          validator={(v) => {
            if (v === undefined) {
              return true;
            }
            return /^[A-Za-z0-9]{0,100}$/.test(v);
          }}
          errorMessage='支持大小写字母和数字，长度不能超过100'
        />
      </div>
    </GeneralContainer>
  );
};
