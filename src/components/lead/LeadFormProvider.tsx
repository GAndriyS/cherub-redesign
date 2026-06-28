"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { LeadDialog } from "./LeadDialog";

export type LeadPrefill = {
  /** Назва туру/напрямку, що підставиться у поле «Напрямок». */
  tour?: string;
  /** Технічна мітка, звідки відкрито форму (для Telegram). */
  source?: string;
  /** Заголовок модалки. */
  title?: string;
};

type LeadFormContextValue = {
  open: (prefill?: LeadPrefill) => void;
  close: () => void;
};

const LeadFormContext = createContext<LeadFormContextValue | null>(null);

export function useLeadForm() {
  const ctx = useContext(LeadFormContext);
  if (!ctx) {
    throw new Error("useLeadForm має використовуватися всередині <LeadFormProvider>");
  }
  return ctx;
}

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<LeadPrefill>({});

  const open = useCallback((p?: LeadPrefill) => {
    setPrefill(p ?? {});
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ open, close }}>
      {children}
      <LeadDialog isOpen={isOpen} onClose={close} prefill={prefill} />
    </LeadFormContext.Provider>
  );
}
