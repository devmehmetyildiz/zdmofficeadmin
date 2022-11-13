import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLCATEGORIES_INIT: `GET_ALLCATEGORIES_INIT`,
    GET_ALLCATEGORIES_SUCCESS: `GET_ALLCATEGORIES_SUCCESS`,
    GET_ALLCATEGORIES_ERROR: `GET_ALLCATEGORIES_ERROR`,

    GET_SELECTEDCATEGORY_INIT: `GET_SELECTEDCATEGORY_INIT`,
    GET_SELECTEDCATEGORY_SUCCESS: `GET_SELECTEDCATEGORY_SUCCESS`,
    GET_SELECTEDCATEGORY_ERROR: `GET_SELECTEDCATEGORY_ERROR`,

    REMOVE_SELECTEDCATEGORY: `REMOVE_SELECTEDCATEGORY`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_CATEGORY_INIT: `CREATE_CATEGORY_INIT`,
    CREATE_CATEGORY_SUCCESS: `CREATE_CATEGORY_SUCCESS`,
    CREATE_CATEGORY_ERROR: `CREATE_CATEGORY_ERROR`,

    EDIT_CATEGORY_INIT: `EDIT_CATEGORY_INIT`,
    EDIT_CATEGORY_SUCCESS: `EDIT_CATEGORY_SUCCESS`,
    EDIT_CATEGORY_ERROR: `EDIT_CATEGORY_ERROR`,

    DELETE_CATEGORY_INIT: `DELETE_CATEGORY_INIT`,
    DELETE_CATEGORY_SUCCESS: `DELETE_CATEGORY_SUCCESS`,
    DELETE_CATEGORY_ERROR: `DELETE_CATEGORY_ERROR`,
}

export const GetAllCategories = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CATEGORIES}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CATEGORIES, "GetAll")
        })
}

export const GetSelectedCategory = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDCATEGORY_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.CATEGORIES}/GetSelected?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDCATEGORY_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDCATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CATEGORIES, "GetSelected")
        })
};

export const CreateCategory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_CATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CATEGORIES}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_CATEGORY_SUCCESS })
            Popup("Success", "Kategoriler", "Kategori Oluşturuldu")
            historypusher.push("/Categories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_CATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CATEGORIES, "Add")
        })
}

export const UpdateCategory = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_CATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CATEGORIES}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_CATEGORY_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCATEGORY })
            Popup("Success", "Kategoriler", "Kategori Güncellendi")
            historypusher.push("/Categories")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_CATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CATEGORIES, "Update")
        })
}

export const DeleteCategory = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_CATEGORY_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CATEGORIES}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_CATEGORY_SUCCESS })
            dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_INIT })
            axios({
                method: `get`,
                url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.CATEGORIES}/GetAll`,
                headers: { Authorization: `Bearer ${GetToken()}` }
            })
                .then(response => {
                    dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_SUCCESS, payload: response.data })
                })
                .catch(error => {
                    dispatch({ type: ACTION_TYPES.GET_ALLCATEGORIES_ERROR, payload: error })
                    AxiosErrorHandle(error, ROUTES.CATEGORIES, "GetAll")
                })
            Popup("Success", "Kategoriler", "Kategori Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_CATEGORY_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.CATEGORIES, "Delete")
        })
}

export const ClearSelectedCategory = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDCATEGORY })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}