'use client';

import { Input } from "@heroui/input";

export function IncomeInput({ income, setIncome }: {income: any, setIncome: any}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">Reddito Lordo (€)</label>
      <Input
        type="number"
        className="rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
        value={!income ? "" : income?.toString()}
        onChange={(e) => setIncome(+e.target.value)}
      />
    </div>
  );
}