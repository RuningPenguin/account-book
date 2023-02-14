import type {AccountList} from "@/types/api/home";


export type HomeState = {
	accountParams: {
		year: string;
		month: string;
	},
	list: AccountList["groupList"] | [],
	status: string;
	allMoney: {
		expenditure: number;
		income: number
	}
}

export interface HomeStore {
	state: HomeState
	getAccountList: () => void
	updateAccountParams: (params: HomeState['accountParams']) => void
	updateList: (list: HomeState['list']) => void
}
