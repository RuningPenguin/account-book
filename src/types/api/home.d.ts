export type AccountList = {
	income: string; // 收入金额总数
	expenditure: string; // 支出金额总数
	budget: {
		day: string; // 每日预算
		month: string; // 月预算
		everyDay: string; // 每日可支配预算
	}
	groupList: Array<{
		income: string; // 收入金额总数
		expenditure: string; // 支出金额总数
		date: string; // 所属日期
		list: AccountListItem; // 详细数据
		total: number; // 当前日期数据总数
	}>
}


export interface AccountListItem {
	money: number; // 账单金额
	account_type: number; // 记录类型  0 支出; 1 收入
	remark: string; // 记录备注
	bill_type: string; // 金额类型
	last_update_date: number; // 时间戳
}
