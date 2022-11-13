import React, { Component } from 'react'
import { connect } from 'react-redux'
import { COLUMNTYPES, ROUTES } from '../../Utils/Constants';
import { GetAllProductgroups, GetSelectedProductgroups, OpenDeleteModal, CloseDeleteModal } from '../../Redux/actions/ProductgroupsActions'
import { withRouter } from 'react-router-dom';
import Spinner from "../../shared/Spinner"
import DeleteModal from "./Delete"
import "../../../assets/styles/Pages/File.scss"
import Datatable from '../../Utils/Datatable';

export class Productgroups extends Component {

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
        dataField: 'isSet',
        text: 'Set Ürünmü ? ',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
        formatter: (cellContent, row) => {
          if (row.isSet) {
            return "Evet"
          }
          else
            return "Hayır"
        }
      }
      , {
        dataField: 'price',
        text: 'Set Fiyatı',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'category.name',
        text: 'Kategori',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }, {
        dataField: 'subcategory.name',
        text: 'Alt kategori',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      },
      {
        dataField: 'company.name',
        text: 'Firma',
        Columntype: COLUMNTYPES.TEXT,
        Formatheader: true,
      }
      , {
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
            this.props.history.push('/Productgroups/' + row.uuid)
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
    const expandRow = {
      renderer: row => {
        return <div className='w-100 p-4'>
          <table className='w-100'>
            <thead>
              <tr>
                <th>Ürün Fotoğrafı</th>
                <th>Ürün Adı</th>
                <th>Ürün Kodu</th>
                <th>Ürün Ebatları</th>
                <th>Ürün Ürün Fiyatı</th>
              </tr>
            </thead>
            <tbody>
              {row.products.map(item =>
                <tr>
                  <th><img src={`${process.env.REACT_APP_BACKEND_URL}/${ROUTES.PRODUCTS}/GetImage?guid=${item.uuid}`} style={{ width: '60px', height: '60px' }} /></th>
                  <th>{item.name}</th>
                  <th>  {item.productcode}</th>
                  <th>  {item.dimension}</th>
                  <th> {item.price} <span>TL</span></th>
                </tr>)}
            </tbody>
          </table>
        </div>
      },
      showExpandColumn: true,
      onlyOneExpanding: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <b>-</b>;
        }
        return <b>+</b>;
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <b>-</b>
          );
        }
        return (
          <b>...</b>
        );
      }
    };
    this.state = { currentitem, columns, isLoading, expandRow };
  }

  handleDeleteRole = async (e, row) => {
    await this.props.GetSelectedProductgroups(row.uuid)
    this.props.OpenDeleteModal()
  }

  handleonaddnew = (e) => {
    this.props.history.push("/Productgroups/Create")
  }

  componentDidMount() {
    this.props.GetAllProductgroups();
  }




  render() {
    const { isLoading, list } = this.props.Productgroups;
    return (
      <div>
        <DeleteModal
          show={this.props.Productgroups.isModalOpen}
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
                      <h4 className="card-title">Ürün Grupları</h4>
                    </div>
                    <div className='col-6 d-flex justify-content-end'>
                      <button style={{ minWidth: '120px', height: '30px' }} onClick={this.handleonaddnew} className="btn btn-primary mr-2">Yeni Ürün Grubu Ekle</button>
                    </div>
                  </div>
                  <Datatable expandrow={this.state.expandRow} columns={this.state.columns} data={list} />
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
  Productgroups: state.Productgroups
})

const mapDispatchToProps = { GetAllProductgroups, GetSelectedProductgroups, OpenDeleteModal, CloseDeleteModal }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Productgroups))