import ringer from '../assets/flipdish-ringer.mp3';

export const AudioPlay = () => {
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
};
