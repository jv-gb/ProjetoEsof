const loginFormulario = document.getElementById('login-formulario');
const userInput = document.getElementById('user-input');
const passwordInput = document.getElementById('password-input');
const enviar = document.getElementById('enviar');

// const express = require('express');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const app = express();
// const port = 3000;

const user = 'admin';
const password = '1234';

loginFormulario.addEventListener('submit',()=>{
    event.preventDefault(); //evita comportamento default

    console.log('ola mundo')
    console.log(userInput.value)
    console.log(passwordInput.value)
if(userInput.value == user && passwordInput.value == password){
    
    location.href = "../principal/adicionar.html";
}
})