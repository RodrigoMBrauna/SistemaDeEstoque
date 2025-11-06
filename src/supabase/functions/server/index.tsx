import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

// Products routes
app.get('/make-server-71ed156f/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    return c.json({ success: true, data: products });
  } catch (error) {
    console.log('Error fetching products:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-71ed156f/products', async (c) => {
  try {
    const product = await c.req.json();
    const id = Date.now().toString();
    const productWithId = { ...product, id };
    await kv.set(`product:${id}`, productWithId);
    return c.json({ success: true, data: productWithId });
  } catch (error) {
    console.log('Error creating product:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-71ed156f/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const product = await c.req.json();
    await kv.set(`product:${id}`, product);
    return c.json({ success: true, data: product });
  } catch (error) {
    console.log('Error updating product:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-71ed156f/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`product:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting product:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Users routes
app.get('/make-server-71ed156f/users', async (c) => {
  try {
    const users = await kv.getByPrefix('user:');
    return c.json({ success: true, data: users });
  } catch (error) {
    console.log('Error fetching users:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-71ed156f/users', async (c) => {
  try {
    const user = await c.req.json();
    const id = Date.now().toString();
    const userWithId = { ...user, id };
    await kv.set(`user:${id}`, userWithId);
    return c.json({ success: true, data: userWithId });
  } catch (error) {
    console.log('Error creating user:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-71ed156f/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const user = await c.req.json();
    await kv.set(`user:${id}`, user);
    return c.json({ success: true, data: user });
  } catch (error) {
    console.log('Error updating user:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-71ed156f/users/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await kv.del(`user:${id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting user:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Initialize with sample data if database is empty
app.post('/make-server-71ed156f/initialize', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    const users = await kv.getByPrefix('user:');
    
    if (products.length === 0) {
      const initialProducts = [
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

      for (const product of initialProducts) {
        await kv.set(`product:${product.id}`, product);
      }
    }

    if (users.length === 0) {
      const initialUsers = [
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

      for (const user of initialUsers) {
        await kv.set(`user:${user.id}`, user);
      }
    }

    return c.json({ success: true, message: 'Data initialized' });
  } catch (error) {
    console.log('Error initializing data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
