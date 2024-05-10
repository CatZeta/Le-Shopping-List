<template>
    <div class="user-lists">
        <h1>My Lists</h1>
        <div v-if="shoppingLists">
        <ListView :shoppingLists="shoppingLists"/>
        </div>
    </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'

export default {
    components: { ListView },
        setup () {
            const {currentUser} = getUser()
            const {documents: shoppingLists} = getCollection('shoppingLists', ['userId', '==', currentUser.value.uid])
            console.log(shoppingLists.value)
        return {shoppingLists}
    }
}
</script>

<style lang="scss" scoped>

</style>