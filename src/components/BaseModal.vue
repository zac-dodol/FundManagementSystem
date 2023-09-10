<template>
  <!-- remove modal from nav html structure -->
  <Teleport to="body">
    <!-- unique selector for modal -->
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <!-- unique selector for inside modal -->
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="p-4 bg-white self-start mt-32 max-w-screen-md"
          >
            <slot />
            <button
              class="text-white mt-8 bg-color-primary py-2 px-6"
              @click="$emit('close-modal')"
            >
              Close
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
// modal logic from inside modal
defineEmits(["close-modal"]);
defineProps({
  modalActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<!-- scss usage for modal -->
<style lang="scss" scoped>
.modal {
  &-outer {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
    }
  }

  &-inner {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
    }

    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: scale(0.3);
    }
  }
}
</style>
