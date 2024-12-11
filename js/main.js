/* ALERT MANAGEMENT */
let lastTimeoutID;
if(sessionStorage.getItem("userId") === undefined){
    top.location.href = "#/login"
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if(urlParams.has('logout')){
    sessionStorage.clear()
    top.location.href = "https://insiemeventi.it/#/login"
}

function alert(msg, type, errorSelector=false){
    //eliminiamo alert già aperti
    let oldAlerts = document.querySelectorAll('.alert')
    oldAlerts.forEach(el=>{
        let id = el.dataset.id
        removeAlert(id, false, lastTimeoutID)
    })
    let alert_id = Date.now()
    let html = `
    <div class="alert" data-id="${alert_id}">
        <div class="${type}-icon"></div>
        <p class="alert-msg">${msg}</p>
        <div class="close-button" onclick="hideAlert('${alert_id}', '${errorSelector || ''}')"></div>
        <div class="alert-progress"></div>
    </div>
    `
    if (errorSelector) {
        let els = document.querySelectorAll(errorSelector)
        els.forEach(el=> {
            el.classList.add('error')
            el.parentNode.addEventListener("click", ()=> {
                if(el.classList.contains('error')) el.classList.remove('error')
            })
        })
    }
    document.querySelector("body").insertAdjacentHTML("afterbegin", html)
    lastTimeoutID = setTimeout(()=>removeAlert(alert_id, errorSelector, lastTimeoutID), 5000)
}

function hideAlert(id, errorSelector=false){
    if (errorSelector) {
        let els = document.querySelectorAll(errorSelector)
        els.forEach(el=>el.classList.remove('error'))
    }
    document.querySelector(".alert[data-id='"+id+"']").style.display = 'none'
}

function removeAlert(id, errorSelector=false, timeoutId){
    clearTimeout(timeoutId)
    if (errorSelector) {
        let els = document.querySelectorAll(errorSelector)
        els.forEach(el=>el.classList.remove('error'))
    }
    document.querySelector(".alert[data-id='"+id+"']").remove()
}
/* -- FINE ALERT -- */
function alertGX(msg, title="", cancelBtn=false, callback=false, cancelCallback=false, okText=false, cancelText=false, callBackTimer=false) {
    closeAlertGX()
    let html = `
        <div class="alertGX">
            <div class="alert-dialog-mask"></div>
            <div class="alert-dialog">
                <div class="alert-dialog-container">
                    ${title ? '<div class="alert-dialog-title">'+title+'</div>' : ''}
                    <div class="alert-dialog-content">${msg}</div>
                    <div class="alert-dialog-footer">
                        ${cancelBtn ? '<button id="cancelAlert" class="alert-dialog-button">'+(cancelText ? cancelText : "BACK")+'</button>' : ""}
                        <button id="confirmAlert" class="alert-dialog-button alert-dialog-button--primal">${okText ? okText : "OK"}</button>
                    </div>
                </div>
            </div>
        </div>
    `
    document.querySelector("#app").insertAdjacentHTML("beforeend", html)
    if(callBackTimer){
        document.getElementById("confirmAlert").style.setProperty("--duration", (callBackTimer / 1000).toFixed(0)+"s")
        document.getElementById("confirmAlert").classList.add("timer")
        let timeoutId = setTimeout(()=>{
            closeAlertGX()
            if(typeof callback == "function") {
                callback()
            }
        }, callBackTimer)
        localStorage.setItem("timeoutId", timeoutId);
    }
    if(cancelBtn){
        document.getElementById("cancelAlert").addEventListener("click", function(){
            closeAlertGX()
            if(typeof cancelCallback == "function") {
                cancelCallback()
            }
        })
    }
    document.getElementById("confirmAlert").addEventListener("click", function(){
        closeAlertGX()
        if(typeof callback == "function") {
            callback()
        }
    })
}
function closeAlertGX(){
    clearTimeout(localStorage.getItem("timeoutId"))
    document.querySelectorAll(".alertGX").forEach( alert => {
        alert.remove()
    })
}