import { projectAuth, projectFirestore } from "@/firebase/config"
import { ref } from "vue"

//Out of function so it can be used for different stage error's
const error = ref(null)
const isPending = ref(false)

//Signup logic
const signup = async (email, password, displayName) =>{
    //reset the error value in case it has been given some before this stage
    error.value = null
    isPending.value = true

    try {

        //Firebase auth method, makes a request and if everything is ok it signs the user in and send a response which i'm saving in 'resp'
        const resp = await projectAuth.createUserWithEmailAndPassword(email, password)
       
        if(!resp){
            throw new Error('Could not complete the signup')
        } 

        await resp.user.updateProfile({ displayName })

        //Sending user data to a user collection, so i can used it for the sharedWith property
        await projectFirestore.collection('users').doc(resp.user.uid).set({
            displayName: displayName,
            email: email,
            userId: resp.user.uid,
            createdAt: new Date()
        })

        error.value = null
        isPending.value = false
        
        console.log(resp)
        return resp

    }  catch(err) {
        console.log(err.message)
        error.value = err.message;
        isPending.value = false
      }
}

//Just used to return the values
const useSignup = () =>{
    return { error, signup, isPending }
    
}

export default useSignup