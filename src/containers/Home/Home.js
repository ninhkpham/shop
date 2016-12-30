import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as productActions from 'redux/modules/products';
import { isLoaded, load as loadProducts } from 'redux/modules/products';
import { initializeWithKey } from 'redux-form';
import { ProductForm } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadProducts());
    }
  }
}])
@connect(
  state => ({
    products: state.products.data,
    editing: state.products.editing,
    error: state.products.error,
    loading: state.products.loading,
    user: state.auth.user
  }),
  { ...productActions, initializeWithKey })
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    products: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired,
    addStart: PropTypes.func.isRequired,
    putToCart: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (product) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(product.id);
    };

    const handleAdd = () => {
      const {addStart} = this.props;
      return () => addStart();
    };

    const order = (product) => {
      const {putToCart} = this.props; // eslint-disable-line no-shadow
      return () => putToCart(product.id);
    };

    const {products, error, editing, loading, user} = this.props;
    // console.log('user', user);
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Home.scss');
    const isAdmin = user && user.isAdmin;
    return (
      <div className={styles.products + ' container'}>
        <h1>
          Sản phẩm
          {
            // <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            //   <i className={refreshClassName}/> {' '} Reload Products
            // </button>
          }
        </h1>
        <Helmet title="Sản phẩm" />
        {isAdmin ?
          (<div>
            <button className="btn btn-primary" onClick={handleAdd}>Thêm sản phẩm</button>
          </div>) : null
        }
        {error &&
          <div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            {' '}
            {error}
          </div>}

        {
          products && products.length &&
          products.map((product) => editing[product.id] ?
            <ProductForm formKey={String(product.id)} key={String(product.id)} initialValues={product} /> :
            <div key={product.id} className={styles.product}>
              <div className={styles.img}><img src={'/img/' + product.img} alt="" /></div>
              <div className={styles.content}>
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>{product.price} VND</div>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.button}>
                  <button className="btn btn-primary" onClick={order(product)}>
                    <i className="fa fa-cart-plus" /> Order
                  </button>
                </div>
                {isAdmin ?
                  (<div className={styles.button}>
                    <button className="btn btn-primary" onClick={handleEdit(product)}>
                      <i className="fa fa-pencil" /> Edit
                    </button>
                  </div>) : null}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}
