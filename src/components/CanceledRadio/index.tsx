import InternalRadio from './CanceledRadio';
import Group from './Group';

const CanceledRadio = InternalRadio as typeof InternalRadio & { Group: typeof Group };
CanceledRadio.Group = Group;

export default CanceledRadio;
