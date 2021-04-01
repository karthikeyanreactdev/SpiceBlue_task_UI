import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Container, Jumbotron, Card, ListGroup, Form, Button, Col, Row } from 'react-bootstrap';
import { getAlltasks, createTask, updateTask } from '../store/Action/taskAction';

import apiRoot from '../ApiPath';

class Task extends Component {
	state = {
		id: '',
		taskDescription: 'Follow Up',
		date: new Date().toLocaleDateString('fr-CA'),
		time: new Date().getTime(),
		assignedTo: 'Karthikeyan',
		hide: true,
		taskList: [],
		taskListDuplicate: []
	}
	componentDidMount() {
		this.props.getAlltasks();
	};
	componentWillReceiveProps(nextProps) {

		this.setState({
			taskList: nextProps.alltasks,
			taskListDuplicate: nextProps.alltasks
		});

		if (nextProps.statusMessage === 'Success') {
			this.props.getAlltasks()
		}
	};

	// Getting on task and switch to edit mode
	click = (i) => {
		const { taskListDuplicate } = this.state;
		console.log(taskListDuplicate)

		this.setState({
			id: i.id,
			taskList: taskListDuplicate
		})
		if (i.id) {
			axios
				.get(`${apiRoot.url}/getbyid/${i.id}`)
				.then(response => response.data)
				.then(
					result => {

						this.setState({

							taskDescription: result.data.task_msg,
							id: result.data.id,
							date: new Date(result.data.task_date).toLocaleDateString('fr-CA'),
							time: result.data.task_time,
							assignedTo: result.data.assigned_user,
						});

						// this module remove new element and shows previous one
						const beforedelete = _.cloneDeep(taskListDuplicate);
						const id = beforedelete.find(f => f.id === i.id);
						const index = beforedelete.indexOf(id);
						beforedelete.splice(index, 1);

						this.setState({
							taskList: beforedelete,
						})


						this.show()
					},
					err => {
						console.log(err);
					}
				);
		}

	};
	//this module handles the state variable change
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	};

	//this function hides the form
	hide = () => {
		const { taskListDuplicate } = this.state;

		this.setState({
			taskList: taskListDuplicate,
			hide: true,
			id: ''
		})
	};

	//this function shows the form
	show = () => {
		const { taskListDuplicate } = this.state;

		this.setState({
			taskList: taskListDuplicate,
			hide: false
		})
	};
	// this function adding/updating task in database
	save = (e) => {
		this.hide()
		e.preventDefault();
		const { taskDescription, date, time, assignedTo, id } = this.state;

		const params = {
			id,
			taskDescription,
			date,
			time,
			assignedTo
		}
		if (id === '') {
			this.props.createTask(params);
		} else {
			this.props.updateTask(params);

		}

	};

	//this function deletes the data task based on on id
	handleDelete = () => {
		const { id } = this.state;

		if (id) {
			axios
				.delete(`${apiRoot.url}/delete/${id}`)
				.then(response => response.data)
				.then(
					result => {
						this.hide();
						this.props.getAlltasks();
					},
					err => {
						console.log(err);
					}
				);
		}

	};
	render() {
		const { taskDescription, date, time, assignedTo, taskList, hide, id } = this.state;
		return (
			<div>
				<Container bsPrefaix="nc" >
					<Jumbotron className="mt-5">
						<Card style={{ width: '28rem' }}>
							<Card.Header >Task  {taskList.length} <a onClick={this.show}> <h6 className="float-right "><i class="fa fa-plus" aria-hidden="true"></i></h6></a></Card.Header >
							<ListGroup variant="flush">
								<ListGroup.Item hidden={hide}>

									<Form className="background" onSubmit={this.save}>

										<Form.Row className="acount-filled">
											<Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
												<Form.Label>Task Description</Form.Label>
												<Form.Control
													required
													type="text"
													placeholder="Description if task"
													onChange={this.handleChange}
													value={taskDescription}
													name="taskDescription"
												/>
											</Form.Group>
										</Form.Row>

										<Form.Row className="acount-filled">
											<Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6} >
												<Form.Label>Date</Form.Label>
												<Form.Control
													required
													type="date"
													onChange={this.handleChange}
													placeholder="date"
													value={date}
													name="date"

												/>
											</Form.Group>
											<Form.Group as={Col} xs={6} sm={6} md={6} lg={6} xl={6} >
												<Form.Label>Time</Form.Label>
												<Form.Control

													type="time"
													onChange={this.handleChange}
													placeholder="time"
													value={time}
													name="time"


												/>
											</Form.Group>
										</Form.Row>
										<Form.Row className="acount-filled">
											<Form.Group as={Col} xs={12} sm={12} md={12} lg={12} xl={12} >
												<Form.Label>Assign User</Form.Label>
												<Form.Control
													required
													type="text"
													onChange={this.handleChange}
													placeholder="Assign User"
													value={assignedTo}
													name="assignedTo"

												/>
											</Form.Group>
										</Form.Row>
										<Row>
											<Col className="float-left">
												<h4 hidden={id === '' ? true : false}><i class="fa fa-trash-o" aria-hidden="true" onClick={this.handleDelete}></i></h4>
											</Col>
											<Col className="float-right">
												<Button variant="outline-secondary" type="button" onClick={this.hide} className="mr-2" >
													Cancel
 											 	</Button>
												<Button variant="success" type="submit">
													Submit
 										 		</Button>
											</Col>
										</Row>
									</Form>
								</ListGroup.Item>
								{taskList.map(i => (
									<ListGroup.Item><b>{i.task_msg}</b><br />{new Date(i.task_date).toLocaleDateString('fr-CA')}
									<button onClick={() => this.click(i)} style={{ marginTop: '-25px' }} className=" float-right hideEdit"><i class="fa fa-pencil" aria-hidden="true"></i></button></ListGroup.Item>

								))}
							</ListGroup>
						</Card>

					</Jumbotron>
				</Container>
			</div>
		)

	}
}
// mapping redux state value to props
const mapStateToProps = (state) => ({
	alltasks: state.Tasks,
	statusMessage: state.status,
})
// connects store to component
export default connect(mapStateToProps, { getAlltasks, createTask, updateTask })(Task);