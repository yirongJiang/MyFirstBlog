import { Input, message, Modal, } from "antd";
import React, { useEffect, useRef, useState } from "react";
import PubSub from 'pubsub-js'
import { getCommentList, postComments } from "../../../../api";
import { parseTime, timestampToTime } from "../../../../libs/utils";
import { useSetState } from 'ahooks'
import useBoolean from "../../../../libs/hooks/useBoolean";
import './index.css'

const MyComment = ({ blogId }) => {
  const commentRef = useRef({ type: 0, parentCommentId: '', to: '' })
  const [commentList, setCommentList] = useState([])
  const [comment, setComment] = useSetState({
    username: '',
    content: ''
  })
  const [isShowCommentModal, { toggle: toggleIsShowCommentModal }] = useBoolean(false)
   const anchorCommentRef=useRef()
  useEffect(() => {
    getComments()
  }, [])

  // 消息订阅
  PubSub.publish('anchorComment',anchorCommentRef);

  /* 获取评论 */
  const getComments = async () => {
    const res = await getCommentList();
    console.log(res.data);
    setCommentList(res.data)
  }

  const handleComment = async () => {
    const { type, to, parentCommentId } = commentRef.current
    if (type === 1) {
      // 一级评论
      await postComments({
        blogId,
        type,
        username: comment.username,
        commentContent: comment.content
      })
    }

    if (type === 2) {
      // 二级评论
      await postComments({
        to,
        parentCommentId,
        type,
        username: comment.username,
        commentContent: comment.content
      })
    }

    setComment({
      username: '',
      content: ''
    })
    initCommentRef()
    message.success('评论成功')
    toggleIsShowCommentModal()
    getComments()
  }

  const initCommentRef = () => {
    commentRef.current = { type: 0, parentCommentID: '', to: '' }
  }

  return (
    <>
      <Modal visible={isShowCommentModal}
        onOk={handleComment}
        okText='评论'
        cancelText='取消'
        onCancel={() => {
          toggleIsShowCommentModal()
          initCommentRef()
        }}
      >
        <div>用户名：</div>
        <Input value={comment.username} onChange={({ target: { value } }) => setComment({ username: value })} placeholder="输入您的用户名" />
        <div>评论内容：</div>
        <Input.TextArea value={comment.content} onChange={({ target: { value } }) => setComment({ content: value })} placeholder="输入您的评论内容" />
      </Modal>

      <div className="commentButton" id="commentButton" ref={anchorCommentRef} onClick={() => {
        toggleIsShowCommentModal()
        commentRef.current.type = 1
      }}>点击评论🐰</div>
      <div className="comment-list">
        {
          commentList?.length > 0 && commentList.map(comment => (
            <div className="comment" key={comment._id}>
              ❤
              <div className="comment-header">
                <div className="username">{comment.username}</div>
                <div className="create-time">{parseTime(comment.createdAt)}</div>
              </div>
              <div className="content">{comment.commentContent}</div>
              <div className="replyButton" onClick={() => {
                toggleIsShowCommentModal()
                commentRef.current.type = 2
                commentRef.current.parentCommentId = comment._id
              }}>回复</div>
              {
                comment.replys.length > 0 && comment.replys.map(subItem => (
                  <div className="sub-comment" key={subItem._id}>
                    ✨
                    <span className="sub-username">{subItem.username}</span> {subItem.to && <>回复了 <span className="sub-username">{subItem.to}</span></>}
                    <div className="sub-create-time">{timestampToTime(subItem.createTime)}</div>
                    <div className="sub-content">{subItem.commentContent}</div>
                    <div className="subReplyButton" onClick={() => {
                      toggleIsShowCommentModal()
                      commentRef.current.parentCommentId = comment._id
                      commentRef.current.type = 2
                      commentRef.current.to = subItem.username
                    }}>回复</div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </>
  );
}

export default MyComment