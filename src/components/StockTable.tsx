import { Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import type { Product } from '../App';

interface StockTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export function StockTable({ products, onEdit, onDelete }: StockTableProps) {
  const getStockStatus = (product: Product) => {
    if (product.quantity === 0) {
      return { label: 'Sem Estoque', variant: 'destructive' as const };
    }
    if (product.quantity < product.minQuantity) {
      return { label: 'Estoque Baixo', variant: 'default' as const };
    }
    return { label: 'Normal', variant: 'secondary' as const };
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Qtd. Mínima</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Fornecedor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-gray-500">
                Nenhum produto encontrado
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => {
              const status = getStockStatus(product);
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.minQuantity}</TableCell>
                  <TableCell>
                    R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
