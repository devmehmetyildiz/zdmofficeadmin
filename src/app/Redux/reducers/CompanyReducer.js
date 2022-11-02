import { ACTION_TYPES } from "../actions/CompanyActions"

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
  },
  errmsg: "",
  isLoading: false,
  isSelected: false,
  isModalOpen: false
}

export const CompanyReducer = (state = INITIAL_STATE, { type, payload }) => {

  switch (type) {
    case ACTION_TYPES.GET_ALLCOMPANIES_INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.GET_ALLCOMPANIES_SUCCESS:
      return { ...state, list: payload, isLoading: false }
    case ACTION_TYPES.GET_ALLCOMPANIES_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCOMPANY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.GET_SELECTEDCOMPANY_SUCCESS:
      return { ...state, selected_record: payload, isSelected: true, isLoading: false }
    case ACTION_TYPES.GET_SELECTEDCOMPANY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.REMOVE_SELECTEDCOMPANY:
      return { ...state, selected_record: INITIAL_STATE.selected_record, isSelected: false }
    case ACTION_TYPES.EDIT_COMPANY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.EDIT_COMPANY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.EDIT_COMPANY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.CREATE_COMPANY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.CREATE_COMPANY_SUCCESS:
      return { ...state, isLoading: false }
    case ACTION_TYPES.CREATE_COMPANY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_COMPANY_INIT:
      return { ...state, isLoading: true }
    case ACTION_TYPES.DELETE_COMPANY_SUCCESS:
      return { ...state, isLoading: false, isModalOpen: false }
    case ACTION_TYPES.DELETE_COMPANY_ERROR:
      return { ...state, errmsg: payload, isLoading: false }
    case ACTION_TYPES.DELETE_MODAL_OPEN:
      return { ...state, isModalOpen: true }
    case ACTION_TYPES.DELETE_MODAL_CLOSE:
      return { ...state, isModalOpen: false }
    default:
      return state;
  }
}