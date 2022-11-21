import { useRoutes } from "react-router-dom";
import { getRoutesConfig } from './routes/config'
import './App.css';


export default function App() {
  const isLogin = localStorage.token ? true : false
  const routes = useRoutes(getRoutesConfig(isLogin))
  return routes
}