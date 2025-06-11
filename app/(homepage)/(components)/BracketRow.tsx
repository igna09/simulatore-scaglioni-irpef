'use client';

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Trash2 } from "lucide-react";
import { Bracket } from "./TaxSimulator";
import { useEffect, useRef } from "react";

export function BracketRow({ upTo, rate, id, onChange, onRemove }: { upTo: number | undefined, rate: number | undefined, id: number, onChange: any, onRemove: any }) {
  const upToRef = useRef<HTMLInputElement>(null);
  const rateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // console.log('changed id', id)
  }, [id]);

  useEffect(() => {
    // console.log('changed upTo', upTo)
    if(document.activeElement === upToRef.current) {
      upToRef.current?.focus();
    }
  }, [upTo]);

  useEffect(() => {
    // console.log('changed rate', rate)
    if(document.activeElement === rateRef.current) {
      rateRef.current?.focus();
    }
  }, [rate]);

  return (
    <div className="flex items-center space-x-2">
      <Input
        ref={upToRef}
        type="text"
        className="w-1/2 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
        value={!upTo ? "" : upTo?.toString()}
        onChange={(e) => onChange({upTo: e.target.value === '' ? undefined : +e.target.value, rate, id})}
        placeholder="Fino a (€)"
      />
      <Input
        ref={rateRef}
        type="number"
        className="w-1/4 rounded-xl border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm"
        value={!rate ? "" : rate?.toString()}
        onChange={(e) => onChange({rate: e.target.value === '' ? undefined : +e.target.value, upTo, id})}
        placeholder="Aliquota %"
      />
      <Button variant="ghost" isIconOnly={true} onPress={() => onRemove({upTo, rate, id})}>
        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 transition-colors" />
      </Button>
    </div>
  );
}