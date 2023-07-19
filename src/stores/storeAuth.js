// stores/counter.js
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '@/js/firebase'
import { useStoreNotes } from '@/stores/storeNotes';



export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      const useStore = useStoreNotes()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid
          this.user.email = user.email
          this.router.push('/')
          useStore.init()
        } else {
          this.user = {}
          this.router.replace('/auth')
          useStore.clearNotes()
        }
      })
    },
    registerUser(payload) {
      const { email, password } = payload
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    loginUser(payload) {
      const { email, password } = payload
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
        })
        .catch((error) => {
          console.log(error.message)
        })
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('user signed out')
      }).catch((error) => {
        console.log(error.message)
      })
    }

  }
})