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

  // Header
  headerSearchIcon: isDark
    ? 'text-slate-400'
    : 'text-slate-500',

  headerZoomText: isDark
    ? 'text-slate-300'
    : 'text-slate-600',

  languageDropdown: [
    'absolute right-0 top-full z-50 mt-2 w-40',
    'rounded-xl border p-1 shadow-xl',
    isDark
      ? 'bg-slate-900 border-slate-700'
      : 'bg-white border-slate-200',
  ].join(' '),

  languageOption: [
    'flex w-full items-center justify-between gap-2',
    'rounded-lg px-3 py-2.5 text-sm',
  ].join(' '),

  languageOptionActive: isDark
    ? 'text-purple-300 bg-purple-950/50'
    : 'text-purple-600 bg-purple-50',

  languageOptionInactive: [
    isDark
      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  ].join(' '),

  controlButtonDisabled:
    'disabled:opacity-40 disabled:cursor-not-allowed',

  languageButton: 'gap-1 px-2 w-auto',

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

  // Sidebar navigation
  nav: [
    'flex-1 space-y-10 overflow-y-auto px-4 py-6',
    'scrollbar-thin',
  ].join(' '),

  navSectionTitle: [
    'mb-3 px-4 text-[10px] font-bold uppercase tracking-[0.16em]',
    isDark ? 'text-slate-500' : 'text-slate-400',
  ].join(' '),

  navSectionDivider: [
    'border-b pb-6',
    isDark ? 'border-slate-800' : 'border-slate-100',
  ].join(' '),

  navItem: [
    'flex w-full items-center gap-3.5 rounded-xl px-4 py-3',
    'text-sm font-bold transition-all duration-200',
    isDark
      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
  ].join(' '),

  navItemActive:
    'bg-purple-600 text-white shadow-md shadow-purple-600/15',

  navItemIcon: isDark ? 'text-slate-400' : 'text-slate-500',

  navItemIconActive: 'text-white',

  navSubmenuIcon: [
    'h-5 w-5 shrink-0 transition-colors',
    isDark ? 'text-slate-400' : 'text-slate-500',
  ].join(' '),

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
  sidebarBrandCard: [
    'flex items-center gap-3 rounded-xl border p-3',
    'transition-colors duration-300',
    isDark
      ? 'border-slate-700 bg-slate-900'
      : 'border-slate-200 bg-white shadow-sm',
  ].join(' '),

  sidebarBrandIcon: [
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
    isDark
      ? 'bg-blue-500/15 text-blue-400'
      : 'bg-blue-50 text-blue-600',
  ].join(' '),

  sidebarBrandName: [
    'truncate text-sm font-bold',
    isDark ? 'text-white' : 'text-slate-800',
  ].join(' '),

  // Dropdown user info
  dropdownTrigger: [
    'flex items-center gap-3 rounded-2xl p-1.5 pl-2',
    'transition-all duration-200 outline-none',
    'focus-visible:ring-2 focus-visible:ring-purple-500',
    isDark
      ? 'hover:bg-slate-800/70'
      : 'hover:bg-slate-100',
  ].join(' '),

  dropdownTriggerActive: isDark
    ? 'bg-slate-800'
    : 'bg-slate-100',

  dropdownTriggerInfo: 'hidden max-w-40 text-right sm:block',

  dropdownTriggerName: [
    'truncate text-sm font-bold',
    isDark ? 'text-white' : 'text-slate-900',
  ].join(' '),

  dropdownTriggerRole: [
    'text-[10px] font-bold uppercase tracking-wider',
    'text-purple-500',
  ].join(' '),

  dropdownTriggerAvatar: [
    'flex h-10 w-10 select-none items-center justify-center',
    'rounded-xl border text-sm font-extrabold',
    isDark
      ? 'bg-purple-950 text-purple-300 border-purple-800'
      : 'bg-purple-50 text-purple-600 border-purple-200',
  ].join(' '),

  dropdownTriggerChevron: [
    'h-4 w-4 transition-transform duration-200',
    isDark ? 'text-slate-400' : 'text-slate-500',
  ].join(' '),

  dropdownHeader: [
    'border-b p-4',
    isDark ? 'border-slate-800' : 'border-slate-100',
  ].join(' '),

  dropdownAvatar: [
    'flex h-12 w-12 items-center justify-center',
    'rounded-2xl border text-lg font-black',
    isDark
      ? 'bg-purple-950 text-purple-300 border-purple-800'
      : 'bg-purple-50 text-purple-600 border-purple-200',
  ].join(' '),

  dropdownUserName: [
    'truncate text-sm font-extrabold',
    isDark ? 'text-white' : 'text-slate-900',
  ].join(' '),

  dropdownUserDescription: [
    'mt-1 truncate text-xs',
    isDark ? 'text-slate-400' : 'text-slate-500',
  ].join(' '),

  dropdownRole: [
    'mt-3 inline-flex items-center gap-1.5',
    'rounded-lg px-2.5 py-1 text-[10px]',
    'font-bold uppercase tracking-wider',
    isDark
      ? 'bg-emerald-950/60 text-emerald-400'
      : 'bg-emerald-50 text-emerald-700',
  ].join(' '),

  dropdownFooter: [
    'border-t p-2',
    isDark ? 'border-slate-800' : 'border-slate-100',
  ].join(' '),

  dropdownLogoutButton: [
    'flex w-full items-center gap-3 px-4 py-3',
    'rounded-xl text-left text-sm font-bold',
    'transition-colors',
    isDark
      ? 'text-red-400 hover:bg-red-950/40'
      : 'text-red-600 hover:bg-red-50',
  ].join(' '),

  controlButtonClass: [
    'h-10 w-10 shrink-0 flex items-center justify-center',
    'rounded-xl border transition-colors duration-200',
    isDark
      ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100',
  ].join(' ')
});