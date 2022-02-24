import React from 'react'
import { Row, Col, Form, Table, Button,ListGroup } from 'react-bootstrap'



const Interview = () => {
	return (
		<>
			<div className='logtitle'><h3>Login Page</h3></div>
			<div className='login-page-new'>
			<Form>
				<Form.Group>
					<Form.Label>Name</Form.Label>
					<Form.Control className='form-control' type='text' placeholder ='username' />
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control className='form-control' type='password' placeholder ='password' />
				</Form.Group>
				<Form.Group>					
					<Form.Check type='checkbox' label='Acceptterms ad cond' />
				</Form.Group>
				<Button variant='dark' className='my-3'>Login</Button>
			</Form>
			</div>

			<div className='listbox'>
				<ListGroup>
					<ListGroup.Item>asd</ListGroup.Item>
					<ListGroup.Item>asdsad</ListGroup.Item>
					<ListGroup.Item>asd</ListGroup.Item>
					<ListGroup.Item>asdsad</ListGroup.Item>
				</ListGroup>
			</div>

		</>

		)

}


export default Interview