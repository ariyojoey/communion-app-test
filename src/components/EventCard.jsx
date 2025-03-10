import { useState, useRef, useEffect } from "react";
import { FiEdit, FiTrash, FiX } from "react-icons/fi";
import "../styles/eventcard.css";

const EventCard = ({ event, setEvents, events }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });
  const modalRef = useRef(null);

  // Close modal if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowEditModal(false);
      }
    }
    if (showEditModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditModal]);

  const handleDelete = () => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const handleEdit = () => {
    const updatedEvents = events.map((e) => (e === event ? editedEvent : e));
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setShowEditModal(false);
  };

  const isPastEvent = new Date(event.date) < new Date();

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Frequency:</strong> {event.frequency}</p>

      {/* Buttons: Show Edit & Delete if event is upcoming; only Delete if past */}
      <div className="event-actions">
        {!isPastEvent && (
          <button className="icon-button edit-btn" onClick={() => setShowEditModal(true)}>
            <FiEdit />
          </button>
        )}
        <button className="icon-button delete-btn" onClick={handleDelete}>
          <FiTrash />
        </button>
      </div>

      {/* Edit Event Modal - Appears Directly Over the Event Card */}
      {showEditModal && (
        <div className="modal" ref={modalRef}>
          <FiX className="close-icon" onClick={() => setShowEditModal(false)} />
          <h3>Edit Event</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }} className="edit-event-form">
            <label>Title:</label>
            <input type="text" value={editedEvent.title} onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })} required />

            <label>Date:</label>
            <input type="date" value={editedEvent.date} onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })} required />

            <label>Category:</label>
            <select value={editedEvent.category} onChange={(e) => setEditedEvent({ ...editedEvent, category: e.target.value })}>
              <option value="Religious">Religious</option>
              <option value="Charity">Charity</option>
              <option value="Social">Social</option>
            </select>

            <label>Frequency:</label>
            <select value={editedEvent.frequency} onChange={(e) => setEditedEvent({ ...editedEvent, frequency: e.target.value })}>
              <option value="Annual">Annual</option>
              <option value="Bi-Annual">Bi-Annual</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Weekly">Weekly</option>
            </select>

            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventCard;
