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

// 这个是包含 undefined 的
type TaStyles = Ta['styles'];

// 很多时候是需要处理掉 undefined 的
type S1 = Required<Ta>['styles'];
// 这个语义更明确
type S2 = Exclude<Ta['styles'], undefined>;
// 使用 NonNullable
type S3 = NonNullable<Ta['styles']>;

// 补充下，之前出现过的情况 Antd.FormModalMecha Antd.ActualMecha
// 包含 undefined 导致在使用 Omit 时，导致出现问题
// 这种时候类型是 type O1 = {}
type O1 = Omit<TaStyles, 'header' | 'body'>;
// 正确的
type O2 = Omit<NonNullable<TaStyles>, 'header' | 'body'>;
