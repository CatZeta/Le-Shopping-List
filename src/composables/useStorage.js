import { projectStorage } from "@/firebase/config";
import { ref } from "vue";
import getUser from "./getUser";

const {currentUser} = getUser()

const useStorage = () => {
    const error = ref(null)
    //Public url sent by firebase, used to access the image from the frontend
    const url = ref(null)
    //Path to the image in firebase storage
    const filePath = ref(null)

    const uploadImage = async (file) => {
        error.value = null
        filePath.value = `shoppingLists/${currentUser.value.uid}/${file.name}`
        //method returns a UploadTaskSnapshot which contains a reference to the uploaded image
        const storageRef = projectStorage.ref(filePath.value)

        try {
            const resp = await storageRef.put(file)
            //having a ref from resp, this method returns the public url of the uploaded image
            url.value = await resp.ref.getDownloadURL()
            error.value = null
            console.log('url ', url.value)
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { error, url, filePath, uploadImage }
}

export default useStorage