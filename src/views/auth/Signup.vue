<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>layN
        <input type="text" placeholder="Display Name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import useSignup from '@/composables/useSignup.js'
    import { ref } from 'vue'


    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const router = useRouter()
    const { error, signup, isPending } = useSignup()

    const handleSubmit = async () => {
        const resp = await signup(email.value, password.value, displayName.value)
        if (!error.value) {

            router.push({ name: 'Home' })

        }
        console.log('user signed up', resp)
    }
</script>

<style lang="scss" scoped></style>