import { GeneralContainer } from '@/share/GeneralContainer';
import { MonacoEditorResize } from '@/scene/MonacoEditor.Resize';

export default function () {
  return (
    <GeneralContainer style={{ height: '100%' }}>
      <MonacoEditorResize />
    </GeneralContainer>
  );
}
