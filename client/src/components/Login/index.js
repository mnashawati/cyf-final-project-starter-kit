import React from "react";
import { useForm } from "../../hooks/useForm";
import "./styles.css";

const LoginForm = () => {

	const [values, handleChange] = useForm({ email: "", password: "" });

	return (
		<div>
			<form className="login-form">
				<div>
					<h4>Email</h4>
					<input name="email"
						value={values.email}
						onChange={handleChange} />
				</div>
				<div>
					<h4>Password</h4>
					<input type="password"
						name="password"
						value={values.password}
						onChange={handleChange} />
				</div>
				<button type="button">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
