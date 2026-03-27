import axios from "@/services/axios";
import { Task } from "@/types/tasks";

// Get tasks
export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get("/all-tasks");
  return res.data.tasks;
};

// CREATE task
export const createTask = async (data: {
  title: string;
}): Promise<Task> => {
  const res = await axios.post("/create-task", data);
  return res.data.task;
};

// Delete Task
export const deleteTask = async(id: string) => {
  const res = await axios.delete(`/delete-task/${id}`);
  return res.data;
};

// Generate Summary
export const generateSummary = async(id: string) => {
  const res = await axios.get(`/task-summary/${id}`);
  return res.data;
};