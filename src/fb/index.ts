import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { setUser } from 'src/redux/actions/auth'
import { store } from 'src/redux/app/store'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'trainee-mockup.firebaseapp.com',
  projectId: 'trainee-mockup',
  storageBucket: 'trainee-mockup.appspot.com',
  messagingSenderId: '137312206949',
  appId: '1:137312206949:web:0dcd9dede6de32ff37468c',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
auth.languageCode = document.documentElement.lang

onAuthStateChanged(auth, user => {
  store.dispatch(setUser(user))
})
