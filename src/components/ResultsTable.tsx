import type { ResultsTable as ResultsTableData } from "@/data/projects";

export function ResultsTable({ data }: { data: ResultsTableData }) {
  return (
    <figure>
      <h2 className="text-2xl font-semibold tracking-tight text-mist-200 sm:text-3xl">
        {data.heading}
      </h2>
      {data.caption && (
        <p className="mt-3 text-base leading-relaxed text-mist-400">{data.caption}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink-600">
        <table className="w-full min-w-[520px] border-collapse text-left text-base">
          <thead>
            <tr className="bg-ink-800">
              {data.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] ${
                    i === data.highlight ? "text-ember-400" : "text-mist-400"
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row[0]} className="border-t border-ink-700 bg-ink-900">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-5 py-3.5 ${
                      i === 0
                        ? "font-medium text-mist-200"
                        : i === data.highlight
                          ? "font-semibold tabular-nums text-ember-400"
                          : "tabular-nums text-mist-300"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.footnote && (
        <figcaption className="mt-3 text-sm leading-relaxed text-mist-400">
          {data.footnote}
        </figcaption>
      )}
    </figure>
  );
}
