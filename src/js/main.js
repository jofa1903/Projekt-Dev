'use strict'

/* Variables */

let coursesEl = document.getElementById("courses");
let coursesElNoButton = document.getElementById("coursesNoButton");
let addCourseBtn = document.getElementById("addCourse");
let codeInput = document.getElementById("code");
let nameInput = document.getElementById("name");
let progressionInput = document.getElementById("progression");
let coursesyllabusInput = document.getElementById("coursesyllabus");


/* Eventlisteners */

window.addEventListener('load', getCourses);
window.addEventListener('load', getCoursesNoButton);
if(addCourseBtn){addCourseBtn.addEventListener('click', addCourse);}

/* Functions */

/* Get all courses */
function getCourses() {
    if(coursesEl){coursesEl.innerHTML = ''};
    fetch("https://yofal.se/miun/webb3projekt/api/read.php")
        .then(response => response.json()
            .then(data => {
                data.forEach(courses => {
                    if(coursesEl){coursesEl.innerHTML +=
                        `<div class="course"> 
<p> 
<b> Kurskod:</b> ${courses.code} <br/>
<b> Kursnamn:</b> ${courses.name}<br/>
<b> Progression:</b> ${courses.progression}<br/>
<b> Kursplan:</b> <a class="syllabus_link" href="${courses.coursesyllabus}" target="_blank">Länk här</a>
</p>
<button id="${courses.id}" onClick="getOneToUpdate(${courses.id})">Uppdatera</button>
<button id="${courses.id}" onClick="deleteCourse(${courses.id})">Radera</button> 
</div>`}

                })
            }))
}

/* Get all courses */
function getCoursesNoButton() {
    coursesElNoButton.innerHTML = '';
    fetch("https://yofal.se/miun/webb3projekt/api/read.php")
        .then(response => response.json()
            .then(data => {
                data.forEach(courses => {
                    coursesElNoButton.innerHTML +=
                        `<div class="courseNoButton"> 
<p> 
<b> Kurskod:</b> ${courses.code} <br/>
<b> Kursnamn:</b> ${courses.name}<br/>
<b> Progression:</b> ${courses.progression}<br/>
<b> Kursplan:</b> <a class="syllabus_link" href="${courses.coursesyllabus}" target="_blank">Länk här</a>
</p> <br/><br/>
</div>`

                })
            }))
}



/* Add course */
function addCourse() {
    let code = codeInput.value;
    let name = nameInput.value;
    let progression = progressionInput.value;
    let coursesyllabus = coursesyllabusInput.value;

    let courses = { 'code': code, 'name': name, 'progression': progression, 'coursesyllabus': coursesyllabus };

    fetch("https://yofal.se/miun/webb3projekt/api/create.php", {
            method: "POST",
            body: JSON.stringify(courses),
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
            document.getElementById('code').value = '';
            document.getElementById('name').value = '';
            document.getElementById('progression').value = '';
            document.getElementById('coursesyllabus').value = '';
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}

/* Delete courses */
function deleteCourse(id) {
    fetch("https://yofal.se/miun/webb3projekt/api/delete.php?id=" + id, {
            method: "DELETE",
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error: ', error);
        })
}



/* Get one to update  */
function getOneToUpdate(id) {

    fetch('https://yofal.se/miun/webb3projekt/api/read_one.php?id=' + id)
        .then(response => response.json())
        .then(updateDiv.style.display = 'block')
        .then(courses => {
            updateDiv.innerHTML +=
                `<form method="get">
            <label for="code">Kurskod</label>
            <input type="text" name="code" id="newcode" value="${courses.code}"> <br>
            <label for="name">Kursnamn</label>
            <input type="text" name="name" id="newname" value="${courses.name}"> <br>
            <label for="prog">Progression</label>
            <input type="text" name="prog" id="newprog" value="${courses.progression}"> <br>
            <label for="plan">Kursplan</label>
            <input type="text" name="plan" id="newplan" value="${courses.coursesyllabus}"> <br>
            <input type="button" id="updateButton" onClick="updateCourse(${courses.id})" value="Uppdatera"> <br>      
            <input type="button" id="closeButton" onClick="closeDiv()" value="Avbryt">
            </form>`
        })
}


function updateCourse(id) {

    let newcode = document.getElementById('newcode');
    let newname = document.getElementById('newname');
    let newprog = document.getElementById('newprog');
    let newplan = document.getElementById('newplan');

    newcode = newcode.value;
    newname = newname.value;
    newprog = newprog.value;
    newplan = newplan.value;

    let courses = { 'id': id, 'code': newcode, 'name': newname, 'progression': newprog, 'coursesyllabus': newplan };

    fetch('https://yofal.se/miun/webb3projekt/api/update.php?id=' + id, {
            method: 'PUT',
            body: JSON.stringify(courses)
        })
        .then(response => response.json())
        .then(data => {
            getCourses();
        })
        .catch(error => {
            console.log('Error: ', error);
        })

}