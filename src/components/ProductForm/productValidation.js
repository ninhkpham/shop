import {createValidator, required, maxLength, integer, oneOf} from 'utils/validation';

export const productTypes = ['Sữa', 'Đồ gia dụng', 'Thực phẩm tươi sống', 'Sản phẩm Nhật Bản', 'Sản phẩm Thái Lan', 'Sản phẩm khác'];

const productValidation = createValidator({
  productType: [required, oneOf(productTypes)],
  name: [required, maxLength(200)],
  price: [required, integer],
  description: [required, maxLength(500)]
});
export default productValidation;
