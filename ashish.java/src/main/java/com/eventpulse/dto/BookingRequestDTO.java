package com.eventpulse.dto;

import java.math.BigDecimal;

public class BookingRequestDTO {
    private Long eventId;
    private String name;
    private String email;
    private String ticketType;
    private Integer ticketsCount;
    private BigDecimal totalPaid;

    public BookingRequestDTO() {}

    public Long getEventId() { return eventId; }
    public void setEventId(Long eventId) { this.eventId = eventId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTicketType() { return ticketType; }
    public void setTicketType(String ticketType) { this.ticketType = ticketType; }

    public Integer getTicketsCount() { return ticketsCount; }
    public void setTicketsCount(Integer ticketsCount) { this.ticketsCount = ticketsCount; }

    public BigDecimal getTotalPaid() { return totalPaid; }
    public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }
}
