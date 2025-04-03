<script lang="ts" setup>
import { useMultiStepForm } from '@/composables/useMultiStepForm'
const { nextStep, formChild } = useMultiStepForm()
</script>

<template>
  <section class="flex flex-col gap-10">
    <h1 class="text-3xl text-center">Forms</h1>

    <RouterView v-slot="{ Component }">
      <component :is="Component" ref="formChild" />
    </RouterView>
    <button class="bg-blue-500 text-white mx-auto w-full h-14 mt-8" @click="nextStep">
      Continue
    </button>
  </section>
</template>
