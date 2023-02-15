import type {AccountList} from "@/types/api/home";
import {evaluate} from "mathjs";


export type HomeState = {
	accountParams: {
		year: string;
		month: string;
	},
	list: AccountList["groupList"] | [],
	status: string;
	allMoney: {
		expenditure: string;
		income: string
	},
	budgetDate: {
		day: string; // 日预算
		month: string; // 月预算
		everyDay: string; // 每日可支配预算
		dayP: string; // 每日可支配预算百分比
		monP: string; // 每日可支配预算百分比
		overBudget: boolean; // 是否超预算
		monthS: string; // 月剩余
		dayS: string; // 日剩余
	}
}

export interface HomeStore {
	state: HomeState
	getAccountList: () => void
	updateAccountParams: (params: HomeState['accountParams']) => void
	updateList: (list: HomeState['list']) => void
	reloadList: (accountParams?:HomeState["accountParams"]) => void
}
