<template>
  <div
    class="flex py-4 px-3 bg-color-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1 justify-center">
      <h2 class="text-3xl">{{ fundes.fund }}</h2>
    </div>

    <div class="flex flex-col gap-2 w-1/5">
      <p class="text-3xl self-end"></p>
      <div class="flex gap-2 flex-col">
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Type: </span>
          <span>
            {{ fundes.weather.bestMatches[0]["3. type"] }}
          </span>
        </div>
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Currency: </span>
          <span>
            {{ fundes.weather.bestMatches[0]["8. currency"] }}
          </span>
        </div>
        <div class="text-xs flex justify-between w-full gap-4">
          <span> Region: </span>
          <span>
            {{ fundes.weather.bestMatches[0]["4. region"] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fundes: {
    type: Object,
    default: () => {},
  },
});
</script>
