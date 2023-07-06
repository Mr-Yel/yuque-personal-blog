<template>
  <view class="ToDoList">
    <view
      class="todo-item"
      v-for="item in data"
      :key="item.id"
      @click="focusToDoItem"
    >
      <radio
        @click="change(item)"
        :checked="item.isCheck == 1 ? true : false"
      />
      <textarea
        :value="item.value"
        @input="textareaChange($event, item)"
        auto-height
      />
      <view
        @click="addTodoItem"
        class="add-children"
      ><text class='iconfont icon-add-3'></text></view>
    </view>
  </view>
</template>
  
<script>
export default {
  name: "ToDoList",
  data () {
    return {
      type: 'textarea',
    };
  },
  props: {
    data: {
      type: Array
    },
  },
  methods: {
    change (item) {
      const list = JSON.parse(JSON.stringify(this.data))
      let clickItemIndex = list.findIndex((e) => e.id == item.id)
      list[clickItemIndex].isCheck = !list[clickItemIndex].isCheck
      this.$emit('change', list)
    },
    focusToDoItem () {

    },
    textareaChange (e, item) {
      const list = JSON.parse(JSON.stringify(this.data))
      const value = e && e.detail && e.detail.value
      let clickItemIndex = list.findIndex((e) => e.id == item.id)
      list[clickItemIndex].value = value
      this.$emit('change', list)
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.ToDoList {
  padding: 20rpx;
  .todo-item {
    display: flex;
    padding: 20rpx;
    background-color: #fff;
    align-items: center;
    textarea {
      line-height: 50rpx;
      font-size: 40rpx;
    }
  }
  .add-children {
    
  }
}
</style>