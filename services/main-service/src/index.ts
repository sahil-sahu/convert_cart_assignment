import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { segmentRoutes } from './routes/segments';
import { createProxyMiddleware } from 'http-proxy-middleware';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/segments', segmentRoutes);
app.use('/products', createProxyMiddleware({
  target: `${process.env.PRODUCT_SERVICE_URL || 'http://localhost:4000'}/products`,
  changeOrigin: true,
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'segment-service' });
});

app.listen(PORT, () => {
  console.log(`Segment service running on port ${PORT}`);
});
