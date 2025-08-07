# ConvertCart Assignment - Product Management & Segmentation System

A TypeScript-based microservices application for product management and segmentation with a modern React frontend.

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
- **Database Storage**: SQLite database with Prisma ORM
- **RESTful API**: Product CRUD operations

### Segment Evaluation
- **Rule Engine**: Advanced filtering with multiple operators
- **Supported Rules**:
  - Price comparisons (`price > 100`, `price < 50`)
  - Stock quantity (`stock_quantity > 10`)
  - Category filtering (`category = 'Electronics'`)
  - Sale status (`on_sale = true`)
  - Date filtering (`created_after '2024-01-01'`)

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
