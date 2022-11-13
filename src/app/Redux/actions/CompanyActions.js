import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLCOMPANIES_INIT: `GET_ALLCOMPANIES_INIT`,
    GET_ALLCOMPANIES_SUCCESS: `GET_ALLCOMPANIES_SUCCESS`,
    GET_ALLCOMPANIES_ERROR: `GET_ALLCOMPANIES_ERROR`,

    GET_SELECTEDCOMPANY_INIT: `GET_SELECTEDCOMPANY_INIT`,
    GET_SELECTEDCOMPANY_SUCCESS: `GET_SELECTEDCOMPANY_SUCCESS`,
    GET_SELECTEDCOMPANY_ERROR: `GET_SELECTEDCOMPANY_ERROR`,

    REMOVE_SELECTEDCOMPANY: `REMOVE_SELECTEDCOMPANY`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_COMPANY_INIT: `CREATE_COMPANY_INIT`,
    CREATE_COMPANY_SUCCESS: `CREATE_COMPANY_SUCCESS`,
    CREATE_COMPANY_ERROR: `CREATE_COMPANY_ERROR`,

    EDIT_COMPANY_INIT: `EDIT_COMPANY_INIT`,
    EDIT_COMPANY_SUCCESS: `EDIT_COMPANY_SUCCESS`,
    EDIT_COMPANY_ERROR: `EDIT_COMPANY_ERROR`,

    DELETE_COMPANY_INIT: `DELETE_COMPANY_INIT`,
    DELETE_COMPANY_SUCCESS: `DELETE_COMPANY_SUCCESS`,
    DELETE_COMPANY_ERROR: `DELETE_COMPANY_ERROR`,
}

export const GetAllCompanies = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COMPANY}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.COMPANY, "GetAll")
        })
}

export const GetSelectedCompany = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCOMPANY_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.COMPANY}/GetSelected?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCOMPANY_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDCOMPANY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.COMPANY, "GetSelected")
        })
};

export const CreateCompany = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_COMPANY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COMPANY}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_COMPANY_SUCCESS })
            Popup("Success", "FİRMALAR", "Firma Oluşturuldu")
            historypusher.push("/Companies")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_COMPANY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.COMPANY, "Add")
        })
}

export const UpdateCompany = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_COMPANY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COMPANY}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_COMPANY_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCOMPANY })
            Popup("Success", "FİRMALAR", "Firma Güncellendi")
            historypusher.push("/Companies")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_COMPANY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.COMPANY, "Update")
        })
}

export const DeleteCompany = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_COMPANY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COMPANY}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_COMPANY_SUCCESS })
            dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_INIT })
            axios({
                method: `get`,
                url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.COMPANY}/GetAll`,
                headers: { Authorization: `Bearer ${GetToken()}` }
            })
                .then(response => {
                    dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_SUCCESS, payload: response.data })
                })
                .catch(error => {
                    dispatch({ type: ACTION_TYPES.GET_ALLCOMPANIES_ERROR, payload: error })
                    AxiosErrorHandle(error, ROUTES.COMPANY, "GetAll")
                })
            Popup("Success", "FİRMALAR", "Firma Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_COMPANY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.COMPANY, "Delete")
        })
}

export const ClearSelectedCompany = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCOMPANY })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}