<template>
  <Form @submit="onSubmit" ref="basicForm" v-slot:default="{ values, errors }">
   
    <div class="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

      <div class="flex flex-col">
        <label for="country" class="text-xl font-medium text-label mb-4"> Countries </label>
        <Field name="country" rules="required" v-model="theData.country">
          <Dropdown v-model="theData.country" name="Country" :options="countries" optionLabel="name" optionValue="name" placeholder="Select country" :invalid="errors.country"/>
          <ErrorMessage name="country" class="text-red-500 mt-2"/>
        </Field>
      </div>

      <div class="flex flex-col">
        <label for="city" class="text-xl font-medium text-label mb-4"> Cities </label>
        <Field name="city" rules="required" v-model="theData.city">
          <Dropdown v-model="theData.city" name="Country" vl :options="cities" optionLabel="name" optionValue="name"  placeholder="Select city" :invalid="errors.city"/>
          <InputText type="text" v-model="otherCity" v-if="theData.city === 'other'" class="mt-2" placeholder="Enter the city name"/>
          <ErrorMessage name="city" class="text-red-500 mt-2"/>
        </Field>
      </div>

      <div class="flex flex-col">
        <label for="address" class="text-xl font-medium text-label mb-4"> Address </label>
        <GMapAutocomplete
          placeholder="Enter your address"
          @place_changed="setPlace"
          class="bg-labelBG mb-4 h-48 p-4"
        >
        </GMapAutocomplete>

        <GMapMap
          :center="centerPlace"
          :zoom="10"
          map-type-id="terrain"
          style="width: 100%; height: 300px"
        >
          <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center = m.position"
          />
        </GMapMap>
      </div>


    </div><!-- container -->

    <div class="flex justify-end mb-10 mt-10">
      <Button type="button" class="bg-blue5 h-48 font-normal text-2xl mt-4 mr-6" @click="emit('prev')"> Prev </Button>
      <Button type="submit" class="bg-primary h-48 font-normal text-2xl mt-4"> Next </Button>
    </div>
  </Form>
</template>

<script setup>
const emit = defineEmits(['next', 'prev']);

let theData = ref({
  country: '',
  city: '',
  address: '',
});
let otherCity = ref('');

const countries = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Aland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'Andorra', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
];

const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
];
//add option other in cities
cities.push({ name: 'other', code: 'other' });

let markers = ref([]);
let centerPlace = ref({ lat: 0, lng: 0 });
//get user location
navigator.geolocation.getCurrentPosition((position) => {
  centerPlace.value = { lat: position.coords.latitude, lng: position.coords.longitude };
});
function setPlace(place) {
  centerPlace.value = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
  markers.value = [ { position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() } } ];
  theData.value.address = place.formatted_address;
}

const basicForm = ref(null);
const onSubmit = ( values ) => {
  values.city = values.city === 'other' ? otherCity.value : values.city;
  values.address = theData.value.address;
  emit("next", values );
}


</script>
<style lang="scss">
  .phone-input {
    border: 0 !important;
    border-radius: 6px ;
    background-color: #ECECEE;
    input {
      background-color: #ECECEE;
      border-radius: 6px ;
    }

    &.invalid {
      border: 1px solid red !important;
    }
  }

</style>