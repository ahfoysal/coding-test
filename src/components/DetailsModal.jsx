import React from "react";
import { Modal } from "react-bootstrap";

const DetailsModal = ({ show, handleClose, modalData }) => {
   
    return (
        <Modal size="md" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal C</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{modalData.singleData.id}</td>
                            <td>{modalData.singleData?.country?.name}</td>
                            <td>{modalData.singleData?.phone}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-end">
                <button
                    className="btn btn-lg btn-outline-danger closeBtn"
                    type="button"
                    onClick={handleClose}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default DetailsModal;
