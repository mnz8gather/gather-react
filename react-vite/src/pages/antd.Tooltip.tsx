import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Flex, Space, Table, Tag, Tooltip } from 'antd';
import { FolderOutlined, TrophyOutlined } from '@ant-design/icons';
import { GeneralTab } from '@/shared/GeneralTab';
import type { TableColumnsType, TooltipProps } from 'antd';
import '@/style/AutoEllipsis.scss';

const items = [
  {
    key: 'auto-ellipsis',
    label: '自动省略',
  },
  {
    key: 'click-hidden',
    label: '点击隐藏',
  },
];

export function AntdTooltipPage() {
  const [current, setCurrent] = useState('auto-ellipsis');
  return (
    <GeneralTab title='antd Tooltip' items={items} value={current} onChange={setCurrent}>
      {current === 'auto-ellipsis' ? <AutoEllipsisSample /> : null}
      {current === 'click-hidden' ? <ClickHiddenSample /> : null}
    </GeneralTab>
  );
}

/**
 * fork: ant-design
 *
 * ant-design: components\typography\Base\util.ts
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 */
function isEleEllipsis(ele: HTMLElement): boolean {
  // Create a new div to get the size
  const childDiv = document.createElement('em');
  ele.appendChild(childDiv);

  const rect = ele.getBoundingClientRect();
  const childRect = childDiv.getBoundingClientRect();

  // Reset
  ele.removeChild(childDiv);

  // Range checker
  return (
    // Horizontal out of range
    rect.left > childRect.left ||
    childRect.right > rect.right ||
    // Vertical out of range
    rect.top > childRect.top ||
    childRect.bottom > rect.bottom
  );
}

const prefixCls = 'auto-ellipsis';

interface AutoEllipsisProps {
  children?: React.ReactNode;
}

function AutoEllipsis(props: AutoEllipsisProps) {
  const { children } = props;
  const typographyRef = useRef<HTMLElement>(null);
  const [isNativeEllipsis, setIsNativeEllipsis] = useState(false);
  useEffect(() => {
    const textEle = typographyRef.current;
    if (textEle) {
      const currentEllipsis = isEleEllipsis(textEle);
      if (isNativeEllipsis !== currentEllipsis) {
        setIsNativeEllipsis(currentEllipsis);
      }
    }
  }, [children]);
  return (
    <Tooltip title={isNativeEllipsis ? children : undefined}>
      <span
        className={clsx({
          [`${prefixCls}-ellipsis`]: true,
          [`${prefixCls}-ellipsis-single-line`]: true,
        })}
        ref={typographyRef}
      >
        {children}
      </span>
    </Tooltip>
  );
}

function AutoEllipsisSample() {
  const columns: TableColumnsType = [
    {
      title: '列1',
      dataIndex: 'c1',
      render(v) {
        return (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '8px' }}>
            <span style={{ minWidth: 0 }}>
              <AutoEllipsis>{v}</AutoEllipsis>
            </span>
            <TrophyOutlined />
          </div>
        );
      },
    },
    {
      title: '标签',
      dataIndex: 'tag',
      render(v) {
        return (
          <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap', gap: '2px' }}>
            {v?.map((tag: any) => (
              <Tag
                key={tag?.id}
                color={tag?.color}
                style={{ cursor: 'pointer', marginRight: 0, display: 'flex', alignItems: 'center', maxWidth: '100%' }}
                closable
              >
                <div style={{ minWidth: 0 }}>
                  <AutoEllipsis>{tag?.name}</AutoEllipsis>
                </div>
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: '列2',
      dataIndex: 'c2',
      width: 500,
    },
  ];
  const dataSource: any[] = [
    {
      c1: 'CCCCCCCCCCCCCCCCCC',
      tag: [
        { id: '1', name: 'AAAAAAAAAAAAAAAAAA', color: '#2db7f5' },
        { id: '2', name: 'BBBBBBBBBBBBBBBBBB', color: '#87d068' },
      ],
    },
  ];
  return (
    <>
      <Flex vertical gap='middle'>
        <div style={{ width: '200px' }}>
          <AutoEllipsis>
            AAAAAAAAAA<span>1111111111</span>AAAAAAAAAA
          </AutoEllipsis>
        </div>
        <div style={{ width: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', minWidth: 0, gap: '8px' }}>
            <div style={{ flexShrink: 0 }}>
              <Space>
                <FolderOutlined />
                来自
              </Space>
            </div>
            <div style={{ minWidth: 0 }}>
              <AutoEllipsis>XXXXXXXXXXXXXXXXXXXXXXXXX</AutoEllipsis>
            </div>
            <div style={{ flexShrink: 0 }}>目录</div>
          </div>
        </div>
        <Table
          rowKey='c1'
          columns={columns}
          dataSource={dataSource}
          // tableLayout: 固定表头/列或使用了 column.ellipsis 时，默认值为 fixed
          // tableLayout: 使用 scroll 时，默认值为 fixed
          tableLayout='fixed'
          style={{ width: 800 }}
          pagination={false}
        />
      </Flex>
    </>
  );
}

type TooltipPropsWithTitle = Extract<TooltipProps, { title: any }>;
type TooltipPropsWithOverlay = Extract<TooltipProps, { overlay: any }>;
type ClickHiddenPropsWithTitle = Omit<TooltipPropsWithTitle, 'visible' | 'onVisibleChange'>;
type ClickHiddenPropsWithOverlay = Omit<TooltipPropsWithOverlay, 'visible' | 'onVisibleChange'>;
type ClickHiddenProps = ClickHiddenPropsWithTitle | ClickHiddenPropsWithOverlay;

function ClickHidden(props: ClickHiddenProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newVisible: boolean) => {
    setOpen(newVisible);
  };
  const handleClick = () => {
    setOpen(false);
  };
  return (
    <Tooltip {...props} open={open} onOpenChange={handleOpenChange}>
      <span onClick={handleClick}>{children}</span>
    </Tooltip>
  );
}

function ClickHiddenSample() {
  return (
    <>
      <ClickHidden title='点击隐藏'>点击</ClickHidden>
    </>
  );
}
