import React from 'react';
import ReactDOM from 'react-dom/client';
import { FunctionComponent, FunctionComponentAnotherWay } from './jsx/write_in_jsx';
import { FunctionComponent as FCTsx } from './jsx/write_in_tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>JSDoc</>
    <>
      <FCTsx fcB={true} fcN={1} fcS="seagreen" style={{ color: 'seagreen' }}>
        FCTsx
      </FCTsx>
      <FunctionComponent fcB={true} fcN={2} fcS="limegreen" style={{ color: 'limegreen' }}>
        FCJsx
      </FunctionComponent>
      <FunctionComponentAnotherWay fcB fcS="lightseagreen" style={{ color: 'lightseagreen' }}>
        FCJsxAW
      </FunctionComponentAnotherWay>
    </>
  </React.StrictMode>
);
