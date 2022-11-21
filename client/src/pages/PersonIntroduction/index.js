import React, { useEffect, useState } from 'react'
import { getIntroduction } from '../../api'
import './index.css'

export default function Person() {

  const [introduction, setIntroduction] = useState({
    aboutEating: [],
    aboutSkills: [],
    aboutSomethingILike: []
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const result = await getIntroduction()
    const { aboutEating, aboutSkills, aboutSomethingILike } = result.data[0]
    setIntroduction(
      {
        aboutEating,
        aboutSkills,
        aboutSomethingILike
      }
    )
  }

  return (
    <div className="body">
      <div className="container">
        <div className="card">
          <div className="imgBox">
            <img src="https://pic3.zhimg.com/80/v2-69dc8fada95b5472738f5ae987f0f4d4_720w.jpg?source=1940ef5c" alt="" />
          </div>
          <div className="content">
            <h2>吃吃喝喝🥤</h2>
            <p>
            {
                introduction.aboutEating.map((item,index) => { 
                  return  <span key={item._id}>。<span>{item.content}</span><br /></span>
                 })
              }
              {/* <span>。🌶无辣不欢主义</span><br />
              <span>。💔不爱蔬菜   (❤ ω ❤)吃肉肉</span><br />
              <span>。喜欢各种水果 🍈 🍉 除了杨桃~</span><br />
              <span>。爱瞎逛烟火气息的小巷子eg ： 重邮老gai</span> */}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="imgBox">
            <img src="https://pic3.zhimg.com/80/v2-6752fb2a5040190f5cdb17f7566c4e18_720w.jpg?source=1940ef5c" alt="" />
          </div>
          <div className="content">
            <h2>技术栈🔧</h2>
            <p>
            {
                introduction.aboutSkills.map((item,index) => { 
                  return  <span key={item._id}>。<span>{item.content}</span><br /></span>
                 })
              }
              {/* <span>。精通Ctrl C ，Ctrl V💻</span><br />
              <span>。熟练掌握前端各大技术栈的全名</span><br />
              <span>。最常用的是电脑的开关机以及刷新🖱</span><br />
              <span>。最常说的话是：这个需求做不了💬</span> */}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="imgBox">
            <img src="https://pic1.zhimg.com/80/v2-96ed29badc1fe64d24012ce0e3411fb9_720w.jpg?source=1940ef5c" alt="" />
          </div>
          <div className="content">
            <h2>爱好❤</h2>
            <p>
              {
                introduction.aboutSomethingILike.map((item,index) => { 
                  return  <span key={item._id}>。<span>{item.content}</span><br /></span>
                 })
              }
              {/* <><span>。没事的时候喜欢下雨天看书📕和学习烘焙🎂</span><br /></>
              <><span>。喜欢前端💻</span><br /></>
              <><span>。喜欢去舞蹈室跳舞💃和好盆友一起出去看风景</span><br /></>
              <><span>。会点点架子鼓🥁，一点吉他🎸，一点🎹</span><br /></>
              <><span>。打算有时间了把以前的乐理知识补回来✏</span><br /></>
              <><span>。想要在农村生活一段时间⏰</span></> */}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
