'use client';

// export function Summary({ totalTaxes, netIncome }: {totalTaxes: number, netIncome: number}) {
//     return (
//       <div className="mt-4 space-y-2 rounded-xl">
//         <p className="text-lg font-semibold text-blue-800">Tasse Totali: € {totalTaxes.toFixed(2)}</p>
//         <p className="text-lg font-semibold text-green-800">Reddito Netto: € {netIncome.toFixed(2)}</p>
//       </div>
//     );
//   }

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function Summary({ totalTaxes, netIncome, marginalRate, averageRate }: { totalTaxes: number; netIncome: number; marginalRate: number; averageRate: number; }) {
  const COLORS = ["#3b82f6", "#10b981"];
  const data = [
    { name: "Tasse", value: totalTaxes },
    { name: "Netto", value: netIncome },
  ];

  return (
    <div className="mt-4 space-y-4">
      <p className="text-lg font-semibold text-blue-800">Tasse Totali: € {totalTaxes.toFixed(2)}</p>
      <p className="text-lg font-semibold text-green-800">Reddito Netto: € {netIncome.toFixed(2)}</p>
      <p className="text-sm text-gray-700">Aliquota Marginale: {marginalRate.toFixed(2)}%</p>
      <p className="text-sm text-gray-700">Aliquota Media: {averageRate.toFixed(2)}%</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}