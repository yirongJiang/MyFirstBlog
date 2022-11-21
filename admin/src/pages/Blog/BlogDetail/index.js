import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { getBlogDetail } from '../../../api'
export default function Detail() {
  const { id } = useParams()
  const [content, setContent] = useState()

  useEffect(() => {
    loadDetail()
  }, [])

  const loadDetail = async () => {
    const res = await getBlogDetail({ id })
    setContent(res.data.result.content)
  }


  return (
    <div>{content}</div>
  )
}
