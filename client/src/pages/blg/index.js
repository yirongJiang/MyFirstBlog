import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import { Card, Avatar, Button, Pagination } from 'antd';
import { findBlog, getAllTags, getBlogWithTag, getMusic, getNewestBlog } from '../../api'


const { Meta } = Card;
export default function Blog() {
    const [content, setContent] = useState([])
    const [allTas, setAllTags] = useState()
    const [newestBlog, setNewestBlog] = useState([])
    const [total, setTotal] = useState()
    const [page, setPage] = useState(1)
    const [tagName, setTagName] = useState()
    const [distinguishContentOrTag, setDistinguishContentOrTag] = useState(1)
    // const [music, setMusic] = useState({ url: '' })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async (page = 1, limit = 7) => {
        const res = await findBlog({ page, limit })
        // const musicResult = await getMusic()
        // console.log(musicResult.data)
        // const result = getMusicUrl(musicResult.data)
        // console.log(result)
        setTotal(res.data.total)
        setContent(res.data.result)
        const res1 = await getAllTags()
        setAllTags(res1.data)
        const res2 = await getNewestBlog()
        setNewestBlog(res2.data)
    }

    // function getMusicUrl(musicresult) {
    //     musicresult.map((item, index) => {
    //         return item.url
    //     })
    // }
    const getBlog = async (tagName) => {
        setDistinguishContentOrTag(2)
        setTagName(tagName)
        const res = await getBlogWithTag({ tagName })
        setTotal(res.data.total)
        setContent(res.data.result)
    }

    const changePage = async (page) => {
        setPage(page)
        loadData(page)
    }

    const changeTagContent = async (page) => {
        setPage(page)
        const res = await getBlogWithTag({ tagName, page })
        setContent(res.data.result)

    }

    return (
        <div className="wrapper">
            <div className="section sec1" id="section1">

                {/* <!-- 背景圆点 --> */}
                <div className="sec1_circle1"></div>
                <div className="sec1_circle2"></div>
                <div className="sec1_circle3"></div>

                {/* <!-- 头部 --> */}


                {/* 内容区 */}
                <main>
                    <div className="main_left">
                        <div className="left_content">
                            {
                                content?.map((item, index) => {
                                    return (
                                        <Link key={item._id} to='/blogDetail' state={{ id: item._id }}>  <div className='content-wrapper' >
                                            <Card hoverable size={index % 2 === 0 ? 'small' : ''} >
                                                <Meta
                                                    avatar={<Avatar src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp151668661.jpg&refer=http%3A%2F%2Fimg3.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655996014&t=1fcd47bb930dc4d7144d20710c5e489e" />}
                                                    title={<span>{item.title} </span>}
                                                    description={<span>👩{item.author}  🕒{item.createTime}  🏃‍♂️ {item.visit}</span>}
                                                />
                                                <div className="content" style={{ padding: '20px' }} >
                                                    {item.content}
                                                </div>
                                                <div >{item.tags.map((item, index) => {
                                                    return (<Link key={item._id} style={{ hover: { backgroundcolor: 'gray' } }} to=''><Button size='small' style={{ margin: '10px 18px' }}>#{item}</Button></Link>)
                                                })}</div>
                                            </Card>
                                        </div></Link>
                                    )
                                })
                            }

                        </div>
                        <div className="pagination">
                            {distinguishContentOrTag === 1 ? <Pagination current={page} pageSize={7}  total={total} onChange={changePage} /> : <Pagination  current={page} pageSize={7} total={total} onChange={changeTagContent} />}
                        </div>

                    </div>
                    <div className="main_right">
                        <div className="myPhoto current">
                            <div className='a'>
                                <div className="img"></div>
                                <h3>yirongjiang</h3>
                                <p>可可爱爱没烦恼🍓</p>
                            </div>
                        </div>
                        <div className="Tag current">
                            <div className="right_title">
                                【标签云 ☁】
                            </div>
                            <div className="right_tag">
                                {
                                    allTas?.map((item) => {
                                        return <div  onClick={() => getBlog(item.name)} className="tags" key={item._id}>
                                            {item.name}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className="hot-article current">
                            <h3>最新的文章</h3>
                            {
                                newestBlog?.map((item) => {
                                    return <div className="newArticles" key={item._id}>
                                        <Link className='Link' to='/blogDetail' state={{ id: item._id }}> <span>{item.title}</span> <span style={{ color: 'red' }}>点击查看❤</span></Link>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                </main>
            </div>

        </div>
    )
}
