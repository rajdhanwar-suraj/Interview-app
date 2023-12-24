const admin = require('firebase-admin');


const db = admin.firestore();

const userCollection = db.collection('users');

class User {
  constructor(name, email, password, pic = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", isAdmin = false) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.pic = pic;
    this.isAdmin = isAdmin;
  }

  async save() {
    const hashedPassword = await this.hashPassword(this.password);
    const userDocRef = await userCollection.add({
      name: this.name,
      email: this.email,
      password: hashedPassword,
      pic: this.pic,
      isAdmin: this.isAdmin,
    });
    return userDocRef.id;
  }

  async hashPassword(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  async matchPassword(enteredPassword) {
    const userSnapshot = await userCollection.where('email', '==', this.email).get();

    if (userSnapshot.empty) {
      return false;
    }

    const userData = userSnapshot.docs[0].data();
    return await bcrypt.compare(enteredPassword, userData.password);
  }
}

module.exports = User;
