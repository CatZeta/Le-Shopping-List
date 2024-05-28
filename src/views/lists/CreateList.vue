<template>
    <form>
        <h4>Create a List</h4>
        <input type="text" placeholder="List title" v-model="title" required>


        <input type="text" placeholder="Enter to add item's" v-model="newItem" @keydown.enter.prevent="addItem">

        <!--TODO: Implement library for optical character recognition so the user can uploads their own lists and convert them-->
        <p>Give your list a cool photo!</p>
        <input type="file" @change="handleFileUpload">
        <div class="error">{{ fileError }}</div>


        <button v-if="!isPending" @click.prevent="handleSubmit">Create</button>
        <!--loading indicator-->
        <button v-else disabled>Saving...</button>
        <br>
    </form>

    <!--List Items-->
    <!--Add Delete -->
    <div class="list" v-if="showItems">
        <h4>{{ title }}</h4>
        <br>
        <ul>
            <li v-for="item in items" :key="item.id">{{ item.item }}</li>
        </ul>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { timestamp } from '@/firebase/config'
    import useStorage from '@/composables/useStorage.js'
    import useCollection from '@/composables/useCollection'
    import getUser from '@/composables/getUser'
    import { useRouter } from 'vue-router'
    import defaultImage from '@/assets/uni.png';

    const { url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('shoppingLists');
    const { currentUser } = getUser()
   

    const router = useRouter()
    const title = ref('')
    const newItem = ref('')
    const items = ref([])
    const file = ref(null)
    const fileError = ref(null)
    const showItems = ref(false)
    const isPending = ref(false)
    const defaultImageUrl = defaultImage;


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
            createdAt: timestamp()
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
        if (uploadedFile && types.includes(uploadedFile.type)) {
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

<style scoped></style>