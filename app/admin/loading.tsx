// Skeleton die direct in beeld komt terwijl de serverdata laadt, zodat het
// admin-paneel niet meer als een blanco scherm aanvoelt tijdens het ophalen.
export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="h-14 border-b border-[#E8E0D0] bg-white" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-6 border-b border-[#E8E0D0] mb-7">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 w-20 mb-3 rounded bg-[#E8E0D0] animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-[#F0EBE0] animate-pulse" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-[#F0EBE0] animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  );
}
