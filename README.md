# ConvertCart Assignment - Product Management & Segmentation System

A TypeScript-based microservices application for product management and segmentation with a modern React frontend.

## 🌐 Live Demo

**Frontend Application**: [https://convert-cart-assignment.vercel.app/](https://convert-cart-assignment.vercel.app/)

**Backend Services**:
- **Main Service**: [https://convert-cart-assignment.onrender.com/](https://convert-cart-assignment.onrender.com/)
- **Product Service**: [https://convert-cart-assignment-1.onrender.com/](https://convert-cart-assignment-1.onrender.com/)

> **Note**: Backend services are hosted on Render's free tier and may experience cold starts. If the frontend shows connection errors, please visit the health endpoints first to wake up the services:
> - Main Service Health: [https://convert-cart-assignment.onrender.com/health](https://convert-cart-assignment.onrender.com/health)
> - Product Service Health: [https://convert-cart-assignment-1.onrender.com/health](https://convert-cart-assignment-1.onrender.com/health)
## 📡 API Endpoints with Demo Payloads

### Product Service (Port 4000)

#### 1. Get All Products
```http
GET /products
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Sample Product",
      "price": 29.99,
      "stock_status": "instock",
      "stock_quantity": 100,
      "category": "Electronics",
      "tags": ["featured", "new"],
      "on_sale": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### 2. Get Product by ID
```http
GET /products/:id
```

**Example:** `GET /products/1`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Product",
    "price": 29.99,
    "stock_status": "instock",
    "stock_quantity": 100,
    "category": "Electronics",
    "tags": ["featured", "new"],
    "on_sale": true,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

#### 3. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "service": "product-service"
}
```

#### 4. Refresh Products (Sync from WooCommerce)
```http
GET /refresh
```

**Response:**
```json
{
  "status": "ok",
  "service": "refreshed products"
}
```

### Main Service (Port 5000)

#### 1. Evaluate Segment Rules
```http
POST /segments/evaluate
```

**Request Payload:**
```json
{
  "rules": [
    "price > 50",
    "category == 'Electronics'",
    "on_sale == true"
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Premium Headphones",
      "price": 99.99,
      "stock_status": "instock",
      "stock_quantity": 50,
      "category": "Electronics",
      "tags": ["premium", "audio"],
      "on_sale": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 1,
  "rules_applied": [
    "price > 50",
    "category == 'Electronics'",
    "on_sale == true"
  ]
}
```

#### 2. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "service": "segment-service"
}
```

#### 3. Proxy to Product Service
```http
GET /products
GET /products/:id
```

> **Note:** The main service proxies product requests to the product service, so you can access product endpoints through both services.

### 🔧 Rule Evaluation Examples

The segment evaluation endpoint supports various rule formats:

**Numeric Comparisons:**
- `"price > 100"` - Products with price greater than 100
- `"stock_quantity <= 10"` - Products with low stock
- `"price >= 50 && price <= 200"` - Products in price range

**String Comparisons:**
- `"category == 'Electronics'"` - Products in Electronics category
- `"stock_status == 'instock'"` - Products in stock
- `"title.includes('Premium')"` - Products with 'Premium' in title

**Boolean Comparisons:**
- `"on_sale == true"` - Products on sale
- `"on_sale == false"` - Products not on sale

**Array Operations:**
- `"tags.includes('featured')"` - Products with 'featured' tag
- `"tags.length > 2"` - Products with more than 2 tags

### 🚨 Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid request format",
  "details": [
    {
      "code": "invalid_type",
      "expected": "array",
      "received": "string",
      "path": ["rules"]
    }
  ]
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Failed to evaluate segment rules"
}
```
## 🏗️ Architecture

This project consists of multiple microservices:

- **Product Service** (Port 4000): Manages product data and syncs with WooCommerce
- **Main Service** (Port 5000): Handles segment evaluation and rule processing
- **Frontend** (Port 3000): Next.js application with shadcn/ui components
- **Cron Service**: Automated product synchronization every 20 seconds

## 📁 Project Structure

```
convertcart_assignment/
├── services/
│   ├── product-service/     # Product management service
│   ├── main-service/        # Segment evaluation service
│   └── cron/               # Automated sync service
├── frontend/               # Next.js React application
├── docker-compose.yml      # Docker orchestration
└── package.json           # Root package configuration
```

## 🧠 AI Usage & Development Notes

### AI Tools Used

**Windsurf Cascade**: Used for initial project scaffolding and boilerplate generation with the following prompt:

> Create a monorepo project called "microservices-app" using TypeScript for all services. The app includes three microservices:
> 
> 1. **product-service**: TypeScript + Node.js + Express + Prisma, WooCommerce ingestion, PostgreSQL storage
> 2. **segment-service**: TypeScript + Node.js + Express, rule-based filtering from product-service  
> 3. **frontend**: TypeScript + React or Next.js, displays product cards and accepts segmentation rules
> 
> Also generate: docker-compose.yml, Prisma schema, .env.example files, README with usage instructions
> Use Node.js 18+, Prisma, PostgreSQL, Docker

### AI Contributions
- Generated monorepo structure and microservice boilerplate
- Created Docker configuration and Prisma schema
- Built frontend scaffolding with shadcn/ui components
- Implemented rule-based textarea input and product card UI

### Manual Development & Enhancements
- Extended service logic for real WooCommerce data integration
- Improved error handling and environment variable management
- Enhanced UI/UX with better styling and user feedback
- Refined rule parser for robust segment evaluation
- Deployed services to cloud platforms (Vercel, Render)
- Created detailed documentation and setup instructions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)
- WooCommerce API credentials

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahil-sahu/convert_cart_assignment
   cd convertcart_assignment
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure environment variables**
   
   Create `.env` file in `services/product-service/`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/convertcart"
   WOOCOMMERCE_URL="your-woocommerce-site-url"
   WOOCOMMERCE_CONSUMER_KEY="your-consumer-key"
   WOOCOMMERCE_CONSUMER_SECRET="your-consumer-secret"
   ```

   Create `.env.local` file in `frontend/` (optional):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

### Running the Application

#### Option 1: Using npm (Development)

```bash
# Build all services
npm run build

# Start all services
npm start
```

This will start:
- Product Service on http://localhost:4000
- Main Service on http://localhost:5000  
- Frontend on http://localhost:3000
- Cron service for automated sync

#### Option 2: Using Docker Compose

```bash
# Build and start all services
docker-compose up --build
```

#### Option 3: Development Mode

```bash
# Run in development mode with hot reload
npm run dev
```

## 🎯 Features

### Product Management
- **WooCommerce Integration**: Automatic product synchronization
- **Database Storage**: Postgres database with Prisma ORM
- **RESTful API**: Product CRUD operations

### Segment Evaluation
- **Rule Engine**: Advanced filtering with multiple operators
- **Supported Rules**:
  - Price comparisons (`price > 100`, `price < 50`)
  - Stock quantity (`stock_quantity > 10`)
  - Category filtering (`category = 'Electronics'`)
  - Sale status (`on_sale = true`)

### Frontend Features
- **Modern UI**: Built with Next.js 15 and shadcn/ui
- **Rule Builder**: Interactive form for creating filter conditions
- **Product Display**: Responsive card-based product listing
- **Real-time Filtering**: Dynamic product filtering based on rules

## 📝 API Endpoints

### Product Service (Port 4000)
- `GET /products` - Get all products
- `GET /health` - Health check
- `GET /refresh` - Manual product sync

### Main Service (Port 5000)
- `POST /segments/evaluate` - Evaluate segment rules
  ```json
  {
    "rules": [
      "price > 100",
      "category = 'Electronics'",
      "on_sale = true"
    ]
  }
  ```
## 🛠️ Development

### Project Scripts

```bash
# Install all dependencies
npm run install:all

# Build all services
npm run build

# Start production mode
npm start

# Start development mode
npm run dev

# Clean build artifacts
npm run clean
```

### Service-specific Commands

```bash
# Product Service
cd services/product-service
npm run dev
npm run build
npm start

# Main Service  
cd services/main-service
npm run dev
npm run build
npm start

# Frontend
cd frontend
npm run dev
npm run build
npm start
```

## 🐳 Docker Support

The project includes Docker support with multi-service orchestration:

```bash
# Build and run all services
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down
```

## 📊 Database

- **ORM**: Prisma with Postgres
- **Migrations**: Automatic schema management
- **Models**: Product, Category, Tags

## 🔄 Automated Sync

The cron service automatically syncs products from WooCommerce every 20 seconds to keep data fresh.

## 🎨 Frontend Technology Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State Management**: React hooks
- **Build Tool**: Turbopack

## 🚨 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 4000, and 5000 are available
2. **WooCommerce connection**: Verify API credentials and URL
3. **Build errors**: Run `npm run clean` and rebuild

### Logs

Check service logs for debugging:
```bash
# View all service logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f product-service
```

## 📄 License

This project is part of a technical assignment for ConvertCart.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

For questions or support, please refer to the project documentation or contact the development team.
