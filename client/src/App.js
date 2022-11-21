import { routes } from './routes'
import { useRoutes } from 'react-router-dom'
import Header from './components/Header'
import MusicPlayer from './components/MusicPlayer'
import { observable, autorun } from 'mobx'
import "./App.css"
export default function App() {

  const name = observable.box('hahhah')
  autorun(() => {
    console.log(name.get())
  })
  setTimeout(() => {
    name.set('buyaohahahhah')
  }, 1000);

  const obj = observable({
    name: 'xiaoming',
    age: 18
  })
  autorun(() => {
    console.log(obj.name)
  })

  setTimeout(() => {
    obj.name = 'xiaowang'
  }, 3000);

  const allRoutes = useRoutes(routes)
  return (
    <>
      <MusicPlayer />
      <Header />
      <>{allRoutes}</>
    </>
  )
}
