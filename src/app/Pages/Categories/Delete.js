import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllCategories, GetSelectedCategory, CloseDeleteModal, DeleteCategory, ClearSelectedCategory } from '../../Redux/actions/CategoriesActions'

export class Delete extends Component {

  DeleteHandle = async () => {
    await this.props.DeleteCategory(this.props.Categories.selected_record)
    await this.props.ClearSelectedCategory()
    await this.props.GetAllCategories()
    await this.props.CloseDeleteModal()
  }

  componentWillUnmount() {
    this.props.ClearSelectedCategory()
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
            Kategori Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.Categories.selected_record.name} kategorisini silmek istediğinize Eminmisiniz?
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
  Categories: state.Categories,
})

const mapDispatchToProps = { GetAllCategories, GetSelectedCategory, CloseDeleteModal, DeleteCategory, ClearSelectedCategory }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))





