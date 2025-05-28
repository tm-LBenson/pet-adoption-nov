import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function AnimalModal({show, onHide, form, onChange, onSave}) {

return (
    <Modal
     show={show}
     onHide={onHide}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Add New Animal</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save Animal</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
