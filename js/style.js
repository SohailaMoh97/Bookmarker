var inputName = document.getElementById('siteName');
var inputUrl = document.getElementById("siteUrl");
var tableBody = document.getElementById("tablebody");
var wrongName = document.getElementById("wrongName");
var wrongURL = document.getElementById("wrongURL");
var all = [];

if(localStorage.getItem('all')) {
    getData();
    display(all);
} 

function validateName() {
    var nameRegex = /^[A-Z][a-z0-9_]{3,9}/;
    if (nameRegex.test(inputName.value)) {
        inputName.classList.remove("is-invalid");
        inputName.classList.add('is-valid');
        wrongName.classList.add("d-none");
    } else {
        inputName.classList.remove("is-valid");
        inputName.classList.add('is-invalid');
        wrongName.classList.remove("d-none");
    }
}

function validateURL() {
    var urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    if (urlRegex.test(inputUrl.value)) {
        inputUrl.classList.remove("is-invalid");
        inputUrl.classList.add('is-valid');
        wrongURL.classList.add("d-none");
    } else {
        inputUrl.classList.remove("is-valid");
        inputUrl.classList.add('is-invalid');
        wrongURL.classList.remove("d-none");
    }
}

function addLink() {
  var data = {
    siteName: inputName.value,
    siteUrl: inputUrl.value,   
  };
  
  all.push(data);
  local()
  clearInput();
  inputName.classList.remove("is-valid")
  inputUrl.classList.remove("is-valid")
  console.log(all);
  display(all)
} 

function clearInput() {
    inputName.value = "";
    inputUrl.value = "";
}

function local() {
    localStorage.setItem('all', JSON.stringify(all));
}

function getData() {
    all = JSON.parse(localStorage.getItem('all')) || [];
}

function display(array) {
    var arr = "";
    for (var i = 0; i < array.length; i++) {
        arr += `
        <tr>
            <td>${i + 1}</td>
            <td>${array[i].siteName}</td>
            <td>
                <a class="btn btn-visit" href="${array[i].siteUrl}" target="_blank">
                    <i class="fa-solid fa-eye pe-2"></i> Visit
                </a>
            </td>
            <td>
                <button class="btn btn-delete" type="button" onclick="deletebook(${i})">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </button>
            </td>
        </tr>
        `;
    }
    tableBody.innerHTML = arr; 
}

function deletebook(index) {
    all.splice(index, 1); 
    local(); 
    display(all); 
}
