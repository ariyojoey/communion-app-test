import { useState } from "react";
import "../styles/addeventform.css";

const AddEventForm = ({ setEvents, closeModal }) => {
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    category: "Religious",
    frequency: "Annual",
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      return updatedEvents;
    });
    closeModal(); // Close modal after submission
  };

  return (
    <form onSubmit={handleSubmit} className="add-event-form">
      <label>Title:</label>
      <input type="text" name="title" value={newEvent.title} onChange={handleChange} required />

      <label>Date:</label>
      <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />

      <label>Category:</label>
      <select name="category" value={newEvent.category} onChange={handleChange}>
        <option value="Religious">Religious</option>
        <option value="Charity">Charity</option>
        <option value="Social">Social</option>
      </select>

      <label>Frequency:</label>
      <select name="frequency" value={newEvent.frequency} onChange={handleChange}>
        <option value="Annual">Annual</option>
        <option value="Bi-Annual">Bi-Annual</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Weekly">Weekly</option>
      </select>

      <button type="submit" className="save-btn">Add Event</button>
    </form>
  );
};

export default AddEventForm;
