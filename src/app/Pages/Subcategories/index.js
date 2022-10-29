import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLUMNTYPES, ROUTES } from '../../Utils/Constants';
import { GetAllSubcategories, GetSelectedSubcategory, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/SubcategoriesActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"
import "../../../assets/styles/Pages/File.scss"
import Datatable from '../../Utils/Datatable';

export class Subcategories extends Component {

  constructor(props) {
    super(props)
    var currentitem = []
    const isLoading = true

    const columns = [
      {
        dataField: 'id',
        text: 'id',
        type: 'number',
        Columntype: COLUMNTYPES.NUMBER,
        Formatheader: true

      }, {
        dataField: 'name',
        text: 'İsim',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'categoryuui',
        text: 'Üst Kategori',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }
      , {
        dataField: 'uuid',
        text: 'Benzersiz ID',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'update',
        text: 'Güncelle',
        sort: true,
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-tooltip-edit text-primary"></i>Güncelle
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.props.history.push('/Subcategories/' + row.uuid)
          }
        }
      }
      , {
        dataField: 'delete',
        text: 'Sil',
        sort: true,
        formatter: () => {
          return (
            <div>
              <button className="btn btn-dark">
                <i className="mdi mdi-trash-can text-primary"></i>Sil
              </button>
            </div>
          );
        },
        events: {
          onClick: (e, column, columnIndex, row, rowIndex) => {
            this.handleDeleteRole(e, row)
          }
        }
      }

    ];

    this.state = { currentitem, columns, isLoading };
  }




  handleDeleteRole = async (e, row) => {
    await this.props.GetSelectedSubcategory(row.uuid)
    this.props.OpenDeleteModal()
  }

  

  handleonaddnew = (e) => {
    this.props.history.push("/Subcategories/Create")
  }

  componentDidMount() {
    this.props.GetAllSubcategories();
  }

  render() {
    const { isLoading, list } = this.props.Subcategories;
    return (
      <div>
        <DeleteModal
          show={this.props.Subcategories.isModalOpen}
          onHide={() => {
            this.props.CloseDeleteModal()
          }}
        />
        {isLoading ? <Spinner /> :
          <div className="row datatable">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-6 d-flex justify-content-start'>
                      <h4 className="card-title">Alt Kategoriler</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Alt Kategori Ekle</button>
                    </div>
                  </div>
                  <Datatable columns={this.state.columns} data={list} />
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  Subcategories: state.Subcategories
})

const mapDispatchToProps = { GetAllSubcategories, GetSelectedSubcategory, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subcategories))