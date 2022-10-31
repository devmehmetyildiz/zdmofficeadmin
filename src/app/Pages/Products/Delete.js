import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllProducs, GetSelectedProduct, CloseDeleteModal, DeleteProduct, ClearSelectedProduct } from '../../Redux/actions/ProductsActions'

export class Delete extends Component {

  DeleteHandle = async () => {
    await this.props.DeleteProduct(this.props.Subcategories.selected_record)
    await this.props.ClearSelectedProduct()
    await this.props.GetAllProducs()
    await this.props.CloseDeleteModal()
  }

  componentWillUnmount() {
    this.props.ClearSelectedProduct()
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ürün Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.Products.selected_record.name} ürününü silmek istediğinize Eminmisiniz?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { this.props.CloseDeleteModal() }}>Vazgeç</Button>
          <Button onClick={() => { this.DeleteHandle() }}>Sil</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  Products: state.Products,
})

const mapDispatchToProps = { GetAllProducs, GetSelectedProduct, CloseDeleteModal, DeleteProduct, ClearSelectedProduct }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))





