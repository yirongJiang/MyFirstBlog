import Blog from "../pages/blg";
import {Navigate} from 'react-router-dom'
import Detail from "../pages/blogDetail";
import Person from "../pages/PersonIntroduction";
import Photos from "../pages/Photos";
import More from "../pages/More";

export const routes=[
  {
    path: '*',
    element: <Navigate to='/blog' />,
  },
  {
    path:'/blogDetail',
    element:<Detail/>
  },
  {
    path:'/blog',
    element:<Blog/>
  },
  {
    path:'/blog/person',
    element:<Person/>
  },
  {
    path:'/blog/photos',
    element:<Photos/>
  },
  {
    path:'/blog/More',
    element:<More/>
  },
  // ,
  // {
  //   path:'/blog/storeRoom',
  //   element:<StoreRoom/>
  // }
]