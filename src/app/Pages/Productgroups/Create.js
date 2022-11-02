import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateProductgroups } from "../../Redux/actions/ProductgroupsActions"
import { GetAllCategories } from "../../Redux/actions/CategoriesActions"
import { GetAllSubcategories } from "../../Redux/actions/SubcategoriesActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { Form } from 'react-bootstrap';

export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            isSet: false,
            price: 0,
            uuid: null,
            createduser: "",
            updateduser: null,
            deleteuser: null,
            createdtime: null,
            updatetime: null,
            deletetime: null,
            isActive: true,
            products: [],
            categoryuuid: "",
            subcategoryuuid: "",
            category: {},
            subcategory: {},
            companyuuid: "",
            company: {}
        }
        const defaultImageSrc = '/img/user.png'
        const selectedsetstatus = {}
        const categories = []
        const companies = []
        const subcategories = []
        const isDataFetched = false
        const selectedcategory = {}
        const selectedsubcategory = {}
        const selectedcompany = {}
        const files = []
        this.state = { companies, selectedcompany, currentitem, selectedsetstatus, categories, subcategories, isDataFetched, selectedcategory, selectedsubcategory, defaultImageSrc, files };
    }





    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.isSet = this.state.selectedsetstatus.value
        newdata.categoryuuid = this.state.selectedcategory.value
        newdata.subcategoryuuid = this.state.selectedsubcategory.value
        newdata.companyuuid = this.state.selectedcompany.value
        this.setState({ currentitem: newdata }, () => {
            const prevfiles = []
            const newdata = { ...this.state.currentitem }
            newdata.products.forEach((element, index) => {
                prevfiles.push(element.file)
            });
            this.setState({ files: prevfiles }, () => {
                newdata.products.forEach((element, index) => {
                    delete element.file
                });
                this.props.CreateProductgroups(this.state.currentitem, this.state.files, this.props.history)

            })
        })
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Productgroups")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    handleselect = (e) => {
        this.setState({ selectedsetstatus: e })
    }

    handleselectcategories = (e) => {
        this.setState({ selectedcategory: e })
    }

    handleselectsubcategories = (e) => {
        this.setState({ selectedsubcategory: e })
    }
    handleselectcompanies = (e) => {
        this.setState({ selectedcompany: e })
    }

    componentDidMount() {
        this.props.GetAllCategories()
        this.props.GetAllSubcategories()
    }

    componentDidUpdate() {
        if (
            this.props.Categories.list.length > 0 &&
            this.props.Companies.list.length > 0 &&
            this.props.Subcategories.list.length > 0 &&
            !this.props.Categories.isLoading &&
            !this.props.Subcategories.isLoading &&
            !this.state.isDataFetched
        ) {
            const companylist = this.props.Companies.list.map(item => {
                return { value: item.uuid, label: item.name }
            })
            const categorylist = this.props.Categories.list.map(item => {
                return { value: item.uuid, label: item.name }
            })
            const subcategorylist = this.props.Subcategories.list.map(item => {
                return { value: item.uuid, label: item.name }
            })
            this.setState({ categories: categorylist, subcategories: subcategorylist, isDataFetched: true, companies: companylist })
        }
    }


    AddProduct = (e) => {
        console.log('e: ', e);
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.products.push({
            id: this.state.currentitem.products.length + 1,
            name: "",
            groupuui: "",
            productcode: "",
            productgroup: {},
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
            file: {
                id: 0,
                name: "",
                filename: '',
                filefolder: ' ',
                filetype: ' ',
                filepath: this.state.defaultImageSrc,
                file: null,
                uuid: '',
                createdUser: '',
                updatedUser: '',
                deleteUser: '',
                createTime: null,
                updateTime: null,
                deleteTime: null,
                isActive: false,
                productuui: ""
            }
        })
        this.setState({ currentitem: newdata })
    }

    DeleteProduct = (e, index) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.products.splice(index, 1);
        this.setState({ currentitem: newdata })

    }

    handleproductchange = (e, index) => {
        const newdata = { ...this.state.currentitem }
        newdata.products[index][e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    showPreview = (e, index) => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = x => {
                const newdata = { ...this.state.currentitem }
                newdata.products[index].file.file = imageFile
                newdata.products[index].file.filepath = x.target.result
                newdata.products[index].name = newdata.products[index].file.file.name.replace(/\.[^/.]+$/, "")
                this.setState({ currentitem: newdata })
            }
            reader.readAsDataURL(imageFile)
        } else {
            const newdata = { ...this.state.currentitem }
            newdata.products[index].file.file = null
            newdata.products[index].file.filepath = this.state.defaultImageSrc
            newdata.products[index].name = ""
            this.setState({ currentitem: newdata })
        }
    }

    render() {
        const isLoading = (this.props.Productgroups.isLoading)
        const list = [
            { value: false, label: 'Set Ürün Değil' },
            { value: true, label: 'Set Ürün' }
        ]
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Ürün Grubu > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
                                            <div className='col'>
                                                <InputItem
                                                    itemrowspan="2"
                                                    itemname="isim"
                                                    itemid="name"
                                                    itemvalue={this.state.currentitem.name}
                                                    itemtype="text"
                                                    itemplaceholder="İsim"
                                                    itemchange={this.handleonchange}
                                                />
                                            </div>
                                            <div className='col'>
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Set Ürün Seçimi</label>
                                                </div>
                                                <div className='row'>
                                                    <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                        <Select
                                                            value={this.state.selectedsetstatus}
                                                            onChange={this.handleselect}
                                                            options={list}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Kategori</label>
                                                </div>
                                                <div className='row'>
                                                    <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                        <Select
                                                            value={this.state.selectedcategory}
                                                            onChange={this.handleselectcategories}
                                                            options={this.state.categories}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Alt Kategori</label>
                                                </div>
                                                <div className='row'>
                                                    <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                        <Select
                                                            value={this.state.selectedsubcategory}
                                                            onChange={this.handleselectsubcategories}
                                                            options={this.state.subcategories}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col'>
                                                <div className='row'>
                                                    <label style={{ fontSize: "12px" }} className="col-form-label">Firma</label>
                                                </div>
                                                <div className='row'>
                                                    <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                        <Select
                                                            value={this.state.selectedcompany}
                                                            onChange={this.handleselectcompanies}
                                                            options={this.state.companies}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='row w-100 d-flex px-8 justify-content-end align-items-center m-2'>
                                            <button style={{ minWidth: '150px' }} className="btn btn-primary mr-2" onClick={this.AddProduct}>Ürün Ekle</button>
                                        </div>
                                        <div className='row w-100'>
                                            {this.state.currentitem.products.map((product, index) => {
                                                return <>
                                                    {product.isActive ?
                                                        <div className='d-flex flex-column justfiy-content-center align-items-center flex-nowrap w-100'>
                                                            <div className='d-flex justfiy-content-center align-items-center flex-nowrap w-100'>
                                                                <div className='col m-2'>
                                                                    {index > 0 ? null : <label>Ürün Fotoğrafı</label>}
                                                                    <input className={"form-control-file"} accept='image/*' type="file"
                                                                        onChange={(e) => { this.showPreview(e, index) }}
                                                                    />
                                                                </div>
                                                                <div className='col m-2'>
                                                                    {index > 0 ? null : <label>Ürün Adı</label>}
                                                                    <Form.Control className='' id="name" placeholder='isim' type='text' value={product.name} onChange={(e) => { this.handleproductchange(e, index) }} />
                                                                </div>
                                                                <div className='col m-2'>
                                                                    {index > 0 ? null : <label>Ürün Kodu</label>}
                                                                    <Form.Control className='' id="productcode" placeholder='Ürün Kodu' type='text' value={product.productcode} onChange={(e) => { this.handleproductchange(e, index) }} />
                                                                </div>
                                                                <div className='col m-2'>
                                                                    {index > 0 ? null : <label>Ebatlar</label>}
                                                                    <Form.Control className='' id="dimension" placeholder='Ebat' type='text' value={product.dimension} onChange={(e) => { this.handleproductchange(e, index) }} />
                                                                </div>
                                                                <div className='col m-2'>
                                                                    {index > 0 ? null : <label>Ürün Fiyatı</label>}
                                                                    <Form.Control className='' id="price" placeholder='Fiyat' type='text' value={product.price} onChange={(e) => { this.handleproductchange(e, index) }} />
                                                                </div>
                                                                <div className='row m-2'>
                                                                    <button className='btn btn-primary' onClick={(e) => { this.DeleteProduct(e, index) }}>Sil</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        : null}
                                                </>
                                            })}
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
    Categories: state.Categories,
    Subcategories: state.Subcategories,
    Companies: state.Companies
})

const mapDispatchToProps = { CreateProductgroups, GetAllCategories, GetAllSubcategories }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))