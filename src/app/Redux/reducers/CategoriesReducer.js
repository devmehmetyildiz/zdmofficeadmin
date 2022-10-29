import { ACTION_TYPES } from "../actions/CategoriesActions"

const INITIAL_STATE = {
  list: [],
  selected_record: {
    id: 0,
    name: "",
    uuid: null,
    createduser: "",
    updateduser: null,
    deleteuser: null,
    createdtime: null,
    updatetime: null,
    deletetime: null,
    isActive: true,
    subcategories:[]
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const CategoriesReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLCATEGORIES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLCATEGORIES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLCATEGORIES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDCATEGORY_SUCCESS:
      return { ...state, selected_record: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDCATEGORY:
      return { ...state, selected_record: INITIAL_STATE.selected_record, isSelected: false }
    case ACTION_TYPES.EDIT_CATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_CATEGORY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_CATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.CREATE_CATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.CREATE_CATEGORY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.CREATE_CATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_CATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_CATEGORY_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_CATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}