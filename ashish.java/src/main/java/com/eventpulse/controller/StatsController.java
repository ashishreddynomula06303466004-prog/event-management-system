package com.eventpulse.controller;

import com.eventpulse.dto.DashboardStatsDTO;
import com.eventpulse.repository.BookingRepository;
import com.eventpulse.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    private final EventRepository eventRepository;
    private final BookingRepository bookingRepository;

    @Autowired
    public StatsController(EventRepository eventRepository, BookingRepository bookingRepository) {
        this.eventRepository = eventRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        long totalEvents = eventRepository.count();
        long activeEvents = eventRepository.countActiveEvents();
        long totalTicketsSold = eventRepository.sumBookedSeats();
        BigDecimal totalRevenue = bookingRepository.sumTotalRevenue();

        DashboardStatsDTO stats = new DashboardStatsDTO(totalEvents, activeEvents, totalTicketsSold, totalRevenue);
        return ResponseEntity.ok(stats);
    }
}
