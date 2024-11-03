# Calendar Appointment Express API

This project is an Express API for managing calendar appointments. It integrates with Firebase for authentication and data storage.

## Getting Started

Follow these steps to set up and run the server:

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd <repository-directory>

   ```

   > After cloning the repository, follow these steps to start the server:

2. Run `npm install`.
3. Create a `.env` file and paste these fields along with your values:
   ```env
   FIREBASE_API_KEY=<Your API key>
   FIREBASE_AUTH_DOMAIN=<Your Auth Domain>
   FIREBASE_PROJECT_ID=<Your Firebase Project Id>
   FIREBASE_STORAGE_BUCKET=<Your Storage Bucket>
   FIREBASE_MESSAGING_SENDER_ID=<Your Sender Id>
   FIREBASE_APP_ID=<Your App Id>
   MEASUREMENT_ID=<Your measurement Id>
   PORT=<Yout Port>
   ```
4. Run `npm run dev`
   > Application will start on localhost:8080

The endpoints are

- [Book events](http://localhost:8080/api/book) -> http://localhost:8080/api/book
- [Get All Events](http://localhost:8080/api/events) -> http://localhost:8080/api/events
- [Get All Free Slots](http://localhost:8080/api/free-slots) -> http://localhost:8080/api/free-slots

- [Swagger Link](http://localhost:8080/api-docs) -> http://localhost:8080/api-docs
