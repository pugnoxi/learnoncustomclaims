import {getDatabase} from 'firebase-admin/database';

const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export class FirebaseController {

  constructor() {
  }

  public listAllUsers (nextPageToken?: string) {
    return admin.auth().listUsers(1000, nextPageToken)
  };


  static async changeRole(uid: string, role?: string) {
    console.log({ uid, role});
    await admin.auth().setCustomUserClaims(uid, { role: role || 'User'}).then(() => console.log('Rolle erfolgreich geändert!'))
  }

   static async changeClass(uid: string, role?: string) {
    console.log({ uid, role});
    await admin.auth().setCustomUserClaims(uid, { role: role || 'Standard'}).then(() => console.log('Rolle erfolgreich geändert!'))
  }

  static async getByUid(uid: string) {
    return admin.auth().getUser(uid);

  }
}
