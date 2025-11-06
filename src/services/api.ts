import { projectId, publicAnonKey } from '../utils/supabase/info';
import type { Product, User } from '../App';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-71ed156f`;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${publicAnonKey}`
};

// Products API
export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await fetch(`${API_URL}/products`, { headers });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch products');
      }
      return result.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(product)
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to create product');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  update: async (product: Product): Promise<Product> => {
    try {
      const response = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(product)
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to update product');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_URL}/users`, { headers });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch users');
      }
      return result.data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  create: async (user: Omit<User, 'id'>): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers,
        body: JSON.stringify(user)
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to create user');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  update: async (user: User): Promise<User> => {
    try {
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(user)
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to update user');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

// Initialize database with sample data
export const initializeData = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/initialize`, {
      method: 'POST',
      headers
    });
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Failed to initialize data');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
    throw error;
  }
};
