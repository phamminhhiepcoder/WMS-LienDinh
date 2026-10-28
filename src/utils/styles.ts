export const adminStyles = {
  // Thẻ nội dung chính
  card: [
    'bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-800',
    'rounded-3xl',
    'transition-colors duration-300',
  ].join(' '),

  // Tiêu đề
  title: 'text-slate-900 dark:text-white',

  // Nội dung chính
  bodyText: 'text-slate-800 dark:text-slate-200',

  // Mô tả
  mutedText: 'text-slate-500 dark:text-slate-400',

  // Đường phân cách
  divider: 'border-slate-100 dark:border-slate-800',

  // Dòng sản phẩm, dòng dữ liệu
  row: [
    'bg-slate-50 dark:bg-slate-800/70',
    'border border-slate-100 dark:border-slate-700',
    'transition-colors duration-300',
  ].join(' '),

  // Khung nền phụ
  softPanel: [
    'bg-slate-50 dark:bg-slate-800/70',
    'border border-slate-100 dark:border-slate-700',
    'transition-colors duration-300',
  ].join(' '),

  // Ô nhập
  input: [
    'w-full rounded-xl border',
    'border-slate-200 dark:border-slate-700',
    'bg-white dark:bg-slate-800',
    'text-slate-900 dark:text-white',
    'placeholder:text-slate-400 dark:placeholder:text-slate-500',
    'focus:outline-none focus:ring-2 focus:ring-purple-500/30',
    'focus:border-purple-500',
    'transition-colors duration-200',
  ].join(' '),

  // Nút 
  secondaryButton: [
    'rounded-xl border',
    'border-slate-200 dark:border-slate-700',
    'bg-white dark:bg-slate-800',
    'text-slate-700 dark:text-slate-200',
    'hover:bg-slate-100 dark:hover:bg-slate-700',
    'transition-colors duration-200',
  ].join(' '),

  // Bảng
  table: 'bg-white dark:bg-slate-900',

  tableHeader: [
    'bg-slate-50 dark:bg-slate-800',
    'text-slate-500 dark:text-slate-400',
  ].join(' '),

  tableRow: [
    'border-b border-slate-100 dark:border-slate-800',
    'hover:bg-slate-50 dark:hover:bg-slate-800/60',
    'transition-colors duration-200',
  ].join(' '),
};
