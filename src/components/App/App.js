import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Input, Pagination } from 'antd';
//import { debounce } from 'lodash';
import Api from '../Api';
import WrapperCards from '../WrapperCards';

export default class App extends Component {
  state = {
    movies: [],
    request: 'return',
    guestSessionId: '',
  };

  api = new Api();

  componentDidMount() {
    this.getGuestSession();
    this.getQuery();
  }

  getQuery = () => {
    this.api.getResource(this.state.request).then((result) => {
      this.setState({
        movies: result,
      });
    });
  };

  getRated = (sessionId = this.state.guestSessionId) => {
    this.api.getRatedMovies(sessionId).then((result) => {
      this.setState({
        movies: result.results,
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
            <Menu.Item key="2" onClick={() => this.getRated()}>
              Рейтинг
            </Menu.Item>
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
          <WrapperCards movies={movies} guestSessionId={guestSessionId} />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Pagination />
          </div>
        </Content>
        <Footer />
      </Layout>
    );
  }
}
