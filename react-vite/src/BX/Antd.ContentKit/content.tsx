import { Table } from 'antd';

export interface ContentProps {}

/**
 * Content 是主体
 * 提供 Modal Mecha Button
 */
export function Content(props: ContentProps) {
  return <Table />;
}

// 如果要获取数据怎么处理
// 具体场景：一个 table 列表，有操作按钮，查看某一详细内容，内容由接口获取。
// 1. openWindow 传递到 Content
