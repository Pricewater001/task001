// const name = prompt("Hi,Please enter your name");
// alert(`Welcome to my website ${name}`);

// var bool = false;

// while (!bool) {
//      color = prompt(`${name} what the Color you preferred to use for Background Color
//      \n
//      1-red.
//      2-blue.
//      3-green.
//      `) || "defalut color";
//     bool = confirm(`are you sure you want ${color}`);
// }

// const navbar = document.getElementById("navbar");
// const footer = document.getElementById("footer-id");
// console.log(navbar,footer)

// switch (color) {
//     case "red":{
//         navbar.style.backgroundColor = "red";
//         footer.style.backgroundColor = "red";
//     }
//         break;
//     case "blue":
//         navbar.style.backgroundColor = "blue";
//         footer.style.backgroundColor = "blue";
//         break;
//     case "green":
//         navbar.style.backgroundColor = "green";
//         footer.style.backgroundColor = "green";
//         break;
//     default:
//         navbar.style.backgroundColor = "#cd5204";
//         footer.style.backgroundColor = "#cd5204";
//         break;
// }

function FeedBacks(feedback) {
  this.feedBack = feedback;
}

let form = document.getElementById("feedback-form");
let ul = document.getElementsByClassName("feedback-list-ul")[0];
const listItems = ul.getElementsByTagName("li");
const feedBack = new FeedBacks();

function checkDuplicate(value) {
  let bool = true;
  const localStorageList = JSON.parse(localStorage.getItem("list"));
  if(localStorageList){
      for (let i = 0; i < localStorageList.length; i++) {
        if (localStorageList[i].feedback == value) {
          bool = false;
          break;
        }
      }
  }
  return bool;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

FeedBacks.prototype.SaveFeedBack = function () {
  this.list = [];
  const localStorageList = JSON.parse(localStorage.getItem("list"));
  if (localStorageList) {
    this.list.push(...localStorageList, {
      id: Date.now(),
      feedback: this.feedBack,
    });
  }else{
    this.list.push({
        id: Date.now(),
        feedback: this.feedBack,
      });
  }
  localStorage.setItem("list", JSON.stringify(this.list));
};

FeedBacks.prototype.DeleteFeedBack = function (id) {
  let localStorageList = JSON.parse(localStorage.getItem("list")).filter(
    (element) => element.id !== id
  );
  localStorage.setItem("list", JSON.stringify(localStorageList));
  this.renderFeedBack();
  console.log(localStorageList);
};

FeedBacks.prototype.renderFeedBack = function () {
  const localStorageList = JSON.parse(localStorage.getItem("list"));
  removeAllChildNodes(ul);
  if (localStorageList) {
    localStorageList.forEach((element) => {
      let li = document.createElement("li");
      let button = document.createElement("button");
      button.textContent = "Delete";
      button.addEventListener("click", () => {
        this.DeleteFeedBack(element.id);
      });
      li.textContent = element.feedback;
      li.appendChild(button);
      ul.appendChild(li);
    });
  }
};

feedBack.renderFeedBack();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = e.target[0].value.trim();
  let isDuplicated = checkDuplicate("" + e.target[0].value.trim());
  if (!value) {
    alert("please enter valid feed back");
    return;
  }
  if (!isDuplicated) {
    alert("please enter a new  feed back");
    return;
  }
  const feedback1 = new FeedBacks(value);
  feedback1.SaveFeedBack();
  feedback1.renderFeedBack();
  e.target[0].value = "";
});
