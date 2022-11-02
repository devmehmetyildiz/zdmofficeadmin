import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateCompany, GetSelectedCompany, ClearSelectedCompany } from "../../Redux/actions/CompanyActions"
import Spinner from '../../shared/Spinner'
import Select from 'react-select';
export class Edit extends Component {

  constructor(props) {
    super(props)
    const currentitem = {
      id: 0,
      name: "",
      uuid: null,
      createduser: "",
      updateduser: null,
      deleteuser: null,
      createdtime: null,
      updatetime: null,
      deletetime: null,
      isActive: true,
    }
    this.state = { currentitem };
  }

  componentWillUnmount() {
    this.props.ClearSelectedCompany()
  }

  handlesubmit = (e) => {
    e.preventDefault()
    this.props.UpdateCompany(this.state.currentitem, this.props.history)
  }

  componentDidMount() {
    this.props.GetSelectedCompany(this.props.match.params.Id);
  }
  componentDidUpdate() {
    if (
      this.props.Companies.selected_record.id !== 0 &&
      !this.props.Companies.isLoading &&
      this.state.currentitem.id === 0) {
      this.setState({ currentitem: this.props.Companies.selected_record })
    }
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.push("/Companies")
  }

  handleonchange = (e) => {
    const newdata = { ...this.state.currentitem }
    newdata[e.target.id] = e.target.value
    this.setState({ currentitem: newdata })
  }

  render() {
    const isLoading = (this.props.Companies.isLoading)
    return (
      <>
        {isLoading ? <Spinner /> :
          <div className='Page'>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Firmalar > Güncelle</h4>
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
                    <div className='row d-flex pr-5 justify-content-end align-items-right'>
                      <button onClick={this.goBack} style={{ minWidth: '150px' }} className="btn btn-dark mr-2">Geri Dön</button>
                      <button type="submit" style={{ minWidth: '150px' }} className="btn btn-primary mr-2">Güncelle</button>
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
  Companies: state.Companies,
})

const mapDispatchToProps = { UpdateCompany, GetSelectedCompany, ClearSelectedCompany }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))