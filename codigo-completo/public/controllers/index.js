let usuario = {}

$(document).ready(inicializarComponentes);

function inicializarComponentes(){
    const config = {
        apiKey: "AIzaSyBgYeT4zFa2P5JU30PqOxCH3cjoibhf-c0",
        authDomain: "gdg-tgu.firebaseapp.com",
        databaseURL: "https://gdg-tgu.firebaseio.com",
        projectId: "gdg-tgu",
        storageBucket: "gdg-tgu.appspot.com",
        messagingSenderId: "340914801406"
    };
    
    firebase.initializeApp(config);

    validarLogin();
}

function validarLogin(){
    firebase.auth().onAuthStateChanged((user) => {
        if(user){
            window.location.href = 'home.html';
        }
    });
}

function login(){
    let email = $('#email').val();
    let password = $('#password').val();
    
    firebase.auth().signInWithEmailAndPassword(email, password).then((auth) => {
        // Guarda la información del usuario de forma local
        usuario = auth.user;
        window.location.href = 'home.html';
    }).catch((error) => {
        console.error(error);
    });
}

function register(){
    let email = $('#email-register').val();
    let password = $('#password-register').val();
    let username = $('#username').val();
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then((auth) => {
        usuario = firebase.auth().currentUser;
        user.updateProfile({displayName: username}).then(console.log).catch(console.error);
        window.location.href = 'home.html';
    }).catch((error) => {
        console.error(error);
    });
}