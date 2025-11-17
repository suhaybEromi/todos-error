import { useState, useEffect, useRef } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const TodoForm = () => {
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
  const [error, setError] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams(); // get todo id from URL

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const res = await api.get(`/todo/${id}`);
          const todo = res.data;

          setFormData({
            title: todo.title || "",
            description: todo.description || "",
            problemSteps: (todo.problemSteps || []).join("\n"),
            fixSteps: (todo.fixSteps || []).join("\n"),
            code: todo.code || "",
            status: todo.status || "In Progress",
            type: todo.type || "",
            image: null,
          });

          setPreview(
            todo.imageUrl
              ? `${import.meta.env.VITE_API_IMAGE}${todo.imageUrl}`
              : null,
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchTodo();
  }, [id]);

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
      if (id) {
        await api.put(`/update-todo/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/add-todo", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

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
      navigate("/");

      if (fileInputRef.current) fileInputRef.current.value = ""; // ✅ clear file input
    } catch (err) {
      const backendErrors = err.response?.data?.errors;

      if (backendErrors) {
        const formatted = {};
        backendErrors.forEach(e => {
          formatted[e.field] = e.message;
        });
        setError(formatted);
      } else {
        setError(err.response?.data?.message || "Error submitting form");
      }
    }
  };

  return (
    <div className="bg-slate-950">
      <br />
      <h2 className="mt-2 mb-8 text-center text-2xl font-semibold font-mono">
        {id ? "Update Todo" : "Add New Todo"}
      </h2>

      <form
        className="p-1 md:p-3 lg:p-4 text-white rounded grid grid-cols-2 gap-6 mx-auto w-full max-w-5xl"
        onSubmit={handleSubmit}
      >
        <div className="col-span-2 lg:col-span-1">
          <label className="font-medium">Title</label>
          <br />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 border p-3 rounded w-full max-w-3xl focus:outline-none focus:ring-2 
      ${
        error.title
          ? "border-red-500 focus:ring-red-500"
          : "focus:ring-blue-400"
      }`}
            required
          />
          {error.title && (
            <p className="text-red-500 text-sm mt-1">{error.title}</p>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className="font-medium">Description</label>
          <br />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 border p-3 rounded w-full max-w-3xl focus:outline-none focus:ring-2 
      ${
        error.description
          ? "border-red-500 focus:ring-red-500"
          : "focus:ring-blue-400"
      }`}
            required
            rows={4}
          />
          {error.description && (
            <p className="text-red-500 text-sm mt-1">{error.description}</p>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className="font-medium">Problem Steps</label>
          <br />
          <textarea
            name="problemSteps"
            placeholder="Problem Steps (each step on new line)"
            value={formData.problemSteps}
            onChange={handleChange}
            className={`mt-1 border p-3 rounded w-full max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 
            ${
              error.problemSteps
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
            rows={4}
            required
          />
          {error.problemSteps && (
            <p className="text-red-500 text-sm mt-1">{error.problemSteps}</p>
          )}
        </div>

        <div className="col-span-2 lg:col-span-1">
          <label className="font-medium">Fix Steps</label>
          <br />
          <textarea
            name="fixSteps"
            placeholder="Fix Steps (each step on new line)"
            value={formData.fixSteps}
            onChange={handleChange}
            className={`mt-1 border p-3 rounded w-full max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-400
            ${
              error.fixSteps
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
            rows={4}
            required
          />
          {error.fixSteps && (
            <p className="text-red-500 text-sm mt-1">{error.fixSteps}</p>
          )}
        </div>

        <div className="col-span-2">
          <label className="font-medium">Code (optional)</label>
          <div className="relative mt-2">
            <textarea
              name="code"
              placeholder="// Write your code here..."
              value={formData.code}
              onChange={handleChange}
              rows={8}
              className="font-mono text-sm text-white bg-gray-900 border border-gray-300 rounded-lg p-4 w-full max-w-3xl resize-y shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="font-medium">Image (optional)</label>
          <br />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="mt-1 border p-3 rounded w-full max-w-120 md:w-full md:max-w-90 lg:w-full lg:max-w-120 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="font-medium">Type</label>
          <br />
          <input
            type="text"
            name="type"
            placeholder="Type (e.g. Bug, UI, Server, English)"
            value={formData.type}
            onChange={handleChange}
            className={`mt-1 border p-2 rounded w-full max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-400
            ${
              error.type
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-400"
            }`}
            required
          />
          {error.type && (
            <p className="text-red-500 text-sm mt-1">{error.type}</p>
          )}
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-1">
          <label className="font-medium">Status</label>
          <br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className=" mt-1 border p-2 rounded w-full max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option className="bg-gray-900" value="In Progress">
              In Progress
            </option>
            <option className="bg-gray-900" value="Complete">
              Complete
            </option>
          </select>
        </div>

        <div className="col-span-2 flex justify-center lg:justify-start">
          <button
            type="submit"
            className="cursor-pointer w-45 md:w-full md:max-w-65 mb-6 items-center bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
