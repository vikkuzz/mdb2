import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Pagination } from 'antd';
//import { debounce } from 'lodash';
import Api from '../Api';

export default class App extends Component {
  state = {
    movies: [],
    guestSessionId: '',
  };

  api = new Api();

  getQuery = () => {
    this.api.getResource().then((result) => {
      this.setState({
        movies: result,
      });
    });
  };

  getGuestSession = () => {
    this.api.getGuestSession().then((result) => {
      this.setState({
        guestSessionId: result,
      });
    });
  };

  render() {
    console.log(`App render!`);
    const { movies, guestSessionId } = this.state;
    const { Header, Content, Footer } = Layout;

    return (
      <Layout>
        <Header
          style={{
            position: 'fixed',
            zIndex: 1,
            width: '100%',
            maxWidth: 1200,
            background: 'white',
            height: 54,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Menu
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ position: 'fixed', height: 54, display: 'flex', maxWidth: 1200 }}
          >
            <Menu.Item key="1">Поиск</Menu.Item>
            <Menu.Item key="2">Рейтинг</Menu.Item>
          </Menu>
        </Header>
        <Content
          style={{
            padding: '0 50px',
            marginTop: 80,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Input />
          <div>
            <button type="button" onClick={this.getQuery}>
              Сколько фильмов?
            </button>
            <button type="button" onClick={this.getGuestSession}>
              А сколько символов в айди гостевой сессии?
            </button>
            <div>{movies.length}</div>
            <div>{guestSessionId.length}</div>
          </div>
          <Pagination />
        </Content>
        <Footer />
      </Layout>
    );
  }
}
