import ringer from '../assets/flipdish-ringer.mp3';
import { GeneralContainer } from '@/share/GeneralContainer';

function AudioPlay() {
  const audio = new Audio(ringer);
  audio.loop = true;

  return (
    <div>
      <button
        onClick={() => {
          audio.loop = true;
          audio.play();
        }}
      >
        Play
      </button>
      <br />
      <br />
      <br />
      <button onClick={() => (audio.loop = false)}>Pause</button>
    </div>
  );
}

export function AudioPlayPage() {
  return (
    <GeneralContainer>
      <AudioPlay />
    </GeneralContainer>
  );
}
