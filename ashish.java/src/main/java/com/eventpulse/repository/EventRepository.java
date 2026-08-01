package com.eventpulse.repository;

import com.eventpulse.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategoryIgnoreCase(String category);
    List<Event> findByStatusIgnoreCase(String status);
    
    @Query("SELECT COUNT(e) FROM Event e WHERE e.status = 'upcoming' OR e.status = 'ongoing'")
    long countActiveEvents();

    @Query("SELECT COALESCE(SUM(e.bookedSeats), 0) FROM Event e")
    long sumBookedSeats();
}
