import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getBlogDetail } from '../../api'
import MyComment from './components/MyCommont'
import './index.css'
import './github-markdown.css'
import { LeftOptions } from './components/leftOptions/inex'
import { MarkdownComponents } from './components/MarkdownComponents';

export default function Detail() {
  const { state: { id } } = useLocation()
  const [Title, setTitle] = useState()
  const [contents, setContents] = useState()
  const [timer, setTimer] = useState()
  const navigate=useNavigate()

  useEffect(() => {
    // Promise.all([loadBlogDtail, getComments])
    loadBlogDtail()
  }, [])

  /* 获取博客详情 */
  const loadBlogDtail = async () => {
    const res = await getBlogDetail({ id })
    const { createTime, title, content } = res.data.result
    setContents(content)
    setTimer(createTime)
    setTitle(title)
  }

  const handleBack=() => { 
    navigate(-1)
   }
  return (
    <div className='section sec2'>
      {/* <!-- 背景小圆点 --> */}
      {/* <div class="sec2_circle1"></div>
      <div class="sec2_circle2"></div>
      <div class="sec2_circle3"></div> */}
      {/* 主要内容 */}
      <div className="container_rapper">
     <div className='back' onClick={handleBack}>返回</div>
        <div className="sec2_main">
          <div className="top">
            <h1>{Title}</h1>
            <h3>{timer}</h3>
          </div>
          <ReactMarkdown children={contents} className='markdown-body'
            components={MarkdownComponents}
          />
        </div>

      {/* 评论组件 */}

      <MyComment blogId={id} />

      {/* 点赞组件 */}
      <LeftOptions id={id} />
      </div>

    </div>
  )
}
