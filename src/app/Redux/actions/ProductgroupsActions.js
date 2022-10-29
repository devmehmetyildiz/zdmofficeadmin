import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLPRODUCTGROUPS_INIT: `GET_ALLPRODUCTGROUPS_INIT`,
    GET_ALLPRODUCTGROUPS_SUCCESS: `GET_ALLPRODUCTGROUPS_SUCCESS`,
    GET_ALLPRODUCTGROUPS_ERROR: `GET_ALLPRODUCTGROUPS_ERROR`,

    GET_SELECTEDPRODUCTGROUP_INIT: `GET_SELECTEDPRODUCTGROUP_INIT`,
    GET_SELECTEDPRODUCTGROUP_SUCCESS: `GET_SELECTEDPRODUCTGROUP_SUCCESS`,
    GET_SELECTEDPRODUCTGROUP_ERROR: `GET_SELECTEDPRODUCTGROUP_ERROR`,

    REMOVE_SELECTEDPRODUCTGROUP: `REMOVE_SELECTEDPRODUCTGROUP`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_PRODUCTGROUP_INIT: `CREATE_PRODUCTGROUP_INIT`,
    CREATE_PRODUCTGROUP_SUCCESS: `CREATE_PRODUCTGROUP_SUCCESS`,
    CREATE_PRODUCTGROUP_ERROR: `CREATE_PRODUCTGROUP_ERROR`,

    EDIT_PRODUCTGROUP_INIT: `EDIT_PRODUCTGROUP_INIT`,
    EDIT_PRODUCTGROUP_SUCCESS: `EDIT_PRODUCTGROUP_SUCCESS`,
    EDIT_PRODUCTGROUP_ERROR: `EDIT_PRODUCTGROUP_ERROR`,

    DELETE_PRODUCTGROUP_INIT: `DELETE_PRODUCTGROUP_INIT`,
    DELETE_PRODUCTGROUP_SUCCESS: `DELETE_PRODUCTGROUP_SUCCESS`,
    DELETE_PRODUCTGROUP_ERROR: `DELETE_PRODUCTGROUP_ERROR`,
}

export const GetAllProductgroups = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTGROUPS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTGROUPS_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTGROUPS_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "GetAll")
        })
}

export const GetSelectedProductgroups = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PRODUCTGROUPS}/GetSelected?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "GetSelected")
        })
};

export const CreateProductgroups  = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_SUCCESS })
            Popup("Success", "Ürün Grupları", "Ürün Grupları Oluşturuldu")
            historypusher.push("/Categories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Add")
        })
}

export const UpdateProductgroups  = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_PRODUCTGROUP_INIT })
    axios({
        method: `put`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_PRODUCTGROUP_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPRODUCTGROUP })
            Popup("Success", "Ürün Grupları", "Ürün Grupları Güncellendi")
            historypusher.push("/Categories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Update")
        })
}

export const DeleteProductgroups  = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_INIT })
    axios({
        method: `delete`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_SUCCESS })
            Popup("Success", "Ürün Grupları", "Ürün Grupları Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Delete")
        })
}

export const ClearSelectedProductgroups  = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPRODUCTGROUP })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}