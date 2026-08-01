package com.eventpulse.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_code", nullable = false, unique = true, length = 50)
    private String ticketCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;

    @Column(name = "attendee_name", nullable = false, length = 100)
    private String attendeeName;

    @Column(name = "attendee_email", nullable = false, length = 120)
    private String attendeeEmail;

    @Column(name = "ticket_type", length = 30)
    private String ticketType = "Standard";

    @Column(name = "tickets_count", nullable = false)
    private Integer ticketsCount = 1;

    @Column(name = "total_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPaid;

    @Column(name = "booked_at")
    private LocalDateTime bookedAt = LocalDateTime.now();

    public Booking() {}

    public Booking(String ticketCode, Event event, String attendeeName, String attendeeEmail,
                   String ticketType, Integer ticketsCount, BigDecimal totalPaid) {
        this.ticketCode = ticketCode;
        this.event = event;
        this.attendeeName = attendeeName;
        this.attendeeEmail = attendeeEmail;
        this.ticketType = ticketType;
        this.ticketsCount = ticketsCount;
        this.totalPaid = totalPaid;
        this.bookedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTicketCode() { return ticketCode; }
    public void setTicketCode(String ticketCode) { this.ticketCode = ticketCode; }

    public Event getEvent() { return event; }
    public void setEvent(Event event) { this.event = event; }

    public String getAttendeeName() { return attendeeName; }
    public void setAttendeeName(String attendeeName) { this.attendeeName = attendeeName; }

    public String getAttendeeEmail() { return attendeeEmail; }
    public void setAttendeeEmail(String attendeeEmail) { this.attendeeEmail = attendeeEmail; }

    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }

    public Integer getTicketsCount() { return ticketsCount; }
    public void setTicketsCount(Integer ticketsCount) { this.ticketsCount = ticketsCount; }

    public BigDecimal getTotalPaid() { return totalPaid; }
    public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }

    public LocalDateTime getBookedAt() { return bookedAt; }
    public void setBookedAt(LocalDateTime bookedAt) { this.bookedAt = bookedAt; }
}
