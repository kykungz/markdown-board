import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCYb5yhy_-gsa5gDhlSRE0tUdFjZmfLFHo',
  authDomain: 'markdown-board.firebaseapp.com',
  databaseURL: 'https://markdown-board.firebaseio.com',
  projectId: 'markdown-board',
  storageBucket: 'markdown-board.appspot.com',
  messagingSenderId: '1032163365221'
}
firebase.initializeApp(config)

export default firebase
