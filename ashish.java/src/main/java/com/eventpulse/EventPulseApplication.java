package com.eventpulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventPulseApplication {

    public static void main(String[] args) {
        SpringApplication.run(EventPulseApplication.class, args);
        System.out.println("🚀 EventPulse Spring Boot Full Stack Server started successfully at http://localhost:8080");
    }
}
