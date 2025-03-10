import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import AddEventForm from "../components/AddEventForm";
import { FiPlus, FiX } from "react-icons/fi"; 
import "../styles/events.css";

const Events = () => {
  // Load events from localStorage
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents
      ? JSON.parse(savedEvents)
      : [
          { title: "Community Prayer", date: "2025-03-12", category: "Religious", frequency: "Annual" },
          { title: "Charity Drive", date: "2025-03-15", category: "Charity", frequency: "Quarterly" },
        ];
  });

  const [filter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const filteredEvents = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <div className={`events-container ${showForm ? "blur-background" : ""}`}>
      <h2>Upcoming Events</h2>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Religious">Religious</option>
          <option value="Charity">Charity</option>
          <option value="Social">Social</option>
        </select>
      </div>

      {/* Add Event Button */}
      <button className="add-event-btn" onClick={() => setShowForm(true)}>
        <FiPlus className="icon" /> Add Event
      </button>

      {/* Event List - Hidden When Modal is Open */}
      {!showForm && (
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} setEvents={setEvents} events={events} />
          ))}
        </div>
      )}

      {/* Add Event Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <FiX className="close-icon" onClick={() => setShowForm(false)} />
            <h3>Add New Event</h3>
            <AddEventForm setEvents={setEvents} closeModal={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
