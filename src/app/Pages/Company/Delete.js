import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { GetAllCompanies,GetSelectedCompany, CloseDeleteModal, DeleteCompany,ClearSelectedCompany } from '../../Redux/actions/CompanyActions'

export class Delete extends Component {

  DeleteHandle = async () => {
    await this.props.DeleteCompany(this.props.Companies.selected_record)
    await this.props.ClearSelectedCompany()
    await this.props.GetAllCompanies()
    await this.props.CloseDeleteModal()
  }

  componentWillUnmount() {
    this.props.ClearSelectedCompany()
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
            Firma Silme
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {this.props.Companies.selected_record.name} Firmasını silmek istediğinize Eminmisiniz?
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
  Companies: state.Companies,
})

const mapDispatchToProps = { GetAllCompanies,GetSelectedCompany, CloseDeleteModal, DeleteCompany,ClearSelectedCompany }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Delete))





