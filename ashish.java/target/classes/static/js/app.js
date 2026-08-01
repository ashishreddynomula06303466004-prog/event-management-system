document.addEventListener('DOMContentLoaded', async () => {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const createEventBtn = document.getElementById('createEventBtn');
  const searchInput = document.getElementById('searchInput');
  const statusFilter = document.getElementById('statusFilter');
  const categoryPills = document.getElementById('categoryPills');
  const eventsGrid = document.getElementById('eventsGrid');
  const eventsCount = document.getElementById('eventsCount');

  const statTotalEvents = document.getElementById('statTotalEvents');
  const statTicketsSold = document.getElementById('statTicketsSold');
  const statTotalRevenue = document.getElementById('statTotalRevenue');
  const statActiveEvents = document.getElementById('statActiveEvents');

  const createEventModal = document.getElementById('createEventModal');
  const eventDetailsModal = document.getElementById('eventDetailsModal');
  const bookingModal = document.getElementById('bookingModal');
  const ticketPassModal = document.getElementById('ticketPassModal');

  const eventForm = document.getElementById('eventForm');
  const bookingForm = document.getElementById('bookingForm');

  let activeCategory = 'all';
  let activeSearch = '';
  let activeStatus = 'all';
  let selectedEventForBooking = null;
  let cachedEvents = [];

  // Theme Initialisation
  const currentTheme = store.getTheme();
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    store.setTheme(newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Switch to Light Mode';
    } else {
      icon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Switch to Dark Mode';
    }
  }

  // Dashboard Metrics Update (Calls Spring Boot /api/stats)
  async function updateStats() {
    const stats = await api.getStats();
    statTotalEvents.textContent = stats.totalEvents || 0;
    statTicketsSold.textContent = (stats.totalTicketsSold || 0).toLocaleString();
    statTotalRevenue.textContent = '$' + (stats.totalRevenue || 0).toLocaleString();
    statActiveEvents.textContent = stats.activeEvents || 0;
  }

  // Fetch and Render Events (Calls Spring Boot /api/events)
  async function loadAndRenderEvents() {
    cachedEvents = await api.getEvents();
    renderEvents();
  }

  function renderEvents() {
    const filteredEvents = cachedEvents.filter(evt => {
      const matchCat = activeCategory === 'all' || (evt.category && evt.category.toLowerCase() === activeCategory.toLowerCase());
      const matchStatus = activeStatus === 'all' || (evt.status && evt.status.toLowerCase() === activeStatus.toLowerCase());
      const searchLower = activeSearch.toLowerCase();
      const matchSearch = !activeSearch || 
        (evt.title && evt.title.toLowerCase().includes(searchLower)) ||
        (evt.venue && evt.venue.toLowerCase().includes(searchLower)) ||
        (evt.location && evt.location.toLowerCase().includes(searchLower)) ||
        (evt.description && evt.description.toLowerCase().includes(searchLower));

      return matchCat && matchStatus && matchSearch;
    });

    eventsCount.textContent = `${filteredEvents.length} event${filteredEvents.length === 1 ? '' : 's'} found`;

    if (filteredEvents.length === 0) {
      eventsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-calendar-xmark"></i>
          <h3>No events found</h3>
          <p>Try adjusting your search query or category filter.</p>
        </div>
      `;
      return;
    }

    eventsGrid.innerHTML = filteredEvents.map(evt => {
      const availableSeats = evt.capacity - (evt.bookedSeats || 0);
      const isSoldOut = availableSeats <= 0;
      const formattedPrice = Number(evt.price) === 0 ? 'FREE' : `$${evt.price}`;

      return `
        <div class="event-card" data-id="${evt.id}">
          <div class="event-banner">
            <img src="${evt.coverUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}" alt="${evt.title}" loading="lazy">
            <span class="category-badge">${evt.category}</span>
            <span class="status-badge ${evt.status || 'upcoming'}">${evt.status || 'upcoming'}</span>
          </div>

          <div class="event-content">
            <div class="event-date-box">
              <i class="fa-regular fa-calendar"></i>
              <span>${formatDate(evt.date)} • ${evt.time}</span>
            </div>

            <h4 class="event-title">${evt.title}</h4>
            <p class="event-description">${evt.description}</p>

            <div class="event-meta">
              <div class="meta-item">
                <i class="fa-solid fa-location-dot"></i>
                <span>${evt.venue}, ${evt.location}</span>
              </div>
              <div class="meta-item">
                <i class="fa-solid fa-users"></i>
                <span>${evt.bookedSeats || 0} / ${evt.capacity} Seats Booked (${availableSeats} left)</span>
              </div>
            </div>

            <div class="event-footer">
              <div class="event-price">${formattedPrice}</div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-outline btn-details" data-id="${evt.id}">Details</button>
                <button class="btn btn-primary btn-book" data-id="${evt.id}" ${isSoldOut ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
                  ${isSoldOut ? 'Sold Out' : 'Book Ticket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.btn-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openDetailsModal(e.target.getAttribute('data-id'));
      });
    });

    document.querySelectorAll('.btn-book').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openBookingModal(e.target.getAttribute('data-id'));
      });
    });
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  categoryPills.addEventListener('click', (e) => {
    if (e.target.classList.contains('pill')) {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      activeCategory = e.target.getAttribute('data-category');
      renderEvents();
    }
  });

  searchInput.addEventListener('input', (e) => {
    activeSearch = e.target.value;
    renderEvents();
  });

  statusFilter.addEventListener('change', (e) => {
    activeStatus = e.target.value;
    renderEvents();
  });

  function openModal(modalEl) { modalEl.classList.add('active'); }
  function closeModal(modalEl) { modalEl.classList.remove('active'); }

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(document.getElementById(btn.getAttribute('data-close-modal')));
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  createEventBtn.addEventListener('click', () => {
    document.getElementById('formModalTitle').textContent = 'Create New Event';
    eventForm.reset();
    document.getElementById('eventId').value = '';
    openModal(createEventModal);
  });

  eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventData = {
      id: document.getElementById('eventId').value || null,
      title: document.getElementById('eventTitleInput').value,
      category: document.getElementById('eventCategorySelect').value,
      price: parseFloat(document.getElementById('eventPriceInput').value) || 0,
      date: document.getElementById('eventDateInput').value,
      time: document.getElementById('eventTimeInput').value,
      venue: document.getElementById('eventVenueInput').value,
      capacity: parseInt(document.getElementById('eventCapacityInput').value, 10),
      location: document.getElementById('eventLocationInput').value,
      coverUrl: document.getElementById('eventCoverUrlInput').value,
      description: document.getElementById('eventDescInput').value
    };

    await api.createEvent(eventData);
    closeModal(createEventModal);
    await updateStats();
    await loadAndRenderEvents();
  });

  function openDetailsModal(id) {
    const evt = cachedEvents.find(e => String(e.id) === String(id));
    if (!evt) return;

    document.getElementById('detailTitle').textContent = evt.title;
    const body = document.getElementById('detailBody');

    body.innerHTML = `
      <div style="height:200px; border-radius:var(--radius-md); overflow:hidden; margin-bottom:1.25rem;">
        <img src="${evt.coverUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}" style="width:100%; height:100%; object-fit:cover;">
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
        <div style="background:var(--bg-primary); padding:0.8rem; border-radius:var(--radius-md);">
          <div style="font-size:0.75rem; color:var(--text-muted);">DATE & TIME</div>
          <div style="font-weight:600; font-size:0.9rem;">${formatDate(evt.date)} • ${evt.time}</div>
        </div>
        <div style="background:var(--bg-primary); padding:0.8rem; border-radius:var(--radius-md);">
          <div style="font-size:0.75rem; color:var(--text-muted);">VENUE</div>
          <div style="font-weight:600; font-size:0.9rem;">${evt.venue}, ${evt.location}</div>
        </div>
      </div>

      <h4 style="font-weight:700; margin-bottom:0.5rem;">Overview</h4>
      <p style="color:var(--text-secondary); font-size:0.92rem; margin-bottom:1.5rem; line-height:1.6;">${evt.description}</p>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:1.25rem;">
        <button class="btn btn-outline" id="btnDeleteEvent" style="color:var(--accent-secondary); border-color:rgba(236,72,153,0.3);"><i class="fa-solid fa-trash"></i> Delete Event</button>
        <button class="btn btn-primary" id="btnModalBook" ${(evt.capacity - (evt.bookedSeats || 0)) <= 0 ? 'disabled' : ''}>
          ${(evt.capacity - (evt.bookedSeats || 0)) <= 0 ? 'Sold Out' : 'Reserve Ticket'}
        </button>
      </div>
    `;

    openModal(eventDetailsModal);

    document.getElementById('btnDeleteEvent').addEventListener('click', async () => {
      if (confirm(`Are you sure you want to delete "${evt.title}"?`)) {
        await api.deleteEvent(evt.id);
        closeModal(eventDetailsModal);
        await updateStats();
        await loadAndRenderEvents();
      }
    });

    const btnModalBook = document.getElementById('btnModalBook');
    if (btnModalBook && !btnModalBook.disabled) {
      btnModalBook.addEventListener('click', () => {
        closeModal(eventDetailsModal);
        openBookingModal(evt.id);
      });
    }
  }

  function openBookingModal(id) {
    const evt = cachedEvents.find(e => String(e.id) === String(id));
    if (!evt) return;

    selectedEventForBooking = evt;
    document.getElementById('bookingEventId').value = evt.id;
    document.getElementById('bookingEventTitle').textContent = evt.title;
    document.getElementById('bookingEventSub').textContent = `${formatDate(evt.date)} • ${evt.venue}`;
    
    bookingForm.reset();
    document.getElementById('ticketCountInput').value = 1;
    calculateBookingTotal();

    openModal(bookingModal);
  }

  function calculateBookingTotal() {
    if (!selectedEventForBooking) return;
    const basePrice = Number(selectedEventForBooking.price);
    const count = parseInt(document.getElementById('ticketCountInput').value, 10) || 1;
    const type = document.getElementById('ticketTypeSelect').value;
    const tierAddon = type === 'VIP' ? 50 : 0;
    const total = (basePrice + tierAddon) * count;

    document.getElementById('bookingTotalPrice').textContent = `$${total}`;
  }

  document.getElementById('ticketCountInput').addEventListener('input', calculateBookingTotal);
  document.getElementById('ticketTypeSelect').addEventListener('change', calculateBookingTotal);

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!selectedEventForBooking) return;

    const basePrice = Number(selectedEventForBooking.price);
    const count = parseInt(document.getElementById('ticketCountInput').value, 10) || 1;
    const type = document.getElementById('ticketTypeSelect').value;
    const tierAddon = type === 'VIP' ? 50 : 0;
    const totalPaid = (basePrice + tierAddon) * count;

    try {
      const booking = await api.createBooking({
        eventId: selectedEventForBooking.id,
        name: document.getElementById('attendeeNameInput').value,
        email: document.getElementById('attendeeEmailInput').value,
        ticketType: type,
        ticketsCount: count,
        totalPaid: totalPaid
      });

      closeModal(bookingModal);
      await updateStats();
      await loadAndRenderEvents();
      showTicketPass(booking);
    } catch (err) {
      alert(err.message || 'Failed to complete ticket reservation.');
    }
  });

  function showTicketPass(booking) {
    const body = document.getElementById('ticketPassBody');
    body.innerHTML = `
      <div class="ticket-pass">
        <div class="ticket-pass-header">
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; opacity:0.8;">OFFICIAL ADMISSION PASS</div>
            <h4 style="font-weight:800; font-size:1.15rem; margin-top:0.2rem;">${booking.eventTitle || selectedEventForBooking.title}</h4>
          </div>
          <span style="background:var(--accent-primary); padding:0.2rem 0.6rem; border-radius:var(--radius-full); font-size:0.75rem; font-weight:700;">
            ${booking.ticketType || 'Standard'} PASS
          </span>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; font-size:0.85rem; margin-bottom:1.25rem;">
          <div>
            <div style="opacity:0.7; font-size:0.75rem;">ATTENDEE</div>
            <div style="font-weight:700;">${booking.attendeeName || booking.name}</div>
          </div>
          <div>
            <div style="opacity:0.7; font-size:0.75rem;">PASSES / PAID</div>
            <div style="font-weight:700;">${booking.ticketsCount} Ticket(s) • $${booking.totalPaid}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px dashed rgba(255,255,255,0.3); padding-top:1rem;">
          <div>
            <div style="font-size:0.75rem; opacity:0.7;">TICKET CODE</div>
            <div style="font-family:monospace; font-weight:700; letter-spacing:0.05em;">${booking.ticketCode || booking.id}</div>
          </div>
          <div class="qr-code-box">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2">
              <path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM14 14h2v2h-2zM18 14h3v3h-3zM14 18h3v3h-3zM19 19h2v2h-2z"/>
            </svg>
          </div>
        </div>
      </div>

      <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem;">
        <button class="btn btn-secondary" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Ticket</button>
        <button class="btn btn-primary" data-close-modal="ticketPassModal">Done</button>
      </div>
    `;

    openModal(ticketPassModal);
  }

  // Boot UI
  await updateStats();
  await loadAndRenderEvents();
});
