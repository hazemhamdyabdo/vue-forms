<script lang="ts" setup>
import { useMultiStepForm } from '@/composables/useMultiStepForm'
import { ref } from 'vue'
import { z } from 'zod'

const { state } = useMultiStepForm()

const errors = ref<Record<string, string>>({})
const validateSchema = z.object({
  string: z.string().min(3, 'At least 3 characters'),
  number: z.number().min(1, 'Number is required'),
  email: z.string().email('@example.com').min(1, 'Email is required'),
})

const validateState = () => {
  const result = validateSchema.safeParse(state)
  if (!result.success) {
    errors.value = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message]),
    )
    return false
  }
  errors.value = {}
  return true
}

defineExpose({ validateState })
</script>

<template>
  <h1>Form One</h1>
  <form class="mt-4 flex flex-col">
    <div class="w-full">
      <label for="string"> string</label>
      <input id="string" v-model="state.string" type="text" class="border" />
      <p v-if="errors.string" class="text-red-500">{{ errors.string }}</p>
    </div>

    <div>
      <label for="number"> number</label>
      <input id="number" v-model.number="state.number" type="number" class="border" />
      <p v-if="errors.number" class="text-red-500">{{ errors.number }}</p>
    </div>

    <div>
      <label for="email"> email</label>
      <input id="email" v-model="state.email" type="email" class="border" />
      <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
    </div>

    <!-- <div>
      <label for="pet-select">multi select</label>
      <select id="pet-select" v-model="state.pet" class="border" multiple>
        <option value="">--Please choose an option--</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
      <p v-if="errors.pet" class="text-red-500">{{ errors.pet }}</p>
    </div> -->
  </form>
</template>
