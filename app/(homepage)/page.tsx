'use client';

import * as React from "react";

// 1. import `HeroUIProvider` component
import TaxSimulator from "./(components)/TaxSimulator";
import { HeroUIProvider } from "@heroui/system";

export default function App() {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <HeroUIProvider>
      <TaxSimulator />
    </HeroUIProvider>
  );
}