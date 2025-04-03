<script lang="ts" setup>
import { z } from 'zod'
import { reactive, ref } from 'vue'

const formSchema = z.object({
  string: z.string().min(3, 'At least 3 characters'),
  number: z.number().min(3, 'At least 3 number characters'),
  pet: z
    .enum(['dog', 'cat', 'hamster', 'parrot', 'spider', 'goldfish'])
    .array()
    .min(1, 'At least 1 pets'),
})

const errors = ref<Record<string, string>>({})

const state = reactive({
  string: '',
  number: 0,
  pet: [] as string[],
})

const validateState = () => {
  const result = formSchema.safeParse(state)
  console.log(result)

  if (!result.success) {
    errors.value = Object.fromEntries(
      result.error.issues.map((issue) => [issue.path[0], issue.message]),
    )
    return false
  }
  errors.value = {}
  return true
}

const submitForm = async () => {
  if (!validateState()) {
    return
  }

  console.log('✅ Form is valid')
}
</script>

<template>
  <section>
    <h1>zod validation</h1>
    <form class="mt-4 flex flex-col" @submit.prevent="submitForm">
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

      <button type="submit">Submit</button>
    </form>
  </section>
</template>
