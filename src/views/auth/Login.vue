<template>
    <form @submit.prevent="handleSubmit">
        <h3>Login</h3>
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Log in</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script>
import useLogin from '@/composables/useLogin.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup () {
        const router = useRouter()
        const {error, login, isPending} = useLogin()
        const email = ref('')
        const password = ref('')

        const handleSubmit = async () => {
            const resp = await login(email.value, password.value)
            if(!error.value) {
                router.push({ name: 'Home' })
                console.log('user logged in')
            }
            console.log(resp)
            email.value = ''
            password.value =''
        }

        return {email, password, error, handleSubmit, isPending}
    }
}
</script>

<style lang="scss" scoped>

</style>