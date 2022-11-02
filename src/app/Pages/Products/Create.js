import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateProduct } from "../../Redux/actions/ProductsActions"
import { GetAllProductgroups } from "../../Redux/actions/ProductgroupsActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { colourStyles } from "../../Utils/Constants"
export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            groupuui: "",
            productcode: "",
            dimension: "",
            price: 0,
            uuid: null,
            createduser: "",
            updateduser: null,
            deleteuser: null,
            createdtime: null,
            updatetime: null,
            deletetime: null,
            isActive: true,
            productgroup: {},
            isFileChanged:false,
            isDataChanged:false
        }


        const defaultImageSrc = '/img/user.png'
        const image = {
            id: 0,
            name: "",
            filename: '',
            filefolder: ' ',
            filetype: ' ',
            downloadedcount: 0,
            lastdownloadeduser: ' ',
            lastdownloadedip: ' ',
            filepath: defaultImageSrc,
            file: null,
            concurrencyStamp: '',
            createdUser: '',
            updatedUser: '',
            deleteUser: '',
            createTime: null,
            updateTime: null,
            deleteTime: null,
            isActive: false
        }

        const selectedproductgroup = {}
        const productgroups = []
        const Isdatafetched = false
        this.state = { currentitem, selectedproductgroup, productgroups, Isdatafetched, defaultImageSrc, image };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.groupuui = this.state.selectedproductgroup.value
        this.setState({ currentitem: newdata }, () => {
            this.props.CreateProduct(this.state.currentitem, this.props.history)
        })
    }

    showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                const newdata = { ...this.state.image }
                newdata.file = imageFile
                newdata.filepath = x.target.result
                this.setState({ image: newdata })
            }
            reader.readAsDataURL(imageFile)
        } else {
            const newdata = { ...this.state.image }
            newdata.file = null
            newdata.filepath = this.state.defaultImageSrc
            this.setState({ image: newdata })
        }
    }

    componentDidMount() {
        this.props.GetAllProductgroups();
    }
    componentDidUpdate() {
        if (
            !this.props.Productgroups.isLoading &&
            !this.props.Products.isLoading &&
            this.props.Productgroups.list.length > 0 &&
            !this.state.Isdatafetched
        ) {
            const list = this.props.Productgroups.list.map((item, index) => {
                return { value: item.uuid, label: item.name }
            })
            this.setState({ productgroups: list, Isdatafetched: true })
        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Products")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    handleselect = (e) => {
        this.setState({ selectedproductgroup: e })
    }

    render() {
        const list = this.state.productgroups
        const isLoading = (this.props.Productgroups.isLoading || this.props.Products.isLoading)
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ürünler > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className='row'>
                                            <div className='col-9'>
                                                <div className="row">
                                                    <InputItem
                                                        itemrowspan="1"
                                                        itemname="isim"
                                                        itemid="name"
                                                        itemvalue={this.state.currentitem.name}
                                                        itemtype="text"
                                                        itemplaceholder="İsim"
                                                        itemchange={this.handleonchange}
                                                    />
                                                    <InputItem
                                                        itemrowspan="1"
                                                        itemname="Ürün Kodu"
                                                        itemid="productcode"
                                                        itemvalue={this.state.currentitem.productcode}
                                                        itemtype="text"
                                                        itemplaceholder="Ürün Kodu"
                                                        itemchange={this.handleonchange}
                                                    />
                                                    <InputItem
                                                        itemrowspan="1"
                                                        itemname="Ölçüler"
                                                        itemid="dimension"
                                                        itemvalue={this.state.currentitem.dimension}
                                                        itemtype="text"
                                                        itemplaceholder="Ölçüler"
                                                        itemchange={this.handleonchange}
                                                    />
                                                    <InputItem
                                                        itemrowspan="1"
                                                        itemname="Ürün Fiyatı"
                                                        itemid="price"
                                                        itemvalue={this.state.currentitem.price}
                                                        itemtype="number"
                                                        itemplaceholder="Ürün Fiyatı"
                                                        itemchange={this.handleonchange}
                                                    />
                                                </div>
                                                <label style={{ fontSize: "12px" }} className="col-form-label">Ürün Grubu</label>
                                                <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                    <Select
                                                        value={this.state.selectedproductgroup}
                                                        onChange={this.handleselect}
                                                        options={list}
                                                        style={colourStyles}
                                                    />
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <label>Ürün Fotoğrafı</label>
                                                <img style={{ objectFit: 'contain', margin: '5px', width: '100%', height: '60%', maxWidth: '200px', maxHeight: '200px', marginLeft: '15px' }} src={this.state.image.filepath} className="card-img-top" />
                                                <div className='form-group'>
                                                    <input className={"form-control-file"} style={{ width: '100%', maxWidth: '265px' }} accept='image/*' type="file"
                                                        onChange={this.showPreview}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                            <div className='row d-flex pr-5 justify-content-end align-items-right'>
                                                <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                                                <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Ekle</button>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    Productgroups: state.Productgroups,
    Products: state.Products
})

const mapDispatchToProps = { CreateProduct, GetAllProductgroups }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))