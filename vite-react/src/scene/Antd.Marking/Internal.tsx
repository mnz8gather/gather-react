import React from 'react';
import { Checkbox, Row, Col, Form, Tooltip, Tag } from 'antd';
import Icon from '@ant-design/icons';
import CanceledRadio from '@/scene/Antd.CanceledRadio';
import CreateMarkButton from './CreateButton';
import DeleteMarkButton from './DeleteButton';
import InfoSvg from './svg-info';
import { convert_to_array, convert_to_object, marks_members_convert_options } from './tool';
import type { FormProps, RowProps, ColProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CreateModalProps } from './CreateButton';
import type { DeleteModalProps } from './DeleteButton';
import { MarkMode, Marks, MarkOptionType } from './interface';
import styles from './Internal.module.less';

export interface InternalMarkProps extends Omit<FormProps, 'onChange'>, InternalMarkI {}

interface InternalMarkI {
  mode?: MarkMode;
  marks?: Marks;
  value?: React.Key[];
  onChange?: (nu?: React.Key[]) => void;
  internal_editing?: boolean;
  editingButton?: React.ReactNode;
  afterCreateSuccess?: CreateModalProps['afterSuccess'];
  afterDeleteSuccess?: DeleteModalProps['afterSuccess'];
  rowProps?: RowProps;
  colProps?: ColProps;
}

function InternalMark(props: InternalMarkProps) {
  const {
    mode = 'normal',
    marks,
    value: internal_value,
    onChange,
    afterCreateSuccess,
    afterDeleteSuccess,
    internal_editing = false,
    editingButton = <></>,
    layout = 'vertical',
    rowProps,
    colProps,
    ...rest
  } = props;

  function radioOnChange(e: CheckboxChangeEvent, category_key: React.Key, group_id: React.Key) {
    const label = e?.target?.id;
    const checked = e?.target?.checked;
    const copy = JSON.stringify(convert_to_object(internal_value || [], marks, mode));
    const clone = JSON.parse(copy);
    let temp = clone[category_key];

    if (!temp) {
      clone[category_key] = {};
      temp = clone[category_key];
    }
    if (checked) {
      temp[group_id] = [label];
    } else {
      temp[group_id] = [];
    }

    onChange?.(convert_to_array(clone));
  }

  function checkboxOnChange(e: CheckboxChangeEvent, category_key: React.Key) {
    const label = e?.target?.id;
    const checked = e?.target?.checked;
    const copy = JSON.stringify(convert_to_object(internal_value || [], marks, mode));
    const clone = JSON.parse(copy);
    let temp = clone[category_key];

    if (!temp) {
      clone[category_key] = {};
      temp = clone[category_key];
    }
    if (checked) {
      temp['checkbox']?.push?.(label);
    } else {
      temp['checkbox'] = temp['checkbox']?.filter?.((check_ele: React.Key) => check_ele !== label);
    }

    onChange?.(convert_to_array(clone));
  }

  function render_options(checkbox_options: MarkOptionType[], radio_options_map: Record<React.Key, MarkOptionType[]>, ele: Marks[number]) {
    const render_radio = Object?.entries(radio_options_map)?.map(([group_id, e3]) => {
      return e3.map((ele2) => (
        <Col span={8} key={ele2.value as React.Key} {...colProps}>
          <CanceledRadio
            style={{ color: '#1C2329' }}
            checked={convert_to_object(internal_value || [], marks, mode)?.[ele.category_key]?.[group_id]?.includes?.(ele2.value as React.Key)}
            id={ele2.value as string}
            onChange={(e) => {
              radioOnChange(e, ele.category_key, group_id);
            }}
          >
            <span style={{ wordBreak: 'break-all' }}>{ele2.label}</span>
            {ele2?.remark && (
              <Tooltip title={<span style={{ maxHeight: '500px', overflowY: 'auto', wordBreak: 'break-all', whiteSpace: 'pre-line' }}>{ele2?.remark}</span>}>
                <Icon component={InfoSvg} style={{ marginLeft: '4px' }} />
              </Tooltip>
            )}
          </CanceledRadio>
        </Col>
      ));
    });

    const render_checkbox = checkbox_options.map((ele3) => {
      return (
        <Col span={8} key={ele3.value as React.Key} {...colProps}>
          <Checkbox
            style={{ color: '#1C2329' }}
            checked={convert_to_object(internal_value || [], marks, mode)?.[ele.category_key]?.['checkbox']?.includes?.(ele3.value as React.Key)}
            id={ele3.value as string}
            onChange={(e) => {
              checkboxOnChange(e, ele.category_key);
            }}
          >
            <span style={{ wordBreak: 'break-all' }}>{ele3.label}</span>
            {ele3?.remark && (
              <Tooltip title={<div style={{ maxHeight: '500px', overflowY: 'auto' }}>{ele3?.remark}</div>}>
                <Icon component={InfoSvg} style={{ marginLeft: '6px' }} />
              </Tooltip>
            )}
          </Checkbox>
        </Col>
      );
    });

    return (
      <>
        {render_radio}
        {render_checkbox}
      </>
    );
  }

  function render_tags(checkbox_options: MarkOptionType[], radio_options_map: Record<React.Key, MarkOptionType[]>, ele: Marks[number]) {
    const render_radio_tag = Object?.entries(radio_options_map)?.map(([_, e3]) => {
      return e3.map((ele2) => (
        <Col span={8} key={ele2.value as React.Key} {...colProps}>
          <div style={{ display: 'flex' }}>
            <Tag style={label_style}>
              <span style={label_span_style}>{ele2.label}</span>
              {!ele2?.cannot_be_deleted && (
                <DeleteMarkButton
                  category_key={ele.category_key}
                  category_name={ele.category_name}
                  label_key={ele2.value as React.Key}
                  label_name={ele2.label as string}
                  afterSuccess={afterDeleteSuccess}
                />
              )}
            </Tag>
          </div>
        </Col>
      ));
    });

    const render_checkbox_tag = checkbox_options.map((ele3) => {
      return (
        <Col span={8} key={ele3.value as React.Key} {...colProps}>
          <div style={{ display: 'flex' }}>
            <Tag style={label_style}>
              <span style={label_span_style}>{ele3.label}</span>
              {!ele3?.cannot_be_deleted && (
                <DeleteMarkButton
                  category_key={ele.category_key}
                  category_name={ele.category_name}
                  label_key={ele3.value as React.Key}
                  label_name={ele3.label as string}
                  afterSuccess={afterDeleteSuccess}
                />
              )}
            </Tag>
          </div>
        </Col>
      );
    });

    return (
      <>
        {render_radio_tag}
        {render_checkbox_tag}
      </>
    );
  }

  return (
    <div className={styles['mark-content']}>
      <div className='mark-left'>
        <Form layout={layout} {...rest}>
          {marks?.map((ele) => {
            const { checkbox_options, radio_options_map } = marks_members_convert_options(ele?.members, mode);

            return (
              <Form.Item key={ele.category_key} label={<span style={{ color: '#1C2329' }}>{ele.category_name}</span>}>
                <Row gutter={[0, 10]} {...rowProps}>
                  {(mode === 'normal' || mode === 'search' || (mode === 'editable' && !internal_editing)) &&
                    render_options(checkbox_options, radio_options_map, ele)}
                  {mode === 'editable' && internal_editing && render_tags(checkbox_options, radio_options_map, ele)}
                  {internal_editing && (
                    <Col {...colProps}>
                      <CreateMarkButton category_key={ele.category_key} category_name={ele.category_name} afterSuccess={afterCreateSuccess} />
                    </Col>
                  )}
                </Row>
              </Form.Item>
            );
          })}
        </Form>
      </div>
      {mode === 'editable' && editingButton}
    </div>
  );
}

export default InternalMark;

const label_style: React.CSSProperties = {
  border: '1px solid #CED2D9',
  backgroundColor: '#FFFFFF',
  borderRadius: '42px',
  minHeight: '26px',
  padding: '2px 16px',
  display: 'flex',
  alignItems: 'center',
};

const label_span_style: React.CSSProperties = {
  flex: 1,
  wordBreak: 'break-all',
  whiteSpace: 'normal',
};
