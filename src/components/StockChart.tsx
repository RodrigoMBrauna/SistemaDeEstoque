import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import type { Product } from '../App';

interface StockChartProps {
  products: Product[];
}

export function StockChart({ products }: StockChartProps) {
  const chartData = products.map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    quantidade: product.quantity,
    minimo: product.minQuantity,
    isLow: product.quantity < product.minQuantity
  }));

  return (
    <div>
      <h3 className="mb-4">Visão Geral do Estoque</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantidade" name="Quantidade Atual" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isLow ? '#f97316' : '#3b82f6'} />
            ))}
          </Bar>
          <Bar dataKey="minimo" name="Quantidade Mínima" fill="#94a3b8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
