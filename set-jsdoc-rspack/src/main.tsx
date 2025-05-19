import React from 'react';
import ReactDOM from 'react-dom/client';
import { FunctionComponent as FCJsx, SplitWay } from './jsx/proving_ground_jsx';
import { FunctionComponent as FCTsx } from './jsx/proving_ground_tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>JSDoc</>
    <>
      <FCTsx bool={true} num={1} str="seagreen" style={{ color: 'seagreen' }}>
        FCTsx
      </FCTsx>
      <FCJsx bool={true} num={2} str="limegreen" style={{ color: 'limegreen' }}>
        FCJsx
      </FCJsx>
      <SplitWay bool str="lightseagreen" style={{ color: 'lightseagreen' }}>
        FCJsx Split
      </SplitWay>
    </>
  </React.StrictMode>
);
