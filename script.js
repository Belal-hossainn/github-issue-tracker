const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container = document.getElementById("issuesContainer")


// LOGIN

function login(){
const username = document.getElementById("username").value
const password = document.getElementById("password").value

if(username === "admin" && password === "admin123"){
document.getElementById("loginPage").classList.add("hidden")
document.getElementById("dashboard").classList.remove("hidden")

loadIssues()

}else{
alert("Wrong credentials")
}

}

// LOADING SPINNER

function showSpinner(){

container.innerHTML = `
<div class="col-span-4 flex justify-center">
<span class="loading loading-spinner loading-lg"></span>
</div>
`
}

//active button
function setActiveButton(activeId){

    console.log(activeId)
const buttons = document.querySelectorAll(".tab-btn")

buttons.forEach(btn=>{
btn.classList.remove("btn-primary")
})
document.getElementById(activeId).classList.add("btn-primary")

}

// LOAD ALL ISSUES

async function loadIssues(){

setActiveButton("allBtn")
showSpinner()

const res = await fetch(url)
const data = await res.json()

displayIssues(data.data)

}
