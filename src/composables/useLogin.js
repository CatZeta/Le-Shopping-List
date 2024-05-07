import { projectAuth } from "@/firebase/config"
import { ref } from "vue"


const error = ref(null)

/**
 * Asynchronous function that logs in a user with the provided email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise} - A promise that resolves to the user's authentication response.
 * @throws {Error} - If the login fails, throws an error.
 */
const login = async (email, password) => {
    // Initialize error to null.
    error.value = null

    try {
        // Attempt to sign in with the provided email and password.
        const resp = await projectAuth.signInWithEmailAndPassword(email, password)

        // If the response is falsy, throw an error.
        if(!resp){
            throw new Error('could not login')
        }

        // Log the response and set error to null.
        console.log(resp)
        error.value = null

        // Return the response.
        return resp

    } catch (err) {
        // Set error to 'Invalid credentials' and log the error message.
        error.value = 'Invalid credentials'
        console.log(err.message)
    }
    
}

const useLogin = () => {return { error, login }}

export default useLogin