import GeneralContainer from '@/alpha/layout/GeneralContainer';
import MonacoEditorResize from '@/scene/MonacoEditor.Resize';

export default function () {
  return (
    <GeneralContainer style={{ height: '100%' }}>
      <MonacoEditorResize />
    </GeneralContainer>
  );
}
