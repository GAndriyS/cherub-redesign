"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import type { CatalogTour } from "@/lib/catalog";
import { CatalogCard } from "./CatalogCard";

const PAGE_SIZE = 6;

export function Catalog({
  tours,
  categories,
}: {
  tours: CatalogTour[];
  categories: string[];
}) {
  const allLabel = categories[0] ?? "Усі";
  const [active, setActive] = useState(allLabel);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [active, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tours.filter(
      (t) =>
        (active === allLabel || t.tags.includes(active)) &&
        (q === "" || t.title.toLowerCase().includes(q)),
    );
  }, [tours, active, allLabel, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Container className="pb-5 pt-7">
      {/* toolbar */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors",
                active === c ? "bg-ink text-white" : "bg-chip text-text2 hover:bg-chip-hover",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-field bg-white px-4 py-2.5 lg:w-[250px]">
          <Search size={16} className="text-gold" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Пошук паломництва…"
            aria-label="Пошук паломництва"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted2"
          />
        </div>
      </div>

      {/* grid */}
      {visible.length > 0 ? (
        <div className="grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t) => (
            <CatalogCard key={t.slug} tour={t} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-text2">
          За вашим запитом нічого не знайдено. Спробуйте інший напрямок або зателефонуйте — складемо
          маршрут під вас.
        </p>
      )}

      {/* pagination */}
      {pageCount > 1 && (
        <div className="mt-9 flex items-center justify-center gap-2">
          <PageButton
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            aria-label="Попередня сторінка"
          >
            <ChevronLeft size={18} />
          </PageButton>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <PageButton key={n} active={n === currentPage} onClick={() => setPage(n)}>
              {n}
            </PageButton>
          ))}
          <PageButton
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
            aria-label="Наступна сторінка"
          >
            <ChevronRight size={18} />
          </PageButton>
        </div>
      )}
    </Container>
  );
}

function PageButton({
  children,
  active = false,
  disabled = false,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "grid h-10 w-10 place-items-center rounded-xl text-[14px] font-bold transition-colors",
        active
          ? "bg-ink text-white"
          : "border border-field text-ink hover:border-gold hover:text-gold",
        disabled && "cursor-not-allowed text-muted2 opacity-50 hover:border-field hover:text-muted2",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
