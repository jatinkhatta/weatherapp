# Forecastify

## Introduction

Forecastify is a web application that provides current weather and 5 day forecast information for various locations. It uses data from the OpenWeatherMap API to display weather data to users.

## Features

- Current weather information including temperature, humidity, and wind speed.
- 5 day Weather forecast for a selected location. (Limited by API)
- Display of sunrise and sunset times.
- Unit selection for temperature and wind speed (imperial or metric).

## Technologies Used

- React.js for building the frontend.
- Vite for Module Bundling.
- Luxon library for date and time formatting.
- Axios library for making API requests.
- Tailwind CSS for styling.

## Usage

To run Forecastify locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Inside the `.env` file, add the following line
   `VITE_API_KEY=YOUR API KEY`
5. Replace `YOUR API KEY` in the `.env` file with your actual OpenWeatherMap API key.
6. Save the `.env` file.
7. Start the development server using `npm run dev`.


