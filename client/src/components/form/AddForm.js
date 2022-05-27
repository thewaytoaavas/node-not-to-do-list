import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";

const initialState = {
	task: "",
	hr: 0,
};
export const AddForm = ({ addToTaskList }) => {
	const [newInfo, setNewInfo] = useState(initialState);

	const handleChange = e => {
		const { name, value } = e.target;
		setNewInfo({
			...newInfo,
			[name]: name === "hr" ? +value : value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		addToTaskList(newInfo);
	};

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<Row className="g-2">
					<Col md={7}>
						<Form.Control
							name="task"
							placeholder="Task ..."
							required
							onChange={handleChange}
						/>
					</Col>
					<Col md={3}>
						<Form.Control
							name="hr"
							placeholder="hour"
							type="number"
							required
							onChange={handleChange}
						/>
					</Col>
					<Col md={2}>
						<Button variant="primary" type="submit">
							Add Task
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
