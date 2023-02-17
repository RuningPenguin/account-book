// 用户信息
import {defineStore} from "pinia";
import {reactive} from "vue";
import {getAccountListApi} from "@/apis/home";
import type {HomeState, HomeStore} from "@/types/store/home";
import type {AccountList} from "@/types/api/home";
import {perc1to2} from "@/tools/format.tools";
import {evaluate} from "mathjs";


const useHomeStore = defineStore("home", (): HomeStore => {
	const state = reactive<HomeState>({
		//  获取账单列表参数
		accountParams: {
			year: uni.$u.timeFormat(Date.now(), 'yyyy'),
			month: uni.$u.timeFormat(Date.now(), 'mm')
		},
		list: [],// 数据列表
		status: 'nomore', // 列表加载状态
		allMoney: {
			expenditure: "0",
			income: "0"
		}, // 顶部数据
		budgetDate: {
			day: "0",
			month: "0",
			everyDay: "",
			overBudget: false,
			monthS: "0",
			dayS: "0",
			dayP: "0",
			monthP: "0"
		} // 预算信息
	});
	
	
	// 获取账单数据
	const getAccountList = async () => {
		// state.status = 'loading'
		const res: AccountList = await getAccountListApi(state.accountParams);
		// state.status = 'loadmore'
		state.allMoney.expenditure = res.expenditure
		state.allMoney.income = res.income
		// state.budgetDate = res.budget
		state.list = [...state.list, ...res.groupList]
		// 计算百分比
		state.budgetDate = {
			// ...state.budgetDate,
			...res.budget,
			...{
				overBudget: Number(res.expenditure) > Number(res.budget.month),
				monthS: evaluate(`${res.budget.month}-${res.expenditure}`).toFixed(2) || '0',
				dayS: evaluate(`${res.budget.day}-${res.budget.isToday ? state.list[0].expenditure : '0'}`).toFixed(2) || '0',
				dayP: String(perc1to2(res.budget.isToday ? state.list[0].expenditure : '0', res.budget.day)) || '0',
				monthP: String(perc1to2(res.expenditure, res.budget.month)) || '0'
			}
		}
		// state.status = 'nomore'
	}
	
	// 修改参数
	const updateAccountParams = (params: HomeState['accountParams']) => {
		state.accountParams = params;
	}
	
	// 修改参数
	const updateList = (list: HomeState['list']) => {
		state.list = list;
	}
	
	const reloadList = (accountParams?: HomeState["accountParams"]) => {
		updateAccountParams(accountParams || {
			year: uni.$u.timeFormat(Date.now(), 'yyyy'),
			month: uni.$u.timeFormat(Date.now(), 'mm')
		})
		updateList([])
		getAccountList();
	}
	
	return {state, getAccountList, updateAccountParams, updateList, reloadList};
}, {persist: {enabled: true}});

export default useHomeStore;
