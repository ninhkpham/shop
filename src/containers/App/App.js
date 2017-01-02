import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    user: state.auth.user,
    cartProducts: state.products.cartProducts,
    orders: state.products.orders
  }),
  { logout, pushState: push })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    cartProducts: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    window.fbAsyncInit = () => {
      console.log('window.FB.init');
      window.FB.init({
        appId: '1231037623689872',
        cookie: true,  // enable cookies to allow the server to access the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      const statusChangeCallback = (response) => {
        console.log('statusChangeCallback');
        console.log(response);
      };

      window.FB.getLoginStatus((response) => {
        statusChangeCallback(response);
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user, cartProducts, orders} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}>
                <div className={styles.brand} />
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              <LinkContainer to="product/10">
                <NavItem eventKey={100}><span className={styles.navbar}>Sữa</span></NavItem>
              </LinkContainer>

              {user && <LinkContainer to="/chat">
                <NavItem eventKey={1}><span className={styles.navbar}>Chat</span></NavItem>
              </LinkContainer>}

              {!user &&
                <LinkContainer to="/login">
                  <NavItem eventKey={3}><span className={styles.navbar}>Đăng nhập</span></NavItem>
                </LinkContainer>}

              {cartProducts && cartProducts.length > 0 ?
                (<LinkContainer to="/cart">
                  <NavItem eventKey={4}><span className={styles.navbar}>Giỏ hàng</span>

                    <span className={styles.numCart}>
                      {cartProducts.length > 0 ? cartProducts.length : ''}
                    </span>
                  </NavItem>
                </LinkContainer>) : null
              }
              {orders && orders.length > 0 ?
                (<LinkContainer to="/order">
                  <NavItem eventKey={99}><span className={styles.navbar}>Đơn hàng</span>
                    <span className={styles.numCart}>
                      {orders.length > 0 ? orders.length : ''}
                    </span>
                  </NavItem>
                </LinkContainer>
                ) : null
              }
              {user &&
                <LinkContainer to="/logout">
                  <NavItem eventKey={6} className="logout-link" onClick={this.handleLogout}>
                    <span className={styles.navbar}>Đăng xuất</span>
                  </NavItem>
                </LinkContainer>}
            </Nav>
            {user &&
              <p className={styles.loggedInMessage + ' navbar-text'}><strong>{user.name}</strong></p>}

          </Navbar.Collapse>
        </Navbar>
        <div>Chuyên cung cấp các sản phẩm an toàn cho mẹ và bé</div>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
