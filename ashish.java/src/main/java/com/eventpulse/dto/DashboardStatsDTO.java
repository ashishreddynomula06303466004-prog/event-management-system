package com.eventpulse.dto;

import java.math.BigDecimal;

public class DashboardStatsDTO {
    private long totalEvents;
    private long activeEvents;
    private long totalTicketsSold;
    private BigDecimal totalRevenue;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalEvents, long activeEvents, long totalTicketsSold, BigDecimal totalRevenue) {
        this.totalEvents = totalEvents;
        this.activeEvents = activeEvents;
        this.totalTicketsSold = totalTicketsSold;
        this.totalRevenue = totalRevenue;
    }

    public long getTotalEvents() { return totalEvents; }
    public void setTotalEvents(long totalEvents) { this.totalEvents = totalEvents; }

    public long getActiveEvents() { return activeEvents; }
    public void setActiveEvents(long activeEvents) { this.activeEvents = activeEvents; }

    public long getTotalTicketsSold() { return totalTicketsSold; }
    public void setTotalTicketsSold(long totalTicketsSold) { this.totalTicketsSold = totalTicketsSold; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
}
