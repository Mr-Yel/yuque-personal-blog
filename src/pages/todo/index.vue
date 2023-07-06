<template>
  <view class="todo">
    <my-navbar
      :isHomePage="false"
      :title="'todo list'"
      :todo="todo"
      showNavVisible
      :footerToolCtr="{
        todo: false,
        share: true,
        top: false,
        bottom: false
      }"
    ></my-navbar>
    <ToDoList :data="toDoList" @change="change"></toDoList>
    <view
      @click="addTodoItem"
      class="add"
    ><text class='iconfont icon-add-3'></text></view>
  </view>
</template>

<script>
import { storage } from '@/utils/storage'
import ToDoList from '@/components/ToDoList'

export default {
  components: {
    ToDoList
  },
  data () {
    return {
      toDoList: [],
    }
  },
  computed: {
  },
  props: {
  },
  methods: {
    change (list) {
      this.toDoList = list
    },
    todo () {
      return true
    },
    addTodoItem () {
      console.log(111);
      let id = this.toDoList.length && this.toDoList[this.toDoList.length - 1].id || 0
      this.toDoList = [...this.toDoList,{
        id: id + 1,
        value: '',
        isCheck: false,
        img: '',
      }]
    }
  },
  mounted () {

  },
  // 1.发送给朋友
  onShareAppMessage (res) {
    return {
      title: 'todo list',
    }
  },
}
</script>

<style lang="scss">
page {
  background: rgba(0, 160, 233, 0.14);
}
.todo {
  .u-tabs__wrapper__nav {
    justify-content: space-around;
    //这个是为了让代码块均匀分布
  }
  .u-tabs__wrapper__nav__line {
    left: 0;
    //这个是为了让元素恢复原位
  }
  .u-tabs__wrapper__nav__item {
    flex: 1;
    //经过查看源码得知，下划线之所以错位，是因为每一个子盒子加起来并没有撑满整个盒子，所以当下划线取定位的时候，就会发生错位，因为两个子盒子宽度无法沾满整个盒子，所以就需要flex：1来沾满盒子。
  }
  .add {
    margin: auto;
    margin-top: 100rpx;
    width: 80rpx;
    height: 80rpx;
    background-color: rgb(57, 197, 187);
    border-radius: 50%;
    font-size: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    text-align: center;
  }
}
</style>
