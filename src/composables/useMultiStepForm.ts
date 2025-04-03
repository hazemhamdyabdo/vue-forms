import { provideLocal, injectLocal } from '@vueuse/core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export const multiStepKey = Symbol('multiStepKey')

export function useMultiStepForm() {
  const prevCtx = injectLocal(multiStepKey, null)

  if (prevCtx) {
    return prevCtx
  }
  const router = useRouter()

  const currentStep = ref(1)

  const state = reactive({
    string: '',
    number: null,
    pet: [],
    accepted: false,
    colors: [] as string[],
    email: '',
  })

  const formChild = ref()
  const nextStep = () => {
    console.log('nextStep')

    if (formChild.value.validateState()) {
      currentStep.value++
      if (currentStep.value > 2) {
        alert('Form is valid and completed')
        router.push('/')
      } else {
        router.push({ name: 'form-2' })
      }
    }
  }

  const ctx = {
    state,
    nextStep,
    formChild,
  }
  provideLocal(multiStepKey, ctx)
  return ctx
}
