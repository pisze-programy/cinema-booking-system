### work in progress

Last update: 23.06.2026

### System Design

![Cinema Booking Design](./docs/cinema-booking-design.jpg)

### Requirements / Flow

TODO: Description

### Cinema booking system design, focusing on real-time seat reservations

React, Typescript, Nodejs, SAM, PostgreSQL (RDS), SQS, S3

![Cinema Booking Demo](./docs/cinema-booking-demo.gif)

### Seat Reservation

TODO: Description
![Seat Reservation Demo](./docs/cinema-booking-seat-reservation-demo.jpeg)

___

Well known issues:

- Missing showtime_id validation and no time.date integration (System allowed reservations for invalid or past
  showtime_id values)
- No dynamic prices, fee
- Limiting users to exactly one seat per transaction
- Database overhead via GET Reservations polling: AWS AppSync integration missing
- Hardcoded backend API URL frontend/utils/api.ts
- AWS Secrets Manager
