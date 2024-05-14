import { projectAuth } from "@/firebase/config"
import { ref } from "vue"
import { projectFirestore } from "@/firebase/config"

const currentUser = ref(projectAuth.currentUser)

//Listen for authentication changes, the CB function will fire every time there is a change in auth status
projectAuth.onAuthStateChanged((user) => {
    console.log('Auth state change. current user is: ', user)
    currentUser.value = user
})

const getUserById = async (userId) => {
    try {
        const userDoc = await projectFirestore.collection('users').doc(userId).get();
        if (userDoc.exists) {
            return userDoc.data();
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
};

const getUser = () => {return {currentUser, getUserById}}

export default getUser