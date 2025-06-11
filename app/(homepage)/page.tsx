'use client';

import * as React from "react";

// 1. import `HeroUIProvider` component
import {HeroUIProvider} from "@heroui/react";
import TaxSimulator from "./(components)/TaxSimulator";

export default function App() {
  // 2. Wrap HeroUIProvider at the root of your app
  return (
    <HeroUIProvider>
      <TaxSimulator />
    </HeroUIProvider>
  );
}