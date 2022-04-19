<template>
  <div class="i-button-wapper">
    <button class="un-select i-button" :disabled="loading" @click="submit">
      <van-loading class="i-loading" size="16" type="spinner" color="#fff" v-show="loading" />
      <span><slot>确定</slot>{{ loading ? "中" : "" }}</span>
    </button>
  </div>
</template>

<script>
export default defineComponent({
  name: "i-button",
  setup(props, { emit }) {
    const loading = ref(false);
    const callback = () => (loading.value = false);
    const submit = () => {
      loading.value = true;

      emit("submit", callback);
    };

    return { loading, submit };
  },
});
</script>

<style scoped lang="less">
.i-button-wapper {
  width: 100%;
  padding: 0 16px;

  .i-loading {
    margin-right: 5px;
  }

  .i-button {
    width: 100%;
    height: 40px;
    border: 0;
    border-radius: 5px;
    color: #fff;
    background-image: linear-gradient(to right, #1ad792 60%, #1ac0c2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .i-button:disabled,
  .i-button:active {
    opacity: 0.8;
  }
}
</style>
