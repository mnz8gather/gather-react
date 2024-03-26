import RenderProp from '@/components/pure.RenderProp';
import GeneralContainer from '@/components/layout.GeneralContainer';

export default function Text() {
  return (
    <GeneralContainer>
      <div style={{ width: '50px', height: '50px', border: '1px solid #000000' }}>
        <RenderProp
          renderProp={(onClick) => {
            return <span onClick={onClick}>123</span>;
          }}
        />
      </div>
    </GeneralContainer>
  );
}
