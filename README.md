# ATTENDTRACK – Student Attendance Management System

ATTENDTRACK is a Java Swing-based desktop application designed for efficient, role-based student attendance management. The system provides dedicated interfaces for Administrators, Faculty, and Students to ensure streamlined workflows and accurate data tracking.

---

## Overview

* Type: Java Swing Desktop Application
* Database: MySQL 8.0
* Architecture: DAO (Data Access Object) Pattern
* Interface: Graphical User Interface (GUI)

---

## Module Features

### Admin Module

* Full CRUD operations for Students, Faculty, Courses, and Sections
* Soft-delete and reactivation support
* Timetable management with section-wise weekly grid
* Attendance management:

  * Search by student roll number
  * View attendance summaries
  * Edit or correct attendance records

---

### Faculty Module

* Dashboard showing today's scheduled classes
* Mark attendance using date and period selection
* Bulk attendance marking support
* View course-wise attendance summaries
* Change password functionality

---

### Student Module

* Dashboard with personal details and notice board
* Displays attendance status and warnings
* Subject-wise attendance summary
* Detailed date-wise attendance breakdown
* Change password functionality

---

## Key Design Decisions

* Soft Delete Pattern: Uses `is_active` flag to preserve data integrity
* DAO Pattern: GUI interacts directly with DAO classes for simplicity
* Role-Based Access Control:

  * Admin: Full access
  * Faculty: Limited to marking and viewing attendance
  * Student: Read-only access

---

## Attendance Status Thresholds

* Good: Attendance ≥ 75%
* Warning: 65% ≤ Attendance < 75%
* Low: Attendance < 65%

---

## Project Structure

```id="jv1"
ATTENDTRACK/
├── MainGUI.java
├── bin/
├── dao/
├── database/
├── gui/
├── gui/panels/
├── models/
├── lib/
└── docs/
```

---

## Setup Instructions

### Prerequisites

* JDK 8 or higher
* MySQL Server 8.0 or above
* MySQL Connector/J

---

### Database Configuration

Update `database/DBConnection.java`:

```id="jv2"
private static final String URL      = "jdbc:mysql://localhost:3306/student_attendance_db";
private static final String USER     = "root";
private static final String PASSWORD = "your_password";
```

---

### Initialize Database

Run the SQL scripts:

```id="jv3"
database.sql
demo_data.sql
```

---

### Compile and Run

#### Create build folder

```id="jv4"
mkdir bin
```

#### Compile

```id="jv5"
javac -d bin -cp ".;lib/*" MainGUI.java
```

#### Run

```id="jv6"
java -cp "bin;lib/*" MainGUI
```

---

## Known Limitations

* Requires local MySQL setup
* No export to PDF or Excel
* No session timeout

---

## Future Scope

* Email notifications for low attendance
* Biometric attendance integration
* Mobile application
* Advanced analytics and reports
