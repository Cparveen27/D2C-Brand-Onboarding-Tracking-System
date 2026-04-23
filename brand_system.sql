CREATE DATABASE brand_system;
USE brand_system;

CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    founder_name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    monthly_revenue INT DEFAULT 0,
    website VARCHAR(255),
    status ENUM('SUBMITTED','UNDER_REVIEW','SHORTLISTED','ACCEPTED','REJECTED') DEFAULT 'SUBMITTED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO brands (brand_name, founder_name, category, monthly_revenue, website)
VALUES
('GlowSkin', 'Ankit Sharma', 'Skincare', 500000, 'https://glowskin.com'),
('FitWear', 'Rahul Verma', 'Fashion', 300000, 'https://fitwear.com'),
('TechNova', 'Priya Singh', 'Electronics', 800000, 'https://technova.com');

select*from brands


CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    brand_id INT,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);
INSERT INTO notes (brand_id, note)
VALUES
(1, 'Strong Instagram engagement'),
(1, 'Good customer reviews'),
(2, 'Needs better branding'),
(3, 'High growth potential');

select*from notes



