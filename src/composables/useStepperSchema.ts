import { computed } from 'vue'

export function useStepperSchema() {
  const currentStep = 'one'
  const currentValidationStep = computed(() => {
    const schemaMap = {
      one: 'stepOne',
      two: 'stepTwo',
    }
    return schemaMap[currentStep] || 'stepOne'
  })

  return {
    currentStep,
    currentValidationStep,
  }
}
