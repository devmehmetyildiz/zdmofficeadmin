import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import InputItem from '../../Components/Common/Forminput'
import "../../../assets/styles/Pages/Create.scss"
import { UpdateCategory, GetSelectedCategory, ClearSelectedCategory } from "../../Redux/actions/CategoriesActions"
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
      subcategories: []
    }
    this.state = { currentitem };
  }

  componentWillUnmount() {
    this.props.ClearSelectedCategory()
  }

  handlesubmit = (e) => {
    e.preventDefault()
    this.props.UpdateCategory(this.state.currentitem, this.props.history)
  }

  componentDidMount() {
    this.props.GetSelectedCategory(this.props.match.params.Id);
  }
  componentDidUpdate() {
    console.log('this.props.Categories: ', this.props.Categories);
    if (
      this.props.Categories.selected_record.id !== 0 &&
      !this.props.Categories.isLoading &&
      this.state.currentitem.id === 0) {
        console.log("geldim")
      this.setState({ currentitem: this.props.Categories.selected_record })
    }
  }

  goBack = (e) => {
    e.preventDefault()
    this.props.history.push("/Categories")
  }

  handleonchange = (e) => {
    const newdata = { ...this.state.currentitem }
    newdata[e.target.id] = e.target.value
    this.setState({ currentitem: newdata })
  }

  render() {
    const isLoading = (this.props.Categories.isLoading)
    return (
      <>
        {isLoading ? <Spinner /> :
          <div className='Page'>
            <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Kategoriler > Güncelle</h4>
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
  Categories: state.Categories,
})

const mapDispatchToProps = { UpdateCategory, GetSelectedCategory, ClearSelectedCategory }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Edit))