import React, { useState } from "react";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";

const EventModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    notes: "",
    date: "",
    steps: [""], // Start with one empty step
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...form.steps];
    updatedSteps[index] = value;
    setForm((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const addStep = () => {
    setForm((prev) => ({ ...prev, steps: [...prev.steps, ""] }));
  };

  const removeStep = (index) => {
    const updatedSteps = form.steps.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date) return;
    onCreate(form);
    setForm({ title: "", description: "", notes: "", date: "", steps: [""] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-gray-100 rounded-xl shadow-lg p-6 w-full max-w-lg border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Create New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full rounded-lg p-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter event description"
              rows={2}
              className="w-full rounded-lg p-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Steps */}
          <div>
            <label className="block text-sm font-medium mb-2">Event Steps</label>
            <div className="space-y-3">
              {form.steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-700 to-indigo-700 p-4 rounded-lg relative"
                >
                  <div className="flex items-center mb-2">
                    <FaCheckCircle className="text-white mr-2" />
                    <span className="font-semibold">Step {index + 1}</span>
                  </div>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder="Enter step details"
                    className="w-full rounded-lg p-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {form.steps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addStep}
              className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaPlus /> Add Step
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Important Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any special instructions..."
              rows={2}
              className="w-full rounded-lg p-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
