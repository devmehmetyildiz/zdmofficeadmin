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

    GET_ALLFILES_INIT: `GET_ALLFILES_INIT`,
    GET_ALLFILES_SUCCESS: `GET_ALLFILES_SUCCESS`,
    GET_ALLFILES_ERROR: `GET_ALLFILES_ERROR`,
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

export const GetAllFiles = (ItemId) => async dispatch => {
    dispatch({ type: ACTION_TYPES.GET_ALLFILES_INIT })
    await axios({
        method: `get`,
        url: `${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PRODUCTGROUPS}/GetFiles?guid=${ItemId}`,
        headers: { Authorization: `Bearer ${GetToken()}` }
    })
        .then(response => dispatch({ type: ACTION_TYPES.GET_ALLFILES_SUCCESS, payload: response.data }))
        .catch(error => {
            dispatch({ type: ACTION_TYPES.GET_ALLFILES_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "GetFiles")
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

export const CreateProductgroups = (Item, files, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Add`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then((res) => {
            var uploadedproducts = res.data
            files.forEach(file => {
                file.productuui = uploadedproducts.find(item => item.productname === file.file.name.replace(/\.[^/.]+$/, "")).productuuid

                const formData = new FormData();
                formData.append('id', file.id);
                formData.append('productuui', file.productuui);
                formData.append('name', file.name);
                formData.append('filefolder', file.filefolder);
                formData.append('filetype', file.filetype);
                formData.append('file', file.file);
                formData.append('uuid', file.uuid);
                formData.append('createdUser', file.createdUser);
                formData.append('updatedUser', file.updatedUser);
                formData.append('deleteUser', file.deleteUser);
                formData.append('isActive', file.isActive);

                axios({
                    method: `post`,
                    url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Add`,
                    headers: { Authorization: `Bearer ${GetToken()}` },
                    data: formData
                })
                    .then((res) => {
                        Popup("Success", "Dosyalar", `Dosya Yüklendi : ${file.name}`)
                    })
                    .catch(error => {
                        AxiosErrorHandle(error, ROUTES.FILE, "Add")
                    })

            });
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_SUCCESS })
            Popup("Success", "Ürün Grupları", "Ürün Grupları Oluşturuldu")
            historypusher.push("/Productgroups")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Add")
        })
}

export const UpdateProductgroups = (Item,files, historypusher) => dispatch => {
    dispatch({ type: ACTION_TYPES.EDIT_PRODUCTGROUP_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Update`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then((res) => {
            console.log('res: ', res);
            var uploadedproducts = res.data
           if(Array.isArray(uploadedproducts)&& uploadedproducts.length>0){
            files.forEach(file => {
                file.productuui = uploadedproducts.find(item => item.productname === file.file.name.replace(/\.[^/.]+$/, "")).productuuid

                const formData = new FormData();
                formData.append('id', file.id);
                formData.append('productuui', file.productuui);
                formData.append('name', file.name);
                formData.append('filefolder', file.filefolder);
                formData.append('filetype', file.filetype);
                formData.append('file', file.file);
                formData.append('uuid', file.uuid);
                formData.append('createdUser', file.createdUser);
                formData.append('updatedUser', file.updatedUser);
                formData.append('deleteUser', file.deleteUser);
                formData.append('isActive', file.isActive);
                console.log('uploadedproducts.find(item => item.productname === file.file.name.replace(/\.[^/.]+$/, "")).isFileUpdate: ', uploadedproducts.find(item => item.productname === file.file.name.replace(/\.[^/.]+$/, "")).isFileUpdate);
                if (uploadedproducts.find(item => item.productname === file.file.name.replace(/\.[^/.]+$/, "")).isFileUpdate) {
                    axios({
                        method: `post`,
                        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Update`,
                        headers: { Authorization: `Bearer ${GetToken()}` },
                        data: formData
                    })
                        .then(() => {
                            Popup("Success", "Dosyalar", `Dosya Güncellendi: ${file.name}`)
                        })
                        .catch(error => {
                            AxiosErrorHandle(error, ROUTES.FILE, "Update")
                        })
                } else {
                    axios({
                        method: `post`,
                        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.FILE}/Add`,
                        headers: { Authorization: `Bearer ${GetToken()}` },
                        data: formData
                    })
                        .then((res) => {
                            Popup("Success", "Dosyalar", `Dosya Yüklendi : ${file.name}`)
                        })
                        .catch(error => {
                            AxiosErrorHandle(error, ROUTES.FILE, "Add")
                        })
                }
            });
           }
            dispatch({ type: ACTION_TYPES.CREATE_PRODUCTGROUP_SUCCESS })
            Popup("Success", "Ürün Grupları", "Ürün Grupları Oluşturuldu")
            historypusher.push("/Productgroups")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.EDIT_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Update")
        })
}

export const DeleteProductgroups = (Item) => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_INIT })
    axios({
        method: `post`,
        url: process.env.REACT_APP_BACKEND_URL + `/${ROUTES.PRODUCTGROUPS}/Delete`,
        headers: { Authorization: `Bearer ${GetToken()}` },
        data: Item
    })
        .then(() => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_SUCCESS })
            dispatch({ type: ACTION_TYPES.GET_ALLPRODUCTGROUPS_INIT })
            axios({
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
            Popup("Success", "Ürün Grupları", "Ürün Grupları Silindi")
        })
        .catch(error => {
            dispatch({ type: ACTION_TYPES.DELETE_PRODUCTGROUP_ERROR, payload: error })
            AxiosErrorHandle(error, ROUTES.PRODUCTGROUPS, "Delete")
        })
}

export const ClearSelectedProductgroups = () => dispatch => {
    dispatch({ type: ACTION_TYPES.REMOVE_SELECTEDPRODUCTGROUP })
}

export const OpenDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_OPEN })
}

export const CloseDeleteModal = () => dispatch => {
    dispatch({ type: ACTION_TYPES.DELETE_MODAL_CLOSE })
}