import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import app from "./base";
import "bootstrap/dist/css/bootstrap.min.css";

const SignOut = () => {

	const [showModal, setShowModal] = useState(false);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const { currentUser } = useContext(AuthContext);

	if (!currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<Button variant="primary" onClick={handleShow}>
				Sign Out
			</Button>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Are you sure?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={() => {
						handleClose();
						app.auth().signOut();
					}}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SignOut;
