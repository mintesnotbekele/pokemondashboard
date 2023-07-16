import React, { useEffect, useState } from 'react';
import { StarOutlined,UserOutlined } from '@ant-design/icons';
import { Image, Layout, Menu,  theme } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import logo from './assets/pokemon.png'
import { Link, Route, Routes } from 'react-router-dom';
import ListPokemon from './components/pokemon/list';
import ListFavorites from './components/pokemon/listfav';
import ListGridPokemon from './components/pokemon/listgrid';

const { Header, Content, Footer, Sider } = Layout;
const TopLayer: React.FC = () => {
            
        const {
           token: { colorBgContainer },
          } = theme.useToken();

        return (
            <Layout>
            <Header style={{ paddingLeft: "150px",display: 'flex', alignItems: 'center' }}>
                <div style={{color: "white"}} >  
                <Image
                height={50}
                width={50}
                src={logo}
            /> 
            POKEMONS
            </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%' }}
                    >
                    <MenuItem key="all" icon={React.createElement(UserOutlined)} >
                    <Link to="/"> All Pokemons</Link>
                            </MenuItem>
                        <MenuItem key="favorites" icon={React.createElement(StarOutlined)} >
                        <Link to="/favorites">Favorites </Link>
                        </MenuItem>
                        <MenuItem key="allgrid" icon={React.createElement(StarOutlined)} >
                        <Link to="/allgrid">All Pokemon Grid </Link>
                        </MenuItem>

                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                  <Routes>
                        <Route path="/" element={<ListPokemon />}>
                        </Route>
                        <Route path="/favorites" element={<ListFavorites />}></Route>
                        <Route path="/allgrid" element={<ListGridPokemon />}>
                        </Route>
                    </Routes>
                </Content>
                </Layout>
            </Content>     
            <Footer style={{ textAlign: 'center' }}>©2023 Created by Mintesnot Bekele</Footer>
            </Layout>
        );
        };

        export default TopLayer;