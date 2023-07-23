<template>
  <div>
    <teleport :to="to">
      <Transition name="modal">
        <div
          v-if="show"
          class="modal-mask"
          @click="$emit('close')">
          <div class="modal-wrapper">
            <div
              class="modal-container"
              :class="$attrs.class"
              @click.stop>
              <slot></slot>
            </div>
          </div>
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script lang="ts">
  export default {
    inheritAttrs: true,
  };
</script>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      to?: string;
      show?: boolean;
    }>(),
    {
      to: 'body',
      show: false,
    },
  );

  // defineProps({
  //   to: String,
  //   show: Boolean
  // });
</script>

<style scoped lang="less">
  .modal-mask {
    position: fixed;
    z-index: 90;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-container {
    width: 295px;
    margin: 0 auto;
    padding: 18px 24px 24px;
    background: #fff;
    border-radius: 12px;
    transition: all 0.3s ease;
    position: relative;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    transform: scale(1.1);
    transform: scale(1.2);
  }
</style>
