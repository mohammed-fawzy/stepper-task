<template>
  <Form @submit="onSubmit" ref="basicForm" v-slot:default="{ values, errors }">
   
    <div class="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">

      <div class="flex flex-col"> 
        <CustomeTextInput name="Full name" label="Full name" :errors="errors" :rules="'required|min:3|max:256'"/>
      </div>

      <div class="flex flex-col"> 
        <CustomeTextInput name="Email" label="Email" :errors="errors" :rules="'required|email|min:3'"/>
      </div>

      <Field v-slot="{ field, validate }" name="phone" :rules="'required|min:9|max:15'">
        <div class="flex flex-col">
          <label class="text-xl font-medium text-label mb-4">Phone</label>
          <VueTelInput v-bind="field" class="h-12 phone-input" :class="{'invalid': errors['phone']}"
           @focus="isRenderdFirstTime = true" @input="isRenderdFirstTime && validate()"/>
          <ErrorMessage name="phone" class="text-red-500 mt-2"/>
        </div>
      </Field>

      <div class="flex flex-col"> 
        <CustomeTextInput v-model="theData.nationalID" name="National ID" label="National ID" :errors="errors" :rules="'startWithOneOrTwo|min:10|max:11'"/>
      </div>

    <Field v-slot="{ field }" name="National ID Photo" v-model="theData.nationalIDPhoto" :rules="{required: values['National ID'] ? true : false }">
      <div class="flex flex-col"> 
        <label for="photo" class="text-xl font-medium text-label mb-4"> National ID Attachment </label>
        <FileUpload
          v-bind="field"
          v-model="theData.nationalIDPhoto"
          @removeUploadedFile="theData.nationalIDPhoto = null"
          :class="{'invalid': errors['National ID Photo']}"
          name="National ID Photo"
          accept=".JPG, .PNG, .JPEG, .PDF"
          @select="onAdvancedUploadID($event)"
          :auto="true"
          chooseLabel="Browse"
          :showUploadButton="false" 
          :showCancelButton="false"
          :maxFileSize="1000000">
              <template #empty>
                  <p class="text-blue3">Or Drag and drop files here to upload.</p>
              </template>
          </FileUpload>
          <ErrorMessage name="National ID Photo" class="text-red-500 mt-2" v-if="!theData.nationalIDPhoto"/>
          <p class="text-gray-500 text-sm mt-2 ml-2"> allowed JPG, PNG, JPEG, PDF</p>
      </div>
    </Field>


    <Field v-slot="{ field }" name="Avatar Image" v-model="theData.avatarImage" :rules="'required'">
      <div class="flex flex-col"> 
        <label for="photo" class="text-xl font-medium text-label mb-4"> Avatar Image </label>
        <FileUpload
          v-bind="field"
          v-model="theData.avatarImage"
          @removeUploadedFile="theData.avatarImage = null"
          :class="{'invalid': theData.avatarImage ? false : true }"
          name="Avatar Image"
          accept=".JPG, .PNG, .JPEG"
          @select="onAdvancedUploadAvatar($event)"
          :auto="true"
          chooseLabel="Browse"
          :showUploadButton="false" 
          :showCancelButton="false"
          :maxFileSize="1000000">
              <template #empty>
                  <p class="text-blue3">Or Drag and drop files here to upload.</p>
              </template>
          </FileUpload>
          <ErrorMessage name="Avatar Image" class="text-red-500 mt-2"/>
          <p class="text-gray-500 text-sm mt-2 ml-2"> allowed JPG, PNG, JPEG</p>
      </div>
    </Field>

    <div class="flex flex-col">
      <Field name="password" rules="required|min:6|password" v-slot="{ field }">
        <label class="text-xl font-medium text-label mb-4"> Password </label>
        <Password name="password" v-bind="field" v-model="theData.password" :feedback="false" :invalid="errors.password" />
        <ErrorMessage name="password" class="text-red-500 mt-2"/>
      </Field>
    </div>

    <div class="flex flex-col">
      <Field name="confirm Password" rules="required|confirmed:password" v-slot="{ field }">
        <label class="text-xl font-medium text-label mb-4"> Confirm Password </label>
        <Password name="confirm Password" v-bind="field" v-model="theData.confirmPassword" :invalid="errors['confirm Password']" :feedback="false" />
        <ErrorMessage name="confirm Password" class="text-red-500 mt-2"/>
      </Field>
    </div>

    </div><!-- container -->

    <div class="flex justify-end mb-10">
      <Button type="submit" class="bg-primary h-48 font-normal text-2xl mt-4"> Next </Button>
    </div>
  </Form>
</template>

<script setup>
const emit = defineEmits(['next']);

// to check if the phone number renderd first time, because the phone input has issue that run validation immediately
let isRenderdFirstTime = ref(false);
let theData = ref({
  fullName: '',
  email: '',
  phone: ' ',
  nationalID: '',
  nationalIDPhoto: '',
  avatarImage: '',
  password: '',
  confirmPassword: '',
});

async function onAdvancedUploadID(event) {
  const file = event.files[0];
    // check if the file is an image or pdf
    if (!file?.type.includes('image') && !file?.type.includes('pdf')) {
      return;
    }

    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      theData.value.nationalIDPhoto = reader.result;
    };
}

async function onAdvancedUploadAvatar(event) {
  const file = event.files[0];
    // check if the file is an image
    if (!file?.type.includes('image')) {
      return;
    }
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

    reader.readAsDataURL(blob);

    reader.onloadend = function () {
      theData.value.avatarImage = reader.result;
    };
}

const basicForm = ref(null);
const onSubmit = ( values ) => {
  console.log(values, 'values');
  emit("next", values);
  // basicForm.value.validate().then(() => {
  // })
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