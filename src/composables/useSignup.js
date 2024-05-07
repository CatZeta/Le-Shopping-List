import { projectAuth } from "@/firebase/config"
import { ref } from "vue"

//Out of function so it can be used for different stage error's
const error = ref(null)

//Signup logic
const signup = async (email, password, displayName) =>{
    //reset the error value in case it has been given some before this stage
    error.value = null

    try {
        //Firebase auth method, makes a request and if everything is ok it signs the user in and send a response which i'm saving in 'resp'
        const resp = await projectAuth.createUserWithEmailAndPassword(email, password)
        if(!resp){
            throw new Error('Could not complete the signup')
        } 

        console.log(resp)
        await resp.user.updateProfile({ displayName })
        error.value = null

        return resp

    }  catch(err) {
        console.log(err.message)
        error.value = err.message;
      }
}

//Just used to return the values
const useSignup = () =>{
    return { error, signup }
    
}

export default useSignup