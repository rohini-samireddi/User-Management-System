import { Form, Input, Button, message, Select } from 'antd';
import React, { useEffect } from 'react';
import axios from 'axios';

const { Option } = Select;

const UsersForm = ({ initialValues, formRef, drawerOnClose, onUpdate }) => {
  useEffect(() => {
    if (initialValues) {
      formRef.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = () => {
    formRef.validateFields().then((formValues) => {
      const userId = initialValues?._id; // Get the ID from initialValues

      axios.post('http://localhost:3000/api/Users/saveUsers', { ...formValues, id: userId }) // Include the ID
        .then((response) => {
          if (response.data.status) {
            message.success(response.data.internalMessage);
            onUpdate({ ...formValues, _id: userId }); // Pass updated values back to the grid
            drawerOnClose();
          } else {
            message.error(response.data.internalMessage);
          }
        })
        .catch((err) => console.log(err.message));
    }).catch((err) => console.log(err.message));
  };

  return (
    <Form form={formRef} layout="horizontal">
      <Form.Item label="Id" name="_id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Select placeholder="Select Gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Status" name="status" rules={[{ required: true }]}>
        <Select placeholder="Select Status">
          <Option value="active">Active</Option>
          <Option value="inactive">Inactive</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleSubmit} type="primary">
          {initialValues ? 'Update' : 'Save'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UsersForm;
