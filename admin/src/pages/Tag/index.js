import React, { useEffect } from 'react'
import { Button, Col, Space, Table, Input, Form, Row, Modal, message } from 'antd'
import { tagAdd, tagFind } from "../../api";
import { tagDelete } from "../../api";
import { useState } from 'react'
export default function Tag() {
  const [form] = Form.useForm()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState()

  const onFinish = async (values) => {
    const res = await tagAdd(values)
    if (res.data !== '创建成功') {
      message.error('创建失败')
      return
    }

    loadData()
    form.resetFields()
    handleCancel()
  };


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const loadData = async () => {
    setIsLoading(true)
    const res = await tagFind()
    setDataSource(res.data.result)
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    const res = await tagDelete({ id })

    if (res.data === '删除成功') {
      message.success('删除成功')
    }

    loadData()
  }


  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '时间',
      dataIndex: 'createAt',
      key: 'createAt',
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


  return <div>
    <Button type="primary" onClick={showModal} style={{ margin: '10px', display: 'absolute' }}>添加标签</Button>
    <Table
      loading={isLoading}
      dataSource={dataSource}
      columns={columns}
      rowKey='_id' />

    <Modal title="在这里添加一个可爱的标签吧" visible={isModalVisible} onCancel={handleCancel} footer='' >
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="标题名称"
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
  </div>
}

