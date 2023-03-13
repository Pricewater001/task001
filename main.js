const name = prompt("Hi,Please enter your name");
alert(`Welcome to my website ${name}`);


var bool = false;

while (!bool) {
     color = prompt(`${name} what the Color you preferred to use for Background Color 
     \n
     1-red.
     2-blue.
     3-green.
     `) || "defalut color";
    bool = confirm(`are you sure you want ${color}`);
}


const navbar = document.getElementById("navbar");
const footer = document.getElementById("footer-id");
console.log(navbar,footer)

switch (color) {
    case "red":{
        navbar.style.backgroundColor = "red";
        footer.style.backgroundColor = "red";
    }
        break;
    case "blue":
        navbar.style.backgroundColor = "blue";
        footer.style.backgroundColor = "blue";
        break;
    case "green":
        navbar.style.backgroundColor = "green";
        footer.style.backgroundColor = "green";
        break;
    default:
        navbar.style.backgroundColor = "#cd5204";
        footer.style.backgroundColor = "#cd5204";
        break;
}

let form = document.getElementById("feedback-form");
let ul = document.getElementsByClassName("feedback-list-ul")[0]; 
const listItems = ul.getElementsByTagName('li');


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let bool = true;
    let value = e.target[0].value.trim();
    if(!value){
        alert("please enter valid feed back");
        return;
    }
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].textContent.toLowerCase() === value.toLowerCase()){
           bool= false;
           break;
        }
    }
    if(!bool){
        alert("please enter a new  feed back");
        return;
    }
    let li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);

  });