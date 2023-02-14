import uniApi from "@/tools/uniCloudRequest";

type CreateDateApiParams = {
	money: number;
	account_type: 0 | 1;
	remark: string;
	bill_type: string
}

// 创建一条账单数据
export const createDateApi = (params: CreateDateApiParams): Promise<string> => {
	return uniApi("account/create_data", params)
}
