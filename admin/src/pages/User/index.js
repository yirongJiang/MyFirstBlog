import React, { useEffect, useState } from "react";
import { Space, Row, Col, Button, Table, Modal, Input, message, Form } from 'antd'
import { userDelete } from "../../api";
import { findUser, userAdd } from "../../api";
import './index.css'


// 给你讲个东西， 那个form表单原生自带了清空的方法的。哈哈哈哈
// 用了 form 你就可以在 弹窗关闭的时候调用 form.resetFields  这个方法来进行表单的清空了，你来试试吧
// 用了form表单，你这里的很多逻辑都可以进行优化， 那个useState都可以不需要了
function User() {
  // 这个就是一个用来管理 Form 表单的钩子
  // 把这里的 form 通过数组解构从 useForm这个钩子拿出来，就可以传到 Form 组件中，拿到它里面的实例
  const [form] = Form.useForm()//这个是干哈的嗷
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState()
  const [pagesize, setPageSize] = useState(8)
  const [pagenumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [username, setUsername] = useState()
  // const [password, setPassword] = useState()
  const showModal = () => {
    setIsModalVisible(true);
  };



  const handleOk = async ({ username, password }) => {
    const result = await userAdd({ username, password })
    loadData()
    console.log('result' + result);
    form.resetFields()
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    // 在onCancel的时候 也要清空里面的内容，不清空也行，看自己
    setIsModalVisible(false);
  };
  const handleDelete = (id) => {
    const res = userDelete({ id })
    console.log(res);
    loadData()
    if (res.data === '删除成功') {
      message.success('删除成功')
    }

  }

  // const usernameChange = (e) => {
  //   console.log(e.target.value);
  //   setUsername(e.target.value)
  //   e.target.value = null
  // }
  // const passwordChange = (e) => {
  //   console.log(e.target.value);
  //   setPassword(e.target.value)
  // }


  const loadData = async () => {
    setIsLoading(true)
    const res = await findUser({
      page: pagenumber,
      limit: pagesize
    })
    console.log(res);
    setDataSource(res.data.result)
    setTotal(res.data.total)
    setIsLoading(false)
  }

  const changePage = (page, pagesize) => {
    setPageNumber(page)
    setPageSize(pagesize)
    loadData()
  }
  useEffect(() => {
    loadData()
  }, [])
  const columns = [
    {
      title: '用户姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '加入时间',
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

  // 这样就可以了，这个就是一步一步重构去优化代码逻辑，样式什么的你可以自己去调整
  // 把这整体逻辑再看一下吧嗷
  //睡觉奥吧好耶 晚安

  return <div>
    <Button type="primary" onClick={showModal} style={{ margin: '10px', display: 'absolute' }}>添加用户</Button>
    <Table
      loading={isLoading}
      pagination={{ pageSize: pagesize, total: total, defaultCurrent: pagenumber, onChange: changePage }}
      dataSource={dataSource}
      columns={columns}
      rowKey='_id' />
    <Modal title="Basic Modal" visible={isModalVisible} footer={null} onCancel={handleCancel}>
      <Form form={form} onFinish={handleOk}>
        <Form.Item label='用户名' rules={[{ required: true }]} name='username'>
          <Input placeholder="请输入用户名" ></Input>
        </Form.Item>
        <Form.Item label='密码' rules={[{ required: true }]} name='password'>
          <Input placeholder="请输入密码" ></Input>
        </Form.Item>

        {/* 用了 form表单你得自己去写一个提交的按钮，然后把啊它的类型改成表单的 submit类型，就可以了，colon这属性是省略冒号的 */}
        <Form.Item label=' ' colon={false}>
          <Button onClick={handleOk} htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    </Modal>
  </div>
}

export default User
//好耶，好困