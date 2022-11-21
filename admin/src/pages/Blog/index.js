import React, { useEffect, useState } from "react";
import { Button, Col, Space, Table, Row, message } from 'antd'
import { findBlog } from "../../api";
import { Link } from "react-router-dom";
import { blogDelete } from "../../api";

function Blog() {
  const [isLoading, setIsLoading] = useState(false)
  const [dataSource, setDataSource] = useState()
  const [pageSize, setPageSize] = useState(8)
  const [pageNumber, setPageNumber] = useState(1)
  const [total, setTotal] = useState()

  const loadData = async (page = 1, limit = 8) => {
    setIsLoading(true)
    const res = await findBlog({
      page,
      limit
    })
    console.log('res');
    console.log(res);
    setDataSource(res.data.result)
    setTotal(res.data.total)
    setIsLoading(false)
  }

  const handleDelete = async (id) => {
    const res = await blogDelete({ id })
    console.log(res);
    loadData()
    if (res.data === '删除成功') {
      message.success('删除成功')
    }

  }

  const changePage = (page, pageSize) => {
    loadData(page, pageSize)
    setPageNumber(page)
    setPageSize(pageSize)
  }

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    {
      title: '作者',
      dataIndex: 'author',
      key: 'authors',
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'contents',
      width: 300,
      ellipsis: true
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render: (_, record) => (
        <Space>
          <Row gutter='8'>
            <Col >
              <Link to='/dashboard/add' state={{ id: record._id, titleContent: record.title, updateContent: record.content, Tags: record.tags }}> <Button type="primary" size='small'>详情</Button></Link>
            </Col>
            <Col>
              <Button onClick={() => { handleDelete(record._id) }} danger type='dashed' size='small'>删除</Button>
            </Col>
          </Row>
        </Space>
      ),
    },
  ];


  return <div>
    <Link to='/dashboard/add' state={{ id: 'add' }}><Button type="primary" style={{ margin: '10px', display: 'absolute' }}>添加文章</Button></Link>
    <Table
      loading={isLoading}
      pagination={{ pageSize, total, current: pageNumber, onChange: changePage }}
      dataSource={dataSource}
      columns={columns}
      rowKey='_id' />
  </div>
}

export default Blog