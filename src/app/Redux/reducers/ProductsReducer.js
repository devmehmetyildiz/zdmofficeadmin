import { ACTION_TYPES } from "../actions/ProductsActions"

const INITIAL_STATE = {
  list: [],
  selected_record: {
    id: 0,
    name: "",
    groupuui: "",
    productcode: "",
    dimension: "",
    price: 0,
    uuid: null,
    createduser: "",
    updateduser: null,
    deleteuser: null,
    createdtime: null,
    updatetime: null,
    deletetime: null,
    isActive: true
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const ProductsReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLPRODUCTS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLPRODUCTS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLPRODUCTS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDPRODUCT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDPRODUCT_SUCCESS:
      return { ...state, selected_record: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDPRODUCT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDPRODUCT:
      return { ...state, selected_record: INITIAL_STATE.selected_record, isSelected: false }
    case ACTION_TYPES.EDIT_PRODUCT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_PRODUCT_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_PRODUCT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.CREATE_PRODUCT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.CREATE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.CREATE_PRODUCT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_PRODUCT_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_PRODUCT_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}