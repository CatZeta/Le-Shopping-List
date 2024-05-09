<template>
   <div class="add-item">
    <button v-if="!showForm" @click="showForm = true">Add Items</button>
    <form v-if="showForm" @submit.prevent="handleSubmit"> 
        <input type="text" placeholder="New item" v-model="item" required>
        <button>Add</button>
    </form>
   </div>
</template>

<script>
import useDocument from '@/composables/useDocument'
import getUser from '@/composables/getUser'
import { ref } from 'vue'

export default {
   
    props: ['sl'],
    setup (props) {
        const {updateDoc} = useDocument('shoppingLists', props.sl.id)
        const {currentUser} = getUser()
        const item = ref('')
        const showForm = ref(false)

        const handleSubmit = async () => {
            const newItem = {
                item: item.value,
                //verificar se é mesmo necessario
                userId: currentUser.value.uid,
                id: Math.floor(Math.random() * 1000000)
            }
            await updateDoc({items: [...props.sl.items, newItem]})
            console.log(newItem)
        }

        return {item, showForm, handleSubmit}
    }
}
</script>

<style scoped>
 .add-item {
     margin-top: 100%;
     text-align: center;
 }
 form {
    max-width: 100%;
    text-align: center;
 }
 
</style>