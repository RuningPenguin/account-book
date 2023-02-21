<template>
	<u-popup
		:overlay="props.overlay"
		:closeOnClickOverlay="props.closeOnClickOverlay"
		mode="number"
		:popup="false"
		:show="props.show || openShow"
		:safeAreaInsetBottom="props.safeAreaInsetBottom"
		@close="$emit('close');"
		:zIndex="zIndex"
		:customStyle="{ backgroundColor: 'rgb(214, 218, 220)',position: 'fixed',bottom: '0rpx',zIndex:99999,width: '100%'}"
	>
		<slot/>
		<view>{{inputValue}}</view>
		<view class="keyboard_wrap">
			<view class="keyboard" @touchmove.stop.prevent="noop">
				<view class="keyboard__button-wrapper" v-for="(item, index) in numList" :key="index">
					<view
						class="keyboard__button-wrapper__button"
						hover-class="u-hover-class"
						:style="[itemStyle(index)]"
						:hover-stay-time="200"
						@tap="onKeyTap(item)"
					>
						<text class="keyboard__button-wrapper__button__text">{{ item }}</text>
					</view>
				</view>
				<view class="keyboard__button-wrapper">
					<view
						class="keyboard__button-wrapper__button keyboard__button-wrapper__button--gray"
						hover-class="u-hover-class"
						:hover-stay-time="200"
						@touchstart.stop="onKeyTap('del')"
						@touchend="clearTimer"
					>
						<u-icon name="backspace" color="#303133" size="28"/>
					</view>
				</view>
			</view>

			<view class="keyboard option">
				<div class="keyboard__button-wrapper">
					<div
						class="keyboard__button-wrapper__button"
						hover-class="u-hover-class"
						:hover-stay-time="200"
						@tap="onKeyTap('date')"
					>
						<idv class="keyboard__button-wrapper__button__text" style="display: flex;align-items: center;font-size: 26rpx">
							<u-icon v-if="!date" name="calendar" color="#303133" size="28" style="margin-right: 10rpx"/>
							{{ date ? date : '日期' }}
						</idv>
					</div>
				</div>
				<div class="keyboard__button-wrapper">
					<div
						class="keyboard__button-wrapper__button"
						hover-class="u-hover-class"
						:hover-stay-time="200"
						@tap="onKeyTap('+')"
					>
						<idv class="keyboard__button-wrapper__button__text">+</idv>
					</div>
				</div>
				<div class="keyboard__button-wrapper">
					<div
						class="keyboard__button-wrapper__button"
						hover-class="u-hover-class"
						:hover-stay-time="200"
						@tap="onKeyTap('-')"
					>
						<idv class="keyboard__button-wrapper__button__text">-</idv>
					</div>
				</div>
				<div class="keyboard__button-wrapper">
					<div
						class="keyboard__button-wrapper__button bg-orange"
						hover-class="u-hover-class"
						:hover-stay-time="200"
						@tap="onConfirm()"
						style="background-color: #f9db61"
					>
						<idv class="keyboard__button-wrapper__button__text">完成</idv>
					</div>
				</div>

			</view>
		</view>
	</u-popup>

</template>

<script lang="ts" setup>
import mixin from '@/components/mixin.js';
import { computed, ref, watch } from "vue";
import floatObj from "@/components/floatObj.js"
import { re } from "mathjs";

/**
 * keyboard 键盘组件
 * @description
 * @tutorial
 * @property {String}  mode    键盘的类型，number-数字键盘，card-身份证键盘
 * @property {Boolean}  dotDisabled  是否显示键盘的"."符号
 * @property {Boolean}  random    是否打乱键盘按键的顺序
 * @event {Function} change    点击键盘触发
 * @event {Function} backspace  点击退格键触发
 * @example
 */


const props = defineProps({
	safeAreaInsetBottom: {
		type: Boolean,
		default: true
	},
	// 是否允许通过点击遮罩关闭键盘
	closeOnClickOverlay: {
		type: Boolean,
		default: true
	},
	// 控制键盘的弹出与收起
	show: {
		type: Boolean,
		default: false
	},
	// 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
	overlay: {
		type: Boolean,
		default: true
	},
	// z-index值
	zIndex: {
		type: [String, Number],
		default:99999
	},
	// 键盘的类型，number-数字键盘，card-身份证键盘
	mode: {
		type: String,
		default: 'number'
	},
	// 是否显示键盘的"."符号
	dotDisabled: {
		type: Boolean,
		default: false
	},
	// 是否打乱键盘按键的顺序
	random: {
		type: Boolean,
		default: false
	},
});

const backspace = ref<string>('backspace')
const dot = ref<string>('.')
const cardX = ref<string>('X')
const timer = ref<any>(null)
const openShow = ref<any>(false)
const date = ref<string|null>(null)
const inputValue = ref<string|null|number>(null)
const _resolve = ref<any>(null)
const _reject = ref<any>(null)
const first = ref<any>(true)
const numList = computed(() => {
	let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, '',0]
	if (props.mode === 'card') {
		list.splice(-2,1,cardX.value)
	} else if (props.mode === 'number') {
		list.splice(-2,1,dot.value)
	}
	if (props.random) {
		return uni.$u.randomArray(list)
	} else {
		return list
	}
})
const itemStyle = computed(() => {
	return index => {
		let style = {};
		if (props.mode == 'number' && props.dotDisabled && index == 9) style.width = '464rpx';
		return style;
	}
})
const btnBgGray = computed(() => {
	return index => {
		if (!props.random && index == 9 && (props.mode != 'number' || (props.mode == 'number' && !props
			.dotDisabled))) return true;
		else return false;
	}
})

watch(openShow.value,(v) => {
	if (!v) {
		if(_reject.value) {
			_reject.value('cancel')
		}
		_resolve.value = null
		_reject.value = null
	}
})
const emits = defineEmits()
const open = (option:any) => {
	return new Promise((resolve, reject) => {
		_resolve.value = resolve
		_reject.value = reject
		inputValue.value = Number(option.value)
		openShow.value = true
		first.value = true
		console.log('option',option,_resolve.value)
		if (option.date) {
			date.value = option.date
		}
	})
}
const onKeyTap = (key: any) => {
	let value = inputValue.value.toString()
	//正则验证纯数字
	const numTest = new RegExp(/^[0-9]*$/)
	if (first.value) {
		first.value = false
		if (numTest.test(key)) {
			inputValue.value = key
			return
		} else {
			if (value.indexOf('.') >= 0 && key !== '-' && key !== '+') {
				inputValue.value = '0.'
				return
			}
		}
	} else {
		if (key === 'del') {
			if (value.length) {
				inputValue.value = value.substr(0, value.length - 1) || 0
			}
			return
		} else if(key === '.') {
			if (value.indexOf('-') === -1&&value.indexOf('+') === -1) {
				if (value.indexOf('.') !== -1 || value === '') {
					return
				}
			} else if (value.indexOf('-') !== -1 || value.indexOf('+') !== -1) {
				const [a,b] = value.split('-')
				const [c,d] = value.split('+')
				if (b === '' || d === '') {
					inputValue.value = value + '0.'
					return
				} else if (b?.indexOf('.') !== -1||d?.indexOf('.') !== -1) {
					return
				}
			}
		} else if(key === '+') {
			if (value.indexOf('-') >= 0) {
				inputValue.value = value.split('-')[0] + key
				return
			} else if (value.indexOf('+') >= 0) {
				const [a,b] = value.split('+')
				if (b !== '') {
					inputValue.value = floatObj.add(Number(a),Number(b)) + key
					return
				} else {
					return
				}
			}
		} else if(key === '-') {
			if (value.indexOf('+') >= 0) {
				inputValue.value = value.split('+')[0] + key
				return
			} else if (value.indexOf('-') >= 0) {
				const [a,b] = value.split('-')
				if (b !== '') {
					inputValue.value = floatObj.add(Number(a),Number(b)) + key
					return
				} else {
					return
				}
			}
		}
		if (key !== '.' && value.indexOf('.') === -1 && value.startsWith('0')) {
			value = value.substr(1, value.length)
		}
	}
	inputValue.value = value + key

}

const onConfirm = () => {
	if (inputValue.value) {
		let value = inputValue.value.toString()
		if (value.includes('-')) {
			const list = value.split('-') || []
			const index = value.split('').findIndex(item => item==='-')
			if (index === value.length - 1) {
				inputValue.value = Number(list[0])
			} else {
				inputValue.value = Number(list[0])
				list.slice(1,list.length).forEach(item => {
					inputValue.value = floatObj.subtract(Number(inputValue.value),Number(item))
				})
				inputValue.value = Math.abs(inputValue.value)
			}
		} else if (value.includes('+')) {
			const list = value.split('+') || []
			const index = value.split('').findIndex(item => item==='+')
			if (index === value.length - 1) {
				inputValue.value = Number(list[0])
			} else {
				inputValue.value = Number(list[0])
				list.slice(1,list.length).forEach(item => {
					inputValue.value = floatObj.add(Number(inputValue.value),Number(item))
				})
				inputValue.value = Math.abs(inputValue.value)
			}
		} else {
			inputValue.value = Number(value)
		}
		emits('change', inputValue.value)
		if (_resolve.value) {
			_resolve.value(inputValue.value)
			_resolve.value = null
			_reject.value = null
		}
		openShow.value = false
	}
}

const keyboardClick = () => {
	console.log('keyboardClick')
}
const clearTimer = () => {
	console.log('clearTimer')
}

defineExpose({open})


// export default {
//   mixins: [mixin],
//   // #ifdef MP-WEIXIN
//   // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
//   options: {
//     virtualHost: true
//   },
//   // #endif
//   props: {
//     // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
//     safeAreaInsetBottom: {
//       type: Boolean,
//       default: true
//     },
//     // 是否允许通过点击遮罩关闭键盘
//     closeOnClickOverlay: {
//       type: Boolean,
//       default: true
//     },
//     // 控制键盘的弹出与收起
//     show: {
//       type: Boolean,
//       default: false
//     },
//     // 是否显示遮罩，某些时候数字键盘时，用户希望看到自己的数值，所以可能不想要遮罩
//     overlay: {
//       type: Boolean,
//       default: true
//     },
//     // z-index值
//     zIndex: {
//       type: [String, Number],
//     },
//     // 键盘的类型，number-数字键盘，card-身份证键盘
//     mode: {
//       type: String,
//       default: 'number'
//     },
//     // 是否显示键盘的"."符号
//     dotDisabled: {
//       type: Boolean,
//       default: false
//     },
//     // 是否打乱键盘按键的顺序
//     random: {
//       type: Boolean,
//       default: false
//     },
//   },
//   data() {
//     return {
//       backspace: 'backspace', // 退格键内容
//       dot: '.', // 点
//       timer: null, // 长按多次删除的事件监听
//       cardX: 'X', // 身份证的X符号'
// 			openShow: false, // 是否显示
// 			date: null, // 日期
// 			inputValue: null, // 日期
//     };
//   },
// 	watch: {
// 		_resolve() {
// 			console.log(123,this._resolve)
// 		},
// 		openShow(v: any){
// 			if (!v) {
// 				if(this._reject) {
// 					this._reject('cancel')
// 				}
// 				console.log('show1',this._resolve)
// 				this._resolve = null
// 				this._reject = null
// 				console.log('show2',this._resolve)
// 			}
// 		}
// 	},
//   computed: {
//     // 键盘需要显示的内容
//     numList() {
//       let tmp = [];
//       if (this.dotDisabled && this.mode == 'number') {
//         if (!this.random) {
//           return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
//         } else {
//           return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
//         }
//       } else if (!this.dotDisabled && this.mode == 'number') {
//         if (!this.random) {
//           return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
//         } else {
//           return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
//         }
//       } else if (this.mode == 'card') {
//         if (!this.random) {
//           return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
//         } else {
//           return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
//         }
//       }
//     },
// 		keyList() {
// 			let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, '',0]
// 			if (this.mode === 'card') {
// 				list.splice(-2,1,this.cardX)
// 			} else if (this.mode === 'number') {
// 				list.splice(-2,1,this.dot)
// 			}
// 			if (this.random) {
// 				return uni.$u.randomArray(list)
// 			} else {
// 				return list
// 			}
// 		},
//     // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
//     itemStyle() {
//       return index => {
//         let style = {};
//         if (this.mode == 'number' && this.dotDisabled && index == 9) style.width = '464rpx';
//         return style;
//       };
//     },
//     // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
//     btnBgGray() {
//       return index => {
//         if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && !this
//             .dotDisabled))) return true;
//         else return false;
//       };
//     },
//   },
//   created() {
//
//   },
//   methods: {
// 		//打开键盘
// 		open(option) {
// 			return new Promise((resolve, reject) => {
// 				this._resolve = resolve
// 				this._reject = reject
// 				if (this.mode === 'number') {
// 					this.date = option.date
// 					this.inputValue = Number(option.value)
// 				}
// 				console.log(22,resolve,33,this._resolve)
// 				console.log('option',option)
// 				this.openShow = true
// 			})
// 		},
//     // 点击退格键
//     backspaceClick() {
//       this.$emit('backspace');
//       clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
//       this.timer = null;
//       this.timer = setInterval(() => {
//         this.$emit('backspace');
//       }, 250);
//     },
//     clearTimer() {
//       clearInterval(this.timer);
//       this.timer = null;
//     },
//     // 获取键盘显示的内容
//     keyboardClick(val) {
//       // 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
//       if (!this.dotDisabled && val != this.dot && val != this.cardX && val != '+' && val != '-') val = Number(val);
//     },
// 		onKeyTap(key){
// 			let value = this.inputValue.toString()
// 			if (key === 'del') {
// 				if (value.length) {
// 					this.inputValue = value.substr(0, value.length - 1) || 0
// 				}
// 				return
// 			} else if(key === '.'){
// 				if (value.indexOf('.') !== -1 || !this.xDecimal) {
// 					return
// 				}
// 			}
// 			if (key !== '.' && value.indexOf('.') === -1 && value.startsWith('0')) {
// 				value = value.substr(1, value.length)
// 			}
// 			this.inputValue = value + key
// 		},
// 		onConfirm(){
// 			if (this.inputValue) {
// 				this.$emit('change', this.inputValue)
// 				if (this._resolve) {
// 					this._resolve(this.inputValue)
// 					this._resolve = null
// 					this._reject = null
// 				}
// 			  return Number(this.inputValue)
// 			  console.log(11,this.inputValue,this._resolve)
// 				this.openShow = false
// 			}
// 		},
//   }
// };
</script>

<style lang="scss" scoped>
.keyboard_wrap {
	display: flex;

	.keyboard {
		display: flex;
		flex: 0 0 75%;
		justify-content: space-around;
		background-color: rgb(224, 228, 230);
		flex-wrap: wrap;

		&__button-wrapper {
			flex: 0 0 30%;
			box-shadow: 0 2px 0px #BBBCBE;
			margin: 8rpx 0;
			border-radius: 8rpx;

			&__button {
				display: flex;
				height: 90rpx;
				background-color: #fff;
				justify-content: center;
				align-items: center;
				border-radius: 8rpx;

				&__text {
					font-size: 20px;
					font-weight: 500;
					color: #303133;
				}

				&--gray {
					background-color: rgb(200, 202, 210);
				}
			}
		}
	}

	.option {
		padding: 0 8rpx;

		flex-direction: column;
		flex: 0 0 25%;
	}
}

.u-hover-class {
	background-color: #BBBCC6;
}
</style>
