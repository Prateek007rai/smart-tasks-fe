import axios from "@/services/axios";
import { Task } from "@/types/tasks";

// GET tasks
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