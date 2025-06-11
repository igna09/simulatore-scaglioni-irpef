'use client';

export function Summary({ totalTaxes, netIncome }: {totalTaxes: number, netIncome: number}) {
    return (
      <div className="pt-4 border-t mt-4 space-y-2 bg-gray-50 p-4 rounded-xl shadow-inner">
        <p className="text-lg font-semibold text-blue-800">Tasse Totali: € {totalTaxes.toFixed(2)}</p>
        <p className="text-lg font-semibold text-green-800">Reddito Netto: € {netIncome.toFixed(2)}</p>
      </div>
    );
  }