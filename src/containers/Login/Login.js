import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import { FacebookLogin } from 'components';

@connect(
  state => ({ user: state.auth.user }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = event => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout } = this.props;

    const FB = window.FB;

    // TODO: fix this
    // const redirectUri = 'http://localhost:3000/login';

    const styles = require('./Login.scss');
    // const responseFacebook = (response) => {
    //   console.log(response);
    // };

    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Đăng nhập" />
        <h1>Đăng nhập</h1>
        <FacebookLogin fb={FB} />
        {!user &&
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input type="text" ref="username" placeholder="Tên" className="form-control" />
              </div>
              <button className="btn btn-success" onClick={this.handleSubmit}>
                <i className="fa fa-sign-in" />{' '}Đăng nhập
            </button>
            </form>
          </div>
        }
        {user &&
          <div>
            <p>Bạn đã đăng nhập với tên {user.name}.</p>

            <div>
              <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out" />{' '}Đăng xuất</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
