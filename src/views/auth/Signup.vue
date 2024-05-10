<template>
    <form @submit.prevent="handleSubmit">
        <h3>Signup</h3>
        <input type="text" placeholder="Display Name" v-model="displayName">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import { useRouter } from 'vue-router'
import useSignup from '@/composables/useSignup.js'
import { ref } from 'vue'


export default {
    setup () {
        const router = useRouter()
        const {error, signup, isPending} = useSignup()
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const resp = await signup(email.value, password.value, displayName.value)
            if(!error.value) {

                router.push({ name: 'Home' })
                console.log('user signed up')
            }
            console.log(resp)
        }

        return {error, displayName, email, password, handleSubmit, isPending}
    }
}
</script>

<style lang="scss" scoped>

</style>