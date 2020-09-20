import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Login = ({ history }) => {
	// const handleLogin = useCallback(
	// 	async (event) => {
	// 		event.preventDefault();
	// 		const { email, password } = event.target.elements;
	// 		try {
	// 			await app
	// 				.auth()
	// 				.signInWithEmailAndPassword(email.value, password.value);
	// 			history.push("/");
	// 		} catch (error) {
	// 			alert(error);
	// 		}
	// 	},
	// 	[history]
	// );

	// 	const provider = new firebase.auth.GoogleAuthProvider();
	// export const signInWithGoogle = () => {
	//   auth.signInWithPopup(provider);
	// };

	const uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			// firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.GithubAuthProvider.PROVIDER_ID,
			// firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	};

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div>
			{/* <h1>Log in</h1>
			<form onSubmit={handleLogin}>
				<label>
          Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
          Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Log in</button>
			</form> */}
			<StyledFirebaseAuth
				uiConfig={uiConfig}
				firebaseAuth={firebase.auth()}
			/>
		</div>
	);
};

export default withRouter(Login);

