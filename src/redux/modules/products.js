const LOAD = 'shopping/products/LOAD';
const LOAD_SUCCESS = 'shopping/products/LOAD_SUCCESS';
const LOAD_FAIL = 'shopping/products/LOAD_FAIL';
const EDIT_START = 'shopping/products/EDIT_START';
const EDIT_STOP = 'shopping/products/EDIT_STOP';
const ADD_START = 'shopping/products/ADD_START';
const SAVE = 'shopping/products/SAVE';
const SAVE_SUCCESS = 'shopping/products/SAVE_SUCCESS';
const SAVE_FAIL = 'shopping/products/SAVE_FAIL';
const PUT_TO_CART = 'shopping/products/PUT_TO_CART';
const REMOVE_CART_ITEM = 'shopping/products/REMOVE_CART_ITEM';
const INCREASE_CART_ITEM = 'shopping/products/INCREASE_CART_ITEM';
const DECREASE_CART_ITEM = 'shopping/products/DECREASE_CART_ITEM';
const PUT_ORDER = 'shopping/products/PUT_ORDER';
const PUT_ORDER_SUCCESSFUL = 'shopping/products/PUT_ORDER_SUCCESSFUL';

const initialState = {
  loaded: false,
  editing: {},
  saveError: {},
  cartProducts: [],
  orders: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log(action.result);
      return {
        ...state,
        loading: false,
        // loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case EDIT_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
    case ADD_START:
      return {
        ...state,
        editing: {
          ...state.editing,
          [0]: true
        }
      };
    case EDIT_STOP:
      return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: false
        }
      };
    case SAVE:
      return state; // 'saving' flag handled by redux-form
    case SAVE_SUCCESS:
      const data = [...state.data];
      data[action.result.id - 1] = action.result;
      return {
        ...state,
        data: data,
        editing: {
          ...state.editing,
          [action.id]: false
        },
        saveError: {
          ...state.saveError,
          [action.id]: null
        }
      };
    case SAVE_FAIL:
      return typeof action.error === 'string' ? {
        ...state,
        saveError: {
          ...state.saveError,
          [action.id]: action.error
        }
      } : state;
    case PUT_TO_CART:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.id]
      };
    case INCREASE_CART_ITEM:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.id]
      };
    case DECREASE_CART_ITEM:
      const index = state.cartProducts.findIndex(it => it === action.id);
      // console.log(index, state.cartProducts.slice(0, index), state.cartProducts.slice(index + 1));
      return {
        ...state,
        cartProducts: [...state.cartProducts.slice(0, index), ...state.cartProducts.slice(index + 1)]
      };
    case PUT_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order]
      };
    case PUT_ORDER_SUCCESSFUL:
      const prdIds = action.order.products.map(prd => prd.id);
      return {
        ...state,
        // remove product in cart
        cartProducts: state.cartProducts.filter(id => !prdIds.includes(id))
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.products && globalState.products.loaded;
}

export function load(type) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/product/load/' + type)
  };
}

export function save(product) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    id: product.id,
    promise: (client) => client.post('/product/update', {
      data: product
    })
  };
}

export function editStart(id) {
  return { type: EDIT_START, id };
}

export function addStart() {
  return { type: ADD_START };
}

export function editStop(id) {
  return { type: EDIT_STOP, id };
}

export function putToCart(id) {
  return { type: PUT_TO_CART, id };
}

export function removeCartItem(id) {
  return { type: REMOVE_CART_ITEM, id };
}

export function increaseCartItem(id) {
  return { type: INCREASE_CART_ITEM, id };
}

export function decreaseCartItem(id) {
  return { type: DECREASE_CART_ITEM, id };
}

export function putOrder(order) {
  return { type: PUT_ORDER, order };
}

export function putOrderSuccessfull(order) {
  return { type: PUT_ORDER_SUCCESSFUL, order };
}
