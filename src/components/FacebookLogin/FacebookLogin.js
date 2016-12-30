import React, { Component, PropTypes } from 'react';

export default class FacebookLogin extends Component {
  static propTypes = {
    fb: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this.FB = props.fb;
    // console.log(this.FB);

    this.state = {
      message: ''
    };
  }

  componentDidMount() {
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }

  onStatusChange(response) {
    console.log(response);

    if (response.status === 'connected') {
      this.FB.api('/me', (res) => {
        console.log(res);
        const message = 'Welcome ' + res.name;
        this.setState({
          message: message
        });
      });
    }
  }

  onLogout(response) {
    console.log(response);
    this.setState({
      message: ''
    });
  }

  render() {
    return (
      <div>
        <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="false">Login</div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}
