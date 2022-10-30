import { ACTION_TYPES } from "../actions/SubcategoriesActions"

const INITIAL_STATE = {
  list: [],
  selected_record: {
    id: 0,
    name: "",
    categoryuui:"",
    uuid: null,
    createduser: "",
    updateduser: null,
    deleteuser: null,
    createdtime: null,
    updatetime: null,
    deletetime: null,
    isActive: true,
    category : {}
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const SubcategoriesReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLSUBCATEGORIES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLSUBCATEGORIES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLSUBCATEGORIES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSUBCATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDSUBCATEGORY_SUCCESS:
      return { ...state, selected_record: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDSUBCATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDSUBCATEGORY:
      return { ...state, selected_record: INITIAL_STATE.selected_record, isSelected: false }
    case ACTION_TYPES.EDIT_SUBCATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_SUBCATEGORY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_SUBCATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.CREATE_SUBCATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.CREATE_SUBCATEGORY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.CREATE_SUBCATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_SUBCATEGORY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_SUBCATEGORY_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_SUBCATEGORY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}