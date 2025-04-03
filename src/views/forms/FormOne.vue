<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { z } from 'zod'

const state = reactive({
  string: '',
  number: 0,
  pet: [] as string[],
})

const errors = ref<Record<string, string>>({})
const validateSchema = z.object({
  string: z.string().min(3, 'At least 3 characters'),
  number: z.number().min(0, 'Number must be greater than or equal to 0'),
  pet: z.array(z.string()).min(1, 'At least one pet is required'),
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
      <input id="number" v-model="state.number" type="number" class="border" />
      <p v-if="errors.number" class="text-red-500">{{ errors.number }}</p>
    </div>

    <div>
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
    </div>
  </form>
</template>
