import { useState, forwardRef, ReactNode } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import DraggableModal from '@/components/DraggableModal';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        弹
      </Button>
      asdfasdfsadfsdf
      <DraggableModal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        onOk={() => {
          setOpen(false);
        }}
      >
        <Form>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          {/* <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item>
          <Form.Item name="remark" label="撤销原因" rules={[{ required: true, message: '请填写撤销原因' }]}>
            <Input.TextArea showCount allowClear rows={6} maxLength={1000} placeholder="请填写撤销原因" />
          </Form.Item> */}
        </Form>
      </DraggableModal>
    </>
  );
};
