package com.eventpulse.repository;

import com.eventpulse.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    @Query("SELECT COALESCE(SUM(b.totalPaid), 0) FROM Booking b")
    BigDecimal sumTotalRevenue();
}
