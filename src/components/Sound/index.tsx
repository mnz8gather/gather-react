import ringer from './flipdish-ringer.mp3';

const Sound = () => {
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

export default Sound;
