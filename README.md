GlobalPulse Dashboard

**Overview**

GlobalPulse is a full-stack real-time dashboard that displays global information including weather, country data, ISS location, and currency rates. The application is built using a modern stack with a Next.js frontend and a Node.js/Express backend acting as an API gateway.

**Tech Stack**

- Frontend: Next.js 14 (App Router, SSR)
- Backend: Node.js + Express
- Database: PostgreSQL (Sequelize ORM)
- APIs Used:
  - Open-Meteo (Weather)
  - REST Countries (or local JSON fallback)
  - Open Notify (ISS)
  - Open Exchange Rates (Currency)

---

**Installation & Setup**

Clone Repository
git clone git@github.com:KaleemTanveer/global-pulse.git
cd globalpulse

---

**Backend Setup**

cd backend
npm install
npm run dev

Backend will run on: http://localhost:5000

---

**Frontend Setup**

cd frontend
npm install
npm run dev

Frontend will run on: http://localhost:3000

---

**Environment Variables**

Backend (`backend/.env`)

DB_NAME=globalpulse
DB_USER=postgres
DB_PASSWORD=root
CLIENT_URL=http://localhost:3000
PORT=5000

---

Frontend (`frontend/.env.local`)

NEXT_PUBLIC_API_URL=http://localhost:5000

---

**Architectural Decisions**

The application follows a separation of concerns architecture:

- The frontend (Next.js) handles UI rendering and uses Server-Side Rendering (SSR) for the dashboard to ensure fast initial load and SEO benefits.
- The backend (Node.js/Express) acts as an API gateway, handling all external API calls. This ensures security and avoids exposing third-party APIs directly to the client.
- JWT authentication is implemented with tokens stored in httpOnly cookies for enhanced security.
- Country data is cached or served from a local JSON file to improve performance and reduce dependency on external APIs.
- The project is structured into modular folders (`routes`, `controllers`, `components`) to maintain scalability and readability.

---

**Features**

- Real-time weather data
- Country explorer with search and pagination
- Live ISS location tracking
- Currency exchange rates
- User authentication (JWT)
- Favorites system (protected routes)

---

**Security**

- Input sanitization
- JWT stored in httpOnly cookies
- Helmet security headers
- Rate limiting applied
- CORS restricted to frontend origin

---

**SOAP Notes**

What is SOAP and how does it differ from REST?
SOAP (Simple Object Access Protocol) is a protocol that uses XML for strict, standardized message exchange, while REST is an architectural style that typically uses JSON and is more flexible and lightweight.

What did you observe in the raw XML response from the server?
The XML response was structured with nested tags, including envelope, header, and body elements, making it more verbose compared to JSON.

In what real-world scenario would you choose SOAP over REST?
SOAP is preferred in enterprise environments like banking or payment systems where high security, strict contracts, and reliability are required.

**Debugging Notes**

- What was the bug?
  The currency conversion logic included an incorrect multiplier (`* 1.15`), which caused the converted amount to be higher than the actual value based on the exchange rate.

- Which tool did you use?
  I used the VS Code Debugger to identify and analyze the issue.

- How did the breakpoint help you identify the root cause?
  By setting a breakpoint on the conversion line, execution paused at that point, allowing me to inspect the values of `amount` and `rate` in the variables panel. Both values were correct, which helped me identify that the extra multiplication (`1.15`) was the source of the incorrect result.

---

Running the Project

1. Start backend
2. Start frontend
3. Open browser at `http://localhost:3000`
