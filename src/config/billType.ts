import {BillType} from "@/types/config/billType";

interface BillList {
	expenditureList: Array<BillType>,
	incomeList: Array<BillType>
}

export const expenditureList: Array<BillType> = [
	{
		name: 'chat',
		title: '社交'
	},
	{
		name: 'red-packet',
		title: '红包'
	},
	{
		name: 'home',
		title: '住房'
	}, {
		name: 'shopping-cart',
		title: '购物'
	},
	{
		name: 'phone',
		title: '通讯'
	},
	{
		name: 'car',
		title: '交通'
	},
	{
		name: 'question-circle',
		title: '其他'
	}
]

export const incomeList: Array<BillType> = [
	{
		name: 'rmb-circle',
		title: '工资'
	},
	{
		name: 'red-packet',
		title: '红包'
	},
	{
		name: 'man-add',
		title: '兼职'
	},
	{
		name: 'question-circle',
		title: '其他'
	}
]

// const billList: BillList = {expenditureList, incomeList}

export default {expenditureList, incomeList}
