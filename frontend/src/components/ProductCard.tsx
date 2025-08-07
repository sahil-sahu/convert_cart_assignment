import { Product } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStockStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'instock':
        return 'text-green-600 bg-green-50';
      case 'outofstock':
        return 'text-red-600 bg-red-50';
      case 'onbackorder':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {product.title}
          </CardTitle>
          {product.on_sale && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product.stock_status)}`}>
            {product.stock_status}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Category:</span>
            <span className="font-medium">{product.category}</span>
          </div>
          
          {product.stock_quantity !== null && (
            <div className="flex justify-between">
              <span>Stock:</span>
              <span className="font-medium">{product.stock_quantity}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Created:</span>
            <span className="font-medium">{formatDate(product.created_at)}</span>
          </div>
        </div>
        
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
