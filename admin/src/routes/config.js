import { AreaChartOutlined, AudioOutlined, FileJpgOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import Blog from '../pages/Blog'
import User from '../pages/User'
import BasicLayout from '../layout'
import { Navigate } from "react-router-dom";
import Detail from '../pages/Blog/BlogDetail';
import Login from '../pages/Login';
import Tag from '../pages/Tag';
import Add from '../pages/PushOrEditArticle';
import Music from '../pages/Music';
import Introduction from '../pages/Introduction';
import Images from '../pages/Images';


export const menus = [
    {
        key: 'blog',
        icon: <SettingOutlined />,
        link: '/dashboard/blog',
        title: '博客管理'
    }, {
        key: 'user',
        icon: <UserOutlined />,
        link: '/dashboard/user',
        title: '用户管理'
    },
    {
        key: 'tag',
        icon: <UserOutlined />,
        link: '/dashboard/tag',
        title: '标签管理'
    },
    {
        key: 'music',
        icon: <AudioOutlined />,
        link: '/dashboard/music',
        title: '音乐管理'
    },
    {
        key: 'introduction',
        icon: <FileJpgOutlined />,
        link: '/dashboard/introduction',
        title: '简介管理'
    },
    {
        key: 'imgs',
        icon: <AreaChartOutlined />,
        link: '/dashboard/imgs',
        title: '图片管理'
    }
]


export const getRoutesConfig = (isLogin) => [
    {
        path: '/',
        element: isLogin ? <Navigate to='dashboard/blog' /> : <Login />,
        children:
            [
                {
                    key: 'login',
                    path: 'login',
                    element: isLogin ? <Navigate to='dashboard/blog' /> : <Login />
                }
            ]
    },
    {
        key: '/dashboard',
        path: '/dashboard',
        element: isLogin ? <BasicLayout /> : <Navigate to='/login' />,
        children: [
            {
                key: 'blog',
                path: 'blog',
                element: <Blog />
            },
            {
                key: 'blogdetail',
                path: 'detail/:id',
                element: <Detail />
            },
            {
                key: 'user',
                path: 'user',
                element: <User />
            },
            {
                key: 'tag',
                path: 'tag',
                element: <Tag />
            },
            {

                key: 'add',
                path: 'add',
                element: <Add />
            },
            {

                key: 'music',
                path: 'music',
                element: <Music />
            },
            {

                key: 'introduction',
                path: 'introduction',
                element: <Introduction />
            },
            {

                key: 'imgs',
                path: 'imgs',
                element: <Images />
            }
        ],

    }]