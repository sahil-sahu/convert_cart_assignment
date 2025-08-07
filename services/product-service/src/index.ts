import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { productRoutes } from './routes/products';
import { wooCommerceService } from './services/woocommerce';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'product-service' });
});
app.get('/refresh', async (req, res) => {
  await syncProducts();
  res.json({ status: 'ok', service: 'refreshed products' });
});

// Sync products on startup
async function syncProducts() {
  try {
    console.log('Syncing products from WooCommerce...');
    await wooCommerceService.syncProducts();
    console.log('Products synced successfully');
  } catch (error) {
    console.error('Failed to sync products:', error);
  }
}

async function startServer() {
  try {
    // Connect to database
    // await prisma.$connect();
    console.log('Connected to database');

    // Sync products
    await syncProducts();

    app.listen(PORT, () => {
      console.log(`Product service running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
