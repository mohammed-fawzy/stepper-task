<<template>
  <div>
    <DataTable :value="[theMainData]" tableStyle="min-width: 50rem" class="mt-12">
      <Column field="Full name" header="Full Name"></Column>
      <Column field="Email" header="Email"></Column>
      <Column field="phone" header="Phone"></Column>
      <Column field="National ID" header="National ID"></Column>
      <Column field="National ID Photo" header="National ID Photo">
        <template #body="slotProps">
          <div class="flex justify-center">
            <img :src="slotProps.data['National ID Photo']" width="100px" class="rounded-full" />
          </div>
        </template>
      </Column>
      <Column field="Avatar Image" header="Avatar Image">
        <template #body="slotProps">
          <div class="flex justify-center">
            <img :src="slotProps.data['Avatar Image']" width="100px" class="rounded-full" />
          </div>
        </template>
      </Column>
      <Column field="country" header="Country"></Column>
      <Column field="city" header="City"></Column>
      <Column field="address" header="Address"></Column>
    </DataTable>
    <div class="flex justify-end mb-10">
      <Button type="button" class="bg-blue5 h-48 font-normal text-2xl mt-10 mr-6" @click="emit('prev')"> Prev </Button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['prev']);

defineProps({
  theMainData: {
    type: Object,
    default: () => ({
      'Full name': '',
      'Email': '',
      'phone': ' ',
      'National ID': '',
      'National ID Photo': '',
      'Avatar Image': '',
      'password': '',
      'confirmPassword': '',
      'country': '',
      'city': '',
      'address': '',
    })
  }
})
</script>