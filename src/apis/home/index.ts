import uniApi from "@/tools/uniCloudRequest";
import {AccountList} from "@/types/api/home";

interface AccountListApiParams {
	year: string;
	month: string;
}

export const getAccountListApi = (params: AccountListApiParams):Promise<AccountList> => {
	return uniApi('account/get_account_list', params)
}
