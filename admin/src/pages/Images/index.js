import { Button, Form, Modal, Table,Input, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { imagesDelete, imagesPost } from '../../api';
import { imagesGet } from '../../api';

export default function Images() {

const [imagesUrl,setImagesUrl]=useState('')
const [isModalVisible, setIsModalVisible] = useState(false);
const [isLoading, setIsLoading] = useState(false)
const [dataSource,setDataSource]=useState()
const [form]=Form.useForm()

useEffect(() => { 
  loadData()
 },[])


 const loadData=async() => { 
   const result=await imagesGet()
   setDataSource(result.data)

  }

  const handlePostImages=() => { 

    setIsModalVisible(true)
   }


   const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish=async(values) => { 
    console.log(values)
    setIsModalVisible(false)
    await imagesPost(values)
    loadData()
    message.success('添加成功')
   }

   const handleDeleteImage=async(id) => { 
     setIsLoading(true)
    const result=await imagesDelete({id})
    loadData()
    console.log(result)
    setIsLoading(false)
    message.success('删除成功')
    }
  
  const columns = [
    {
      title: '图片名称',
      dataIndex: 'imageName',
      key: 'imageName',
    },
    {
      title: '图片地址',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
    },
    {
      title: '添加时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      render:(_, record) =>
        <Button onClick={()=>{handleDeleteImage(record._id)}} type='dashed' danger size='small'>删除</Button>
    },
  ];
  

  return (
  <>
  <Button type='primary' onClick={handlePostImages} >添加图片</Button>
  <Table    pagination={{defaultPageSize:6}} dataSource={dataSource} columns={columns} />
  <Modal  loading={isLoading} title="在这里添加一首歌吧" visible={isModalVisible} onCancel={handleCancel} footer='' >
        <Form
          form={form}
          onFinish={onFinish}
        >
           <Form.Item
            label="图片名称"
            name="imageName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="图片url"
            name="imageUrl"
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
