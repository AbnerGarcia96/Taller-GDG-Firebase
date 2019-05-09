let usuario = {}
let db = {}

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
    db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
        usuario = user;
        $('#mensaje-usuario').html(`Bienvenido ${usuario.displayName}`);
    });
    obtenerRegistros();
}

function logout(){
    localStorage.removeItem('user');
    firebase.auth().signOut();
    window.location.href = 'index.html';
}

function nuevoRegistro(){
    let nombre = $('#nombre').val();
    let edad = $('#edad').val();

    db.collection('registros').add({
        edad: edad,
        nombre: nombre
    }).then((response) => {
        $('#nombre').val('');
        $('#edad').val('');   
        obtenerRegistros();
    }).catch(console.error);
}

function obtenerRegistros(){
    $('#registros').html('');

    db.collection('registros').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let registro = doc.data();

            $('#registros').append(`
                <tr>
                    <td>${registro.nombre}</td>
                    <td>${registro.edad}</td>
                    <td>
                        <button class="btn btn-success text-white" type="button" onclick="editarRegistro('${doc.id}', '${registro.nombre}', ${registro.edad})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-danger text-white" type="button" onclick="eliminar('${doc.id}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `);
        });
    }).catch(console.error);
}

function editarRegistro(id, nombre, edad){
    $('#nombre').val(nombre);
    $('#edad').val(edad);
    $('#botones').html(`<button type="button" class="btn btn-success" onclick="editar('${id}')">Editar</button>`);
}

function editar(id){
    let data = {
        nombre: $('#nombre').val(),
        edad: $('#edad').val()
    }
    db.collection('registros').doc(id).update(data).then(() => {
        obtenerRegistros();
        $('#botones').html('<button type="button" class="btn btn-success" onclick="nuevoRegistro()">Crear</button>');
    }).catch(console.error);
}

function eliminar(id){
    db.collection('registros').doc(id).delete().then(() => {
        obtenerRegistros();
    }).catch(console.error);
}