import { ACTION_TYPES } from "../actions/ProductgroupsActions"

const INITIAL_STATE = {
  list: [],
  selected_record: {
    id: 0,
    name: "",
    isSet: false,
    price: 0,
    uuid: null,
    createduser: "",
    updateduser: null,
    deleteuser: null,
    createdtime: null,
    updatetime: null,
    deletetime: null,
    isActive: true,
    products: [],
    categoryuuid: "",
    subcategoryuuid: "",
    category: {},
    subcategory: {},
    companyuuid : "",
    company: {}
  },
  files: [],
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const ProductgroupsReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLPRODUCTGROUPS_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLPRODUCTGROUPS_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLPRODUCTGROUPS_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_SUCCESS:
      return { ...state, selected_record: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDPRODUCTGROUP:
      return { ...state, selected_record: INITIAL_STATE.selected_record, files: [], isSelected: false }
    case ACTION_TYPES.EDIT_PRODUCTGROUP_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_PRODUCTGROUP_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_PRODUCTGROUP_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.CREATE_PRODUCTGROUP_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.CREATE_PRODUCTGROUP_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.CREATE_PRODUCTGROUP_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_PRODUCTGROUP_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_PRODUCTGROUP_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_PRODUCTGROUP_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLFILES_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_ALLFILES_SUCCESS:
      return { ...state, files: payload, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.GET_ALLFILES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}


