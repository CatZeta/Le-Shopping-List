import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
    // Initialize error to null.
    error.value = null
    isPending.value = true

    try {
        // Attempt to sign in with the provided email and password.
        const res = await projectAuth.signInWithEmailAndPassword(email, password)

        // If the response is falsy, throw an error.
        if(!res){
            throw new Error('could not login')
        }
        console.log(res)
        
        // Log the response and set error to null.
        error.value = null
        isPending.value = false

        // Return the response.
        return res

    } catch (err) {
        // Set error to 'Invalid credentials' and log the error message.
        error.value = 'Invalid credentials'
        console.log(err.message)
        isPending.value = false
    }
    
}

const useLogin = () => {return { error, login, isPending }}

export default useLogin