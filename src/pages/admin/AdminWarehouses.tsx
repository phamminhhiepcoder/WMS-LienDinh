export default function AdminWarehouses() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Đang tải dữ liệu...
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Vui lòng chờ trong giây lát.
        </p>
      </div>
    </div>
  );
}