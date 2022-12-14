import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllProductgroups, GetSelectedProductgroups, CloseDeleteModal, DeleteProductgroups, ClearSelectedProductgroups } from '../../Redux/actions/ProductgroupsActions'

export class Delete extends Component {

  DeleteHandle = async () => {
    await this.props.DeleteProductgroups(this.props.Productgroups.selected_record)
    await this.props.ClearSelectedProductgroups()
    await this.props.GetAllProductgroups()
    await this.props.CloseDeleteModal()
  }

  componentWillUnmount() {
    this.props.ClearSelectedProductgroups()
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
            Ürün Grup Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.Productgroups.selected_record.name} ürün grubunu silmek istediğinize Eminmisiniz?
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
  Productgroups: state.Productgroups,
})

const mapDispatchToProps = { GetAllProductgroups, GetSelectedProductgroups, CloseDeleteModal, DeleteProductgroups, ClearSelectedProductgroups }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))





