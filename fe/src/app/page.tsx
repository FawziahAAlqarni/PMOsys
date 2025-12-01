'use client';

import {useState, useEffect, useMemo} from 'react';

interface WeekOption {
  value: string; // yyyy-MM-dd (the Thursday date)
  label: string; // e.g., "Nov-W1"
}

function getThursdayWeekOptions(): WeekOption[] {
  const options: WeekOption[] = [];
  const now = new Date();
  const endDate = new Date(now);
  endDate.setMonth(endDate.getMonth() + 6);

  // Start from the first day of current month
  const current = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Track week number per month
  let currentMonth = current.getMonth();
  let weekInMonth = 1;

  // Find first Thursday
  while (current.getDay() !== 4) {
    current.setDate(current.getDate() + 1);
  }

  while (current <= endDate) {
    if (current.getMonth() !== currentMonth) {
      currentMonth = current.getMonth();
      weekInMonth = 1;
    }

    const dateStr = current.toISOString().split('T')[0];
    const label = `${monthNames[current.getMonth()]}-W${weekInMonth}`;

    options.push({value: dateStr, label});

    weekInMonth++;
    current.setDate(current.getDate() + 7);
  }

  return options;
}

interface PortfolioTask {
  id: string;
  taskId: string;
  portfolioName: 'HA' | 'MA' | 'EA';
  taskName: string;
  dueDate: string;
  completionPercentage: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_URL = `${API_BASE}/portfolio-tasks`;

export default function Home() {
  const [tasks, setTasks] = useState<PortfolioTask[]>([]);
  const [portfolioName, setPortfolioName] = useState<'HA' | 'MA' | 'EA'>('HA');
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Edit modal state
  const [editingTask, setEditingTask] = useState<PortfolioTask | null>(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editCompletionPercentage, setEditCompletionPercentage] = useState(0);

  const weekOptions = useMemo(() => getThursdayWeekOptions(), []);

  const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    void fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!taskName || !dueDate) return;

    await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        portfolioName,
        taskName,
        dueDate,
        completionPercentage,
      }),
    });

    setTaskName('');
    setDueDate('');
    setCompletionPercentage(0);
    await fetchTasks();
  };

  const handleEditClick = (task: PortfolioTask) => {
    setEditingTask(task);
    setEditTaskName(task.taskName);
    setEditDueDate(task.dueDate);
    setEditCompletionPercentage(task.completionPercentage);
  };

  const handleEditSave = async () => {
    if (!editingTask || !editTaskName || !editDueDate) return;

    await fetch(`${API_URL}/${editingTask.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        taskName: editTaskName,
        dueDate: editDueDate,
        completionPercentage: editCompletionPercentage,
      }),
    });

    setEditingTask(null);
    await fetchTasks();
  };

  const handleEditCancel = () => {
    setEditingTask(null);
  };

  const handleDelete = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });

    await fetchTasks();
  };

  return (
    <main className="max-w-5xl mx-auto p-2">
      <h1 className="text-lg font-bold mb-6">Task Management</h1>

      <table className="w-full border-collapse">
        <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2 text-left">Task ID</th>
          <th className="border border-gray-300 p-2 text-left">Task Name</th>
          <th className="border border-gray-300 p-2 text-left">Due Date</th>
          <th className="border border-gray-300 p-2 text-left">Completion %</th>
          <th className="border border-gray-300 p-2 text-left">Actions</th>
        </tr>
        </thead>
        <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className="border border-gray-300 p-2">{task.taskId}</td>
            <td className="border border-gray-300 p-2">{task.taskName}</td>
            <td className="border border-gray-300 p-2">{task.dueDate}</td>
            <td className="border border-gray-300 p-2">{task.completionPercentage}%</td>
            <td className="border border-gray-300 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
        <tr>
          <td className="border border-gray-300 p-2">
            <select
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value as 'HA' | 'MA' | 'EA')}
              className="w-full p-1 border border-gray-300 rounded"
            >
              <option value="HA">HA</option>
              <option value="MA">MA</option>
              <option value="EA">EA</option>
            </select>
          </td>
          <td className="border border-gray-300 p-2">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Task name"
              className="w-full p-1 border border-gray-300 rounded"
            />
          </td>
          <td className="border border-gray-300 p-2">
            <select
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded"
            >
              <option value="">Select week</option>
              {weekOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="flex gap-2">
              <input
                type="number"
                value={completionPercentage}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setCompletionPercentage(Math.min(100, Math.max(0, value)));
                }}
                min={0}
                max={100}
                placeholder="Completion Percentage"
                className="w-20 p-1 border border-gray-300 rounded"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </td>
          <td className="border border-gray-300 p-2"></td>
        </tr>
        </tbody>
      </table>

      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Task Name</label>
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <select
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select week</option>
                  {weekOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Completion %</label>
                <input
                  type="number"
                  value={editCompletionPercentage}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setEditCompletionPercentage(Math.min(100, Math.max(0, value)));
                  }}
                  min={0}
                  max={100}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleEditCancel}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
