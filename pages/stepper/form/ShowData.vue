<<template>
  <div>
    <div class="flex justify-end mb-10">
      <Button type="button" class="bg-blue5 h-48 font-normal text-2xl mt-4 mr-6" @click="emit('prev')"> Prev </Button>
      <Button type="submit" class="bg-primary h-48 font-normal text-2xl mt-4" @click.prevent="onSubmit()"> Next </Button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['next', 'prev']);
</script>