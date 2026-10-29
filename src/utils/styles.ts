// Class dùng chung
export const adminStyles = {
  // Thẻ nội dung
  card: [
    'bg-white dark:bg-slate-900',
    'border border-slate-200 dark:border-slate-800',
    'rounded-3xl',
    'transition-colors duration-300',
  ].join(' '),

  // Thẻ chỉ số
  statCard: [
    'p-5 sm:p-6',
    'shadow-sm hover:shadow-md',
    'transition-all duration-300',
  ].join(' '),

  // Khung chứa chart, nội dung
  section: [
    'p-5 sm:p-6',
    'shadow-sm min-w-0',
  ].join(' '),

  // Tiêu đề khu vực
  sectionTitle: 'text-base font-extrabold',

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


// Class phụ thuộc bởi darkMode - truyền biến vào sẽ đổi giữa 2 cái
export const getAdminTheme = (isDark: boolean) => ({
  page: isDark
    ? 'bg-slate-950 text-slate-100'
    : 'bg-slate-50 text-slate-800',

  header: [
    'min-h-20 backdrop-blur-md border-b',
    'flex items-center justify-between gap-4',
    'px-4 sm:px-8 py-3',
    'z-10 shrink-0',
    'transition-colors duration-300',
    isDark
      ? 'bg-slate-950/90 border-slate-800'
      : 'bg-white/80 border-slate-200/80',
  ].join(' '),

  headerTitle: [
    'font-extrabold text-base tracking-tight',
    isDark ? 'text-white' : 'text-slate-900',
  ].join(' '),

  themeToggleButton: [
    'w-10 h-10 flex items-center justify-center',
    'rounded-xl border transition-all duration-200',
    isDark
      ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700'
      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200',
  ].join(' '),

  sidebar: isDark
    ? 'bg-slate-900 border-slate-800'
    : 'bg-white border-slate-200',

  divider: isDark
    ? 'border-slate-800'
    : 'border-slate-100',

  heading: isDark
    ? 'text-white'
    : 'text-slate-900',

  secondary: isDark
    ? 'text-slate-300'
    : 'text-slate-600',

  hover: isDark
    ? 'hover:bg-slate-800 hover:text-white'
    : 'hover:bg-slate-50 hover:text-slate-900',

  main: isDark
    ? 'bg-slate-950'
    : 'bg-slate-50',

  dropdownClass: [
    'absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)]',
    'rounded-2xl border shadow-xl overflow-hidden',
    'z-50 origin-top-right',
    'animate-in fade-in slide-in-from-top-2 duration-200',
    isDark
      ? 'bg-slate-900 border-slate-700 shadow-black/30'
      : 'bg-white border-slate-200 shadow-slate-200/70',
  ].join(' '),

  menuItemClass: [
    'w-full flex items-center gap-3 px-4 py-3',
    'text-sm font-semibold text-left',
    'transition-colors duration-200',
    isDark
      ? 'text-slate-200 hover:bg-slate-800'
      : 'text-slate-700 hover:bg-slate-50',
  ].join(' '),
});