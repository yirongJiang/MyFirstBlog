import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'
export default function Header() {

//   const handleReload = () => {
//     window.location.reload()
// }
  return (
    <div className='Sec1'>
      <nav >
        <ul>
          <li className="local_home">
            <Link to='/blog' className='a'>
              <span className="local_hd">Home</span>
              <span className="local_bd">主页</span>
            </Link>
          </li>
          <li className="local_home">
            <Link className='a' to='/blog/person'>
              <span className="local_hd">Preson</span>
              <span className="local_bd">简介</span>
            </Link>
          </li>
          <li className="local_home">
            <Link className='a' to='/blog/photos'>
              <span className="local_hd">Photo</span>
              <span className="local_bd">照片集</span>
            </Link>
          </li>
          {/* <li className="local_home">
                            <Link  className='a' to='/blog/storeRoom'>
                                <span className="local_hd">Storeroom</span>
                                <span className="local_bd">储物间</span>
                            </Link>
                        </li> */}
          <li className="local_home">
            <Link to='/blog/More' className='a'>
              <span className="local_hd">More</span>
              <span className="local_bd">更多</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
