import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateSubcategory } from "../../Redux/actions/SubcategoriesActions"
import { GetAllCategories } from "../../Redux/actions/CategoriesActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';

export class Create extends Component {

    constructor(props) {
        super(props)
        const currentitem = {
            id: 0,
            name: "",
            categoryuui: "",
            uuid: null,
            createduser: "",
            updateduser: null,
            deleteuser: null,
            createdtime: null,
            updatetime: null,
            deletetime: null,
            isActive: true,
            category : {}
        }
        const selectedcategories = {}
        const categories = []
        const Isdatafetched = false
        this.state = { currentitem, selectedcategories, categories, Isdatafetched };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.categoryuui = this.state.selectedcategories.value
        this.setState({ currentitem: newdata }, () => {
            this.props.CreateSubcategory(this.state.currentitem, this.props.history)
        })
    }

    componentDidMount() {
        this.props.GetAllCategories();
    }
    componentDidUpdate() {
        if (
            !this.props.Subcategories.isLoading &&
            !this.props.Categories.isLoading &&
            this.props.Categories.list.length > 0 &&
            !this.state.Isdatafetched
        ) {
            const list = this.props.Categories.list.map((item, index) => {
                return { value: item.uuid, label: item.name }
            })
            this.setState({ categories: list, Isdatafetched: true })
        }
    }

    goBack = (e) => {
        e.preventDefault()
        this.props.history.push("/Subcategories")
    }

    handleonchange = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata })
    }

    handleselect = (e) => {
        this.setState({ selectedcategories: e })
    }

    render() {
        const list = this.state.categories
        const isLoading = (this.props.Subcategories.isLoading || this.props.Categories.isLoading)
        return (
            <>
                {isLoading ? <Spinner /> :
                    <div className='Page'>
                        <div className="col-12 grid-margin">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Durumlar > Yeni</h4>
                                    <form className="form-sample" onSubmit={this.handlesubmit}>
                                        <div className="row">
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
                                        <div className='row'>
                                            <label style={{ fontSize: "12px" }} className="col-form-label">Üst Kategori</label>
                                        </div>
                                        <div className='row'>
                                            <div style={{ marginRight: '-5px' }} className='col-12 pr-5 mb-3'>
                                                <Select
                                                    value={this.state.selectedcategories}
                                                    onChange={this.handleselect}
                                                    options={list}
                                                />
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
    Categories: state.Categories,
    Subcategories: state.Subcategories
})

const mapDispatchToProps = { CreateSubcategory, GetAllCategories }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))