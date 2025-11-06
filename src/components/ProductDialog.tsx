import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import type { Product } from '../App';

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (product: Product | Omit<Product, 'id'>) => void;
  product?: Product | null;
}

export function ProductDialog({ open, onOpenChange, onSubmit, product }: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    price: 0,
    supplier: '',
    lastUpdated: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        price: product.price,
        supplier: product.supplier,
        lastUpdated: product.lastUpdated
      });
    } else {
      setFormData({
        name: '',
        sku: '',
        category: '',
        quantity: 0,
        minQuantity: 0,
        price: 0,
        supplier: '',
        lastUpdated: new Date().toISOString().split('T')[0]
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit({ ...formData, id: product.id });
    } else {
      onSubmit(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </DialogTitle>
          <DialogDescription>
            {product
              ? 'Atualize as informações do produto abaixo.'
              : 'Preencha os dados do novo produto.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplier">Fornecedor</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minQuantity">Qtd. Mínima</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  min="0"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({ ...formData, minQuantity: Number(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {product ? 'Salvar Alterações' : 'Adicionar Produto'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
