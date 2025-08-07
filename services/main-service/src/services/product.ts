import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  stock_status: string;
  stock_quantity: number | null;
  category: string;
  tags: string[];
  on_sale: boolean;
  created_at: string;
  updated_at: string;
}

interface ProductServiceResponse {
  success: boolean;
  data: Product[];
  count: number;
}

class ProductService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:4000';
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await axios.get<ProductServiceResponse>(`${this.baseUrl}/products`, {
        timeout: 10000 // 10 second timeout
      });

      if (!response.data.success) {
        throw new Error('Product service returned error response');
      }

      return response.data.data;
    } catch (error) {
      console.error('Error fetching products from product service:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error('Product service is not available');
        }
        if (error.response) {
          throw new Error(`Product service error: ${error.response.status}`);
        }
      }
      
      throw new Error('Failed to fetch products from product service');
    }
  }
}

export const productService = new ProductService();
export type { Product };
