interface Ta {
  styles?: {
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    extra?: React.CSSProperties;
    title?: React.CSSProperties;
    actions?: React.CSSProperties;
    cover?: React.CSSProperties;
  };
}

type a = Ta['styles'];
type b = Required<Ta>['styles'];
// 这个语义更明确
type c = Exclude<Ta['styles'], undefined>;
