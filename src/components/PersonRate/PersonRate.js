import React, { Component } from 'react';
import { Rate } from 'antd';
import Api from '../Api';

export default class PersonRate extends Component {
  state = {
    stars: 1,
  };

  api = new Api();

  sendRate = () => {
    this.api.sendRate(this.props.id, this.state.stars, this.props.guestSessionId);
  };

  handleChange = (value) => {
    this.setState({
      stars: value,
    });
    console.log(value);

    this.sendRate(this.props.id, value, this.props.guestSessionId);
  };

  render() {
    return (
      <div>
        <Rate defaultValue={0} onChange={this.handleChange} count="10" allowHalf="true" />
      </div>
    );
  }
}
