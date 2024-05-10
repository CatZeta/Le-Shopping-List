<template>
    <form>
        <h4>Create Shopping List</h4>
        <input type="text" placeholder="List title" v-model="title" required>
        <input type="text" placeholder="Enter email to share list" v-model="userEmail">
        <button @click.prevent="addSharedUser">Add User</button>
        <input type="text" placeholder="Enter to add item" v-model="newItem" @keyup.enter="addItem">
        <div v-if="selectedUsers">
            <h4>Selected Users</h4>
            <ul>
                <li v-for="userId in selectedUsers" :key="userId">{{ userId }}</li>
            </ul>
        </div>

        
        <!--TODO: Implemtent library for optical character recognition so the user can uploads their own lists and convert them-->
        <p>upload photos to convert existing lists</p>
        <input type="file" @change="handleFileUpload">
        <div class="error">{{ fileError }}</div>
        <!--TODO: create loading indicator-->
        <button v-if="!isPending" @click.prevent="handleSubmit">Create</button>
        <button v-else disabled>Saving...</button>
    <div class="list" v-if="showItems">
        <h4>{{ title }}</h4>
        <br>
         <ul>
            <li v-for="item in items" :key="item.id">{{ item.item }}</li>
        </ul>
    </div> 
    </form>
    
</template>

<script>
import { ref } from 'vue'
import { timestamp } from '@/firebase/config'
import useStorage  from '@/composables/useStorage.js'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

import { projectFirestore } from '@/firebase/config'


export default {
    setup () {
        const { url, filePath, uploadImage } = useStorage();
        const { error, addDoc } = useCollection('shoppingLists');
        const {currentUser} = getUser()
  
        const router = useRouter()

        const title = ref('')
        const newItem = ref('')
        const items = ref([])
        const file = ref(null)
        const fileError = ref(null)
        const showItems = ref(false)
        const isPending = ref(false)
        const userEmail = ref('')
        const sharedWith = ref([])
        
        const addSharedUser = async () => {
            if (!userEmail.value) return;

            try {
                
                const userSnapshot = await projectFirestore.collection('users').where('email', '==', userEmail.value).get();

                if (userSnapshot.empty) {
                    console.log('User not found');
                    return;
                }

                const user = userSnapshot.docs[0].data();
                console.log('user added:', user);
                sharedWith.value.push({id: user.userId, displayName: user.displayName}); // Adiciona o usuário selecionado
 
                userEmail.value = '';

            } catch (err) {
                console.error('Error adding user to list:', err.message);
            }
        };

        const handleSubmit = async () => {
            //Se a ref do file estiver vazia ele não entra no if e o processo não finaliza
            if(file.value){
                isPending.value = true

                await uploadImage(file.value);

                const resp = await addDoc({
                    userId: currentUser.value.uid,
                    userName: currentUser.value.displayName,
                    title: title.value,
                    items: items.value,
                    imageURL: url.value,
                    filePath: filePath.value,
                    createdAt: timestamp(),
                    sharedWith: sharedWith.value
                });
                isPending.value = false

                if(!error.value) {
                    router.push({ name: 'ListDetails', params: { id: resp.id } })
                }
            }
        };

        /**
         * Handle file upload event
         *
         * @param {Event} event - The file upload event.
         */
        //Alowed file types
        const types = ['image/png', 'image/jpeg']
        const handleFileUpload = (event) => {

            // Get the file object from the event
            let uploadedFile = event.target.files[0];

            //Check if the uploaded file is of the allowed types and if it exists, if the condition is met, set the file in the reactive variable.
            if(uploadedFile && types.includes(uploadedFile.type)) {
                file.value = uploadedFile;
                fileError.value = null;
            } else {
                //Se o file não existir passa a null a sua ref
                file.value = null;
                fileError.value = 'Please select an image file (png or jpeg)';
            }
        };

        const addItem = () => {
        if (newItem.value.trim() !== '') {
            const item = {
                item: newItem.value,
                userId: currentUser.value.uid,
                id: Math.floor(Math.random() * 1000000)
            };
            items.value.push(item);
            showItems.value = true;
            newItem.value = '';
    }
};


        return { 
            title, 
            items, 
            newItem, 
            fileError, 
            showItems,
            isPending,
            handleSubmit, 
            addItem, 
            handleFileUpload,
            addSharedUser, 
            userEmail
             }
    }
}
</script>

<style scoped>
  
    
</style>