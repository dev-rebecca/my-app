/*
*
* Global app functions
* 
*/

// Service worker

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('./sw.js').then(function(registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//             // registration failed :(
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }  

// Show/hide pages
function showPage(sectionClicked) {
    const selection = document.getElementById('pages').getElementsByTagName('section');
    let title = document.getElementById('page-title');

    for (var i=0; i<selection.length; i++) {
      selection[i].style.display = 'none';
    }
    document.getElementById('container' + sectionClicked).style.display = 'block';

    if (document.getElementById('container1').style.display === 'block') {
        title.innerText = "Add Log";
    }
    if (document.getElementById('container2').style.display === 'block') {
        title.innerText = "Add Wildlife";
    }
    if (document.getElementById('container3').style.display === 'block') {
        title.innerText = "My Wildlife";
    }
    if (document.getElementById('container4').style.display === 'block') {
        title.innerText = "Settings";
    }
}

// Alerts
function showAlert(msgtype, msg) {
    document.getElementById('alertbox').removeAttribute('hidden');
    document.getElementById('alertmsg').innerHTML = msg;
    window.setTimeout(function() {hideAlert ()}, 10000);

    if (msgtype == 'success') {
        let alertStyle = document.getElementById('alertbox');
        
        alertStyle.classList.remove('text-red-700', 'bg-red-100', 'border-red-400');
        document.getElementById('alertbox').classList.add('text-green-700', 'bg-green-100', 'border', 'border-green-400', 'rounded');
    }
    if (msgtype == 'error') {
        let alertStyle = document.getElementById('alertbox');
        
        alertStyle.classList.remove('text-green-700', 'bg-green-100', 'border-green-400');
        document.getElementById('alertbox').classList.add('text-red-700', 'bg-red-100', 'border', 'border-red-400', 'rounded');
    }
}

function hideAlert (msg) {
    document.getElementById('alertbox').setAttribute('hidden', 'hidden');
}

// Get user ID
function getUserID() {
    fetch('ws.php?page=get-user-id', // Must declare path manually as function is not in a form
        {
            credentials: 'include'
        }
    )
    .then (
        function (headers) {
            headers.text().then(function(body) {
                // Finds user IDs from JSON
                for (let i = 0; i < body.length; i++) {
                    let userIDs= "";
                    userIDs = body[i].user_id;
                    // Finds user_id class name and changes value to user IDs
                        let inputs = document.getElementsByClassName('user_id');
                        for(i = 0; i < inputs.length; i++) {
                        inputs[i].value = userIDs;  
                    }
                }
            })
        }
    )
}

// Get animal ID
function getAnimalID (clicked_id) {

    // Finds animal_id class name and changes value to animal IDs of animal clicked on
    let inputs = document.getElementsByClassName('animal_id');

    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = clicked_id;
    }
}

// Onload show relevant page according to log in status
function checkForLogin() {
    if (localStorage.getItem("loggedIn") === null) {
        document.getElementById('login-div').removeAttribute('hidden');
        document.getElementById('after-login-div').setAttribute('hidden', 'hidden');
        document.getElementById('container3').setAttribute('hidden', 'hidden');
    } else {
        document.getElementById('container3').removeAttribute('hidden');
        let homeButton = document.getElementById("home");
        homeButton.focus();
    }
}

// Validation regexes
function validateText(text) {
    const nameRegex = /^[a-zA-Z ]{2,30}$/; // Letters only, min 2, max 30
    return nameRegex.test(text);
}

function validateLongText(text) {
    const nameRegex = /^[a-zA-Z ]{2,600}$/; // Letters only, min 2, max 600
    return nameRegex.test(text);
}

function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/; // Email format only
    return emailRegex.test(email);
}

function validatePassword(password) { 
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Min 8 chars, min 1 capital, min 1 special char, min 1 number
    return passwordRegex.test(password);
}

/*
*
* Pages
* 
*/

/* Register/login */

// Register
function register (evt) {
    evt.preventDefault();

    const firstName = document.forms['register-form']['first-name'].value;
    const lastName = document.forms['register-form']['last-name'].value;
    const email = document.forms['register-form']['email'].value;
    const password = document.forms['register-form']['password'].value;
    const formData = new FormData();

    // Fetch
    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    formData.append(evt.target[2].name, evt.target[2].value);
    formData.append(evt.target[3].name, evt.target[3].value);
    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            if (headers.status === 201) {
                document.getElementById('after-login-div').removeAttribute('hidden');
                document.getElementById('login-div').setAttribute('hidden', 'hidden');
                showAlert('success', 'Welcome!');
                localStorage.setItem('User first name', firstName);
            } else if (validateText(firstName) == false) {
                showAlert('error', 'Please enter your first name');
                return false;
            } else if (validateText(lastName) == false) {
                showAlert('error', 'Please enter your last name');
                return false;
            } else if (validateEmail(email) == false) {
                showAlert('error', 'Please enter a valid email address');
                return false;
            } else if (validatePassword(password) == false) {
                showAlert('error', '<strong>Please enter a valid password</strong><ul><li>Minimum 8 characters</li><li>One capital letter</li><li>One number</li><li>One special character</li></ul>');
                return false;
            } else {
                showAlert('error', 'Error');
            }
        }
    );
}

// Add icon if validation passes, remove if does not pass
function RegisterValidationIcon() {

    // Register form input values
    const first = document.forms['register-form']['first-name'].value;
    const last = document.forms['register-form']['last-name'].value;
    const email = document.forms['register-form']['email'].value;
    const password = document.forms['register-form']['password'].value;

    // Register form icon spots
    const first_icon = document.getElementById("first_icon");
    const last_icon = document.getElementById("last_icon");
    const email_icon = document.getElementById("email_icon");
    const password_icon = document.getElementById("password_icon");

    if (validateText(first) == true) {
        first_icon.classList.remove("hidden");
        first_icon.classList.add("flex");
    } else {
        first_icon.classList.add("hidden");
        first_icon.classList.remove("flex");
    }

    if (validateText(last) == true) {
        last_icon.classList.remove("hidden");
        last_icon.classList.add("flex");
    } else {
        last_icon.classList.add("hidden");
        last_icon.classList.remove("flex");
    }

    if (validateEmail(email) == true) {
        email_icon.classList.remove("hidden");
        email_icon.classList.add("flex");
    } else {
        email_icon.classList.add("hidden");
        email_icon.classList.remove("flex");
    }

    if (validatePassword(password) == true) {
        password_icon.classList.remove("hidden");
        password_icon.classList.add("flex");
    } else {
        password_icon.classList.add("hidden");
        password_icon.classList.remove("flex");
    }
}

// Login
function login (evt) {
    evt.preventDefault();

    const email = document.forms['login-form']['email'].value;
    const password = document.forms['login-form']['password'].value;
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            if (headers.status === 200) {
                document.getElementById('after-login-div').removeAttribute('hidden');
                document.getElementById('login-div').setAttribute('hidden', 'hidden');
                let home = document.getElementById("home");
                home.click();
                home.focus();
                showAlert('success', 'Welcome!');
                localStorage.setItem('loggedIn', true);
                getUserID();
            } else if (validateEmail(email) == false) {
                showAlert('error', 'Please enter a valid email address');
                return false;
            } else if (validatePassword(password) == false) {
                showAlert('error', '<strong>Please enter a valid password</strong><ul><li>Minimum 8 characters</li><li>One capital letter</li><li>One number</li><li>One special character</li></ul>');
                return false;
            } else {
                showAlert('error', 'Invalid login details');
            }
        }
    );
}

// Click of "sign in" button clicks submit button for form (can't style submit)
function submitLogin() {
    let formButton = document.getElementById("login-form-submit");
    formButton.click();
}

// Click of "register" button clicks submit button for form (can't style submit)
function submitRegister() {
    let formButton = document.getElementById("register-form-submit");
    formButton.click();
}

// Click of "sign up now" takes to register page
function showRegister() {
    document.getElementById('register').removeAttribute('hidden');
    document.getElementById('login-div').setAttribute('hidden', 'hidden');
}

// Click of "back to sign in" takes to sign in page
function showLogin() {
    document.getElementById('login-div').removeAttribute('hidden');
    document.getElementById('register').setAttribute('hidden', 'hidden');
}

/* Container 1
Add log page */

// Add log
function addLog(evt) {

    evt.preventDefault();

    const title = document.forms['log-form']['title'].value;
    const text = document.forms['log-form']['text'].value;
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    formData.append(evt.target[2].name, evt.target[2].value);
    
    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    )
    .then (
        function(headers) {
            if (headers.status === 201) {
                showAlert('success', 'Log successfully added');
            } else if (validateText(title) == false) {
                showAlert('error', 'Please enter a title for your log');
                return false;
            } else if (validateLongText(text) == false) {
                showAlert('error', 'Please enter a body for your log');
                return false;
            } else {
                showAlert('error', 'There was an error adding your log! Please try again');
            }
        }
    );
}

// Add icon if add log validation passes, remove if does not pass
function LogValidationIcon() {

    // Add log form input values
    const title = document.forms['log-form']['title'].value;
    const text = document.forms['log-form']['text'].value;

    // Add log form icon spots
    const title_icon = document.getElementById("title_icon");
    const text_icon = document.getElementById("text_icon");

    if (validateText(title) == true) {
        title_icon.classList.remove("hidden");
        title_icon.classList.add("flex");
    } else {
        title_icon.classList.add("hidden");
        title_icon.classList.remove("flex");
    }

    if (validateLongText(text) == true) {
        text_icon.classList.remove("hidden");
        text_icon.classList.add("flex");
    } else {
        text_icon.classList.add("hidden");
        text_icon.classList.remove("flex");
    }
}


/* Container 2
Add animal page */

// Get species ID
function getSpeciesID_AddAnimal (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);

    fetch('ws.php?page=get-species-id', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    let id = body[i].species_id;
                    let input_ = document.getElementById("species_id_input");

                    input_.value = id;
                }
            })
        }
    )
}

// View species
function listSpecies_AddAnimal (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);

    fetch('ws.php?page=view-species', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    // Creates list
                    const listContainer_test = document.getElementById("species_dropdown");
                    const newListItem_test = document.createElement("option");

                    // Animal names become buttons, animal IDs are hidden inside for hidden form
                    let result_test = "";

                    result_test += `
                    <option value='${body[i].species_id}'>
                    ${body[i].name}
                    </option>
                    `;

                    newListItem_test.innerHTML = result_test;
                    listContainer_test.appendChild(newListItem_test);
                }
            })
        }
    )
}

// Empties list for new selection to not duplicate
function clearSpeciesList() {
    document.getElementById("my_animals_list").innerHTML = '';
}

// Populates species dropdown
function populateSpeciesDropdown_AnimalAdd() {
    let selection = animal_type_id_2.options[animal_type_id_2.selectedIndex].value;
    let input = document.getElementById("animal_type_id_1");
    let button = document.getElementById("animal_type_button_1");

    input.value = selection;
    button.click();
}

// Get species ID for dropdown
function getSpeciesIDforDropdown_Add () {

    let input = document.getElementById('species_id_1');
    let selection = species_dropdown.options[species_dropdown.selectedIndex].value;

    input.value = selection;
}

// Click button to send form
function clickButton1() {
    let button = document.getElementById("species_id_button_1");

    button.click();
}

// Add animal form
function addAnimal (evt) {

    evt.preventDefault();

    const animal_type = animal_type_id_2.options[animal_type_id_2.selectedIndex].text;
    const species = species_dropdown.options[species_dropdown.selectedIndex].text;
    const name = document.forms['add-animal-form']['name'].value;
    const gender = document.forms['add-animal-form']['gender'].value;
    const maturity = document.forms['add-animal-form']['maturity'].value;
    const notes = document.forms['add-animal-form']['notes'].value;
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    formData.append(evt.target[2].name, evt.target[2].value);
    formData.append(evt.target[3].name, evt.target[3].value);
    formData.append(evt.target[4].name, evt.target[4].value);
    fetch('ws.php?page=add-animal', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    )
    .then (
        function(headers) {
            if (headers.status === 201) {
                showAlert('success', 'Animal added');
            } else if (animal_type == "Animal type") {
                showAlert('error', 'Please select an animal type');
                return false;
            } else if (species == "Species") {
                showAlert('error', 'Please select a species');
                return false;
            } else if (validateText(name) == false) {
                showAlert('error', 'Please enter a name for your animal');
                return false;
            } else if (validateText(gender) == false) {
                showAlert('error', "Please enter a gender or select 'unknown'");
                return false;
            } else if (validateText(maturity) == false) {
                showAlert('error', "Please enter maturity level or select 'unknown'");
                return false;
            } else if (validateText(notes) == false) {
                showAlert('error', 'Please enter a note');
                return false;
            } else {
                showAlert('error', 'Error');
            }
        }
    );
}

// Add icon if validation passes, remove if does not pass
function addAnimalValidationIcon() {
    
    // Add animal form input values
    const name = document.forms['add-animal-form']['name'].value;
    const gender = document.forms['add-animal-form']['gender'].value;
    const maturity = document.forms['add-animal-form']['maturity'].value;
    const notes = document.forms['add-animal-form']['notes'].value;

    // Add animal form icon spots
    const name_icon = document.getElementById("name_icon");
    const gender_icon = document.getElementById("gender_icon");
    const notes_icon = document.getElementById("notes_icon");
    const maturity_icon = document.getElementById("maturity_icon");

    if (validateText(name) == true) {
        name_icon.classList.remove("hidden");
        name_icon.classList.add("flex");
    } else {
        name_icon.classList.add("hidden");
        name_icon.classList.remove("flex");
    }

    if (validateText(gender) == true) {
        gender_icon.classList.remove("hidden");
        gender_icon.classList.add("flex");
    } else {
        gender_icon.classList.add("hidden");
        gender_icon.classList.remove("flex");
    }

    if (validateText(maturity) == true) {
        maturity_icon.classList.remove("hidden");
        maturity_icon.classList.add("flex");
    } else {
        maturity_icon.classList.add("hidden");
        maturity_icon.classList.remove("flex");
    }

    if (validateText(notes) == true) {
        notes_icon.classList.remove("hidden");
        notes_icon.classList.add("flex");
    } else {
        notes_icon.classList.add("hidden");
        notes_icon.classList.remove("flex");
    }
}

/* Container 3
View animals page */

// Loading spinner
function showSpinner() {

    let spinner = document.getElementsByClassName("spinner");

    for (i = 0; i < spinner.length; i++) {
        spinner[i].innerHTML = `<div style="border-top-color:transparent"
    class="w-8 h-8 border-4 border-green-500 border-solid rounded-full animate-spin">`
    }
}

// Animal type selection
function selectType (clicked) {
    // Clears results of previous click so results do not duplicate
    clearAll()

    // Submits animal type clicked on to hidden HTML form view-my-animals-form
    let input = document.getElementById('animal-type');

    input.value = clicked;
    document.getElementById("type-selected").click();

    // Gets animal type clicked on as label for animal type list page
    let label = document.getElementById('animal_type_label');
    let animal_type = document.getElementById('animal_type_div');
    
    label.innerHTML = clicked;
    animal_type.innerHTML = clicked;

    // Puts pic of animal type that was clicked, onto container3 and container5
    let iconDiv =  document.getElementById("animal_type_icon");
    let iconDiv2 =  document.getElementById("animal_type_icon2");
    
    if (clicked == "Invertebrates") {
        iconDiv.innerHTML = `<img src="./imgs/hermit-crab.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/hermit-crab.png';
        }
    if (clicked == "Fish") {
        iconDiv.innerHTML = `<img src="./imgs/fish.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/fish.png';
    }
    if (clicked == "Amphibians") {
        iconDiv.innerHTML = `<img src="./imgs/frog.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/frog.png';
    }
    if (clicked == "Birds") {
        iconDiv.innerHTML = `<img src="./imgs/parrot.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/parrot.png'
    }
    if (clicked == "Mammals") {
        iconDiv.innerHTML = `<img src="./imgs/kangaroo.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/kangaroo.png';
    }
    if (clicked == "Reptiles") {
        iconDiv.innerHTML = `<img src="./imgs/snake.png" class="inline" alt="">`;
        iconDiv2.src='./imgs/snake.png';
    }
}

/* Container 4
User settings */

// Update reg
function updateReg (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    formData.append(evt.target[2].name, evt.target[2].value);
    formData.append(evt.target[3].name, evt.target[3].value);
    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
}

// Delete account
function deleteAccount(evt) {
    evt.preventDefault();
    
    fetch(evt.target.action, 
        {

            credentials: 'include'
        }
    ) 
}

// Logout
function logout (evt) {
    evt.preventDefault();
    fetch(evt.target.action,
        {
            credentials: 'include'
        }
    )
    .then (
        function(headers) {
            if (headers.status === 200) {
                localStorage.removeItem('loggedIn');
                localStorage.removeItem('role');
                document.getElementById('login-div').removeAttribute('hidden');
                document.getElementById('after-login-div').setAttribute('hidden', 'hidden');
                document.getElementById('container4').setAttribute('hidden', 'hidden');
                settingsPage = document.getElementById("container4");
                settingsPage.style.display = "none";
            }
        }
    );
}    

/* Container 6
View individual animals page */


// Individual animal page loading spinner on setTimout
function animalSpinnerAdd() {
    document.getElementById('page6').removeAttribute('hidden');
    document.getElementById('loading_Page').setAttribute('hidden', 'hidden');
}

function animalSpinnerRemove() {
    window.setTimeout(function() {animalSpinnerAdd()}, 3000);
    resetAnimalSpinner();
}

function resetAnimalSpinner() {
    document.getElementById('loading_Page').removeAttribute('hidden');
    document.getElementById('page6').setAttribute('hidden', 'hidden');
}

/* Container 5
Species list page */

// View all animals
function viewAnimals (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);

    fetch('ws.php?page=view-animals', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    )
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    // Creates list
                    const listContainer = document.getElementById("my_animals_list");
                    const newList = document.createElement("ul");
                    const newListItem = document.createElement("li");

                    // Animal names become buttons, animal IDs are hidden inside for hidden form
                    let result = "";

                    result += `<img class="w-14 h-14 my-1 rounded-full inline mr-4" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                    <p onclick='showSpinner() & getAnimalID(this.id) & speciesSpinnerRemove() & showPage("7"); return false'
                    id='${body[i].animal_id}'
                    class='inline'
                    >${body[i].name}</p>
                    `;
                                        
                    newListItem.innerHTML = result;
                    newList.appendChild(newListItem);
                    listContainer.appendChild(newList);

                    // Outputs species to species page, individual animal page, add log page
                    const species_name = document.getElementById('species_name_div');
                    const species_name4 = document.getElementById('species_name_div4');
                    const species_name5 = document.getElementById('species_name_div5');


                    species_name.innerHTML = `${body[i].name}`;
                    species_name4.innerHTML = `${body[i].name}`;
                    species_name5.innerHTML = `${body[i].name}`;

                    // Outputs species to species count hidden HTML form
                    const species_name2 = document.getElementById('species_name_for_count');

                    species_name2.value = `${body[i].name}`;
                    document.getElementById("species_count_form").click();

                    // Outputs species to species per animal hidden HTML form
                    const species_name3 = document.getElementById('species_for_list');

                    species_name3.value = `${body[i].name}`;
                    document.getElementById("species_list_form").click();       

                    let spinner = document.getElementsByClassName("spinner");

                    for (i = 0; i < spinner.length; i++) {
                        spinner[i].innerHTML = "";   
                    }   
                }
            })
        }
    )
}

// Species list loading spinner on setTimout
function speciesSpinnerAdd() {
    document.getElementById('species_entries_div').removeAttribute('hidden');
    document.getElementById('list_of_animals_div').removeAttribute('hidden');
    document.getElementById('speciesSpinner').setAttribute('hidden', 'hidden');
}

function speciesSpinnerRemove() {
    window.setTimeout(function() {speciesSpinnerAdd()}, 2000)
    resetSpeciesSpinner();
}

function resetSpeciesSpinner() {
    document.getElementById('speciesSpinner').removeAttribute('hidden');
    document.getElementById('list_of_animals_div').setAttribute('hidden', 'hidden');
    document.getElementById('species_entries_div').setAttribute('hidden', 'hidden');
}

/* Container 7
Map of species page */

// View one animal
function viewOneAnimal (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    fetch('ws.php?page=view-one-animal', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                // Animal name individual animal page
                document.getElementById('animal_nickname_div').innerHTML = body[i].nickname;

                // Animal name on add log page
                document.getElementById('animal_nickname_div2').innerHTML = body[i].nickname;


                    // Creates list
                    const listContainer = document.getElementById("logs");
                    const newList = document.createElement("ul");
                    const newListItem = document.createElement("li");
                    let dateDiff = humanized_time_span(body[i].date);

                    let result = `<div class="pb-3">
                                <div class="mb-2">
                                    <span class="text-gray-600 font-bold">${body[i].title}</span>
                                    <span class="float-right inset-y-0 right-0 text-gray-400">${dateDiff}</span>
                                </div>
                                <div class="text-gray-800 border-b border-green-200 pb-3">${body[i].text}</div>
                            </div>`;
                                        
                    newListItem.innerHTML = result;
                    newList.appendChild(newListItem);
                    listContainer.appendChild(newList);   
                }
            })
        }
    );
}

// View species count
function speciesCount (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    fetch('ws.php?page=species-count', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.text().then(function(body) {

                // Remove all but numbers from SQL COUNT result
                let entry_count = body.replace(/\D/g, "");
                document.getElementById('species_entries_div').innerHTML = `Entries: ${entry_count}`;
            })
        }
    );
}

// View all animals per species
function viewAnimalsPerSpecies (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    fetch('ws.php?page=animals-per-species', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    // Creates list
                    const listContainer = document.getElementById("list_of_animals_div");
                    const newList = document.createElement("ul");
                    const newListItem = document.createElement("li");

                    // Puts json returned in list
                    const button = document.getElementById('button');
                    const map_button =  document.getElementById('map_button');
                    let dateDiff = humanized_time_span(body[i].first_seen_date);

                    result = `<div class="grid grid-cols-3 items-center bg-white border-t border-gray-300 py-2">
                                <div class="pl-2 font-bold col-span-2" onclick="getAnimalID(this.id) & button.click() & map_button.click() & showPage('6'); return false & fireLoader()" id="${body[i].animal_id}">
                                <img class="w-10 h-10 my-1 rounded-full inline mr-4" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                                ${body[i].nickname}
                                </div>
                                <div class="justify-self-center">${dateDiff}</div>
                            </div>`;   
                            
                    newListItem.innerHTML = result;
                    newList.appendChild(newListItem);
                    listContainer.appendChild(newList);

                    // Info for each animal on individual animal page
                    document.getElementById('first_sighting').innerHTML = dateDiff;
                    document.getElementById('gender').innerHTML = body[i].gender;
                    document.getElementById('maturity').innerHTML = body[i].maturity;
                    document.getElementById('notes').innerHTML = body[i].notes; 
                }
            })
        }
    );
}

// View all animals per species
function viewAnimalsPerSpecies (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    fetch('ws.php?page=animals-per-species', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    // Creates list
                    const listContainer = document.getElementById("list_of_animals_div");
                    const newList = document.createElement("ul");
                    const newListItem = document.createElement("li");

                    // Puts json returned in list
                    const button = document.getElementById('button');
                    const map_button =  document.getElementById('map_button');
                    let dateDiff = humanized_time_span(body[i].first_seen_date);

                    result = `<div class="grid grid-cols-3 items-center bg-white border-t border-gray-300 py-2">
                                <div class="pl-2 font-bold col-span-2" onclick="getAnimalID(this.id) & button.click() & map_button.click() & animalSpinnerRemove() & showPage('6'); return false" id="${body[i].animal_id}">
                                <img class="h-10 w-10 rounded-full inline mr-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="">
                                ${body[i].nickname}
                                </div>
                                <div class="justify-self-center">${dateDiff}</div>
                            </div>`;   
                                    
                    newListItem.innerHTML = result;
                    newList.appendChild(newListItem);
                    listContainer.appendChild(newList);

                    // Info for each animal on individual animal page
                    document.getElementById('first_sighting').innerHTML = dateDiff;
                    document.getElementById('gender').innerHTML = body[i].gender;
                    document.getElementById('maturity').innerHTML = body[i].maturity;
                    document.getElementById('notes').innerHTML = body[i].notes;
                }
            })
        }
    );
}

/* Container 8
Edit animal page */

// View animals for edit
function AnimalTypeDropdownforEdit (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);

    fetch('ws.php?page=view-species', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    // Creates dropdown of animals
                    const listContainer = document.getElementById("species_dropdown2");
                    const newListItem = document.createElement("option");
                    let result_test = "";
                    result_test += `
                    <option value='${body[i].species_id}'>
                    ${body[i].name}
                    </option>
                    `;

                    newListItem.innerHTML = result_test;
                    listContainer.appendChild(newListItem);
                }
            })
        }
    )
}

// Clear all
function clearAll() {
    document.getElementById("logs").innerHTML = '';
    document.getElementById("my_animals_list").innerHTML = '';
    document.getElementById("list_of_animals_div").innerHTML = '';
    document.getElementById("species_id_1").innerHTML = `<option value="" disabled selected>Species</option>`; // FOr add animal
    document.getElementById("species_dropdown2").innerHTML = `<option value="" disabled selected>Species</option>`; // For edit animal
}

// Get species ID
function getSpeciesID_EditAnimal (evt) {
    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);

    fetch('ws.php?page=get-species-id', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    let id = body[i].species_id;
                    let input_2 = document.getElementById("species_id_input2");
                    input_2.value = id;
                }
            })
        }
    )
}

// Populate species dropdown for animal edit
function populateSpeciesDropdown_AnimalEdit() {
    let selection = selectionSpecies2.options[selectionSpecies2.selectedIndex].value;
    let input = document.getElementById("animal_type_id_3");
    let button = document.getElementById("animal_type_button_2");

    input.value = selection;
    button.click();
}

// Get species ID for dropdown
function getSpeciesIDforDropdown_Edit () {
    let selection = species_dropdown2.options[species_dropdown2.selectedIndex].value;
    let input = document.getElementById("species_id_for_db2");

    input.value = selection;
}

// Click button for hidden form
function clickButton2() {
    let button = document.getElementById("species_id_button");

    button.click();
}

// Edit animal
function editAnimal(evt) {

    evt.preventDefault();

    const name = document.forms['edit-animal']['name'].value;
    const gender = document.forms['edit-animal']['gender'].value;
    const maturity = document.forms['edit-animal']['maturity'].value;
    const notes = document.forms['edit-animal']['notes'].value;
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    formData.append(evt.target[1].name, evt.target[1].value);
    formData.append(evt.target[2].name, evt.target[2].value);
    formData.append(evt.target[3].name, evt.target[3].value);
    formData.append(evt.target[4].name, evt.target[4].value);
    formData.append(evt.target[5].name, evt.target[5].value);

    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            if (headers.status === 200) {
                showAlert('success', 'Changes saved successfully');
            } else if (validateText(name) == false) {
                showAlert('error', 'Please enter a name');
                return false;
            } else if (validateText(gender) == false) {
                showAlert('error', 'Please enter a gender');
                return false;
            } else if (validateText(maturity) == false) {
                showAlert('error', 'Please enter animal maturity');
                return false;
            } else if (validateText(notes) == false) {
                showAlert('error', 'Please enter a note');
                return false;
            } else {
            showAlert('error', 'Error');
            }
        }
    )
}

// Delete animal
function deleteAnimal(evt) {

    evt.preventDefault();
    const formData = new FormData();

    formData.append(evt.target[0].name, evt.target[0].value);
    
    fetch(evt.target.action, 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
}

//
//
// Map
//
//

// Get long and lat for map marker, then display map
function getLocation (evt) {
    evt.preventDefault();
    const formData = new FormData();
    formData.append(evt.target[0].name, evt.target[0].value);
    fetch('ws.php?page=get-coordinates', 
        {
            method: 'POST',
            body: formData,
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            headers.json().then(function(body) {
                for (let i = 0; i < body.length; i++) {

                    let long = body[i].first_seen_long;
                    let lat = body[i].first_seen_lat;

                    displayMap();
                    initMap(long, lat);
                }
            })
        }
    )
}

// Display map (must be included, otherwise will not appear)
function displayMap() {
    document.getElementById("map").style.display = "block";
}

// Put markers on map from fetch
function initMap (long, lat) {

    let data = {lat: parseFloat(lat), lng: parseFloat(long)};

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: data,
    });

    const marker = new google.maps.Marker({
        position: data,
        map: map,
    });
}

//
//
// Date calculator
//
//

// Date calculator, from https://github.com/QuantumCatgirl/js_humanized_time_span
function humanized_time_span(date, ref_date, date_formats, time_units) {
    //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    date_formats = date_formats || {
        past: [
            { ceiling: 60, text: "$seconds seconds ago" },
            { ceiling: 3600, text: "$minutes minutes ago" },
            { ceiling: 86400, text: "$hours hours ago" },
            { ceiling: 2629744, text: "$days days ago" },
            { ceiling: 31556926, text: "$months months ago" },
            { ceiling: null, text: "$years years ago" }      
        ],

        future: [
            { ceiling: 60, text: "in $seconds seconds" },
            { ceiling: 3600, text: "in $minutes minutes" },
            { ceiling: 86400, text: "in $hours hours" },
            { ceiling: 2629744, text: "in $days days" },
            { ceiling: 31556926, text: "in $months months" },
            { ceiling: null, text: "in $years years" }
        ]
    };

    //Time units must be be ordered largest -> smallest
    time_units = time_units || [
        [31556926, 'years'],
        [2629744, 'months'],
        [86400, 'days'],
        [3600, 'hours'],
        [60, 'minutes'],
        [1, 'seconds']
    ];
    
    date = new Date(date);
    ref_date = ref_date ? new Date(ref_date) : new Date();
    var seconds_difference = (ref_date - date) / 1000;
    
    var tense = 'past';
    if (seconds_difference < 0) {
        tense = 'future';
        seconds_difference = 0-seconds_difference;
    }
    
    function get_format() {
        for (var i=0; i<date_formats[tense].length; i++) {
            if (date_formats[tense][i].ceiling == null || seconds_difference <= date_formats[tense][i].ceiling) {
                return date_formats[tense][i];
            }
        }
        return null;
    }
    
    function get_time_breakdown() {
        var seconds = seconds_difference;
        var breakdown = {};
        for(var i=0; i<time_units.length; i++) {
            var occurences_of_unit = Math.floor(seconds / time_units[i][0]);
            seconds = seconds - (time_units[i][0] * occurences_of_unit);
            breakdown[time_units[i][1]] = occurences_of_unit;
        }
        return breakdown;
    }
  
    function render_date(date_format) {
        var breakdown = get_time_breakdown();
        var time_ago_text = date_format.text.replace(/\$(\w+)/g, function() {
            return breakdown[arguments[1]];
        });
        return depluralize_time_ago_text(time_ago_text, breakdown);
    }
    
    function depluralize_time_ago_text(time_ago_text, breakdown) {
        for(var i in breakdown) {
            if (breakdown[i] == 1) {
            var regexp = new RegExp("\\b"+i+"\\b");
            time_ago_text = time_ago_text.replace(regexp, function() {
                return arguments[0].replace(/s\b/g, '');
            });
            }
        }
        return time_ago_text;
    }
            
    return render_date(get_format());
}

// Check if admin
function checkIfAdmin (evt) {
    evt.preventDefault();

    fetch("ws.php?page=check-if-admin", 
        {
            credentials: 'include'
        }
    ) 
    .then (
        function(headers) {
            if (headers.status === 200) {
                localStorage.setItem("role", "admin");
                showAdminPanel();
            }
        }
    );
}

// Show admin panel to admin role
function showAdminPanel() {
    document.getElementById('root').removeAttribute('hidden');
}