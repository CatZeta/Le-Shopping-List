<template>
  <div class="home">
    <p>All Lists</p>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="sharedLists">
      <ListView :shoppingLists="sharedLists"/> 
    </div>
    <div v-if="myLists">
      <ListView :shoppingLists="myLists"/> 
    </div>
  </div>
</template>

<script setup>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';
import getUser from '@/composables/getUser';
import { computed } from 'vue';

// Get current user
const { currentUser } = getUser();

// Get shared lists and my lists
const { error, documents: sharedLists } = getCollection('shoppingLists', ['sharedWithID', '==', currentUser.value.uid]);
const { documents: myLists } = getCollection('shoppingLists', ['userId', '==', currentUser.value.uid]);

// Combine lists
const combinedLists = computed(() => [...sharedLists.value, ...myLists.value]);
</script>

<style scoped>

</style>
