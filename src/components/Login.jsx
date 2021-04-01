import React, { useState } from 'react';
import history from '../util/history';
import { Button, Form, Container, Jumbotron, Alert } from 'react-bootstrap';

const jwt = require("jsonwebtoken");

function Login(props) {

	const [validated, setValidated] = useState(false);
	const [userName, setuserName] = useState("");
	const [password, setpassword] = useState("");
	const [error, seterror] = useState("");


	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;


		if (form.checkValidity() === false) {
			event.preventDefault();
			setValidated(true)
		}
		else {
			if (validated) {
				loginUser();
			}
		}
	}

	const loginUser = () => {
	
		if(userName==='Karthikeyan' && password==="1234"){
		var token = jwt.sign({
			userName
		}, 'supersecret', {
			expiresIn: 86400, // expires in 24 hours
		})
	
					localStorage.setItem('token', JSON.stringify(token));
					history.push('/app/task');			
	}else{

		seterror('Please enter vaild username and password')
	}	
				
	}


	return (
		<div>
			<Container bsPrefaix="nc" >

				<Jumbotron className="mt-5">
					<h4 className="d-flex justify-content-center">  LOGIN</h4>
					<Form noValidate validated={validated} onSubmit={handleSubmit} >
						<Form.Group controlId="formBasicEmail">
							<Form.Label>User Name</Form.Label>
							<Form.Control type="text" required placeholder="User Name" name="userName" value={userName} onChange={(e) => { seterror(""); setValidated(true); setuserName(e.target.value) }}
							/>

						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" required placeholder="Password" name="password" value={password} onChange={(e) => { seterror(""); setValidated(true); setpassword(e.target.value) }} />
						</Form.Group>

						<Button
							variant="primary"
							type="submit"
							className="mb-4"
					>
							Login
				</Button>
						{error.length > 0 ? <Alert variant="danger">{error}</Alert> : ''}

					</Form>
					<Alert variant="primary">Login Credentials -- User Name : Karthikeyan | Password: 1234</Alert>
					
				</Jumbotron>
			</Container>
		</div>
	)

}

export default Login;