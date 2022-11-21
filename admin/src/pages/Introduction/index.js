import React, { useEffect, useState } from "react";
import { Button, Col, Space, Table, Row, message, Modal, Form, Input, Select, Tag } from 'antd'
import { introductionGet, introductionAdd, introductionDelete } from "../../api";
const { Option } = Select;

export default function Introduction() {
  const [parentId, setParentId] = useState('')
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [Source, setSource] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadData()
  }, [])

  const Columns = [
    {
      title: '类型',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <Space>
          <Row gutter='8'>
            <Col>
              <Button danger onClick={() => { handleDelete(record.name, record._id) }} type='dashed' size='small'>删除</Button>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];
  const onFinish = async (values) => {
    console.log(values)
    const { content, type } = values
    const res = await introductionAdd({ content, type, parentId })
    console.log('增加简介')
    console.log(res)
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
  const loadData = async () => {
    const res = await introductionGet()
    console.log(res)
    setParentId(res.data[0]._id)
    const dataSource = res.data[0]
    const dataResult = [...dataSource.aboutEating, ...dataSource.aboutSkills, ...dataSource.aboutSomethingILike]
    setSource(dataResult)
  }
  const handleSelect = (value) => {
    console.log(`selected ${value}`);
  }
  const handleDelete = async (name, id) => {
    setIsLoading(true)
    await introductionDelete({ type: name, id, parentId })
    setIsLoading(false)
    loadData()
    message.success('删除成功')
  }


  return (
    <>
      <Button style={{ margin: '12px' }} onClick={showModal} type='primary' size="big">增加简介</Button>
      <Table
        loading={isLoading}
        dataSource={Source}
        columns={Columns}
        pagination={{ defaultPageSize: 6 }}
        rowKey='_id' />
      <Modal title="在这里添加一首歌吧" visible={isModalVisible} onCancel={handleCancel} footer='' >
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="类型"
            name="type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              style={{
                width: 420,
              }}
              onChange={handleSelect}
            >
              <Option value="爱好">爱好</Option>
              <Option value="吃吃喝喝">吃吃喝喝</Option>
              <Option value="技术栈">技术栈</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
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
