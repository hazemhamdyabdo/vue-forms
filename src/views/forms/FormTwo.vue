<script lang="ts" setup>
import { useMultiStepForm } from '@/composables/useMultiStepForm'
import { ref } from 'vue'
import { z } from 'zod'

const { state } = useMultiStepForm()

const errors = ref<Record<string, string>>({})

const formSchema = z.object({
  string: z.string().min(3, 'At least 3 characters'),
  number: z.number().min(3, 'At least 3 number characters'),
  pet: z.enum(['dog', 'cat', 'hamster', 'parrot', 'spider', 'goldfish']),
  accepted: z.literal(true, { errorMap: () => ({ message: 'You must accept' }) }),
  colors: z.array(z.string()).min(1, 'At least one color'),
})

const validateState = () => {
  const result = formSchema.safeParse(state)
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
  <h1>Form Two</h1>
  <form class="space-y-4">
    <!-- String -->
    <div>
      <label>String (Username)</label>
      <input v-model="state.string" type="text" class="border p-1" />
      <div v-if="errors.string" class="text-red-500 text-sm">{{ errors.string }}</div>
    </div>

    <!-- Number -->
    <div>
      <label>Number (Age)</label>
      <input v-model.number="state.number" type="number" class="border p-1" />
      <div v-if="errors.number" class="text-red-500 text-sm">{{ errors.number }}</div>
    </div>

    <!-- Enum (Select one pet) -->
    <div>
      <label>Pet (Single Select)</label>
      <select v-model="state.pet" class="border p-1">
        <option disabled value="">Select a pet</option>
        <option>dog</option>
        <option>cat</option>
        <option>hamster</option>
        <option>parrot</option>
        <option>spider</option>
        <option>goldfish</option>
      </select>
      <div v-if="errors.pet" class="text-red-500 text-sm">{{ errors.pet }}</div>
    </div>

    <!-- Boolean -->
    <div>
      <label>
        <input v-model="state.accepted" type="checkbox" />
        Accept Terms
      </label>
      <div v-if="errors.accepted" class="text-red-500 text-sm">{{ errors.accepted }}</div>
    </div>

    <!-- Array (Multi-select checkboxes) -->
    <div>
      <label>Favorite Colors (Multiple)</label>
      <div>
        <label><input v-model="state.colors" type="checkbox" value="red" /> Red</label>
        <label><input v-model="state.colors" type="checkbox" value="green" /> Green</label>
        <label><input v-model="state.colors" type="checkbox" value="blue" /> Blue</label>
      </div>
      <div v-if="errors.colors" class="text-red-500 text-sm">{{ errors.colors }}</div>
    </div>
  </form>
</template>
