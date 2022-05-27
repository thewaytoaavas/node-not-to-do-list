import axios from "axios";

const taskApiEp = "http://localhost:8000/api/v1/tasks";
export const postTask = async (taskObj) => {
  try {
    const { data } = await axios.post(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchAllTasks = async () => {
  try {
    const { data } = await axios.get(taskApiEp);
    console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTasks = async (ids) => {
  try {
    const { data } = await axios.delete(taskApiEp, { data: ids });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const updateTask = async (taskObj) => {
  try {
    const { data } = await axios.patch(taskApiEp, taskObj);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
