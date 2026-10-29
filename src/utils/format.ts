// util format tiền Việt
export const formatNumber = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

export const formatTooltip = (value: number | string) =>
  `${formatNumber(Number(value))} sản phẩm`;