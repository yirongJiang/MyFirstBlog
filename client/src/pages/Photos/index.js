import React, { useEffect, useRef, useState } from 'react';
import { getImages } from '../../api';
import './index.css'

export default function Photos() {

  const clsRef = useRef(['one', 'two', 'three', 'four','five','six','seven','eight','nine','ten'])
  const dotsRef = useRef(['change', '', '', ''])

  const [cls, setCls] = useState([''])
  const [dots, setDots] = useState([''])
  const [photo,setPhoto]=useState([])

  const loadData=async() => { 
    const result=await getImages()
    setPhoto(result.data)
    console.log(result);
    
   }

  useEffect(() => {
    loadData()
    setCls([...clsRef.current])
    setDots([...dotsRef.current])
    const time = setInterval(() => {
        const clsTmp = [...clsRef.current]
        const dotsTmp = [...dotsRef.current]
        let tmp = String(clsTmp.pop())
        clsTmp.unshift(tmp)
        let dotTmp = String(dotsTmp.pop())
        dotsTmp.unshift(dotTmp)
        setCls(clsTmp)
        setDots(dotsTmp)
        clsRef.current = clsTmp
        dotsRef.current = dotsTmp
      }, 3000)
    //   let clstemp = clsRef.current.pop()
    //   clsRef.current.unshift(clstemp)
    //   let dotTemp = dotsRef.current.pop()
    //   dotsRef.unshift(dotTemp)
    //   setCls(clsRef.current)
    //   setDots(dotsRef.current)
    // }, 1000)
    return () => clearInterval(time)
  }, [])

  return (
    <div className="Wrapper">
      <div className="box">
      <ul className='imgs'>
        {
          photo?.map((item,index) => { 
            return(
              <li className={cls[index]}>
              <img alt={index} src={item.imageUrl} />
            </li>
            )
           })
        }
        {/* <li className={cls[11]}>
          <img alt='11' src='https://s2.loli.net/2022/05/26/SUXaxqIJdg5fy1c.jpg' />
        </li>
        <li className={cls[0]}>
          <img alt='22' src='https://s2.loli.net/2022/05/26/pVS3TKWMHEumnXb.jpg' />
        </li>
        <li className={cls[2]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/6tef3rd5Mbyz7C9.jpg' />
        </li>
        <li className={cls[3]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/s6vHQaErNecxUBP.jpg' />
        </li>
        <li className={cls[4]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/OAJ1wgF3yHxdpt4.jpg' />
        </li>
        <li className={cls[5]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/D9ylGJftYd5vn3x.jpg' />
        </li>
        <li className={cls[10]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/ykHpt2OUYPD5RwE.jpg' />
        </li>
        <li className={cls[6]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/EvKXqMZ1UszbdGN.jpg' />
        </li>
        <li className={cls[8]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/4GtpNCQKiRxYdnj.jpg' />
        </li>
        <li className={cls[7]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/nvrWFMPq14HRVeO.jpg' />
        </li>
        <li className={cls[1]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/TdR84WygEMZXlUo.jpg' />
        </li>
       
        <li className={cls[9]}>
          <img alt='' src='https://s2.loli.net/2022/05/26/PlohWGpwIBMFZL5.jpg' />
        </li> */}
      </ul>
      <ul className="list">
        <li className={dots[0]}></li>
        <li className={dots[1]}></li>
        <li className={dots[2]}></li>
        <li className={dots[3]}></li>
        <li className={dots[4]}></li>
        <li className={dots[5]}></li>
        <li className={dots[6]}></li>
        <li className={dots[7]}></li>
        <li className={dots[8]}></li>
        <li className={dots[9]}></li>
        {/* <li className={dots[10]}></li>
        <li className={dots[11]}></li> */}
      </ul>
    </div>
    </div>

  )
}
