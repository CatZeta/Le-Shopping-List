<template>
    <div class="navbar">
        <nav>
            <img src="@/assets/uni.png" alt="the round universe">
            <h1><RouterLink :to="{ name: 'Home' }">Le Shopping Master</RouterLink></h1>
           
            <div class="links">
                <div v-if="currentUser" >
                  <RouterLink  :to="{ name: 'CreateList' }">Create List</RouterLink>
                  <RouterLink  :to="{ name: 'MyLists' }">My List</RouterLink>
                  <span>Hello, {{ currentUser.displayName }}</span>
                  <button @click="handleLogout">Logout</button>
                </div>
                
                <div v-if="!currentUser" >
                    <RouterLink class="btn" :to="{ name: 'Signup' }">Signup</RouterLink>
                    <RouterLink class="btn" :to="{ name: 'Login' }">Log in</RouterLink>
                </div>
               
                <div v-if="error" class="error">{{ error }}</div>
            </div>
        </nav>
    </div>
</template>

<script>
import useLogout from '@/composables/useLogout.js'
import getUser from '@/composables/getUser'
import { useRouter } from 'vue-router'

export default {
    setup () {
        const router = useRouter()

        const {error, logout} = useLogout()
        const {currentUser} = getUser()

        const handleLogout = async () => {
            await logout()
            router.push({ name: 'Login' })
            if(!error.value) {
                console.log('user logged out')
            }
        }
        

        return { handleLogout, currentUser, error }
    }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  img {
    border-radius: 50%;
    border: 2px solid rgba(21, 2, 131, 0.411);
  }
  span {
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>