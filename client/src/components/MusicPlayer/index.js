import React, { useEffect, useRef, useState } from "react";
import { Slider } from 'antd'
import { useUnmount } from 'ahooks'
import './index.css'
import { getMusic } from "../../api";
// import tracks from "./tracks";

const MusicPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState()

  // Refs
  const audioRef = useRef()
  const tracksRef = useRef({ tracks: [] })
  const intervalRef = useRef();
  const isReady = useRef(false);

  useEffect(() => {
    loadData2()

  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const loadData2 = async () => {
    const result = await getMusic()
    tracksRef.current.tracks = result.data
    audioRef.current.pause();
    // const url=tracksRef.current.tracks.[trackIndex].url
    audioRef.current = new Audio(tracksRef.current.tracks[trackIndex].url);
    setTrackProgress(audioRef.current.currentTime);
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }


  const startTimer = () => {
    // 清除定时器
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const changeCurrentTime = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };


  const toPrevTrack = () => {
    const { tracks } = tracksRef.current
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    const { tracks } = tracksRef.current
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  // const loadData1 = async () => {
  //   const result = await getMusic()
  //   tracksRef.current.tracks=result.data

  //   audioRef.current.src=result.data[0].url
  //   setDuration(audioRef.current.duration)
  //   if (isPlaying) {
  //     audioRef.current.play();
  //     startTimer();
  //   } else {
  //     audioRef.current.pause();
  //   }
  // }
  // const loadData = async () => {
  //   const result = await getMusic()
  //   tracksRef.current.tracks = result.data
  //   audioRef.current.src = result.data[0].url
  //   audioRef.current.play()
  //   intervalRef.current = setInterval(() => {
  //     setTrackProgress(audioRef.current.currentTime)
  //   }, 1000)

  // }
  // useEffect(() => {
  //   loadData()
  // }, [])

 
  const play = () => {
    audioRef.current.play()
    intervalRef.current = setInterval(() => {
      setTrackProgress(audioRef.current.currentTime)
    }, 1000)
  }


  // useEffect(() => {
  //   loadData1()
  // }, [isPlaying]);



  return <>
    <div className="music-player">
      <div className="button" onClick={play}>播放</div>
      <div className="button" onClick={() => audioRef.current.pause()}>暂停</div>
      <div className="button" onClick={toNextTrack} >下一首</div>
      <div className="button" onClick={toPrevTrack}>上一首</div>
      <Slider tooltipVisible={false} value={trackProgress} max={duration} onChange={changeCurrentTime}></Slider>
      <audio loop="loop" ref={audioRef} />
    </div>
  </>
  }

  export default MusicPlayer

  // const stateRef = useRef({
  //   intervalId: 0
  // })
  // const playerRef = useRef(null)
  // const [currentTime, setCurrentTime] = useState(0)
  // const [duration, setDuration] = useState(0)
  // const [currentSong, setCurrentSong] = useState()
  // const [songIndex, setSongIndex] = useState(0)

  // useEffect(() => {
  //   const player = playerRef.current
  //   player.ondurationchange = () => {
  //     setCurrentTime(player.currentTime)
  //     setDuration(player.duration)
  //   }
  //   loadData()
  // }, [])

  // const loadData = async () => {
  //   const result = await getMusic()
  //   playerRef.current.src = result.data[0].url
  //   console.log(result.data)
  //   setCurrentSong(result.data)
  // }


  // useUnmount(() => { playerRef.current.pause(); clearInterval(stateRef.current.intervalId) })

  // const changeCurrentTime = (val) => {
  //   setCurrentTime(val)
  //   playerRef.current.currentTime = val
  //   playerRef.current.play()
  // }

  // const play = () => {
  //   playerRef.current.play()
  //   stateRef.current.intervalId = setInterval(() => {
  //     setCurrentTime(playerRef.current.currentTime)
  //   }, 1000)
  // }

  // const handleNext = () => {
  //   playerRef.current.pause()
  //   playerRef.current = new Audio(currentSong[songIndex].url)
  //   setCurrentTime(playerRef.current.currentTime)
  //   // console.log(songIndex)
  //   setSongIndex(songIndex=>songIndex + 1)
  //   // console.log(songIndex)
  //   if (songIndex >= currentSong.length - 1) {
  //     setSongIndex(songIndex=>{
  //       songIndex=0
  //       return songIndex
  //     })
  //     playerRef.current.src = currentSong[songIndex].url
  //     playerRef.current.play()
  //     play()
  //   }
  //   playerRef.current.src = currentSong[songIndex].url
  //   playerRef.current.play()
  //   play()
  // }

  // const handleLast = () => {
  //   playerRef.current.pause()
  //   playerRef.current = new Audio(currentSong[songIndex].url)
  //   setCurrentTime(playerRef.current.currentTime)
  //   setSongIndex(songIndex=>songIndex + 1)
  //   console.log(songIndex)
  //   if (songIndex < 0) {
  //     setSongIndex(songIndex=>{
  //       songIndex=currentSong.length - 1 
  //       return songIndex
  //     })
  //     playerRef.current.src = currentSong[songIndex].url
  //     playerRef.current.play()
  //     play()
  //   }
  //   playerRef.current.src = currentSong[songIndex].url
  //   playerRef.current.play()
  //   play()
  // }




  // return <>
  //   <div className="music-player">
  //     <div className="button" onClick={play}>播放</div>
  //     <div className="button" onClick={() => playerRef.current.pause()}>暂停</div>
  //     <div className="button" onClick={toNextTrack} >下一首</div>
  //     <div className="button" onClick={toPrevTrack}>上一首</div>
  //     <Slider tooltipVisible={false} value={trackProgress} max={duration} onChange={changeCurrentTime}></Slider>
  //     <audio loop="loop" ref={playerRef} />
  //   </div>
  // </>
