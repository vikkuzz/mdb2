import React, { Component } from 'react';
import Genres from '../Genres';
import './wrapperCards.css';
import PersonRate from '../PersonRate';
import Api from '../Api';

export default class WrapperCards extends Component {
  state = {
    genres: [],
  };

  api = new Api();

  componentDidMount() {
    this.getGenres();
  }

  getGenres = () => {
    this.api.getGenres().then((result) => {
      this.setState({
        genres: result,
      });
    });
  };

  render() {
    const { guestSessionId, movies } = this.props;
    const { genres } = this.state;

    const elem = movies.map((item) => {
      const { genre_ids } = item;

      const array = genre_ids;
      const genr = genres;
      const names = [];

      for (let i = 0; i < genr.length; i++) {
        for (let j = 0; j < array.length; j++) {
          if (array[j] === genr[i].id) {
            names.push(genr[i].name);
          }
        }
      }

      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '5px',
            padding: '5px',
            height: '300px',
            justifyContent: 'space-between',
            border: '3px solid gray',
            boxSizing: 'border-box',
          }}
          key={item.id}
        >
          <div>{item.vote_average}</div>
          <div>{item.title}</div>
          <Genres genres={names} />
          <div className="overview">{item.overview}</div>
          <PersonRate id={item.id} guestSessionId={guestSessionId} />
        </div>
      );
    });

    return <div>{elem}</div>;
  }
}
