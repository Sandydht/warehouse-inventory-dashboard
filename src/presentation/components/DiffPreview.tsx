import ValueBox from "./ValueBox";

export interface DiffItem {
  field: string;
  before?: string | number | null;
  after?: string | number | null;
}

interface DiffPreviewProps {
  title?: string;
  diffs: DiffItem[];
}

function DiffPreview({ title = "Change Preview", diffs }: DiffPreviewProps) {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start rounded-lg bg-white shadow-md border border-gray-200 overflow-hidden">
      <div className="w-full h-auto p-4 border-b border-gray-300">
        <p className="text-left text-[16px] leading-6 font-semibold">{title}</p>
      </div>

      {diffs.map((diff) => (
        <div
          key={diff.field}
          className="w-full h-auto p-4 flex flex-col items-start justify-start gap-4 border-b border-gray-300 md:flex-row"
        >
          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
              Field
            </p>
            <p className="text-left text-[16px] leading-6 text-black">
              {diff.field}
            </p>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
              Before
            </p>
            {diff.before !== diff.after ? (
              <ValueBox value={diff.before} />
            ) : (
              <p className="text-left text-[16px] leading-6 text-black">
                {diff.before}
              </p>
            )}
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-0.5">
            <p className="text-left text-[12px] leading-4 font-semibold text-gray-500">
              After
            </p>
            {diff.before !== diff.after ? (
              <ValueBox value={diff.after} />
            ) : (
              <p className="text-left text-[16px] leading-6 text-black">
                {diff.after}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DiffPreview;
