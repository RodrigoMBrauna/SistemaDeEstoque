import { useState, useEffect } from 'react';
import { Plus, Package, TrendingDown, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { StatsCards } from './components/StatsCards';
import { StockTable } from './components/StockTable';
import { ProductDialog } from './components/ProductDialog';
import { StockChart } from './components/StockChart';
import { UserTable } from './components/UserTable';
import { UserDialog } from './components/UserDialog';
import { productsAPI, usersAPI, initializeData } from './services/api';
import { toast, Toaster } from 'sonner@2.0.3';

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

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
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

const initialUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    role: 'Gerente de Estoque',
    department: 'Estoque',
    phone: '11 98765-4321',
    status: 'active',
    createdAt: '2025-10-01'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    role: 'Analista de Estoque',
    department: 'Estoque',
    phone: '11 98765-4322',
    status: 'active',
    createdAt: '2025-10-02'
  },
  {
    id: '3',
    name: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    role: 'Técnico de Suporte',
    department: 'Tecnologia da Informação',
    phone: '11 98765-4323',
    status: 'active',
    createdAt: '2025-10-03'
  }
];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchUserTerm, setSearchUserTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await initializeData();
      const [productsData, usersData] = await Promise.all([
        productsAPI.getAll(),
        usersAPI.getAll()
      ]);
      setProducts(productsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erro ao carregar dados do servidor');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUserTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchUserTerm.toLowerCase())
  );

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productsAPI.create(product);
      setProducts([...products, newProduct]);
      toast.success('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erro ao adicionar produto');
    }
  };

  const handleEditProduct = async (product: Product) => {
    try {
      await productsAPI.update(product);
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Erro ao atualizar produto');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productsAPI.delete(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Erro ao deletar produto');
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleAddUser = async (user: Omit<User, 'id'>) => {
    try {
      const newUser = await usersAPI.create(user);
      setUsers([...users, newUser]);
      toast.success('Usuário adicionado com sucesso!');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Erro ao adicionar usuário');
    }
  };

  const handleEditUser = async (user: User) => {
    try {
      await usersAPI.update(user);
      setUsers(users.map(u => u.id === user.id ? user : u));
      toast.success('Usuário atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Erro ao atualizar usuário');
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await usersAPI.delete(id);
      setUsers(users.filter(u => u.id !== id));
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Erro ao deletar usuário');
    }
  };

  const openEditUserDialog = (user: User) => {
    setEditingUser(user);
    setIsUserDialogOpen(true);
  };

  const closeUserDialog = () => {
    setIsUserDialogOpen(false);
    setEditingUser(null);
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
        <Tabs defaultValue="products">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
          </TabsList>
          <TabsContent value="products">
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
          </TabsContent>
          <TabsContent value="users">
            <div className="mt-8 bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex-1 max-w-md">
                    <Input
                      type="text"
                      placeholder="Buscar por nome, email ou departamento..."
                      value={searchUserTerm}
                      onChange={(e) => setSearchUserTerm(e.target.value)}
                    />
                  </div>
                  <Button onClick={() => setIsUserDialogOpen(true)}>
                    <Plus className="size-4 mr-2" />
                    Adicionar Usuário
                  </Button>
                </div>
              </div>
              
              <UserTable
                users={filteredUsers}
                onEdit={openEditUserDialog}
                onDelete={handleDeleteUser}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
        product={editingProduct}
      />

      <UserDialog
        open={isUserDialogOpen}
        onOpenChange={closeUserDialog}
        onSubmit={editingUser ? handleEditUser : handleAddUser}
        user={editingUser}
      />

      <Toaster />
    </div>
  );
}