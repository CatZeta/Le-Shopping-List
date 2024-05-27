<template>
    <div class="user-lists">
        <h1>My Lists</h1>
        <div v-if="shoppingLists">
        <ListView :shoppingLists="shoppingLists"/>
        </div>
    </div>
</template>

<script setup>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

    const {currentUser} = getUser()
    const {documents: shoppingLists} = getCollection('shoppingLists', ['userId', '==', currentUser.value.uid])

</script>

<style lang="scss" scoped>

</style>