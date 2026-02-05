function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}

export default DetailItem;
