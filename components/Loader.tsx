export const Loader = ({ alt }: { alt?: string }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-300 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
      </div>
      {alt && <p className="text-gray-700 font-medium text-lg">{alt}</p>}
    </div>
  </div>
);