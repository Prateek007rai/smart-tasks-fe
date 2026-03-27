"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/tasks";
import { getTasks, createTask, deleteTask, generateSummary } from "@/services/api";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      setFetching(true);
      const data = await getTasks();
      setTasks(data);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      console.log(error);
    }
  };

  // create task
  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      const newTask = await createTask({
        title
      });
      setTitle("");
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // delete task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //generate summary of the task
  const handleGenerateSummary = async (id: string) => {
    try {
      setLoading(true);
      const data = await generateSummary(id);
      setTasks(prevTasks => prevTasks.map(task => task._id === id ? data.task : task));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  return (
    <div className="flex flex-col flex-1 items-center justify-center pt-12">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center">
        <h1 className="text-center text-4xl font-bold text-[#343434]">Smart Tasks</h1>
        <h4 className="text-center text-xl font-bold text-[#343434]">The Task: Smart Task Manager with AI Briefing </h4>

        {/* Create Task Form */}
        <div className="my-6 flex gap-2">
          <input
            className="border p-3 flex-1 rounded-full w-[400px] text-[#343434] pl-5"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="bg-[#343434] text-white px-4 py-2 rounded-full cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3 w-full">
          {fetching ?
            (
              <div className="flex justify-center items-center py-12">
                <p className="text-[#343434] text-xl font-semibold">Loading...</p>
              </div>
            )
            :
            tasks.length === 0 ? (
              <p className="text-gray-600 text-center mt-6">
                No tasks yet
                <br />
                Note: For the first time, render can take time to respond, just because it is on free instance. Render turns server down, when server is not in use for a long time.
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="border-b-2 p-3 bg-white"
                >
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-[#343434]">{task.title}</h2>
                    <div className="flex justify-end gap-6">
                      <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
                      <button
                        className="text-gray-600 bg-red-700 text-white px-4 py-2 rounded-full cursor-pointer"
                        onClick={() => handleDelete(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  {loading ? (
                    <p className="text-gray-600">Generating Summary...</p>
                  ) : task?.generatedSummary ? (
                    <p className="text-gray-600">{task.generatedSummary}</p>
                  )
                    : (
                      <button
                        onClick={() => handleGenerateSummary(task._id)}
                        className="text-gray-600 bg-[#931062] text-white px-4 py-2 rounded-full cursor-pointer"
                      >
                        Generate Summary
                      </button>
                    )}
                </div>
              ))
            )}
        </div>
      </main>
    </div>
  );
}
