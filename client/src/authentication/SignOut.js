import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import app from "./base";
import "bootstrap/dist/css/bootstrap.min.css";

const SignOut = () => {

	const [showModal, setShowModal] = useState(false);
	const { currentUser } = useContext(AuthContext);
	const history = useHistory();

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

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
						history.push("/");
					}}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SignOut;
