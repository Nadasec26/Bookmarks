var siteName = document.getElementById("siteName");
var webURL = document.getElementById("siteURL");
var rowData = document.getElementById("rowData");

var webList = [];

if(localStorage.getItem("webArray") != null){
    webList = JSON.parse(localStorage.getItem("webArray"));
    displayWebsite(webList);
}

function addWebsite(){
    if(nameValidation() && urlValidation()){
        var webName = {
            name : siteName.value,
            Url : webURL.value,
        }
        if (webList.some(item => item.name.toLowerCase() === webName.name.toLowerCase())) {
            alert("This name is already in use!");
            return;
        }
        webList.push(webName);
        console.log(webList);
        localStorage.setItem("webArray",JSON.stringify(webList));
        clearInputs();
        displayWebsite();
    }
}

function clearInputs(){
    siteName.value = ""
    webURL.value = ""
}

function displayWebsite(){
    var box = '';
    for(var i =0 ; i< webList.length; i++){
        box += `
    <tr>
                    <td>${i+1}</td>
                    <td>${webList[i].name}</td>
                    <td><a href="${webList[i].Url}" target="_blank"><button class="btn btn-success px-3 py-0">Visit</button></a></td>
                    <td><button onclick= 'deleteWebsite(${i})' class="btn btn-danger px-3 py-0">Delete</button></td>
                  </tr>
    `
    } 
    rowData.innerHTML = box;
}
function deleteWebsite(webIndex){
    console.log('del');
    webList.splice(webIndex,1);
    displayWebsite();
    localStorage.setItem("webArray",JSON.stringify(webList));
}


function nameValidation(){
    var regex = /^[A-Z][a-zA-Z0-9 _]{2,15}$/
    var text = siteName.value;
    var msg = document.getElementById('nameMsg');
    if(regex.test(text)){
        siteName.classList.add('is-valid');
        siteName.classList.remove('is-invalid');
        msg.classList.add("d-none");
        return true
    }else{
        siteName.classList.add('is-invalid');
        siteName.classList.remove('is-valid');
        msg.classList.remove("d-none");
        return false
    }
}
function urlValidation() {
    var regex = /^(https?:\/\/)[\w.-]+\.[a-z]{2,}.*$/i;
    var text = webURL.value.trim();
    var msg = document.getElementById('urlMsg');

    if (regex.test(text)) {
        webURL.classList.add('is-valid');
        webURL.classList.remove('is-invalid');
        msg.classList.add("d-none");
        return true;
    } else {
        webURL.classList.add('is-invalid');
        webURL.classList.remove('is-valid');
        msg.classList.remove("d-none");
        return false;
    }
}