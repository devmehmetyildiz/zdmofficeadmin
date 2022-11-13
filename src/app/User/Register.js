import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import InputItem from "../Components/Common/Forminput"
import ErrorHandler from '../Utils/ErrorHandler';
import Popup from '../Utils/Popup';
import images from "../../assets/images/images"
import { Form } from 'react-bootstrap';

export class Register extends Component {
  constructor(props) {
    super(props)
    const currentitem = {
    username: "",
      password: "",
      email: ""
    }
    this.state = { currentitem }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + '/Auth/Register', this.state.currentitem)
      .then(res => {
        console.log('res: ', res);
        Popup("Success", "Kullanıcı Oluşturma", res.data.massage)
        this.props.history.push("/Login")
      })
      .catch(err => {
        console.log('err: ', err);
        ErrorHandler(err.response, "Kullanıcı Kaydı", "Kullanıcı oluşturulamadı.")
      })
  }

  handleChangeInput = (e) => {
    const newdata = { ...this.state.currentitem }
    newdata[e.target.id] = e.target.value
    this.setState({ currentitem: newdata }, () => {
    })
  }

  render() {
    return (
      <div>
        <div className="d-flex align-items-center auth px-0 h-100">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-center py-5 px-4 px-sm-5 w-full">
                <div className="brand-logo w-full flex justfy-center items-center">
                  <img src={images.logo} alt="logo" />
                </div>
                <h4>ZDM Ofis Site Yönetimi</h4>
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
                      itemname="E-mail"
                      itemid="email"
                      itemvalue={this.state.currentitem.email}
                      itemtype="text"
                      itemplaceholder="Email"
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
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn text-[#c5a47e]" onClick={this.handleSubmit}>Kayıt Ol</button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
