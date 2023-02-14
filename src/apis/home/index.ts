import uniApi from "@/tools/uniCloudRequest";
import {AccountList} from "@/types/api/home";

type AccountListApiParams = {
	year: string;
	month: string;
}

type CreateBudgeApiParams = {
	money: number;
	budget_money?: number;
	budget_type?: string
}

// 获取首页数据 + 列表
export const getAccountListApi = (params: AccountListApiParams): Promise<AccountList> => {
	return uniApi('account/get_account_list', params)
}

// 创建预算
export const createBudgetApi = (params: CreateBudgeApiParams): Promise<string> => {
	return uniApi('budget/create_budget', params)
}
