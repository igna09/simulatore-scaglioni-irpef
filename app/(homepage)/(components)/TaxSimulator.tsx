'use client';

import { useState, useEffect } from "react";
import { IncomeInput } from "./IncomeInput";
import { BracketList } from "./BracketList";
import { Summary } from "./Summary";
import { Card, CardBody } from "@heroui/card";

export type Bracket = { upTo: number | undefined; rate: number; id: number };

export default function TaxSimulator() {
  const [income, setIncome] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("income");
    setIncome(saved ? JSON.parse(saved) : undefined);
  }, []);

  const [brackets, setBrackets] = useState<Bracket[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("brackets");
    setBrackets(saved
      ? JSON.parse(saved).map((b: any) => ({ ...b, upTo: Number.isNaN(b.upTo) ? undefined : +b.upTo }))
      : [
          { upTo: 28000, rate: 23, id: 1 },
          { upTo: 50000, rate: 35, id: 2 },
          { upTo: undefined, rate: 43, id: 3 },
        ]);
  }, []);

  useEffect(() => {
    if (income !== undefined) {
      localStorage.setItem("income", JSON.stringify(income));
    }
  }, [income]);

  useEffect(() => {
    localStorage.setItem(
      "brackets",
      JSON.stringify(
        brackets.map((b: any) => ({ ...b, upTo: Number.isNaN(b.upTo) ? undefined : b.upTo }))
      )
    );
  }, [brackets]);

  const sortBrackets = (list: any) =>
    [...list].sort((a, b) => {return (!a.upTo ? 1 : !b.upTo ? -1 : a.upTo - b.upTo)});

  const isValidOrder = (list: any) => {
    const numeric = list.map((b: any) => (!b.upTo ? undefined : +b.upTo));
    for (let i = 1; i < numeric.length; i++) {
      if (numeric[i] <= numeric[i - 1]) return false;
    }
    return true;
  };

  const handleBracketChange = (bracket: Bracket) => {
    // console.log("handleBracketChange", bracket);
    const updated = [...brackets];
    const index = updated.findIndex(b => b.id === bracket.id);
    if (index !== -1) {
      updated[index] = { ...updated[index], ...bracket };
      // setBrackets(updated);
      const sorted = sortBrackets(updated);
      // console.log("sorted", sorted);
      if (isValidOrder(sorted)) setBrackets(sorted);
    }
  };

  const getMaxId = (brackets: Bracket[]) => {
    return brackets.reduce((max, b) => Math.max(max, b.id), 0);
  }

  const addBracket = () => {
    const updated = [...brackets, { upTo: undefined, rate: 0, id: getMaxId(brackets) + 1 }];
    const sorted = sortBrackets(updated);
    if (isValidOrder(sorted)) setBrackets(sorted);
  };

  const removeBracket = (index: any) => {
    setBrackets(brackets.filter((_: any, i: any) => i !== index));
  };

  const calculateTaxes = () => {
    let totalTax = 0;
    let lastLimit = 0;
    const sorted = sortBrackets(brackets);
    for (const bracket of sorted) {
      const taxable = Math.min(income ?? 0, bracket.upTo) - lastLimit;
      if (taxable > 0) {
        totalTax += taxable * (bracket.rate / 100);
        lastLimit = bracket.upTo;
      }
    }
    return totalTax;
  };

  const totalTaxes = income ? calculateTaxes() : 0;
  const netIncome = income ? income - totalTaxes : 0;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 drop-shadow-sm">
        Simulatore Aliquote a Scaglioni
      </h1>
      <Card className="shadow-lg rounded-xl border border-gray-200">
        <CardBody className="p-6 space-y-6">
          <IncomeInput income={income} setIncome={setIncome} />
          <BracketList
            brackets={brackets}
            onChange={handleBracketChange}
            onAdd={addBracket}
            onRemove={removeBracket}
          />
          <Summary totalTaxes={totalTaxes} netIncome={netIncome} />
        </CardBody>
      </Card>
    </div>
  );
}