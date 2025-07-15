import { GeneralContainer } from '@/shared/GeneralContainer';
import { MonacoEditorResize } from '@/FK/MonacoEditor.Resize';

export default function () {
  return (
    <GeneralContainer style={{ height: '100%' }}>
      <MonacoEditorResize />
    </GeneralContainer>
  );
}
