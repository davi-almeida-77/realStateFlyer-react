# 🏙️ City Arcade

A modern real estate platform built with React and Node.js, featuring AI-generated property descriptions powered by Google Gemini, real-time neighborhood data via GeoApify, and interactive maps with Leaflet.

## Requirements to Run the Project

Make sure you have **Node.js 18+** installed on your system.

```bash
git clone https://github.com/davi-almeida-77/city-arcade.git
cd city-arcade
```

**Backend:**
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```
GEMINI_API_KEY=your_gemini_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key
PORT=3001
```

```bash
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## About the Project

City Arcade was developed as part of my learning journey to build a complete full-stack application with real third-party API integrations. The goal was to go beyond a static frontend and connect real external services — geolocation, AI generation, and interactive maps — into a cohesive product experience.

The platform allows users to browse luxury properties available for rent or sale across the USA and internationally, view real neighborhood data, and read AI-generated sales descriptions unique to each property.

One of the key outcomes of this project was understanding how to integrate a generative AI API (Gemini) into a production backend flow, including caching to avoid redundant API calls, and delivering the result to the frontend with a typewriter animation that makes the AI generation feel alive.

---

## Tools Used in This Project

**BACKEND**
- Node.js + Express — REST API server
- Google Gemini API — AI-generated property descriptions
- GeoApify API — Real neighborhood data (transit, healthcare, restaurants, parks)
- In-Memory Cache — Avoids redundant Gemini API calls per property
- dotenv — Environment variable management
- CORS — Cross-origin request handling

**FRONTEND**
- React + Vite — Fast modern frontend
- React Router — Client-side navigation
- Framer Motion — Animations and page transitions
- Leaflet — Interactive property maps
- Tailwind CSS — Utility-first styling
- Lucide React — Icon system

**OTHER**
- Git — Version control
- Unsplash — High-quality property photography

---

## Project Structure

```
city-arcade/
├── backend/
│   ├── cache/
│   │   └── inMemoryCache.js        ← TTL-based in-memory cache
│   ├── src/
│   │   ├── data/
│   │   │   └── properties.js       ← 24 properties data source
│   │   ├── routes/
│   │   │   ├── properties.js       ← REST endpoints + Gemini integration
│   │   │   └── neighborhood.js     ← GeoApify neighborhood data
│   │   ├── services/
│   │   │   ├── geminiService.js    ← AI description generator
│   │   │   └── geoapifyService.js  ← Neighborhood data fetcher
│   │   └── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── RentPage.jsx
│   │   │   ├── SalePage.jsx
│   │   │   └── PropertyDetailPage.jsx
│   │   └── data/
│   │       └── properties.js       ← Centralized frontend data source
│   └── vite.config.js
├── assets/                         ← README media
└── README.md
```

---

## Key Features

**AI-Generated Descriptions**
Each property page fetches a unique marketing description from Google Gemini based on the property's real data — type, location, amenities, and neighborhood advantages. Descriptions are cached server-side so the API is only called once per property.

**Typewriter Animation**
When the AI description arrives, it renders letter by letter with a typewriter effect, making the generation feel real-time and alive.

**Real Neighborhood Data**
The neighborhood panel pulls live data from GeoApify for each property's coordinates — showing nearby restaurants, healthcare, transit, parks, schools, and fitness centers within a 1km radius.

**Interactive Maps**
Each property detail page includes a dark-themed Leaflet map centered on the property's real coordinates, with a price marker pinned to the exact location.

**24 Properties Across 2 Continents**
Curated portfolio spanning the USA, UK, Italy, France, Japan, Australia, and Brazil — with full data for sale and rental listings.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | All properties |
| GET | `/api/properties/featured` | Featured properties |
| GET | `/api/properties/:id` | Single property by ID |
| GET | `/api/properties/:id/description` | AI-generated description (cached) |
| GET | `/api/neighborhood?lat=&lon=` | Neighborhood data by coordinates |

---

## Project in Action

### Home Page

![Home Page](assets/Home.gif)

### Sale & Rent Listings with Map and GeoApify Data

![Sale Rent Page](assets/SaleRent.gif)


