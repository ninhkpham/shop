import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import productValidation, { productTypes } from './productValidation';
import * as productActions from 'redux/modules/products';

@connect(
  state => ({
    saveError: state.products.saveError
  }),
  dispatch => bindActionCreators(productActions, dispatch)
)
@reduxForm({
  form: 'product',
  fields: ['id', 'productType', 'name', 'price', 'description'],
  validate: productValidation
})
export default class ProductForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    editStop: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    save: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    saveError: PropTypes.object,
    formKey: PropTypes.string.isRequired,
    values: PropTypes.object.isRequired
  };

  render() {
    const {
      editStop,
      fields: {id, productType, name, price, description},
      formKey,
      handleSubmit,
      invalid,
      pristine,
      save,
      submitting,
      saveError: {[formKey]: saveError },
      values
    } = this.props;
    const styles = require('containers/Home/Home.scss');
    return (
      <div className={submitting ? styles.saving : ''}>
        <div className={styles.idCol}>ID: {id.value}</div>
        <div>
          <select name="productType" className="form-control" {...productType}>
            {productTypes.map(type => <option value={type} key={type}>{type}</option>)}
          </select>
          {productType.error && productType.touched && <div className="text-danger">{productType.error}</div>}
        </div>
        <div className={styles.name}>
          Tên sản phẩm:
          <input type="text" className="form-control" {...name} />
          {name.error && name.touched && <div className="text-danger">{name.error}</div>}
        </div>
        <div className={styles.price}>
          Giá:
          <input type="text" className="form-control" {...price} />
          {price.error && price.touched && <div className="text-danger">{price.error}</div>}
        </div>
        <div className={styles.description}>
          Mô tả:
          <textarea rows="10" className="form-control" {...description}></textarea>
          {description.error && description.touched && <div className="text-danger">{description.error}</div>}
        </div>
        <div className={styles.buttonCol}>
          <button className="btn btn-default"
            onClick={() => editStop(formKey)}
            disabled={submitting}>
            <i className="fa fa-ban" /> Cancel
          </button>
          <button className="btn btn-success"
            onClick={handleSubmit(() => save(values)
              .then(result => {
                if (result && typeof result.error === 'object') {
                  return Promise.reject(result.error);
                }
              })
            )}
            disabled={pristine || invalid || submitting}>
            <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')} /> Save
          </button>
          {saveError && <div className="text-danger">{saveError}</div>}
        </div>
      </div>
    );
  }
}
