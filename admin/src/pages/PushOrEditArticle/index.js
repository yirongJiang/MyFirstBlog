import React, { useEffect, useState } from 'react'
import Editor from 'for-editor'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Input, message, Select} from 'antd'
import './editor.css'
import { tagFind } from '../../api'
import { blogAdd, blogUpdate } from '../../api'
const { Option } = Select;

export default function Add() {
  
    useEffect(() => {
      loadData()
    }, [])

  const [content, setContent] = useState()
  const navigate = useNavigate()
  const [title, setTitle] = useState()
  const { state: { id, titleContent, updateContent,Tags } } = useLocation()
  const [updatValue] = useState(titleContent)
  const [updateContents, setUpdateContents] = useState(updateContent)
  const [tag, setTag] = useState([])
  const [sendTag, setSendTag] = useState()

  const handleAdd = async () => {
    const res = await blogAdd({ content, author: 'yirongjiang', title, tags: sendTag })
    res.data === '创建成功' ? message.info('创建成功啦') : message.info('文章内容不可以为空┗|｀O′|┛ 嗷~~')
    setContent('')
    setTitle('')
    navigate('/dashboard/blog')
  }

  const handleTagChange = (value) => {
    console.log(`selected ${value}`);
    setSendTag(value)
  }


  const handleUpdate = async () => {
    console.log(updateContents);
    const res = await blogUpdate({ id, content: updateContents, author: 'yirongjiang', tags: sendTag })
    res.data === '修改成功' ? message.info('更新成功啦') : message.info('文章内容不可以为空┗|｀O′|┛ 嗷~~')
    setContent('')
    navigate('/dashboard/blog')
  }
  const handleChange = (e) => {
    const title = e.target.value
    setTitle(title)
  }

  const loadData = async () => {
    const res = await tagFind()
    setTag(res.data.result)

  }

  return (
    <div>
      <Button className='editor-button' type='primary' onClick={id === 'add' ? handleAdd : handleUpdate}>提交</Button>
      <div className='editor-wrap'>
        <Input placeholder='在这里给文章起个名字吧' value={id === 'add' ? title : updatValue} onChange={handleChange}></Input>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="选择一个文章标签"
          onChange={handleTagChange}
          optionLabelProp="label"
          defaultValue={Tags}
        >
          {
            tag?.map((item, index) => {
              return (<Option value={item.name} label={item.name} key={index}>
                <div className="demo-option-label-item">
                  <span role="img" aria-label={item.name}>
                    {item.name}
                  </span>
                </div>
              </Option>)
            })
          }

        </Select>
        <Editor value={id === 'add' ? content : updateContents} onChange={id === 'add' ? setContent : setUpdateContents} height="100%" />
      </div>
    </div>
  )
}
