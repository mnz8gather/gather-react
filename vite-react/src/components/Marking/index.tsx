import MarkContent from './Content';
import MarkingButton from './MarkingButton';
import MarkingPreview from './Preview';

const Mark = MarkContent as typeof MarkContent & { Button: typeof MarkingButton; Preview: typeof MarkingPreview };
Mark.Button = MarkingButton;
Mark.Preview = MarkingPreview;

export default Mark;
