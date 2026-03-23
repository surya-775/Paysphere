export default function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex lg:flex-col md:flex-col flex-row justify-between md:items-start items-center rounded-2xl border p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value} Tk</div>
    </div>
  );
}
