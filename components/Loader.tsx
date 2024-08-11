export const Loader = ({ alt }: { alt?: string }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 flex flex-col gap-6">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    {alt && <p className="text-gray-900 font-light">{alt}</p>}
  </div>
);