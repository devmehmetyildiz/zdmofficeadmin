import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateProductgroups, GetSelectedProductgroups, ClearSelectedProductgroups, GetAllFiles } from "../../Redux/actions/ProductgroupsActions"
import { GetAllCategories } from "../../Redux/actions/CategoriesActions"
import { GetAllCompanies } from "../../Redux/actions/CompanyActions"
import { GetAllSubcategories } from "../../Redux/actions/SubcategoriesActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { ROUTES } from '../../Utils/Constants';

export class Edit extends Component {

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
      subcategory: {}
    }
    const defaultImageSrc = '/img/user.png'
    const selectedsetstatus = {}
    const categories = []
    const subcategories = []
    const isDataFetched = false
    const selectedcategory = {}
    const selectedsubcategory = {}
    const companies = []
    const selectedcompany = {}
    const files = []
    this.state = { companies, selectedcompany, currentitem, selectedsetstatus, categories, subcategories, isDataFetched, selectedcategory, selectedsubcategory, defaultImageSrc, files };
  }





  handlesubmit = (e) => {
    e.preventDefault()
    const newdata = { ...this.state.currentitem }
    newdata.isSet = this.state.selectedsetstatus ? this.state.selectedsetstatus.value : false
    newdata.categoryuuid = this.state.selectedcategory ? this.state.selectedcategory.value : ''
    newdata.companyuuid = this.state.selectedcompany ? this.state.selectedcompany.value : ''
    newdata.products.forEach(element => {
      element.subcategoryuuid = element.subcategoryuuid ? element.subcategoryuuid.value : ''
    });
    this.setState({ currentitem: newdata }, () => {
      const prevfiles = []
      const newdata = { ...this.state.currentitem }
      newdata.products.forEach((element, index) => {
        prevfiles.push(element.file)
      });
      console.log('prevfiles: ', prevfiles);
      this.setState({ files: prevfiles }, () => {
        console.log('files: ', this.state.files);
        newdata.products.forEach((element, index) => {
          delete element.file
        });
        console.log('newdata: ', newdata);
        this.props.UpdateProductgroups(this.state.currentitem, this.state.files, this.props.history)

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
  handleselectcompanies = (e) => {
    this.setState({ selectedcompany: e })
  }
  handleselectcategories = (e) => {
    this.setState({ selectedcategory: e })
  }

  handleselectsubcategories = (e) => {
    this.setState({ selectedsubcategory: e })
  }

  componentDidMount() {
    this.props.GetSelectedProductgroups(this.props.match.params.Id);
    this.props.GetAllFiles(this.props.match.params.Id)
    this.props.GetAllCategories()
    this.props.GetAllSubcategories()
    this.props.GetAllCompanies()
  }

  componentWillUnmount() {
    this.props.ClearSelectedProductgroups()
  }

  componentDidUpdate() {
    if (
      this.props.Productgroups.files.length > 0 &&
      this.props.Productgroups.selected_record.id > 0 &&
      this.props.Categories.list.length > 0 &&
      this.props.Companies.list.length > 0 &&
      this.props.Subcategories.list.length > 0 &&
      !this.props.Categories.isLoading &&
      !this.props.Subcategories.isLoading &&
      !this.props.Companies.isLoading &&
      !this.state.isDataFetched
    ) {
      const categorylist = this.props.Categories.list.map(item => {
        return { value: item.uuid, label: item.name }
      })
      const subcategorylist = this.props.Subcategories.list.map(item => {
        return { value: item.uuid, label: item.name }
      })
      const companylist = this.props.Companies.list.map(item => {
        return { value: item.uuid, label: item.name }
      })
      let prevselectedsetstatus = {}
      const newdata = { ...this.props.Productgroups.selected_record }
      newdata.isSet ? prevselectedsetstatus = { value: true, label: 'Set Ürün' } : prevselectedsetstatus = { value: false, label: 'Set Ürün Değil' }
      newdata.products.forEach(element => {
        element.file = this.props.Productgroups.files.find(u => u.productuui === element.uuid)
        element.subcategoryuuid = subcategorylist.find(u => u.value === element.subcategoryuuid)
      });
      const prevselectedcategory = this.props.Productgroups.selected_record.category ? {
        value: this.props.Productgroups.selected_record.category.uuid,
        label: this.props.Productgroups.selected_record.category.name
      } : null
      const prevselectedcompany = this.props.Productgroups.selected_record.company ? {
        value: this.props.Productgroups.selected_record.company.uuid,
        label: this.props.Productgroups.selected_record.company.name
      } : null
      this.setState({ selectedsetstatus: prevselectedsetstatus, selectedcompany: prevselectedcompany, companies: companylist, categories: categorylist, subcategories: subcategorylist, isDataFetched: true, currentitem: newdata, selectedcategory: prevselectedcategory })
    }
  }


  AddProduct = (e) => {
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
    if (newdata.products[index].uuid || newdata.products[index].uuid !== '') {
      newdata.products[index].isActive = false
      newdata.products[index].isDataChanged = true
      this.setState({ currentitem: newdata })
    } else {
      newdata.products.splice(index, 1);
      this.setState({ currentitem: newdata })
    }

  }

  handleproductchange = (e, index) => {
    const newdata = { ...this.state.currentitem }
    newdata.products[index][e.target.id] = e.target.value
    newdata.products[index].isDataChanged = true
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
        newdata.products[index].isFileChanged = true
        newdata.products[index].isDataChanged = true
        this.setState({ currentitem: newdata }, () => {
          console.log('currentitem: ', this.state.currentitem);
  
        })
      }
      reader.readAsDataURL(imageFile)
    } else {
      const newdata = { ...this.state.currentitem }
      newdata.products[index].file.file = null
      newdata.products[index].file.filepath = this.state.defaultImageSrc
      newdata.products[index].name = ""
      this.setState({ currentitem: newdata }, () => {
        console.log('currentitem: ', this.state.currentitem);

      })
    }
  }

  handlecategorychange = (e, index) => {
    const newdata = { ...this.state.currentitem }
    newdata.products[index].subcategoryuuid = e
    newdata.products[index].isDataChanged = true
    this.setState({ currentitem: newdata })
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
                  <h4 className="card-title">Ürün Grubu - Yeni</h4>
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
                      {/*    <div className='col'>
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
                      </div> */}
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
                            <div key={product} className='d-flex flex-column justfiy-content-center align-items-center flex-nowrap w-100'>
                              <div className='d-flex justfiy-content-center align-items-center flex-nowrap w-100'>
                                <div className='col m-2'>
                                  {index > 0 ? null : <label>Dosya Yükleme</label>}
                                  <div className="d-flex flex-row justify-content-center align-items-center">
                                    {((product.file ? product.file.uuid !== "" : false) || (product.file ? (product.file.file ? product.file.file.name : false) : false)) ?
                                      <i className="mdi mdi-check-circle text-primary display-5 mr-2"></i> : <i className="mdi mdi-close-circle text-primary display-5 mr-2"></i>}
                                    <input className={"form-control-file"} accept='image/*' type="file"
                                      onChange={(e) => { this.showPreview(e, index) }}
                                    />
                                  </div>
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
                                  {index > 0 ? null : <label>Ürün Kategorisi</label>}
                                  <Select
                                    value={product.subcategoryuuid}
                                    onChange={(e) => { this.handlecategorychange(e, index) }}
                                    options={this.state.subcategories}
                                  />
                                </div>
                                <div style={{ width: '50%' }} className='col m-2 '>
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
                      <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Güncelle</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div >
        }
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  Productgroups: state.Productgroups,
  Categories: state.Categories,
  Subcategories: state.Subcategories,
  Companies: state.Companies,
})

const mapDispatchToProps = { GetAllCompanies, UpdateProductgroups, GetSelectedProductgroups, ClearSelectedProductgroups, GetAllCategories, GetAllSubcategories, GetAllFiles }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))