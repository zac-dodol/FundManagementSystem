<template>
  <div>
    <Suspense>
      <template #default>
        <AsyncFundView />
      </template>
      <template #fallback>
        <FundViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncFundView from "../components/AsyncFundView.vue";
import FundViewSkeleton from "../components/FundViewSkeleton.vue";
</script>
