import React, { useEffect, useState } from "react";
import { Button, Col, Space, Table, Row, message, Modal, Form, Input } from 'antd'
import { musicAdd, musicDelete, musicGet } from "../../api";
export default function Music() {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onFinish = async (values) => {
    await musicAdd(values)
    setIsModalVisible(false);
    setIsLoading(true)
    loadData()
    setIsLoading(false)
    message.success('添加成功')
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: '音乐地址',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '音乐名字',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <Space>
          <Row gutter='8'>
            <Col>
              <Button onClick={() => { handleDelete(record._id) }} danger type='dashed' size='small'>删除</Button>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];
  const handleDelete = async (id) => {
    setIsLoading(true)
    await musicDelete({ id })
    setIsLoading(false)
    loadData()
    message.success('删除成功')
  }
  const loadData = async () => {
    const res = await musicGet()
    setDataSource(res.data)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Button style={{ margin: '12px' }} onClick={showModal} type='primary' size="big">增加音乐</Button>
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        rowKey='_id' />
      <Modal title="在这里添加一首歌吧" visible={isModalVisible} onCancel={handleCancel} footer='' >
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="音乐地址"
            name="url"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="音乐名称"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
          >
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
