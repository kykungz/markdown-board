import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCYb5yhy_-gsa5gDhlSRE0tUdFjZmfLFHo',
  authDomain: 'markdown-board.firebaseapp.com',
  databaseURL: 'https://markdown-board.firebaseio.com',
  projectId: 'markdown-board'
}
firebase.initializeApp(config)

export default firebase
