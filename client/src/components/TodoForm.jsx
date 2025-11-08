import { useState, useEffect, useRef } from "react";
import api from "../api/api";

const TodoForm = ({ selectedTodo, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    problemSteps: "",
    fixSteps: "",
    code: "",
    status: "In Progress",
    type: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedTodo) {
      setFormData({
        title: selectedTodo.title || "",
        description: selectedTodo.description || "",
        problemSteps: (selectedTodo.problemSteps || []).join("\n"),
        fixSteps: (selectedTodo.fixSteps || []).join("\n"),
        code: selectedTodo.code || "",
        status: selectedTodo.status || "In Progress",
        type: selectedTodo.type || "",
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

    // Convert multiline text to array for backend
    const problemStepsArray = formData.problemSteps
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);
    const fixStepsArray = formData.fixSteps
      .split("\n")
      .map(s => s.trim())
      .filter(Boolean);

    data.append("title", formData.title);
    data.append("description", formData.description);
    problemStepsArray.forEach(step => data.append("problemSteps[]", step));
    fixStepsArray.forEach(step => data.append("fixSteps[]", step));
    if (formData.code) data.append("code", formData.code);
    if (formData.type) data.append("type", formData.type);
    data.append("status", formData.status);
    if (formData.image) data.append("image", formData.image);

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
        status: "In Progress",
        type: "",
        image: null,
      });
      setPreview(null);

      if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ clear file input
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
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="problemSteps"
        placeholder="Problem Steps (each step on new line)"
        value={formData.problemSteps}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="fixSteps"
        placeholder="Fix Steps (each step on new line)"
        value={formData.fixSteps}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <label className="block mb-1">Code (optional)</label>
      <textarea
        name="code"
        placeholder="Code"
        value={formData.code}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        name="type"
        placeholder="Type (e.g. Bug, UI, Server)"
        value={formData.type}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      >
        <option value="In Progress">In Progress</option>
        <option value="Complete">Complete</option>
      </select>

      <div>
        <label className="block mb-1">Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

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
