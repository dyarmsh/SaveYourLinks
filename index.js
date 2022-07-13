let myLinks = []

// DOM manipulation
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Immediately after each refresh, data previously entered is retained
const linksFromLocalStorage = JSON.parse(localStorage.getItem("myLinks"))

// If data was previously entered, render it again after refresh
if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage // assigning previously added links to array
    render(myLinks) // display these links
}

// Saving tab URL functionality
tabBtn.addEventListener("click", function() {    
    // Using chrome.tabs API to interact with the browser's tab system
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url) // appending tab URL to the array
        localStorage.setItem("myLinks", JSON.stringify(myLinks)) // adding it to the localStorage database
        render(myLinks) // rendering link to the user
    })
})

// Delete button functionality after 'double click'
// Clearing DOM, localStorage and myLinks array
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLinks = []
    render(myLinks)
})

// Input button functionality
inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value) // appending newly typed-in URL to the array
    inputEl.value = "" // immediately erase the typed-in value to accomodate for new ones later
    localStorage.setItem("myLinks", JSON.stringify(myLinks)) // storing in localStorage
    render(myLinks) // rendering to user
})

// Rendering the list of links saved, to the user
function render(links) {
    let listItems = ""
    for (let i = 0; i < links.length; i++) {
        // using 'template string' method
        listItems += `
            <li>
                <a target='_blank' href='${links[i]}'>
                    ${links[i]}
                </a>
            </li>
        `
    }
    // to render listItems in HTML format
    ulEl.innerHTML = listItems
}

