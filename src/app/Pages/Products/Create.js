import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { CreateProduct } from "../../Redux/actions/ProductsActions"
import { CreateFile } from "../../Redux/actions/FileActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';

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
            isActive: true
        }

        const currentfile = {

        }

        const selectedsetstatus = {}
        this.state = { currentitem, selectedsetstatus };
    }

    handlesubmit = (e) => {
        e.preventDefault()
        const newdata = { ...this.state.currentitem }
        newdata.isSet = this.state.selectedsetstatus.value
        this.setState({ currentitem: newdata }, () => {
            this.props.CreateProductgroups(this.state.currentitem, this.props.history)
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
                                        {this.state.selectedsetstatus.value ?
                                            <div className="row">
                                                <InputItem
                                                    itemrowspan="2"
                                                    itemname="Set Fiyatı"
                                                    itemid="price"
                                                    itemvalue={this.state.currentitem.price}
                                                    itemtype="number"
                                                    itemplaceholder="Set Fiyatı"
                                                    itemchange={this.handleonchange}
                                                />
                                            </div>
                                            : null}
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
    Products: state.Products,
    Files : state.Files,
    Productgroups : state.Productgroups
})

const mapDispatchToProps = { CreateProduct,CreateFile }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Create))