"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/tasks";
import { getTasks, createTask } from "@/services/api";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  // create task
  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await createTask({
        title
      });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


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
            {tasks.length === 0 ? (
              <p className="text-gray-600">No tasks yet</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="border-b-2 p-3 bg-white"
                >
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-[#343434]">{task.title}</h2>
                    <p className="text-gray-600">{new Date(task.createdAt).toLocaleString()}</p>
                  </div>
                  {task?.generatedSummary ? (
                    <p className="text-gray-600">{task.generatedSummary}</p>
                  )
                  : (
                    <button 
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
