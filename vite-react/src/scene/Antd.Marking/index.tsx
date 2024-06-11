import MarkNormal from './Normal';
import MarkingButton from './MarkingButton';
import MarkingSearch from './Search';
import MarkingPreview from './Preview';

type MarkNormalType = typeof MarkNormal;

type CompoundedComponent = MarkNormalType & { Button: typeof MarkingButton; Search: typeof MarkingSearch; Preview: typeof MarkingPreview };

const Mark = MarkNormal as CompoundedComponent;
Mark.Button = MarkingButton;
Mark.Search = MarkingSearch;
Mark.Preview = MarkingPreview;

export { Mark };
