# Digital Receptionist API

Node.js + Express + MongoDB API with authentication, product listings, order handling, and request logs.

## Features
- User registration and login (JWT)
- Product listing for halal/fresh meat and spices
- Phone-based registration check
- Order placement (registered users only)
- Request/response logging to MongoDB

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and update values.
3. Start MongoDB.
4. Seed products (optional):
   ```bash
   npm run seed
   ```
5. Start the API:
   ```bash
   npm run dev
   ```

## Deploy to Vercel
1. Ensure MongoDB is reachable from Vercel (Atlas recommended).
2. Add environment variables in Vercel:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `RATE_LIMIT_WINDOW_MS`
   - `RATE_LIMIT_MAX`
   - `CORS_ORIGIN`
3. Deploy using the Vercel CLI or Git integration.

## API Endpoints

### Auth
- `POST /api/auth/register`
  - Body: `{ "name": "", "phone": "", "email": "", "password": "" }`
- `POST /api/auth/login`
  - Body: `{ "phone": "", "password": "" }`

### Users
- `GET /api/users/check?phone=...`
  - Response: `{ registered: true|false }`

### Products
- `GET /api/products`
  - Query (optional): `category`, `inStock`

### Orders (auth required)
- `POST /api/orders`
  - Body: `{ "items": [{ "productId": "", "quantity": 1 }], "notes": "" }`
- `GET /api/orders`

### Logs (admin only)
- `GET /api/logs?limit=100`

## Notes
- Orders require a valid JWT; unregistered users cannot place orders.
- Logs are stored in MongoDB (`logs` collection).
