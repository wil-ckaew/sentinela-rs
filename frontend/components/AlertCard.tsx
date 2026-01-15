type Props = {
  log: string;
  alert: string;
};

export default function AlertCard({ log, alert }: Props) {
  return (
    <div className="border rounded p-4 bg-red-50">
      <h3 className="font-bold text-red-600">{alert}</h3>
      <p className="text-sm mt-2 break-all">{log}</p>
    </div>
  );
}
