class EventStore {
  constructor() {
    this.STORAGE_KEY_EVENTS = 'ems_events_v1';
    this.STORAGE_KEY_BOOKINGS = 'ems_bookings_v1';
    this.STORAGE_KEY_THEME = 'ems_theme_v1';
    this.init();
  }

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY_EVENTS)) {
      localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(INITIAL_EVENTS));
    }
    if (!localStorage.getItem(this.STORAGE_KEY_BOOKINGS)) {
      localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify([]));
    }
  }

  getEvents() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_EVENTS)) || [];
    } catch (e) {
      return [];
    }
  }

  getEventById(id) {
    const events = this.getEvents();
    return events.find(e => String(e.id) === String(id));
  }

  saveEvent(eventData) {
    const events = this.getEvents();
    if (eventData.id) {
      const index = events.findIndex(e => String(e.id) === String(eventData.id));
      if (index !== -1) {
        events[index] = { ...events[index], ...eventData };
      }
    } else {
      const newEvent = {
        ...eventData,
        id: Date.now(),
        bookedSeats: 0,
        status: eventData.status || 'upcoming',
        speakers: eventData.speakers || [],
        agenda: eventData.agenda || []
      };
      events.unshift(newEvent);
    }
    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    return events;
  }

  deleteEvent(id) {
    let events = this.getEvents();
    events = events.filter(e => String(e.id) !== String(id));
    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));
    return events;
  }

  getBookings() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY_BOOKINGS)) || [];
    } catch (e) {
      return [];
    }
  }

  createBooking(bookingData) {
    const events = this.getEvents();
    const event = events.find(e => String(e.id) === String(bookingData.eventId));

    if (!event) throw new Error("Event not found");

    const count = bookingData.ticketsCount || 1;
    if (event.bookedSeats + count > event.capacity) {
      throw new Error("Not enough seats available");
    }

    event.bookedSeats += count;
    localStorage.setItem(this.STORAGE_KEY_EVENTS, JSON.stringify(events));

    const bookings = this.getBookings();
    const newBooking = {
      id: 'BK-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venue: event.venue,
      attendeeName: bookingData.name,
      attendeeEmail: bookingData.email,
      ticketType: bookingData.ticketType || 'Standard',
      ticketsCount: count,
      totalPaid: bookingData.totalPaid,
      bookedAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    localStorage.setItem(this.STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  }

  getMetrics() {
    const events = this.getEvents();
    const bookings = this.getBookings();

    const totalEvents = events.length;
    const activeEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing').length;

    let totalTicketsSold = 0;
    events.forEach(e => { totalTicketsSold += (e.bookedSeats || 0); });

    let totalRevenue = 0;
    bookings.forEach(b => { totalRevenue += (b.totalPaid || 0); });
    events.forEach(e => {
      if (e.price > 0 && e.bookedSeats > 0) {
        totalRevenue += (e.price * e.bookedSeats);
      }
    });

    return { totalEvents, activeEvents, totalTicketsSold, totalRevenue };
  }

  getTheme() {
    return localStorage.getItem(this.STORAGE_KEY_THEME) || 'dark';
  }

  setTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY_THEME, theme);
  }
}

const store = new EventStore();
