import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import app from "./base";
import "bootstrap/dist/css/bootstrap.min.css";
const firebase = require("firebase");


const SignOut = () => {

	const [showModal, setShowModal] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	if (!currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<Button variant="dark" onClick={handleShow}>
				Sign out
			</Button>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Sign out?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}
						className="cancel-sign-out-btn">
						Cancel
					</Button>
					<Button variant="dark" onClick={() => {
						handleClose();
						app.auth().signOut();
						firebase.auth().signOut();
						window.location="/";
					}} className="confirm-sign-out-btn">
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default SignOut;
