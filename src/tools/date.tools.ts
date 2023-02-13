
// 获取指定月份天数
export const getMonthDay = (year: string | number, month: string | number): number => {
	const d = new Date(year, month, 0);
	return d.getDate();
}
