// 用户信息
import {defineStore} from "pinia";
import {reactive} from "vue";
import {getAccountListApi} from "@/apis/home";
import type {HomeState, HomeStore} from "@/types/store/home";
import type {AccountList} from "@/types/api/home";


const useHomeStore = defineStore("home", (): HomeStore => {
	const state = reactive<HomeState>({
		//  获取账单列表参数
		accountParams: {
			year: uni.$u.timeFormat(Date.now(), 'yyyy'),
			month: uni.$u.timeFormat(Date.now(), 'mm')
		},
		list: [],// 数据列表
		status: 'nomore', // 列表加载状态
		allMoney:{
			expenditure: 0,
			income: 0
		}, // 顶部数据
	});
	
	
	// 获取账单数据
	const getAccountList = () => {
		// state.status = 'loading'
		getAccountListApi(state.accountParams).then((res: AccountList) => {
			// state.status = 'loadmore'
			state.allMoney.expenditure = res.expenditure
			state.allMoney.income = res.income
			state.list = [...state.list, ...res.groupList]
			// state.status = 'nomore'
		})
	}
	
	// 修改参数
	const updateAccountParams = (params: HomeState['accountParams']) => {
		state.accountParams = params;
	}
	
	// 修改参数
	const updateList = (list: HomeState['list']) => {
		state.list = list;
	}
	
	return {state, getAccountList, updateAccountParams, updateList};
}, {persist: {enabled: true}});

export default useHomeStore;
