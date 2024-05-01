<script setup>
  const emit = defineEmits(['update:modelValue'])
  defineProps({
    modelValue: {
      
    },
    options: {
      
    },
    name: {
      
    },
    label: {
      
    },
    rules: {
      
    },
    errors: {
      
    }
    
})

  function updateValue(value) {
    emit('update:modelValue', value);
  }
</script>

<template>
  <label :for="name" class="text-xl font-medium text-label mb-4">{{ $t('form.gender') }}</label>
  <Field :name="name" rules="required" :modelValue="modelValue">
    <Dropdown :modelValue="modelValue" :name="name" @update:modelValue="updateValue" :options="options" optionLabel="name" :placeholder="$t('common.select')" :invalid="errors[name]" />
    <ErrorMessage :name="name" class="text-red-500 mt-2"/>
  </Field>
</template>