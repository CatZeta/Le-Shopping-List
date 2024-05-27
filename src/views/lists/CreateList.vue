<template>
    <form>
        <h4>Create Shopping List</h4>
        <input type="text" placeholder="List title" v-model="title" required>
        <input type="text" placeholder="Enter email to share list" v-model="userEmail">
        <button @click.prevent="addSharedUser">Add User</button>

        <input type="text" placeholder="Enter to add item" v-model="newItem" @keyup.enter="addItem">

        <!-- Displays seleted users -->
        <div v-if="selectedUsers">
            <h4>Selected Users</h4>
                <p v-for="user in selectedUsers" :key="userId">{{ user }}</p>
        </div>
        <br>

        
        <!--TODO: Implemtent library for optical character recognition so the user can uploads their own lists and convert them-->
        <p>upload a photo</p>
        <input type="file" @change="handleFileUpload">
        <div class="error">{{ fileError }}</div>


        <!--loading indicator-->
        <button v-if="!isPending" @click.prevent="handleSubmit">Create</button>
        <button v-else disabled>Saving...</button>
        <br>

        <!--List Items-->
        <div class="list" v-if="showItems">
        <h4>{{ title }}</h4>
        <br>
         <ul>
            <li v-for="item in items" :key="item.id">{{ item.item }}</li>
        </ul>
        </div> 
    </form>
</template>

<script setup>
import { ref } from 'vue'
import { timestamp } from '@/firebase/config'
import useStorage  from '@/composables/useStorage.js'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'
import useUsers from '@/composables/useUsers'
import { projectFirestore } from '@/firebase/config'
import defaultImage from '@/assets/uni.png';

        const { url, filePath, uploadImage } = useStorage();
        const { error, addDoc } = useCollection('shoppingLists');
        const {currentUser} = getUser()
        const { availableUsers, selectedUsers, addSelectedUser } = useUsers() 
        
        const router = useRouter()

        const title = ref('')
        const newItem = ref('')
        const items = ref([])
        const file = ref(null)
        const fileError = ref(null)
        const showItems = ref(false)
        const isPending = ref(false)
        const userEmail = ref('')
        const sharedWithID = ref('')
        const sharedUser = ref('')
        const defaultImageUrl = defaultImage;

        
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
                addSelectedUser(user.userId, user.displayName)
                sharedWithID.value = user.userId; 
                sharedUser.value = user.displayName;
 
                userEmail.value = '';

            } catch (err) {
                console.error('Error adding user to list:', err.message);
            }
        };

        const handleSubmit = async () => {
            // Check if a file is selected
            if (file.value) {
                await uploadImage(file.value);
            }

            // Continue with the rest of the form submission
            isPending.value = true;

            const formData = {
                userId: currentUser.value.uid,
                userName: currentUser.value.displayName,
                title: title.value,
                items: items.value,
                imageURL: file.value ? url.value : defaultImageUrl, // Use imageURL only if a file is uploaded
                filePath: file.value ? filePath.value : '', // Use filePath only if a file is uploaded
                createdAt: timestamp(),
                sharedWithID: sharedWithID.value,
                sharedUser: sharedUser.value
            };

            const resp = await addDoc(formData);
            isPending.value = false;

            if (!error.value) {
                router.push({ name: 'ListDetails', params: { id: resp.id } });
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

</script>

<style scoped>
  
    
</style>