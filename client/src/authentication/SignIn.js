import React from "react";
// import { withRouter, Redirect } from "react-router";
// import { AuthContext } from "./Auth.js";
// import app from "./base";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const firebase = require("firebase");
const firebaseui = require("firebaseui");

const SignIn = () => {

	const uiConfig = {
		callbacks: {
			signInSuccessWithAuthResult: function(authResult, redirectUrl) {
				// User successfully signed in.
				// Return type determines whether we continue the redirect automatically
				// or whether we leave that to developer to handle.
				return true;
			},
			uiShown: function() {
				// The widget is rendered.
				// Hide the loader.
				document.getElementById("loader").style.display = "none";
			},
		},
		// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
		signInFlow: "popup",
		signInSuccessUrl: "/regions",
		signInOptions: [
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
		],
		// // Terms of service url.
		// tosUrl: "<your-tos-url>",
		// // Privacy policy url.
		// privacyPolicyUrl: "<your-privacy-policy-url>",
	};

	const ui = new firebaseui.auth.AuthUI(firebase.auth());
	// The start method will wait until the DOM is loaded.
	ui.start("#firebaseui-auth-container", uiConfig);

	return (
		<>
			<div id="firebaseui-auth-container" className="sign-in-section-container" >
				<p className="start-here">Start here</p>
				<StyledFirebaseAuth />
			</div>
			<div id="loader">Loading...</div>
		</>
	);
};

export default SignIn;