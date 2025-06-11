'use client';

import { Button } from "@heroui/button";
import { BracketRow } from "./BracketRow";
import { Plus } from "lucide-react";

export function BracketList({ brackets, onChange, onAdd, onRemove }: { brackets: any, onChange: any, onAdd: any, onRemove: any }) {
  return (
    <div className="space-y-4">
      {brackets.map((bracket: any, index: any) => (
        <BracketRow
          key={`${bracket.id}`}
          upTo={bracket.upTo}
          rate={bracket.rate}
          id={bracket.id}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
      <Button
        variant="bordered"
        onPress={onAdd}
        className="w-full rounded-xl border-dashed border-2 border-blue-300 hover:bg-blue-50 transition-colors"
      >
        <Plus className="mr-2 w-4 h-4" /> Aggiungi Scaglione
      </Button>
    </div>
  );
}