import axios from "axios"
import { ROUTES } from "../../Utils/Constants";
import { AxiosErrorHandle, GetToken } from "../../Utils/TokenValidChecker";
import Popup from "../../Utils/Popup";

export const ACTION_TYPES = {
    GET_ALLPRODUCTS_INIT: `GET_ALLPRODUCTS_INIT`,
    GET_ALLPRODUCTS_SUCCESS: `GET_ALLPRODUCTS_SUCCESS`,
    GET_ALLPRODUCTS_ERROR: `GET_ALLPRODUCTS_ERROR`,

    GET_SELECTEDPRODUCT_INIT: `GET_SELECTEDPRODUCT_INIT`,
    GET_SELECTEDPRODUCT_SUCCESS: `GET_SELECTEDPRODUCT_SUCCESS`,
    GET_SELECTEDPRODUCT_ERROR: `GET_SELECTEDPRODUCT_ERROR`,

    REMOVE_SELECTEDPRODUCT: `REMOVE_SELECTEDPRODUCT`,
    DELETE_MODAL_OPEN: `DELETE_MODAL_OPEN`,
    DELETE_MODAL_CLOSE: `DELETE_MODAL_CLOSE`,

    CREATE_PRODUCT_INIT: `CREATE_PRODUCT_INIT`,
    CREATE_PRODUCT_SUCCESS: `CREATE_PRODUCT_SUCCESS`,
    CREATE_PRODUCT_ERROR: `CREATE_PRODUCT_ERROR`,

    EDIT_PRODUCT_INIT: `EDIT_PRODUCT_INIT`,
    EDIT_PRODUCT_SUCCESS: `EDIT_PRODUCT_SUCCESS`,
    EDIT_PRODUCT_ERROR: `EDIT_PRODUCT_ERROR`,

    DELETE_PRODUCT_INIT: `DELETE_PRODUCT_INIT`,
    DELETE_PRODUCT_SUCCESS: `DELETE_PRODUCT_SUCCESS`,
    DELETE_PRODUCT_ERROR: `DELETE_PRODUCT_ERROR`,
}

export const GetAllProducs = () => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTS_INIT })
    await axios({
        method: `get`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTS}/GetAll`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => {
            dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTS_SUCCESS, payload: response.data })
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTS_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTS, "GetAll")
        })
}

export const GetSelectedProduct = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCT_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PRODUCTS}/GetSelected?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCT_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_SELECTEDPRODUCT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTS, "GetSelected")
        })
};

export const CreateProduct  = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PRODUCT_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTS}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCT_SUCCESS })
            Popup("Success", "Ürünler", "Kategori Oluşturuldu")
            historypusher.push("/Products")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTS, "Add")
        })
}

export const UpdateProduct  = (Item, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_PRODUCT_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTS}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.EDIT_PRODUCT_SUCCESS })
            dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPRODUCT })
            Popup("Success", "Ürünler", "Ürünler Güncellendi")
            historypusher.push("/Products")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_PRODUCT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTS, "Update")
        })
}

export const DeleteProduct  = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTS}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_SUCCESS })
            Popup("Success", "Ürünler", "Ürünler Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCT_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTS, "Delete")
        })
}

export const ClearSelectedProduct = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPRODUCT })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}