// useUsers.js
import { ref, watchEffect } from 'vue'
import getUser from './getUser'
import { projectFirestore } from '@/firebase/config'

const useUsers = () => {
    const error = ref(null)
    const availableUsers = ref([])
    const selectedUsers = ref([])

    const { currentUser } = getUser()

    // Função para obter os usuários disponíveis do Firestore
    const fetchAvailableUsers = async () => {
        try {
            const usersSnapshot = await projectFirestore.collection('users').get()
            availableUsers.value = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        } catch (err) {
            error.value = 'Failed to fetch available users'
            console.error('Error fetching available users:', err.message)
        }
    };

    //watchEffect para observar alterações no estado de autenticação
    watchEffect(() => {
        // Se o usuário estiver autenticado, obtém os usuários disponíveis
        if (currentUser.value) {
            fetchAvailableUsers();
            
        } else {
            // Se não houver um usuário autenticado, limpa a lista de usuários disponíveis
            availableUsers.value = [];
        }
       // 
    });

    const addSelectedUser = (id, displayName) => {
        console.log('Available users:', availableUsers.value)
        error.value = null
        if (!selectedUsers.value.includes(id && displayName)) {
            selectedUsers.value.push(id && displayName);
            console.log('User added:', selectedUsers.value)
        } else {
            error.value = 'User already selected'
            console.log(error.value)
        }
    };

    const removeSelectedUser = (userId) => {
        selectedUsers.value = selectedUsers.value.filter(id => id !== userId);
    };

    return {
        error,
        availableUsers,
        selectedUsers,
        addSelectedUser,
        removeSelectedUser
    };
}

export default useUsers
