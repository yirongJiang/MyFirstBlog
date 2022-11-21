import { getMusic } from '../../api'
export default function Tracks () {
  const result=async ()=>{
    await getMusic()
  }
  return result.data
}
