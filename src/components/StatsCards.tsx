import { Package, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { Product } from '../App';

interface StatsCardsProps {
  products: Product[];
}

export function StatsCards({ products }: StatsCardsProps) {
  const totalProducts = products.length;
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockCount = products.filter(p => p.quantity < p.minQuantity).length;
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  const stats = [
    {
      title: 'Total de Produtos',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Itens em Estoque',
      value: totalItems,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Estoque Baixo',
      value: lowStockCount,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Valor Total',
      value: `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: TrendingDown,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded-lg`}>
              <stat.icon className={`size-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={stat.color}>{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
