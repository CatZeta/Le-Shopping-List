<template>
    <span v-if="!showShare" class="material-symbols-outlined" @click="showShare = true">share</span>
    <form v-if="showShare" @submit.prevent="addSharedUser">
        <input type="text" placeholder="Enter email to share list" v-model="userEmail">
        <button type="submit">Add User</button>
    </form>
</template>

<script setup>
    import { projectFirestore } from '@/firebase/config'
    import { ref, watch, defineProps, toRefs } from 'vue'
    import useDocument from '@/composables/useDocument';

    const userEmail = ref('')
    const showShare = ref(false)
    const sharedUsers = ref([])
    const props = defineProps(['sl'])

    //Cria uma ref reactiva, neste caso para podermos usar no watch
    const { sl } = toRefs(props)
    const { updateDoc } = useDocument('shoppingLists', sl.value.id);


    // Watch for changes in the shopping list document
    watch(sl, (newSl) => {
        if (newSl && newSl.sharedWith) {
            sharedUsers.value = newSl.sharedWith.map(user => user.displayName)
        }
    })

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

            // Update the shopping list document with the new shared user
            const updatedSharedWith = sl.value.sharedWith ? [...sl.value.sharedWith, { userId: user.userId, displayName: user.displayName }] : [{ userId: user.userId, displayName: user.displayName }];
            await updateDoc({ sharedWith: updatedSharedWith });

            sharedUsers.value.push(user.displayName);
            userEmail.value = '';

        } catch (err) {
            console.error('Error adding user to list:', err.message);
        }

        showShare.value = false
    };
</script>

<style scoped></style>