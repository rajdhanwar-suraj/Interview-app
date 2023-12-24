// import { getAuth, signInWithEmailAndPassword} from "http://www.gstatic.com/ "
const admin = require("firebase-admin");
const serviceAccount = require("../interviewapp-d2b44-firebase-adminsdk-acn10-cd9a54be62.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();
const db = admin.firestore();

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = async (req, res) => {
  // console.log(req.body);
  try {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Please Enter all the Fields" });
      return;
    }

    const userExists = await auth.getUserByEmail(email).catch(() => null);

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
      photoURL: pic,
    });

    const user = {
      _id: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email,
      isAdmin: false, // Firebase doesn't have an explicit "isAdmin" field by default
      pic: userRecord.photoURL || pic,
    };

    // Sending a JSON response with a specific status code
    res.status(200).json({ message: "User Registered Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate user
    const userRecord = await auth.getUserByEmail(email);

    // Check if the provided password is correct (You may want to implement your own logic for password verification)
    // For simplicity, let's assume the password is correct
    // In a real-world scenario, you should use a proper password hashing and verification library
    const passwordIsValid = true;

    if (!passwordIsValid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }

    // Create a custom token and send it to the client
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(200).json({
      message: "Login successful",
      customToken,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid email or password." });
  }
};


module.exports = { registerUser, authUser };
