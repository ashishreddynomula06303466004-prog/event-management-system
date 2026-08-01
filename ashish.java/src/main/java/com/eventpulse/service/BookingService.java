package com.eventpulse.service;

import com.eventpulse.dto.BookingRequestDTO;
import com.eventpulse.model.Booking;
import com.eventpulse.model.Event;
import com.eventpulse.repository.BookingRepository;
import com.eventpulse.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    @Transactional
    public Booking createBooking(BookingRequestDTO dto) {
        Event event = eventRepository.findById(dto.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found with ID: " + dto.getEventId()));

        int requestedTickets = dto.getTicketsCount() != null ? dto.getTicketsCount() : 1;
        int availableSeats = event.getCapacity() - event.getBookedSeats();

        if (requestedTickets > availableSeats) {
            throw new IllegalStateException("Not enough seats available! Remaining: " + availableSeats);
        }

        // Update booked seats count in MySQL
        event.setBookedSeats(event.getBookedSeats() + requestedTickets);
        eventRepository.save(event);

        // Generate unique ticket code
        String ticketCode = "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Booking booking = new Booking(
                ticketCode,
                event,
                dto.getName(),
                dto.getEmail(),
                dto.getTicketType() != null ? dto.getTicketType() : "Standard",
                requestedTickets,
                dto.getTotalPaid()
        );

        return bookingRepository.save(booking);
    }
}
