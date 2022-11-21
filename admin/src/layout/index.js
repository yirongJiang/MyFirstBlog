import React, { useState } from "react";
import { Menu, Layout, Button, message } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { menus } from '../routes/config'
import './index.css'
const { Header, Sider, Content } = Layout;

function BasicLayout() {
    const [currentSelectedKeys, setCurrentSelectedKeys] = useState('blog')
    const [collapsed, setCollapsed] = useState(false)
    const navigate=useNavigate()
    const toggle = () => {
        setCollapsed(!collapsed)
    };
    const handleOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
        message.info('退出成功啦')
    }
    const getMenus = (menus) => {
        return menus.map(menu => {
            return <Menu.Item key={menu.key} icon={menu.icon}>
                <Link to={menu.link}>{menu.title}</Link>
            </Menu.Item>
        })
    }

    return (
        <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">Logo</div>

                <Menu
                    onSelect={({ selectedKeys }) => {
                        setCurrentSelectedKeys(selectedKeys)
                    }}
                    selectedKeys={currentSelectedKeys}
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                >
                    {getMenus(menus)}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Button type="primary" onClick={handleOut} style={{ position: 'absolute', right: '0px', top: '16px' }}>退出登陆</Button>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default BasicLayout