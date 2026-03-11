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

//load open issues

async function loadOpenIssues(){ 
    
setActiveButton("openBtn")
showSpinner()

const res = await fetch(url)
const data = await res.json()

const openIssues = data.data.filter(
issue => issue.status === "open"
)
displayIssues(openIssues)
}

//load closed issues

async function loadClosedIssues(){ 
setActiveButton("closedBtn")
showSpinner()

const res = await fetch(url)
const data = await res.json()

const closedIssues = data.data.filter(
issue => issue.status === "closed"
)
displayIssues(closedIssues)
}

// DISPLAY ISSUES

function displayIssues(issues){
container.innerHTML=""
document.getElementById("issueCount").innerText = issues.length

issues.forEach(issue=>{
const card = document.createElement("div")
card.className =
`card  shadow hover:shadow-xl transition border-t-4
${issue.status === "open" ? "border-green-500" : "border-purple-500"}`

card.innerHTML = `
    <div class="card-body">
        <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
            <div class="w-6 h-6 flex items-center justify-center rounded-full
            ${issue.status === "open" ? "bg-green-100 text-green-600" 
                : "bg-purple-100 text-purple-600"}">
            <i class="fa-regular fa-circle"></i>
            </div>
        </div>
            <span class="px-3 py-1 text-xs font-semibold rounded-full
            ${issue.priority.toUpperCase() === "HIGH"
            ? "bg-red-100 text-red-500"
            : issue.priority.toUpperCase() === "MEDIUM"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-gray-100 text-gray-500"}">
            ${issue.priority.toUpperCase()}
            </span>
        </div>
            <h2 class="text-lg font-semibold mt-3">${issue.title}</h2>
            <p class="text-gray-500 text-sm mt-1">${issue.description}</p>

        <div class="flex gap-2 mt-3">
        ${showLabels(issue.labels)}
        </div>

        <div class="border-t mt-4 pt-3 text-xs text-gray-500">
            <p>#${issue.id} by ${issue.author}</p>
            <p class="mt-1">${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
    </div>`

card.onclick = () => openIssueModal(issue)
container.appendChild(card)

})

}

// handle labels
function showLabels(labelsArray) {

return labelsArray.map(label => `
<span class="px-4 py-2 text-[10px] font-semibold rounded-full ${
label.toLowerCase() === "bug" ? "bg-red-100 text-red-500" 
: label.toLowerCase() === "help wanted" ? "bg-yellow-100 text-yellow-600" 
: "bg-green-100 text-green-600"} flex items-center gap-1">

<i class="fa-solid ${
label.toLowerCase() === "bug" ? "fa-bug" 
: label.toLowerCase() === "help wanted" ? "fa-life-ring" 
: "fa-check"}"></i>

${label.toUpperCase()}

</span>
`).join("")

}

