export function Summary({ totalTaxes, netIncome }: {totalTaxes: number, netIncome: number}) {
    return (
      <div className="mt-4 space-y-2 rounded-xl">
        <p className="text-lg font-semibold text-blue-800">Tasse Totali: € {totalTaxes.toFixed(2)}</p>
        <p className="text-lg font-semibold text-green-800">Reddito Netto: € {netIncome.toFixed(2)}</p>
      </div>
    );
  }