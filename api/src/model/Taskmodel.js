import TaskSchema from "./Taskschema.js";

//queries

// insert
export const insertTask = (taskObj) => {
  return TaskSchema(taskObj).save();
};

//read
export const readTask = () => {
  return TaskSchema.find();
};

//delete single task
// export const deleteTask = (_id) => {
//   return TaskSchema.findByIdAndDelete(_id);
// };

// delete multiple task
export const deleteMultipleTask = (_ids) => {
  return TaskSchema.deleteMany({ _id: { $in: _ids } });
};

export const updateTask = (filter, obj) => {
  return TaskSchema.findOneAndUpdate(filter, obj, { new: true });
};
