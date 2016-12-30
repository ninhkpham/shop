import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { initialize } from 'redux-form';
import { CartForm } from 'components';
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
      products: state.products.data
    });
  },
  { ...productActions, initialize })
export default class Cart extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    cartProductIds: PropTypes.array.isRequired,
    removeCartItem: PropTypes.func.isRequired,
    increaseCartItem: PropTypes.func.isRequired,
    decreaseCartItem: PropTypes.func.isRequired,
    putOrder: PropTypes.func.isRequired,
    putOrderSuccessfull: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    const { cartProductIds, products } = this.props;
    const getCount = product => cartProductIds.filter(id => id === product.id).length;
    const cartProducts = products ? products.filter(prd => cartProductIds.includes(prd.id)) : [];

    const order = {
      ...data,
      date: new Date(),
      products: cartProducts.map(product => ({
        id: product.id,
        name: product.name,
        count: getCount(product),
        price: product.price
      }))
    };
    this.props.putOrder(order);
    setTimeout(
      () => this.props.putOrderSuccessfull(order),
      100
    );
  }

  removeItem = (id) => {
    return () => this.props.removeCartItem(id);
  }

  increaseItem = (id) => {
    return () => this.props.increaseCartItem(id);
  }

  decreaseItem = (id) => {
    return () => this.props.decreaseCartItem(id);
  }

  render() {
    const { cartProductIds, products } = this.props;
    const cartProducts = products ? products.filter(prd => cartProductIds.includes(prd.id)) : [];
    const getCount = product => cartProductIds.filter(id => id === product.id).length;

    return (
      <div className="container">
        <h1>Giỏ hàng</h1>
        <Helmet title="Giỏ hàng" />
        {
          (cartProducts && cartProducts.length > 0) &&
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
              {cartProducts.map((product, index) => {
                const count = getCount(product);
                return (
                  <tr key={String(product.id)}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{count}</td>
                    <td style={{ textAlign: 'right' }}>{product.price}</td>
                    <td style={{ textAlign: 'right' }}>{product.price * count}</td>
                    <td style={{ textAlign: 'right' }}>
                      &nbsp;
                      <button className="btn btn-primary" onClick={this.increaseItem(product.id)}>+</button>
                      &nbsp;
                      <button className="btn btn-primary" onClick={this.decreaseItem(product.id)}>-</button>
                      &nbsp;
                      <button className="btn btn-primary" onClick={this.removeItem(product.id)}>Bỏ ra</button>
                    </td>
                  </tr>);
              })
              }
              <tr style={{ width: '100%', border: '1px solid black' }}>
                <td colSpan="4"><span>Tổng cộng</span></td>
                <td style={{ textAlign: 'right' }}>
                  <b>{cartProducts.reduce((acc, prd) => acc + prd.price * (getCount(prd) || 0), 0)}</b>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        }
        <CartForm onSubmit={this.handleSubmit} />
      </div >
    );
  }
}
