// 判断是否有值
export const isFlag = function (val: any): boolean {
	if (Object.prototype.toString.call(val) == '[object Null]' || Object.prototype.toString
		.call(val) == '[object Undefined]') {
		return false
	} else {
		return true
	}
}

// 获取时间区间
export function createTimeSection(year: number = new Date().getFullYear(), month: number = new Date().getMonth() + 1): [number, number] {
	const prev = Date.parse(`${year}-${month}-01 00:00:00`);
	const next = Date.parse(`${year}-${Number(month) + 1}-01 00:00:00`);
	return [Number(prev), Number(next)]
}

// 复制
export const copy = (str: string) => {
	uni.setClipboardData({
		data: str,
		showToast: false,
		success: res => {
			uni.showToast({
				title: '内容已复制',
				icon: "none"
			})
		}
	});
}

// 跳转页面
export const goPage = (url: string, query: { [x: string]: string } = {}, redirectTo: boolean = false) => {
	let queryPam: string = '';
	let toUrl: string = url;
	queryPam = Object.keys(query).filter((key: string) => isFlag(query[key])).map((key: string) => `${key}=${query[key]}`).join("&");
	queryPam && (toUrl += (toUrl.includes("?") ? "&" : "?") + queryPam)
	
	return redirectTo
		? uni.redirectTo({url: toUrl})
		: uni.navigateTo({url: toUrl});
}
// 跳转tab
export const goTab = (url: string) => uni.switchTab({url})

// 返回上一页
export const goBack = (delta: number = 1) => uni.navigateBack({delta})
