CREATE DATABASE IF NOT EXISTS portfolio_crud;
USE portfolio_crud;

CREATE TABLE IF NOT EXISTS portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,
  owner_name VARCHAR(120) NOT NULL,
  job_title VARCHAR(100),
  email VARCHAR(150),
  phone VARCHAR(30),
  location VARCHAR(100),
  skills VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO portfolio (owner_name, job_title, email, phone, location, skills, bio) VALUES
('Ashley Banda', 'Web Developer', 'ashley@example.com', '0971000001', 'Kabwe', 'HTML, CSS, JavaScript', 'Builds simple responsive websites.'),
('Chanda Mwila', 'Graphic Designer', 'chanda@example.com', '0971000002', 'Lusaka', 'Photoshop, Illustrator', 'Designs logos and posters.'),
('Mutale Phiri', 'Data Analyst', 'mutale@example.com', '0971000003', 'Ndola', 'SQL, Excel, Python', 'Turns data into useful reports.'),
('Thandiwe Zulu', 'Mobile Developer', 'thandiwe@example.com', '0971000004', 'Kitwe', 'Java, Kotlin, Flutter', 'Creates Android apps.'),
('Bwalya Tembo', 'Network Engineer', 'bwalya@example.com', '0971000005', 'Livingstone', 'Cisco, Routing, Security', 'Sets up and secures networks.'),
('Natasha Lungu', 'UI/UX Designer', 'natasha@example.com', '0971000006', 'Lusaka', 'Figma, Prototyping', 'Focuses on user-friendly design.'),
('Kelvin Mumba', 'Backend Developer', 'kelvin@example.com', '0971000007', 'Kabwe', 'Node.js, MySQL, REST', 'Builds APIs and databases.'),
('Mercy Sakala', 'Photographer', 'mercy@example.com', '0971000008', 'Chipata', 'Photography, Lightroom', 'Captures events and portraits.'),
('Joseph Nkonde', 'Cybersecurity Student', 'joseph@example.com', '0971000009', 'Mkushi', 'Linux, Networking', 'Learning ethical hacking.'),
('Grace Chileshe', 'Content Writer', 'grace@example.com', '0971000010', 'Solwezi', 'Writing, SEO, Editing', 'Writes blogs and web content.');