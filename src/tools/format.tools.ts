import {num2text} from "@/config/numberToText.config";
import {evaluate} from "mathjs"

export const formatWeek = (index: string | number): string => {
	if (index > 7 || index <= 0) throw "星期错误";
	// @ts-ignore
	return num2text[index];
}


// 获取前一个数字在后一个数字占比
export const perc1to2 = (num1: number, num2: number): number => {
	return evaluate(`${Number(num1) || 0}/${Number(num2) || 0}`).toFixed(2) * 100;
}
