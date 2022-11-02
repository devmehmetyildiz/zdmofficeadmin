import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllSubcategories, GetSelectedSubcategory, CloseDeleteModal, DeleteSubcategory, ClearSelectedSubcategory } from '../../Redux/actions/SubcategoriesActions'

export class Delete extends Component {

  DeleteHandle = async () => {
    await this.props.DeleteSubcategory(this.props.Subcategories.selected_record)
    await this.props.ClearSelectedSubcategory()
    await this.props.GetAllSubcategories()
    await this.props.CloseDeleteModal()
  }

  componentWillUnmount() {
   this.props.ClearSelectedSubcategory()
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
            Alt Kategori Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.Subcategories.selected_record.name} kategorisini silmek istediğinize Eminmisiniz?
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
  Subcategories: state.Subcategories,
})

const mapDispatchToProps = { GetAllSubcategories, GetSelectedSubcategory, CloseDeleteModal, DeleteSubcategory, ClearSelectedSubcategory }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))





