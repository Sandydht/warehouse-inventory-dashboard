interface ValueBoxProps {
  value: string | number | null | undefined;
}

function ValueBox({ value }: ValueBoxProps) {
  return (
    <div className="w-full h-auto px-4 py-2 rounded-lg bg-green-100">
      <p className="text-left text-[16px] leading-6 text-green-700">
        {value !== null || value !== undefined ? value : "-"}
      </p>
    </div>
  );
}

export default ValueBox;
