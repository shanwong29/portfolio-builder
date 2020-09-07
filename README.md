# Portfolio Builder

This repo provides an easy-to-customize personal dev portfolio template with content controls. Once the setup is done, users can login and edit the content of their portfolio page directly on the web app. Styles and colors of the page can also be easily edited.

The project uses Github api v3 to obtain user's basic information, and uses Firebase Storage and Firestore to add additional user information. The logic of creating the admin user is achieved with Firebase Functions.

This project was created with Vue, Firebase and Vuetify.

## Prerequisites

1. Make sure you have [`npm`](https://www.npmjs.com/get-npm), [`Firebase CLI`](https://firebase.google.com/docs/cli) and [`Vue CLI`](https://cli.vuejs.org/) installed.

## Get Started

### Installation and env setting:

1. Clone the repository:

```
git clone https://github.com/shanwong29/portfolio-builder.git
```

2. Install all the dependencies in both root and `/functions` directories:

```
cd portfolio-builder/
npm i
```

```
cd functions/
npm i
```

3. create a env file in the root directory:

```
cd ..
touch .env
```

Add your github username to the `.env` file as follows:

```
VUE_APP_GITHUB_USERNAME=<Your Github username>
```

### Firebase setup

1. In the root directory, login to your Firebase CLI

```
firebase login
```

2. Create a `Firebase` project:

```
firebase projects:create <project ID of your choice>

// The project ID is a unique indentifier used in Firebase and will be used as part of the default domain name in Firebase Hosting. Make sure you pick one carefully.
```

3. Run the following command to set your Firebase project as active to the working repo and register the Firebase project as a web app. In the interactive console, you can choose the name for the web app as you like.

```
firebase use --add <your firebase project ID>
firebase apps:create WEB
```

4. Run the following command to obtain the firebase config:

```
firebase apps:sdkconfig WEB
```

Add the `Firebase configuration` in the `.env` file of the repo as follows:

```
VUE_APP_FIREBASE_PROJECT_ID=<projectId>
VUE_APP_FIREBASE_APP_ID=<appId>
VUE_APP_FIREBASE_DATABASE_URL=<databaseURL>
VUE_APP_FIREBASE_STORAGE_BUCKET=<storageBucket>
VUE_APP_FIREBASE_API_KEY=<apikey>
VUE_APP_FIREBASE_AUTH_DOMAIN=<authDomain>
VUE_APP_FIREBASE_MESSENGER_SENDER_ID=<messagingSenderId>
```

5. Go to [Firebase console](https://console.firebase.google.com/), choose your project, go to `Cloud Firestore` section and create database for the project. You can choose either production mode or test mode for the security rule as we will overwrite the rules later. You can also choose the firestore location of your choice.

6. Then go to `Storage` section on Firebase console and create storage for the project with similar steps.

7. Enable Email/Password sign-in:

   In the Firebase console, open the `Authentication` section.
   On the `Sign-in method` tab, enable the Email/password sign-in method and click Save.

8. The logic of creating the admin user is achieved with Firebase Functions, you can find the code in `/functions/index.js`. The access of the Firestore and Storage is controlled by Firebase security rules, in this project, the rules are set to only admin users can write. You can find the related rules in `/security-rules`.

Run the following command to deploy the mentioned function and security rules:

```
firebase deploy --only storage,firestore,functions
```

### Start the portfolio app

1. The setup is done! Now your portfolio app is connected with your Firebase project. You can view app in development mode by:

```
npm run serve
```

You may view it in the browser on http://localhost:8080.

2. Go to the [initialize page](http://localhost:8080/initial). Fill in the form to set your email account as the admin user. Once this step is done, an `about` collection will be created in your Firestore. As long as there is an `about` collection in Firestore, no other person will be set as an admin user. The login page is on the path [`/admin`](http://localhost:8080/admin)

3. You can change the major color setting in `/src/plugins/vuetify.js`

### Deployment

1. Build the production:

```
npm run build
```

2. Deploy to Firebase Hosting:

```
firebase deploy --only hosting
```

:tada::tada::tada: Congratulations! You have just built your awesome portfolio! :tada::tada::tada: Your page is hosted on `https://<your project id>.web.app/` and `https://<your project id>.firebaseapp.com/`

## Built with

- Vue.js
- Firebase
- Vuetify
