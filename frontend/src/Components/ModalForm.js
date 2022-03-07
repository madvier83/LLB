import react, { useState } from 'react'
import { Modal } from 'react-bootstrap'
export default function ModalForm({ trigger, children, modalTitle, id }) {
    const [show, setShow] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {trigger && <button className="d-inline  btn btn-primary text-white btn-sm mx-2" onClick={handleShow}>{trigger}</button>}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                id={id}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                    {id}
                </Modal.Body>

            </Modal>
        </>
    );
}