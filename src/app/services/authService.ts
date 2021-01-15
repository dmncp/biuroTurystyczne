import {Injectable, NgZone} from '@angular/core';
import {User} from '../models/user';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {UserService} from './userService';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  sessionType = localStorage.getItem('session') === null ? 'local' : localStorage.getItem('session');
  firebaseUsersList: User[];
  actualUser: any;
  actualUserReservedTrips: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public userService: UserService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  SignIn(email, password): any{
    return this.afAuth.setPersistence(this.sessionType).then(_ => {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUserData(result.user);
          this.ngZone.run(() => {
            this.router.navigate(['tripsList']);
          });
        }).catch((error) => {
          window.alert(error.message);
        });
    });
  }

  // Sign up with email/password
  SignUp(email, password): any{
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['tripsList']);
        });
        this.userService.createUser(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userData = user;
    return (user !== null);
  }

  SetUserData(user): any{
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    JSON.parse(localStorage.getItem('user'));
    return userRef.set(userData, {
      merge: true
    });
  }

  // Sign out
  SignOut(): any{
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['signIn']);
    });
  }

  changePersistence(option: string): any{
    localStorage.setItem('session', option);
    this.sessionType = localStorage.getItem('session');
  }
  changeRole(newRole: string, user: User): void{
    if (['anonymous', 'admin', 'pracownik', 'VIP', 'Reader'].includes(newRole)){
      user.userType = newRole;
      this.userService.updateUser(user.key, {userType: user.userType});
    }
  }
  usersList(): void{
    this.userService.getUsersList().snapshotChanges().pipe(
      map(
        changes => changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(data => {
      this.firebaseUsersList = data;
      this.actualUser = this.getActualUser() === null ? null : this.getActualUser()[0];
      this.actualUserReservedTrips = this.getUserTrips();
    });
  }
  getActualUser(): any{
    if (this.firebaseUsersList === undefined || this.userData === null){
      return null;
    }
    return this.firebaseUsersList.filter(e => {
      return e.uid === this.userData.uid;
    });
  }
  getUserTrips(): any{
    if (this.actualUser === null || this.actualUser === undefined) {
      return [];
    } else{
      return this.actualUser.reservedTrips;
    }
  }
}

