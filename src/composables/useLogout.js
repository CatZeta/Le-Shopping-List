import { projectAuth } from "@/firebase/config"
import { ref } from "vue"


const error = ref(null)
const isPending = ref(false)

const logout = async () => {
    error.value = null
    isPending.value = true

    try {
        await projectAuth.signOut()
        isPending.value = false
        console.log('logged out')
    } catch (err) {
        console.log(err.message)
        error.value = err.message
        isPending.value = false
    }    
}

const useLogout = () => {return {error, logout, isPending}}

export default useLogout