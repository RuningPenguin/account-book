// 获取指定月份天数
export const getMonthDay = (year: string | number, month: string | number): number => {
	const d = new Date(Number(year), Number(month), 0);
	return d.getDate();
}
