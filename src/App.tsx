import { useState } from 'react';
import { Plus, Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { StatsCards } from './components/StatsCards';
import { StockTable } from './components/StockTable';
import { ProductDialog } from './components/ProductDialog';
import { StockChart } from './components/StockChart';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  minQuantity: number;
  price: number;
  supplier: string;
  lastUpdated: string;
}

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Notebook Dell Inspiron',
    sku: 'NB-DELL-001',
    category: 'Eletrônicos',
    quantity: 45,
    minQuantity: 10,
    price: 3500.00,
    supplier: 'Dell Brasil',
    lastUpdated: '2025-11-05'
  },
  {
    id: '2',
    name: 'Mouse Logitech MX',
    sku: 'MS-LOG-002',
    category: 'Periféricos',
    quantity: 8,
    minQuantity: 15,
    price: 250.00,
    supplier: 'Logitech',
    lastUpdated: '2025-11-04'
  },
  {
    id: '3',
    name: 'Teclado Mecânico RGB',
    sku: 'KB-RGB-003',
    category: 'Periféricos',
    quantity: 120,
    minQuantity: 20,
    price: 450.00,
    supplier: 'Redragon',
    lastUpdated: '2025-11-06'
  },
  {
    id: '4',
    name: 'Monitor LG 27"',
    sku: 'MN-LG-004',
    category: 'Eletrônicos',
    quantity: 5,
    minQuantity: 8,
    price: 1200.00,
    supplier: 'LG Electronics',
    lastUpdated: '2025-11-03'
  },
  {
    id: '5',
    name: 'Cadeira Gamer',
    sku: 'CH-GAM-005',
    category: 'Móveis',
    quantity: 30,
    minQuantity: 10,
    price: 890.00,
    supplier: 'DT3 Sports',
    lastUpdated: '2025-11-05'
  },
  {
    id: '6',
    name: 'Webcam HD 1080p',
    sku: 'WC-HD-006',
    category: 'Periféricos',
    quantity: 3,
    minQuantity: 12,
    price: 320.00,
    supplier: 'Logitech',
    lastUpdated: '2025-11-02'
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString()
    };
    setProducts([...products, newProduct]);
  };

  const handleEditProduct = (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Package className="size-8 text-blue-600" />
            <div>
              <h1>Sistema de Controle de Estoque</h1>
              <p className="text-gray-600">Gerencie seus produtos e inventário</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsCards products={products} />

        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <StockChart products={products} />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Buscar por nome, SKU ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="size-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>
          </div>

          <StockTable
            products={filteredProducts}
            onEdit={openEditDialog}
            onDelete={handleDeleteProduct}
          />
        </div>
      </div>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />
    </div>
  );
}
