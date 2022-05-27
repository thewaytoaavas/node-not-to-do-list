import { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import "./App.css";
import { AddForm } from "./components/form/AddForm";
import { BadList } from "./components/task-list/BadList";
import { TaskList } from "./components/task-list/TaskList";
import { Title } from "./components/title/Title";
import {
  fetchAllTasks,
  postTask,
  deleteTasks,
  updateTask,
} from "./helpers/axiosHelper";
const weeklyHrs = 24 * 7;

const App = () => {
  const [taskList, setTaskList] = useState([]);
  // const [badList, setBadList] = useState([]);

  const [response, setResponse] = useState({ status: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const [ids, setIds] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchAllTasks();
    result?.status === "success" && setTaskList(result.result);
  };

  const badList = taskList.filter((item) => item.taskType === "badList");
  const entryList = taskList.filter((item) => item.taskType === "taskList");

  const ttlHrBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  const ttlHrEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);

  const ttlHrs = ttlHrBadList + ttlHrEntryList;

  // remove item form the task list
  //@ids is an array
  const removeFromTaskList = async (ids) => {
    alert("hey");
    if (window.confirm("Are you sure you want to delete this task?")) {
      const result = await deleteTasks(ids);

      setResponse(result);

      result.status === "success"
        ? fetchData() && setIds([])
        : setResponse(result);
    }
  };
  // remove item form the bad list
  // const removeFromBadList = (i) => {};

  // const switchTask = async (obj) => {
  //   const result = await updateTask(obj);
  //   setResponse(result);

  //   result.status === "success" && fetchData();
  // };

  // from bad list to task list
  const shiftToTaskList = (i) => {};

  const taskListTotalHr = taskList.reduce((acc, item) => acc + item.hr, 0);
  const badListTotalHr = badList.reduce((acc, item) => acc + item.hr, 0);
  const ttlHRs = taskListTotalHr + badListTotalHr;

  // const addToTaskList = newInfo => {
  // 	if (ttlHRs + newInfo.hr <= weeklyHrs) {
  // 		setTaskList([...taskList, newInfo]);
  // 	} else {
  // 		alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
  // 	}
  // };

  const addToTaskList = async (newInfo) => {
    if (ttlHRs + newInfo.hr <= weeklyHrs) {
      // call api to send data to server;
      setIsLoading(true);

      // first send new data to the server and wait for the response with {status, message}
      const result = await postTask(newInfo);
      console.log(result);
      setResponse(result);
      setIsLoading(false);

      result?.status === "success" ? fetchData() : setResponse(result);
    } else {
      alert("You have exceeded the weekly limit of " + weeklyHrs + "hrs");
    }
  };

  const handleOnSelectItem = (e) => {
    const { value, checked } = e.target;

    checked
      ? setIds([...ids, value])
      : setIds(ids.filter((id) => id !== value));
  };

  return (
    <div className="wrapper">
      <Container>
        {/* title comp */}
        <Title />

        {isLoading && <Spinner animation="border" variant="primary" />}
        {response?.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        {/* form comp */}
        <AddForm addToTaskList={addToTaskList} />

        <hr />

        {/* Task list comp */}
        <Row>
          <Col md="6">
            <TaskList
              taskList={entryList}
              removeFromTaskList={removeFromTaskList}
              switchTask={switchTask}
              handleOnSelectItem={handleOnSelectItem}
            />
          </Col>
          <Col md="6">
            <BadList
              badList={badList}
              // removeFromBadList={removeFromBadList}
              switchTask={switchTask}
              badListTotalHr={badListTotalHr}
              removeFromTaskList={removeFromTaskList}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            {ids.length > 0 && (
              <Button onClick={() => removeFromTaskList(ids)} variant="danger">
                Delete Selected Tasks
              </Button>
            )}
          </Col>
        </Row>
        {/* total hours allocation */}

        <Row>
          <Col>
            <h3 className="mt-5">
              The total allocated hours is: {ttlHRs}
              hrs
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
