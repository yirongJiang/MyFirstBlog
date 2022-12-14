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
            <h2>ååååð¥¤</h2>
            <p>
            {
                introduction.aboutEating.map((item,index) => { 
                  return  <span key={item._id}>ã<span>{item.content}</span><br /></span>
                 })
              }
              {/* <span>ãð¶æ è¾£ä¸æ¬¢ä¸»ä¹</span><br />
              <span>ãðä¸ç±è¬è   (â¤ Ï â¤)åèè</span><br />
              <span>ãåæ¬¢åç§æ°´æ ð ð é¤äºæ¨æ¡~</span><br />
              <span>ãç±çéçç«æ°æ¯çå°å··å­eg ï¼ éé®ègai</span> */}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="imgBox">
            <img src="https://pic3.zhimg.com/80/v2-6752fb2a5040190f5cdb17f7566c4e18_720w.jpg?source=1940ef5c" alt="" />
          </div>
          <div className="content">
            <h2>ææ¯æ ð§</h2>
            <p>
            {
                introduction.aboutSkills.map((item,index) => { 
                  return  <span key={item._id}>ã<span>{item.content}</span><br /></span>
                 })
              }
              {/* <span>ãç²¾éCtrl C ï¼Ctrl Vð»</span><br />
              <span>ãçç»ææ¡åç«¯åå¤§ææ¯æ çå¨å</span><br />
              <span>ãæå¸¸ç¨çæ¯çµèçå¼å³æºä»¥åå·æ°ð±</span><br />
              <span>ãæå¸¸è¯´çè¯æ¯ï¼è¿ä¸ªéæ±åä¸äºð¬</span> */}
            </p>
          </div>
        </div>
        <div className="card">
          <div className="imgBox">
            <img src="https://pic1.zhimg.com/80/v2-96ed29badc1fe64d24012ce0e3411fb9_720w.jpg?source=1940ef5c" alt="" />
          </div>
          <div className="content">
            <h2>ç±å¥½â¤</h2>
            <p>
              {
                introduction.aboutSomethingILike.map((item,index) => { 
                  return  <span key={item._id}>ã<span>{item.content}</span><br /></span>
                 })
              }
              {/* <><span>ãæ²¡äºçæ¶ååæ¬¢ä¸é¨å¤©çä¹¦ðåå­¦ä¹ ççð</span><br /></>
              <><span>ãåæ¬¢åç«¯ð»</span><br /></>
              <><span>ãåæ¬¢å»èè¹å®¤è·³èðåå¥½çåä¸èµ·åºå»çé£æ¯</span><br /></>
              <><span>ãä¼ç¹ç¹æ¶å­é¼ð¥ï¼ä¸ç¹åä»ð¸ï¼ä¸ç¹ð¹</span><br /></>
              <><span>ãæç®ææ¶é´äºæä»¥åçä¹çç¥è¯è¡¥åæ¥â</span><br /></>
              <><span>ãæ³è¦å¨åæçæ´»ä¸æ®µæ¶é´â°</span></> */}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
