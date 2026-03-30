import { suburbs } from "@/data/suburbs";

type SearchBarProps = {
  action?: string;
  defaultValues?: {
    suburb?: string;
    priceRange?: string;
    bedrooms?: string;
  };
};

const priceOptions = [
  { value: "", label: "Any price" },
  { value: "under-300", label: "Under $300" },
  { value: "300-400", label: "$300-$400" },
  { value: "400-500", label: "$400-$500" },
  { value: "500-plus", label: "$500+" },
];

export function SearchBar({ action = "/search", defaultValues }: SearchBarProps) {
  return (
    <form action={action} className="search-glass grid gap-3 rounded-[1.75rem] bg-white p-4 md:grid-cols-[1.2fr_0.85fr_0.75fr_auto]">
      <div className="grid gap-2">
        <label htmlFor="suburb" className="text-sm font-semibold text-slate-700">
          Suburb
        </label>
        <div className="flex min-h-11 items-center rounded-2xl border border-border bg-slate-50 px-4">
          <span className="mr-2 text-slate-400">⌕</span>
          <input
            id="suburb"
            list="suburb-options"
            name="suburb"
            placeholder="Search suburb"
            defaultValue={defaultValues?.suburb}
            className="w-full bg-transparent py-3 text-sm outline-none"
          />
        </div>
        <datalist id="suburb-options">
          {suburbs.map((suburb) => (
            <option key={suburb.slug} value={suburb.name} />
          ))}
        </datalist>
      </div>
      <div className="grid gap-2">
        <label htmlFor="priceRange" className="text-sm font-semibold text-slate-700">
          Price
        </label>
        <select
          id="priceRange"
          name="priceRange"
          defaultValue={defaultValues?.priceRange || ""}
          className="min-h-11 rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm"
        >
          {priceOptions.map((option) => (
            <option key={option.value || "any"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="bedrooms" className="text-sm font-semibold text-slate-700">
          Bedrooms
        </label>
        <select
          id="bedrooms"
          name="bedrooms"
          defaultValue={defaultValues?.bedrooms || ""}
          className="min-h-11 rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm"
        >
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
      <button
        type="submit"
        className="min-h-11 rounded-2xl bg-primary px-6 py-3 text-sm font-bold text-white md:self-end"
      >
        Search
      </button>
    </form>
  );
}
