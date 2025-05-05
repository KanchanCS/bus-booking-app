# BusBook - Bus Booking Application

A responsive, interactive frontend application for booking bus tickets. This application implements a complete bus booking flow from search to confirmation.

## Features

- Responsive design that works on all devices
- Dark/Light mode with localStorage persistence
- Interactive seat selection with visual seat map
- Real-time form validation
- Booking countdown timer
- Smooth animations using Framer Motion
- Loading states and skeletons
- Filter and sort bus listings
- Complete booking flow from search to confirmation



## Tech Stack

- React 19
- TailwindCSS for styling
- React Router v7 for navigation
- Context API for state management
- Framer Motion for animations
- React Icons for icon sets

## Setup Instructions


### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/bus-booking.git
cd bus-booking
```

2. Install dependencies

```bash
npm install

```

3. Start the development server

```bash
npm run dev

```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build

```

## Project Structure

```
src/
├── assets/            # Static assets like images
├── component/         # Reusable components
│   ├── Footer/        # Footer component
│   ├── layout/        # Layout components
│   ├── navbar/        # Navigation bar
│   └── topsearchcard/ # Top search card component
├── context/           # React context for state management
├── pages/             # Page components
│   ├── bookingConfirmation/   # Booking confirmation page
│   ├── buslist/               # Bus listing page
│   ├── hero/                  # Hero section
│   ├── home/                  # Home page
│   ├── passengerDetails/      # Passenger details page
│   ├── search/                # Search component
│   ├── seatSelection/         # Seat selection page
│   └── topsearch/             # Top search section
├── App.jsx            # Main application component
├── App.css            # Global styles
├── index.css          # CSS reset and base styles
└── main.jsx           # Entry point
```



### Bus Search

- Autocomplete for location input
- Date picker for journey date
- Exchange button to swap source and destination

### Bus Listing

- Filters for price range, bus type, and departure time
- Sorting by price, departure time, duration, and rating
- Responsive cards with detailed bus information

### Seat Selection

- Interactive visual seat map based on bus layout
- Different seat types (sleeper/seater)
- Real-time fare calculation
- Tooltips with seat details

### Passenger Details

- Form validation with error messages
- Booking timer countdown
- Summary panel showing selected bus and seats

### Booking Confirmation

- Success animation with confetti
- Detailed booking information
- Option to download ticket or return to home


## Future Improvements

- Add authentication for user registration and login
- Implement bus reviews and ratings
- Add payment gateway integration
- Implement booking history for users
- Add multilingual support


