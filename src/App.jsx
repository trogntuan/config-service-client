import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const App = () => {
  const [configs, setConfigs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [form] = Form.useForm();

  // Mock data - in a real app, this would come from an API
  const initialData = [
    { id: 1, key: 'feature.flag', value: 'true', service: 'user-service' },
    { id: 2, key: 'db.host', value: 'localhost', service: 'order-service' },
    { id: 3, key: 'cache.ttl', value: '3600', service: 'product-service' },
  ];

  useEffect(() => {
    // Mocking API call
    setConfigs(initialData);
    // In a real app, you would do something like this:
    // axios.get('/api/configs').then(response => setConfigs(response.data));
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingConfig(null);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (editingConfig) {
      // Update
      const updatedConfigs = configs.map(c => c.id === editingConfig.id ? { ...c, ...values } : c);
      setConfigs(updatedConfigs);
    } else {
      // Create
      const newConfig = { id: configs.length + 1, ...values };
      setConfigs([...configs, newConfig]);
    }
    handleCancel();
  };

  const handleEdit = (record) => {
    setEditingConfig(record);
    form.setFieldsValue(record);
    showModal();
  };

  const handleDelete = (id) => {
    setConfigs(configs.filter(c => c.id !== id));
  };

  const columns = [
    { title: 'Key', dataIndex: 'key', key: 'key' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button icon={<DeleteOutlined />} danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8">
      {/* Create header contain 2 logo right - left, between is text: Microservice with Spring Cloud */}
            <div className="border border-gray-300 p-4 rounded-md mb-6">
              <div className="flex justify-between items-center">
                <img src="image/logo-team.png" alt="Logo" className="h-13" />
                <div className="text-[30px] font-bold">Microservice with Spring Cloud</div>
                <img src="image/logo-lg.svg" alt="Right Logo" className="h-10" />
              </div>
            </div>
      <h1 className="text-2xl font-bold mb-4">Configuration Management</h1>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
        className="mb-4"
      >
        Add Config
      </Button>
      <Table columns={columns} dataSource={configs} rowKey="id" />

      <Modal
        title={editingConfig ? 'Edit Config' : 'Add Config'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={editingConfig || {}}>
          <Form.Item name="key" label="Key" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="value" label="Value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="service" label="Service" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingConfig ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
