import { useEffect, useRef, useState } from "react";
import api from "../api/api";

export default function TodoSearchDropdown({
  onSelect,
  placeholder = "Search by title or type...",
}) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  // Debounce the query (300ms)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const q = debounced.trim();
    if (!q) {
      setSuggestions([]);
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/todo?search=${encodeURIComponent(q)}`);
        setSuggestions(res.data || []);
        setOpen(true);
        setActiveIndex(res.data?.length ? 0 : -1);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setOpen(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debounced]);

  // Keyboard navigation
  const onKeyDown = e => {
    if (!open && e.key === "Enter") return; // nothing to submit
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i =>
        suggestions.length ? (i + 1) % suggestions.length : -1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i =>
        suggestions.length
          ? (i - 1 + suggestions.length) % suggestions.length
          : -1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = todo => {
    onSelect?.(todo);
    setOpen(false);
    setActiveIndex(-1);
    // Optionally reset input:
    // setQuery(todo.title); // or setQuery(""); to clear
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="border p-2 w-full rounded-lg font-poppins"
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow">
          {loading && (
            <div className="px-3 py-2 text-sm text-white">Searching…</div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="px-3 py-2 text-md text-gray-800 font-poppins">
              No matches for “{query}”.
            </div>
          )}

          {!loading &&
            suggestions.map((todo, idx) => (
              <button
                key={todo._id}
                type="button"
                onClick={() => handleSelect(todo)}
                className={`w-full text-left px-3 py-2 -mt-1 hover:bg-blue-50 cursor-pointer rounded-lg ${
                  idx === activeIndex ? "bg-blue-100" : ""
                }`}
              >
                <div className="font-bold text-gray-900 font-poppins">
                  {todo.title}
                </div>
                <div className="text-ms text-gray-700">
                  {todo.type || "No type"}
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
