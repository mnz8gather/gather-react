import React from 'react';
import { Checkbox } from 'antd';
import ChildWrapper from '@/alpha/ChildWrapper';
import GeneralContainer from '@/layouts/GeneralContainer';

export default function Text() {
  return (
    <GeneralContainer>
      <div style={{ width: '50px', height: '50px', border: '1px solid #000000' }}>
        <ChildWrapper>
          <E />
        </ChildWrapper>
      </div>
      <div style={{ width: '50px', height: '50px', border: '1px solid #000000' }}>
        <ChildWrapper>
          <React.Fragment>ono</React.Fragment>
        </ChildWrapper>
      </div>
      <div style={{ width: '50px', height: '50px', border: '1px solid #000000' }}>
        <ChildWrapper>
          <>123</>
        </ChildWrapper>
      </div>
      <div style={{ width: '50px', height: '50px', border: '1px solid #000000' }}>
        <ChildWrapper>
          <span>123</span>
        </ChildWrapper>
      </div>
    </GeneralContainer>
  );
}

function E(props?: React.HTMLProps<HTMLDivElement>) {
  console.log(props);
  return 'x';
}
