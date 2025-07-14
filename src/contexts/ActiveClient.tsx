import { createContext, useContext, useState } from "react";
import type { Client } from "@prisma/client";

interface ActiveClientContextType {
  activeClient: Client | null;
  setActiveClient: (client: Client | null) => void;
}

const ActiveClientContext = createContext<ActiveClientContextType | null>(null);

export function ActiveClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeClient, setActiveClient] = useState<Client | null>(null);

  return (
    <ActiveClientContext.Provider value={{ activeClient, setActiveClient }}>
      {children}
    </ActiveClientContext.Provider>
  );
}

export function useActiveClient() {
  const context = useContext(ActiveClientContext);
  if (!context) {
    throw new Error(
      "useActiveClient must be used within an ActiveClientProvider",
    );
  }
  return context;
}
