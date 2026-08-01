// API Service Layer - Connects Web UI with Java Spring Boot REST Backend

const API_BASE = '/api';

class ApiService {
  async getEvents() {
    try {
      const res = await fetch(`${API_BASE}/events`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend API unavailable. Falling back to local store.");
    }
    return store.getEvents();
  }

  async createEvent(eventData) {
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend API unavailable. Falling back to local store.");
    }
    return store.saveEvent(eventData);
  }

  async deleteEvent(id) {
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch (e) {
      console.warn("Backend API unavailable. Falling back to local store.");
    }
    store.deleteEvent(id);
    return true;
  }

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend API unavailable. Falling back to local store.");
    }
    return store.createBooking(bookingData);
  }

  async getStats() {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn("Backend API unavailable. Falling back to local store.");
    }
    return store.getMetrics();
  }
}

const api = new ApiService();
