<template>
  <div class="p-14 ">
    <Steps v-model:activeStep="active" :model="items" />
    <div class="mt-10" >
        <transition :name="transitionName">
          <KeepAlive>
            <component :is="componentNames[active]" @next="next" @prev="prev" :theMainData="active === componentNames.length - 1 ? theMainData : {}" />
          </KeepAlive>
        </transition>
    </div>
  </div>
</template>

<script setup>
import BasicInformation from './form/BasicInformation.vue';
import AddressInformation from './form/AddressInformation.vue';
import ShowData from './form/ShowData.vue';

definePageMeta({
  name: 'stepper',
  path: '/',
});


const active = ref(0);
const componentNames = [BasicInformation, AddressInformation, ShowData];

const items = ref([
  {
    label: 'Basic Information',
  },
  {
    label: 'Address Information'
  },
  {
    label: 'Show Data'
  }
]);

const theMainData = ref({});
let transitionName = ref([])
function next( values ) {
  active.value++;
  transitionName.value = 'slide-right';
  theMainData.value = { ...theMainData.value, ...values } || values;

}
function prev() {
  active.value--;
  transitionName.value = 'slide-left';
}

</script>

<style lang="scss">

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
