import memoize from 'lru-memoize';
import {createValidator, required, maxLength, email} from 'utils/validation';

const cartValidation = createValidator({
  name: [required, maxLength(10)],
  email: [required, email],
  address: maxLength(100), // single rules don't have to be in an array
  phone: [required, maxLength(20)]
});
export default memoize(10)(cartValidation);
