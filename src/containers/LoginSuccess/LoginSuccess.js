import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    authActions)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object
  // logout: PropTypes.func
  }

  render() {
    // const {user, logout} = this.props;
    const { user } = this.props;
    return (user &&
      <div className="container">
        <h1>Đăng nhập thành công</h1>

        <div>
          <p>Xin chào {user.name}. Bạn đã đăng nhập thành công. Chúc bạn tham quan và mua sắm vui vẻ!
          </p>
          {
          // <div>
          //   <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Đăng xuất</button>
          // </div>
          }
        </div>
      </div>
    );
  }
}
