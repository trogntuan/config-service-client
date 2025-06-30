import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
  Select,
  Card,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import configService from "./services/configService";

const App = () => {
  const [configs, setConfigs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingConfig, setEditingConfig] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Get unique applications and profiles for filters
  const applications = [
    ...new Set(configs.map((config) => config.application)),
  ];
  const profiles = [...new Set(configs.map((config) => config.profile))];

  // Statistics
  const totalConfigs = configs.length;
  const uniqueApplications = applications.length;
  const uniqueProfiles = profiles.length;

  // Fetch all configs
  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const data = await configService.getAllConfigs();
      setConfigs(data);
      message.success("Configurations loaded successfully");
    } catch (error) {
      console.error("Error fetching configs:", error);
      message.error("Failed to load configurations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Wrap the async call in an immediately invoked function
    (async () => {
      await fetchConfigs();
    })();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingConfig(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (editingConfig) {
        // Update existing config
        await configService.updateConfig(editingConfig.id, {
          application: values.application,
          profile: values.profile,
          propertyKey: values.propertyKey,
          propertyValue: values.propertyValue,
        });
        message.success("Configuration updated successfully");
      } else {
        // Create new config
        await configService.createConfig({
          application: values.application,
          profile: values.profile,
          propertyKey: values.propertyKey,
          propertyValue: values.propertyValue,
        });
        message.success("Configuration created successfully");
      }

      handleCancel();
      fetchConfigs(); // Refresh the list
    } catch (error) {
      console.error("Error saving config:", error);
      message.error("Failed to save configuration");
    }
  };

  const handleEdit = (record) => {
    setEditingConfig(record);
    form.setFieldsValue({
      application: record.application,
      profile: record.profile,
      propertyKey: record.propertyKey,
      propertyValue: record.propertyValue,
    });
    showModal();
  };

  const handleDelete = async (id) => {
    try {
      await configService.deleteConfig(id);
      message.success("Configuration deleted successfully");
      fetchConfigs(); // Refresh the list
    } catch (error) {
      console.error("Error deleting config:", error);
      message.error("Failed to delete configuration");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id) => <span className="font-mono text-sm">{id}</span>,
    },
    {
      title: "Application",
      dataIndex: "application",
      key: "application",
      render: (app) => (
        <span className="font-semibold text-blue-600">{app}</span>
      ),
      filters: applications.map((app) => ({ text: app, value: app })),
      onFilter: (value, record) => record.application === value,
      filterSearch: true,
      filterMode: "menu",
      filterMultiple: true,
    },
    {
      title: "Profile",
      dataIndex: "profile",
      key: "profile",
      width: 120,
      render: (profile) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            profile === "default"
              ? "bg-gray-100 text-gray-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {profile}
        </span>
      ),
      filters: profiles.map((profile) => ({ text: profile, value: profile })),
      onFilter: (value, record) => record.profile === value,
      filterSearch: true,
      filterMode: "menu",
      filterMultiple: true,
    },
    {
      title: "Property Key",
      dataIndex: "propertyKey",
      key: "propertyKey",
      render: (key) => (
        <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">
          {key}
        </span>
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search property key"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.propertyKey.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Property Value",
      dataIndex: "propertyValue",
      key: "propertyValue",
      render: (value) => (
        <span className="font-mono text-sm bg-green-50 px-2 py-1 rounded">
          {value}
        </span>
      ),
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search property value"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters()}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record.propertyValue.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Actions",
      key: "action",
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this configuration?"
            description="This action cannot be undone."
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-250">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Configuration Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage application configurations for Microservice System
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchConfigs}
                loading={loading}
                size="large"
              >
                Refresh
              </Button>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={showModal}
                size="large"
              >
                Add Configuration
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16} className="mb-6">
          <Col span={8}>
            <Card className="shadow-sm border border-gray-200">
              <Statistic
                title="Total Configurations"
                value={totalConfigs}
                prefix={<SettingOutlined />}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="shadow-sm border border-gray-200">
              <Statistic
                title="Applications"
                value={uniqueApplications}
                prefix={<AppstoreOutlined />}
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card className="shadow-sm border border-gray-200">
              <Statistic
                title="Profiles"
                value={uniqueProfiles}
                prefix={<SettingOutlined />}
                valueStyle={{ color: "#722ed1" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <Table
            columns={columns}
            dataSource={configs}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 1200 }}
            onChange={(pagination, filters, sorter) => {
              console.log("Table changed:", { pagination, filters, sorter });
            }}
          />
        </div>

        {/* Modal */}
        <Modal
          title={
            <div className="text-lg font-semibold">
              {editingConfig ? "Edit Configuration" : "Add New Configuration"}
            </div>
          }
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={600}
          closable={true}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <Form.Item
                name="application"
                label="Application"
                rules={[
                  { required: true, message: "Please enter application name" },
                ]}
              >
                <Input placeholder="e.g., user-service" />
              </Form.Item>

              <Form.Item
                name="profile"
                label="Profile"
                rules={[{ required: true, message: "Please select profile" }]}
                initialValue="default"
              >
                <Select placeholder="Select profile">
                  <Select.Option value="default">default</Select.Option>
                  <Select.Option value="dev">dev</Select.Option>
                  <Select.Option value="test">test</Select.Option>
                  <Select.Option value="prod">prod</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="propertyKey"
              label="Property Key"
              rules={[{ required: true, message: "Please enter property key" }]}
            >
              <Input placeholder="e.g., database.url" />
            </Form.Item>

            <Form.Item
              name="propertyValue"
              label="Property Value"
              rules={[
                { required: true, message: "Please enter property value" },
              ]}
            >
              <Input.TextArea placeholder="Enter property value" rows={3} />
            </Form.Item>

            <Form.Item className="mb-0">
              <div className="flex justify-end space-x-3">
                <Button onClick={handleCancel}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  {editingConfig
                    ? "Update Configuration"
                    : "Create Configuration"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default App;
