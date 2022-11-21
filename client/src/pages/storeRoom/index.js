import React from 'react'
import ReactPlayer from 'react-player'
import './index.css'

export default function StoreRoom() {
    return (
      <div className='player-wrapper'>
        1111111
        <ReactPlayer
                className='react-player'
                url='./veido/快乐的.mp4'
                width='100%'
                height='100%'
                playing={true}
                controls
            />
        )
      </div>
  )
}

