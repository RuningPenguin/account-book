import {num2text} from "@/config/numberToText.config";

export const formatWeek = (index: string | number): string => {
	if (index > 7 || index <= 0) throw "星期错误";
	return num2text[index];
}
