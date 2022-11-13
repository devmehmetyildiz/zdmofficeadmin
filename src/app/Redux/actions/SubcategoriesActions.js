import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLSUBCATEGORIES_INIT: `GET_ALLSUBCATEGORIES_INIT`,
    GET_ALLSUBCATEGORIES_SUCCESS: `GET_ALLSUBCATEGORIES_SUCCESS`,
    GET_ALLSUBCATEGORIES_ERROR: `GET_ALLSUBCATEGORIES_ERROR`,

    GET_SELECTEDSUBCATEGORY_INIT: `GET_SELECTEDSUBCATEGORY_INIT`,
    GET_SELECTEDSUBCATEGORY_SUCCESS: `GET_SELECTEDSUBCATEGORY_SUCCESS`,
    GET_SELECTEDSUBCATEGORY_ERROR: `GET_SELECTEDSUBCATEGORY_ERROR`,

    REMOVE_SELECTEDSUBCATEGORY: `REMOVE_SELECTEDSUBCATEGORY`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_SUBCATEGORY_INIT: `CREATE_SUBCATEGORY_INIT`,
    CREATE_SUBCATEGORY_SUCCESS: `CREATE_SUBCATEGORY_SUCCESS`,
    CREATE_SUBCATEGORY_ERROR: `CREATE_SUBCATEGORY_ERROR`,

    EDIT_SUBCATEGORY_INIT: `EDIT_SUBCATEGORY_INIT`,
    EDIT_SUBCATEGORY_SUCCESS: `EDIT_SUBCATEGORY_SUCCESS`,
    EDIT_SUBCATEGORY_ERROR: `EDIT_SUBCATEGORY_ERROR`,

    DELETE_SUBCATEGORY_INIT: `DELETE_SUBCATEGORY_INIT`,
    DELETE_SUBCATEGORY_SUCCESS: `DELETE_SUBCATEGORY_SUCCESS`,
    DELETE_SUBCATEGORY_ERROR: `DELETE_SUBCATEGORY_ERROR`,
}

export const GetAllSubcategories = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLSUBCATEGORIES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.SUBCATEGORIES}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLSUBCATEGORIES_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.get, payload: error })
            AxiosErrorHandle(error, ROUTES.GET_ALLSUBCATEGORIES_ERROR, "GetAll")
        })
}

export const GetSelectedSubcategory = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDSUBCATEGORY_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.SUBCATEGORIES}/GetSelected?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDSUBCATEGORY_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDSUBCATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.SUBCATEGORIES, "GetSelected")
        })
};

export const CreateSubcategory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_SUBCATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.SUBCATEGORIES}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_SUBCATEGORY_SUCCESS })
            Popup("Success", "Alt Kategoriler", "Alt Kategori Oluşturuldu")
            historypusher.push("/Subcategories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_SUBCATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.SUBCATEGORIES, "Add")
        })
}

export const UpdateSubcategory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_SUBCATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.SUBCATEGORIES}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_SUBCATEGORY_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSUBCATEGORY })
            Popup("Success", "Alt Kategoriler", "Alt Kategori Güncellendi")
            historypusher.push("/Subcategories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_SUBCATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.SUBCATEGORIES, "Update")
        })
}

export const DeleteSubcategory = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_SUBCATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.SUBCATEGORIES}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_SUBCATEGORY_SUCCESS })
            dispatch({ type: ACTION_TYPES.GET_ALLSUBCATEGORIES_INIT })
            axios({
                method: `get`,
                url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.SUBCATEGORIES}/GetAll`,
                headers: { Authorization: `Bearer ${GetToken()}` }
            })
                .then(response => {
                    dispatch({ type: ACTION_TYPES.GET_ALLSUBCATEGORIES_SUCCESS, payload: response.data })
                })
                .catch(error => {
                    dispatch({ type: ACTION_TYPES.get, payload: error })
                    AxiosErrorHandle(error, ROUTES.GET_ALLSUBCATEGORIES_ERROR, "GetAll")
                })
            Popup("Success", "Alt Kategoriler", "Alt Kategori Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_SUBCATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.SUBCATEGORIES, "Delete")
        })
}

export const ClearSelectedSubcategory = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDSUBCATEGORY })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}