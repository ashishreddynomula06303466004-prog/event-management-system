-- =========================================================
-- Event Management System - MySQL Database Setup Script
-- =========================================================

CREATE DATABASE IF NOT EXISTS `eventpulse_db`;
USE `eventpulse_db`;

-- Drop existing tables if re-initialising
DROP TABLE IF EXISTS `bookings`;
DROP TABLE IF EXISTS `events`;
DROP TABLE IF EXISTS `users`;

-- 1. Users Table
CREATE TABLE `users` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(20) DEFAULT 'USER',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Events Table
CREATE TABLE `events` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `status` VARCHAR(20) DEFAULT 'upcoming',
  `event_date` DATE NOT NULL,
  `event_time` VARCHAR(50) NOT NULL,
  `venue` VARCHAR(150) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `capacity` INT NOT NULL,
  `booked_seats` INT NOT NULL DEFAULT 0,
  `cover_url` TEXT,
  `description` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Bookings Table
CREATE TABLE `bookings` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `ticket_code` VARCHAR(50) NOT NULL UNIQUE,
  `event_id` BIGINT NOT NULL,
  `attendee_name` VARCHAR(100) NOT NULL,
  `attendee_email` VARCHAR(120) NOT NULL,
  `ticket_type` VARCHAR(30) DEFAULT 'Standard',
  `tickets_count` INT NOT NULL DEFAULT 1,
  `total_paid` DECIMAL(10,2) NOT NULL,
  `booked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =========================================================
-- Initial Seed Data
-- =========================================================

INSERT INTO `events` (`title`, `category`, `status`, `event_date`, `event_time`, `venue`, `location`, `price`, `capacity`, `booked_seats`, `cover_url`, `description`) VALUES
('Global Tech & AI Summit 2026', 'Conference', 'upcoming', '2026-09-15', '09:00 AM - 05:00 PM', 'Convention Center, Hall A', 'San Francisco, CA', 199.00, 500, 342, 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', 'Join industry pioneers, AI researchers, and engineering leaders to explore neural architectures and scalable AI infrastructure.'),
('Neon Wave Music & Arts Festival', 'Concert', 'upcoming', '2026-10-02', '06:00 PM - 01:00 AM', 'Skyline Arena Park', 'Austin, TX', 85.00, 2500, 1890, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80', 'An immersive evening of synthwave, electronic music, live light displays, and interactive digital art installations.'),
('Full-Stack Web Performance Workshop', 'Workshop', 'upcoming', '2026-08-20', '10:00 AM - 03:00 PM', 'Innovation Hub, Room 304', 'New York, NY', 49.00, 60, 55, 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', 'Hands-on masterclass focusing on Core Web Vitals optimization, bundle size reduction, and browser DevTools auditing.'),
('Venture Pitch Night & Founder Mixer', 'Meetup', 'upcoming', '2026-08-28', '05:30 PM - 09:00 PM', 'Catalyst Co-Working Lounge', 'Seattle, WA', 0.00, 120, 110, 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80', 'Connect with angel investors, VC partners, and early-stage founders. Watch 8 high-growth startups pitch live for seed funding.');
