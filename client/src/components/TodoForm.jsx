import { useState, useEffect } from "react";
import api from "../api/api";

const TodoForm = ({ selectedTodo, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problemSteps: "",
    fixSteps: "",
    code: "",
    status: "pending",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setFormData({
        title: selectedTodo.title || "",
        description: selectedTodo.description || "",
        problemSteps: selectedTodo.problemSteps || "",
        fixSteps: selectedTodo.fixSteps || "",
        code: selectedTodo.code || "",
        status: selectedTodo.status || "pending",
        image: null,
      });
      setPreview(
        selectedTodo.imageUrl
          ? `${import.meta.env.VITE_API_IMAGE}${selectedTodo.imageUrl}`
          : null,
      );
    }
  }, [selectedTodo]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    for (const key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (selectedTodo) {
        await api.put(`/update-todo/${selectedTodo._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/add-todo", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onSuccess();
      setFormData({
        title: "",
        description: "",
        problemSteps: "",
        fixSteps: "",
        code: "",
        status: "pending",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 bg-white p-4 rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold">
        {selectedTodo ? "Update Todo" : "Add New Todo"}
      </h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="problemSteps"
        placeholder="Problem Steps"
        value={formData.problemSteps}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="fixSteps"
        placeholder="Fix Steps"
        value={formData.fixSteps}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
      </select>

      <div>
        <label className="block mb-1">Image (optional)</label>
        <input type="file" accept="image/*,.txt" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {selectedTodo ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default TodoForm;
