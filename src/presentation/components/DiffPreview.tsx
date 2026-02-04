import Legend from "./Legend";
import ValueBox from "./ValueBox";

export type DiffType = "added" | "removed" | "modified" | "unchanged";

export interface DiffItem {
  field: string;
  before?: string | number | null;
  after?: string | number | null;
  type: DiffType;
}

interface DiffPreviewProps {
  title?: string;
  diffs: DiffItem[];
}

function DiffPreview({ title = "Change Preview", diffs }: DiffPreviewProps) {
  return (
    <div className="w-full h-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b px-4 py-3 md:px-6 md:py-4">
        <h2 className="text-base md:text-lg font-semibold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-3 text-sm font-medium text-gray-500">
        <div>Field</div>
        <div>Before</div>
        <div>After</div>
      </div>

      {/* Content */}
      <div className="divide-y">
        {diffs.map((diff) => (
          <div
            key={diff.field}
            className="px-4 py-4 md:px-6 md:grid md:grid-cols-3 md:gap-4 md:items-center"
          >
            {/* Field */}
            <div className="mb-2 md:mb-0 font-medium text-gray-700">
              {diff.field}
            </div>

            {/* Mobile Labels */}
            <div className="space-y-2 md:contents">
              {/* Before */}
              <div>
                <p className="mb-1 text-xs text-gray-400 md:hidden">Before</p>
                <ValueBox
                  value={diff.before}
                  type={diff.type}
                  variant="before"
                />
              </div>

              {/* After */}
              <div>
                <p className="mb-1 text-xs text-gray-400 md:hidden">After</p>
                <ValueBox value={diff.after} type={diff.type} variant="after" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 px-4 py-3 md:px-6 text-xs text-gray-600">
        <Legend color="bg-green-500" label="Added" />
        <Legend color="bg-yellow-500" label="Modified" />
        <Legend color="bg-red-500" label="Removed" />
      </div>
    </div>
  );
}

export default DiffPreview;
