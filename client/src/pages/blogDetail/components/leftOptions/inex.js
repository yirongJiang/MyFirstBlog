import { Button, message, Tooltip } from "antd"
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react"
import PubSub from 'pubsub-js'
import { postLike, getLike } from "../../../../api"
export const LeftOptions = ({ id }) => {

  const [like, setLike] = useState(false)
  const [likeNumber, setLikeNumber] = useState()
  useEffect(() => {
    getLikeNumber()
  }, [])
  const handleLike = async () => {
    const result = await postLike({ id })
    console.log(result)
    getLikeNumber()
    setLike(true)
  }

  const handleLiked = () => {
    message.success("你已经点过赞啦")
  }

  const getLikeNumber = async () => {
    const result = await getLike({ id })
    const { like } = result.data
    setLikeNumber(like)
  }
  const handleToComment = () => {
    PubSub.subscribe('anchorComment', (_, data) => {
      console.log(data.current)
      data.current.scrollIntoView(true)
    })
  }
  return <div className="navigator">
    {
      like === true ? <div className='left-navigator'>
        <Tooltip title="点赞成功">
          <Button size='large' shape="circle" block='true' icon={<LikeFilled style={{ fontSize: '30px' }} />} onClick={handleLiked}>{likeNumber}
          </Button>
        </Tooltip>
      </div>
        :
        <Tooltip title='赞一个'>
          <Button size='large' shape="circle" block='true' icon={<LikeOutlined style={{ fontSize: '30px' }} />} onClick={handleLike} >{likeNumber}
          </Button>
        </Tooltip>
    }
    <Tooltip title='点击评论'>
      <Button size='large' shape="circle" block='true' icon={<CommentOutlined style={{ fontSize: '30px' }} />} onClick={handleToComment} >
      </Button>
    </Tooltip>
  </div>
}