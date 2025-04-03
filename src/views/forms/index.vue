<script lang="ts" setup>
const continueToSecondForm = () => {}
</script>

<template>
  <section class="flex flex-col gap-10">
    <h1 class="text-3xl text-center">Forms</h1>
    <RouterView />
    <button
      class="bg-blue-500 text-white mx-auto w-full h-14 mt-8"
      :disabled="true"
      @click="continueToSecondForm"
    >
      Continue
    </button>
  </section>
</template>
