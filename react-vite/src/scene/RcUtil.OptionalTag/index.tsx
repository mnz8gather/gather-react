import InternalTag from './Tag';
import Group from './Group';

type OptionalTagType = typeof InternalTag;

type CompoundedComponent = OptionalTagType & { Group: typeof Group };

const OptionalTag = InternalTag as CompoundedComponent;
OptionalTag.Group = Group;

export { OptionalTag };
