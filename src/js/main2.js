'use strict'

/* Variables for work */

let workEl = document.getElementById("work");
let workElNoButton = document.getElementById("workNoButton");
let addWorkBtn = document.getElementById("addWork");
let companyInput = document.getElementById("company");
let titleInput = document.getElementById("title");
let lengthInput = document.getElementById("length");



/* Eventlisteners */

window.addEventListener('load', getWork);
window.addEventListener('load', getWorkNoButton);
if(addWorkBtn){addWorkBtn.addEventListener('click', addWork)};

/* Functions */

/* Get all work 2 */

function getWorkNoButton() {
    if(workElNoButton){workElNoButton.innerHTML = ''};
    fetch("https://yofal.se/miun/webb3projekt/api_work/read.php")
        .then(response => response.json()
            .then(work_data => {
                work_data.forEach(work => {
                    if(workElNoButton){workElNoButton.innerHTML +=
                        `<div class="workNoButton"> 
<p> 
<b> Företag:</b> ${work.company} <br/>
<b> Titel:</b> ${work.title}<br/>
<b> Varaktighet:</b> ${work.length}<br/>
</p> <br/><br/>
</div>`}

                })
            }))
}



/* Get all work */
function getWork() {
    if(workEl){workEl.innerHTML = ''};
    fetch("https://yofal.se/miun/webb3projekt/api_work/read.php")
        .then(response => response.json()
            .then(work_data => {
                work_data.forEach(work => {
                    if(workEl){workEl.innerHTML +=
                        `<div class="work"> 
<p> 
<b> Företag:</b> ${work.company} <br/>
<b> Titel:</b> ${work.title}<br/>
<b> Varaktighet:</b> ${work.length}<br/>
</p>

<button id="${work.work_id }" onClick="getOneWorkToUpdate(${work.work_id })">Uppdatera</button>
<button id="${work.work_id }" onClick="deleteWork(${work.work_id} )">Radera</button>
</div>`}

                })
            }))
}




/* Add work */
function addWork() {
    let company = companyInput.value;
    let title = titleInput.value;
    let length = lengthInput.value;


    let work = { 'company': company, 'title': title, 'length': length };

    fetch("https://yofal.se/miun/webb3projekt/api_work/create.php", {
            method: "POST",
            body: JSON.stringify(work),
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

/* Delete work */
function deleteWork(work_id) {
    fetch("https://yofal.se/miun/webb3projekt/api_work/delete.php?work_id=" + work_id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}



/* Get one to update  */
function getOneWorkToUpdate(work_id) {

    fetch('https://yofal.se/miun/webb3projekt/api_work/read_one.php?work_id=' + work_id)
        .then(response => response.json())
        .then(updateDivWork.style.display = 'block')
        .then(work => {
            updateDivWork.innerHTML +=
                `<form method="get">
            <label for="company">Företag</label>
            <input type="text" name="company" id="newcompany" value="${work.company}"> <br>
            <label for="title">Titel</label>
            <input type="text" name="title" id="newtitle" value="${work.title}"> <br>
            <label for="length">Varaktighet</label>
            <input type="text" name="length" id="newlength" value="${work.length}"> <br>
            <input type="button" id="updateWorkButton" onClick="updateWork(${work.work_id })" value="Uppdatera"> <br>      
            <input type="button" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>`
        })
}


function updateWork(work_id) {

    let newcompany = document.getElementById('newcompany');
    let newtitle = document.getElementById('newtitle');
    let newlength = document.getElementById('newlength');


    newcompany = newcompany.value;
    newtitle = newtitle.value;
    newlength = newlength.value;


    let work = { 'work_id ': work_id, 'company': newcompany, 'title': newtitle, 'length': newlength };

    fetch('https://yofal.se/miun/webb3projekt/api_work/update.php?work_id=' + work_id, {
            method: 'PUT',
            body: JSON.stringify(work)
        })
        .then(response => response.json())
        .then(work_data => {
            getWork();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}