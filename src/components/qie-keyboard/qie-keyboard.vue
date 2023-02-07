<template>
  <u-popup
      :overlay="overlay"
      :closeOnClickOverlay="closeOnClickOverlay"
      mode="bottom"
      :popup="false"
      :show="show"
      :safeAreaInsetBottom="safeAreaInsetBottom"
      @close="$emit('close');"
      :zIndex="zIndex"
      :customStyle="{ backgroundColor: 'rgb(214, 218, 220)'}"
  >
    <slot/>
    <view class="keyboard_wrap">
      <view class="keyboard" @touchmove.stop.prevent="noop">
        <view class="keyboard__button-wrapper" v-for="(item, index) in numList" :key="index">
          <view
              class="keyboard__button-wrapper__button"
              hover-class="u-hover-class"
              :style="[itemStyle(index)]"
              :hover-stay-time="200"
              @tap="keyboardClick(item)"
          >
            <text class="keyboard__button-wrapper__button__text">{{ item }}</text>
          </view>
        </view>
        <view class="keyboard__button-wrapper">
          <view
              class="keyboard__button-wrapper__button keyboard__button-wrapper__button--gray"
              hover-class="u-hover-class"
              :hover-stay-time="200"
              @touchstart.stop="backspaceClick"
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
              @tap="keyboardClick('+')"
          >
            <idv class="keyboard__button-wrapper__button__text">+</idv>
          </div>
        </div>
        <div class="keyboard__button-wrapper">
          <div
              class="keyboard__button-wrapper__button"
              hover-class="u-hover-class"
              :hover-stay-time="200"
              @tap="keyboardClick('+')"
          >
            <idv class="keyboard__button-wrapper__button__text">+</idv>
          </div>
        </div>
        <div class="keyboard__button-wrapper">
          <div
              class="keyboard__button-wrapper__button"
              hover-class="u-hover-class"
              :hover-stay-time="200"
              @tap="keyboardClick('+')"
          >
            <idv class="keyboard__button-wrapper__button__text">+</idv>
          </div>
        </div>
        <div class="keyboard__button-wrapper">
          <div
              class="keyboard__button-wrapper__button"
              hover-class="u-hover-class"
              :hover-stay-time="200"
              @tap="keyboardClick('+')"
          >
            <idv class="keyboard__button-wrapper__button__text">+</idv>
          </div>
        </div>

      </view>
    </view>
  </u-popup>

</template>

<script>
import mixin from '../mixin.js';

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
export default {
  mixins: [mixin],
  // #ifdef MP-WEIXIN
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  },
  // #endif
  props: {
    // 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
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
    }
  },
  data() {
    return {
      backspace: 'backspace', // 退格键内容
      dot: '.', // 点
      timer: null, // 长按多次删除的事件监听
      cardX: 'X' // 身份证的X符号
    };
  },
  computed: {
    // 键盘需要显示的内容
    numList() {
      let tmp = [];
      if (this.dotDisabled && this.mode == 'number') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        } else {
          return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        }
      } else if (!this.dotDisabled && this.mode == 'number') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0];
        } else {
          return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.dot, 0]);
        }
      } else if (this.mode == 'card') {
        if (!this.random) {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0];
        } else {
          return uni.$u.randomArray([1, 2, 3, 4, 5, 6, 7, 8, 9, this.cardX, 0]);
        }
      }
    },
    // 按键的样式，在非乱序&&数字键盘&&不显示点按钮时，index为9时，按键占位两个空间
    itemStyle() {
      return index => {
        let style = {};
        if (this.mode == 'number' && this.dotDisabled && index == 9) style.width = '464rpx';
        return style;
      };
    },
    // 是否让按键显示灰色，只在非乱序&&数字键盘&&且允许点按键的时候
    btnBgGray() {
      return index => {
        if (!this.random && index == 9 && (this.mode != 'number' || (this.mode == 'number' && !this
            .dotDisabled))) return true;
        else return false;
      };
    },
  },
  created() {

  },
  methods: {
    // 点击退格键
    backspaceClick() {
      this.$emit('backspace');
      clearInterval(this.timer); //再次清空定时器，防止重复注册定时器
      this.timer = null;
      this.timer = setInterval(() => {
        this.$emit('backspace');
      }, 250);
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取键盘显示的内容
    keyboardClick(val) {
      // 允许键盘显示点模式和触发非点按键时，将内容转为数字类型
      if (!this.dotDisabled && val != this.dot && val != this.cardX && val != '+' && val != '-') val = Number(val);
      this.$emit('change', val);
    }
  }
};
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
