<template>
  <div class="home">
    <p>Home Page</p>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="documents">
      <ListView :shoppingLists="documents"/> 
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection';
import ListView from '@/components/ListView.vue';
import getUser from '@/composables/getUser';

export default {
  name: 'HomeView',
  components: { ListView },

  setup () {
    const {currentUser} = getUser()
    const { error, documents} = getCollection('shoppingLists', ['userId', '==', currentUser.value.uid])
    console.log('documents', documents)


    return { error, documents, currentUser }
  }
}
</script>
