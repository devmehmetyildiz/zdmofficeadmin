import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from "../Components/Common/Forminput"
import Loader from "../Pages/Common/Loader"
import { SetLogin } from '../Redux/actions/loginActions';
import {  Form } from 'react-bootstrap';
import images from "../../assets/images/images"
export class Login extends Component {
    constructor(props) {
        super(props)
        const currentitem = {
            username: '',
            password: ''
        }
        const isLoading = false;
        this.state = {
            currentitem,
            isLoading
        }
    }

    handlesubmit = (e) => {
        e.preventDefault();
        this.PostData()

    }
    handleChangeInput = (e) => {
        const newdata = { ...this.state.currentitem }
        newdata[e.target.id] = e.target.value
        this.setState({ currentitem: newdata }, () => {
        })
    }

    PostData = async () => {
        this.props.SetLogin(this.state.currentitem, this.props.history)
    }

    render() {
        const isLoading = this.props.user.isloading;
        return (
            <>
                {
                    isLoading ? <Loader /> :
                        <div>
                            <div className="d-flex align-items-center auth px-0">
                                <div className="row w-100 mx-0">
                                    <div className="col-lg-4 mx-auto">
                                        <div className="card text-center py-5 px-4 px-sm-5 w-full">
                                            <div className="brand-logo w-full flex justfy-center items-center">
                                                <img src={images.logo} alt="logo" />
                                            </div>
                                            <h4>ZDM Ofis Site Yönetimi</h4>
                                            <h6 className="font-weight-light">Devam Etmek için Giriş Yapın.</h6>
                                            <Form className="pt-3">
                                                <div className='row'>
                                                    <InputItem
                                                        itemrowspan="2"
                                                        itemname="Kullanıcı Adı"
                                                        itemid="username"
                                                        itemvalue={this.state.currentitem.username}
                                                        itemtype="text"
                                                        itemplaceholder="Kullanıcı Adı"
                                                        itemchange={this.handleChangeInput}
                                                    />
                                                </div>
                                                <div className='row'>
                                                    <InputItem
                                                        itemrowspan="2"
                                                        itemname="Şifre"
                                                        itemid="password"
                                                        itemvalue={this.state.currentitem.password}
                                                        itemtype="password"
                                                        itemplaceholder="Şifre"
                                                        itemchange={this.handleChangeInput}
                                                    />
                                                </div>
                                                <div className="mt-3 col-12 pr-5">
                                                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={this.handlesubmit}>Giriş Yap</button>
                                                </div>
                                            </Form>
                                        </div>
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
    user: state.ActiveUser
})
const mapDispatchToProps = { SetLogin }
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))