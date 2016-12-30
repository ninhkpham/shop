import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded, load as loadProducts } from 'redux/modules/products';
import { asyncConnect } from 'redux-async-connect';
// import { removeCartItem } from 'redux/modules/products';
import * as productActions from 'redux/modules/products';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadProducts());
    }
  }
}])
@connect(
  (state) => {
    return ({
      cartProductIds: state.products.cartProducts,
      orders: state.products.orders,
      user: state.auth.user,
    });
  },
  { ...productActions })
export default class Order extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
    cartProductIds: PropTypes.array.isRequired,
    user: PropTypes.object,
  }

  render() {
    const { cartProductIds, orders, user } = this.props;
    const getCount = product => cartProductIds.filter(id => id === product.id).length;

    const markDone = () => { };

    return (
      <div className="container">
        <h1>Order</h1>
        <Helmet title="Đơn hàng" />
        {
          orders.map((order, idx) => {
            return (
              <div key={idx}>
                <div>
                  <div>Tên: {order.name}</div>
                  <div>Email: {order.email}</div>
                  <div>Địa chỉ: {order.address}</div>
                  <div>Điện thoại: {order.phone}</div>
                  <div>Ngày: {order.date.toLocaleDateString()} {order.date.toLocaleTimeString()}</div>
                </div>

                <table className="" style={{ width: '100%', border: '1px solid black' }} >
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th style={{ textAlign: 'right' }}>Giá (VND)</th>
                      <th style={{ textAlign: 'right' }}>Tiền (VND)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product, index) => {
                      const count = getCount(product);
                      return (
                        <tr key={String(product.id)}>
                          <td>{index + 1}</td>
                          <td>{product.name}</td>
                          <td>{count}</td>
                          <td style={{ textAlign: 'right' }}>{product.price}</td>
                          <td style={{ textAlign: 'right' }}>{product.price * count}</td>
                        </tr>);
                    })
                    }
                    <tr style={{ width: '100%', border: '1px solid black' }}>
                      <td colSpan="4"><span>Tổng cộng</span></td>
                      <td style={{ textAlign: 'right' }}>
                        <b>{order.products.reduce((acc, prd) => acc + prd.price * (getCount(prd) || 0), 0)}</b>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                {user && user.isAdmin ?
                  (<div>
                    <button className="btn btn-primary" onClick={markDone(order)}>Đánh dấu hoàn thành</button>
                  </div>) : null
                }
              </div>
            );
          })
        }
      </div >
    );
  }
}
