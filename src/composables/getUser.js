import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const currentUser = ref(projectAuth.currentUser)

//Listen for authentication changes, the CB function will fire every time there is a change in auth status
projectAuth.onAuthStateChanged((user) => {
    console.log('Auth state change. current user is: ', user)
    currentUser.value = user
})

const getUser = () => {return {currentUser}}

export default getUser