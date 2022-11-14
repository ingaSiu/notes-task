const btnReg = document.querySelector('#btn-register');
const formReg = document.querySelector('#registration-form');
const registrationBox = document.querySelector('#registration-box');

let userArr = [];

const btnLog = document.querySelector('#btn-log');
const failLogMessage = document.querySelector('#fail-log');
const formLog = document.querySelector('#log-in');
const logInBox = document.querySelector('#log-in-box');
const failPswMessage = document.querySelector('#fail-psw');
const regOk = document.querySelector('#registration-ok');




if(localStorage.getItem('User')) {
    location.href = './notes.html';
}

fetch('https://testapi.io/api/inga/resource/users')
.then((response) =>{
    if(response.ok) {
        return response.json();
    }
})
.then((result) => {
    userArr = result.data;
    console.log(userArr);
});



formReg.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const repeatPsw = event.target.elements.repeatPassword.value;

    if(password === repeatPsw) {
        
        
    fetch('	https://testapi.io/api/inga/resource/users',
    {   method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then((response) =>{
        if(response.ok) {
            return response.json();
        }
    })
    .then((result) => {
        userArr.push(result);
        console.log(userArr);
        regOk.style.display = 'block';
        // location.reload();
    })
    
  
    } else{
        failPswMessage.style.display = 'block';
    }

})

formLog.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const filteredUsers = userArr.filter((user) => {
        if(user.email === email && user.password === password) {
            return true;
        }
        return false;
    })
    //user loged in
    if(filteredUsers[0]) {
        localStorage.setItem('User', JSON.stringify(filteredUsers[0]));
        //REDIRECT TO NOTES WHEN USER LOGGED IN
        location.href = './notes.html';
    } else {
        failLogMessage.style.display = 'block';
    }
})