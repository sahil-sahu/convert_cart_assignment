import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface WooCommerceProduct {
  id: number;
  name: string;
  price: string;
  stock_status: string;
  stock_quantity: number | null;
  categories: Array<{ id: number; name: string; slug: string }>;
  tags: Array<{ id: number; name: string; slug: string }>;
  on_sale: boolean;
  date_created: string;
  
}

class WooCommerceService {
  private baseUrl: string;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {
    this.baseUrl = process.env.WOOCOMMERCE_URL || '';
    this.consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
    this.consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

    if (!this.baseUrl || !this.consumerKey || !this.consumerSecret) {
      console.warn('WooCommerce credentials not configured properly');
    }
  }

  async fetchProducts(): Promise<WooCommerceProduct[]> {
    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          consumer_key: this.consumerKey,
          consumer_secret: this.consumerSecret,
          per_page: 1000, // Fetch up to 100 products
          status: 'publish'
        },
        timeout: 30000 // 30 second timeout
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching products from WooCommerce:', error);
      throw new Error('Failed to fetch products from WooCommerce API');
    }
  }

  async syncProducts(): Promise<void> {
    try {
      const wooProducts = await this.fetchProducts();
      
      console.log(`Fetched ${wooProducts.length} products from WooCommerce`);

      // Clear existing products (for demo purposes - in production, you'd want to update/upsert)
      await prisma.product.deleteMany();

      // Transform and insert products
      const productsToInsert = wooProducts.map(product => ({
        title: product.name,
        price: parseFloat(product.price) || 0,
        stock_status: product.stock_status,
        stock_quantity: product.stock_quantity,
        category: product.categories.length > 0 ? product.categories[0].name : 'Uncategorized',
        tags: product.tags.map(tag => tag.name),
        on_sale: product.on_sale,
        created_at: new Date(product.date_created),
        
      }));

      await prisma.product.createMany({
        data: productsToInsert
      });

      console.log(`Successfully synced ${productsToInsert.length} products to database`);
    } catch (error) {
      console.error('Error syncing products:', error);
      throw error;
    }
  }
}

export const wooCommerceService = new WooCommerceService();
