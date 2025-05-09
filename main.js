// Variable starts
let main = document.querySelector(".main");
let img = document.querySelector(".image"); // select icon
let select = document.querySelector(".select"); // select
let span = document.querySelector(".selectActive"); // Select option
let selected = document.querySelector(".selected"); // All option
let option = document.querySelectorAll(".option"); // option
let dark = document.querySelector(".darkmodeIcon"); // darkMode backgrund
let darkImage = document.querySelector(".darkmodeImage"); // darkModeImage
let Icon = document.querySelector(".Icon"); // Popup open Icon
let popup = document.querySelector(".popup"); // Popup
let editPopup = document.querySelector(".editPopup"); // editPopup
let cancel = document.querySelector(".cancel"); // Close Popup
let editCancel = document.querySelector(".editCancel"); // Close editPopup
let add = document.querySelector(".add"); // List Add Note
let edit = document.querySelector(".edit"); // List Edit Note
let note = document.querySelector(".note"); // List Note input
let section = document.querySelector(".section"); // Lists parent
let empty = document.querySelector(".empty");// Empty lists parent
let emptyImage = document.querySelector(".emptyImage");// Empty lists image
// Variable end

// Select option start
for (let i = 0; i < option.length; i++) {
  option[i].addEventListener("click", () => {
    option.forEach((x) => {
      x.classList.remove("activeSelect");
    });
    option[i].classList.add("activeSelect");
    if (option[i].classList.contains("activeSelect")) {
      let a = option[i].innerHTML;
      span.innerHTML = a;
    }
    selected.classList.remove("selectedActive");
    img.src = "image/chevron-top.png";
  });
  if (option[i].classList.contains("activeSelect")) {
    let a = option[i].innerHTML;
    span.innerHTML = a;
  }
}
select.addEventListener("click", () => {
  if (img.src === "http://127.0.0.1:5500/image/chevron-top.png") {
    img.src = "image/chevron-top (1).png";
    selected.classList.add("selectedActive");
  } else {
    img.src = "image/chevron-top.png";
    selected.classList.remove("selectedActive");
  }
});
// Select option end

// Darkmode icon start
let darkModeLocal = JSON.parse(localStorage.getItem("darkMode"));
if (darkModeLocal) {
  main.classList.add("dark");
  darkImage.src = "svg/Vector (2).svg";
} else {
  main.classList.remove("dark");
  darkImage.src = "svg/Vector.svg";
}
dark.addEventListener("click", () => {
  darkModeLocal = !darkModeLocal;
  localStorage.setItem("darkMode", JSON.stringify(darkModeLocal));
  if (darkModeLocal) {
    darkImage.src = "svg/Vector (2).svg";
    main.classList.add("dark");
    main.style.transition = "2s";
    emptyImage.src="svg/Detective-check-footprint 1 (1).svg"
  } else {
    darkImage.src = "svg/Vector.svg";
    main.classList.remove("dark");
    main.style.transition = "2s";
    emptyImage.src="svg/Detective-check-footprint 1.svg"
  }
});
// Darkmode icon end
// Popup open close start

Icon.addEventListener("click", () => {
  popup.style.display = "block";
});
cancel.addEventListener("click", () => [(popup.style.display = "none")]);
// Popup open close end

// Popup apply note start
let lists = JSON.parse(localStorage.getItem("lists")) || [];
let checkbox = JSON.parse(localStorage.getItem("checkbox")) || [];
let search = document.getElementById("search");
lists.forEach((x) => {
  section.innerHTML += `<div class="lists">
          <div class="list">
          <input type="checkbox" name="" id="" class="check" />
            <li class="todoList">${x}</li>
            </div>
          <div class="change">
            <img class="edit" src="svg/Vector (3).svg" alt="" />
            <img class="trash" src="svg/trash-svgrepo-com 1.svg" alt="" />
            </div>
            </div>`;
});
add.addEventListener("click", () => {
  let inp = note.value;
  if (inp.trim()) {
    popup.style.display = "none";
    lists.push(inp);
    checkbox.push(false);
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("checkbox", JSON.stringify(checkbox));
    note.value = "";
    location.reload();
  } else {
    alert("Bos note elave ede bilmezsiniz");
  }
});

// Popup apply note end
// Variable start
let trash = document.querySelectorAll(".trash"); // list trash icon
let editIcon = document.querySelectorAll(".edit"); // list edit icon
let check = document.querySelectorAll(".check"); // List checkbox
let list = document.querySelectorAll(".todoList"); // List Note
let allList = document.querySelectorAll(".lists"); // Lists
let editNoteInput = document.querySelector(".editNote"); // Edit popup input
// Variable end
// List  trsah edit icon hover color start
for (let i = 0; i < trash.length; i++) {
  trash[i].addEventListener("click", () => {
    lists.splice(i, 1);
    checkbox.splice(i, 1);
    localStorage.setItem("lists", JSON.stringify(lists));
    localStorage.setItem("checkbox", JSON.stringify(checkbox));
    allList[i].remove();
    location.reload();
  });
  trash[i].addEventListener("mouseover", () => {
    trash[i].src = "svg/trash-svgrepo-com 1 (1).svg";
  });
  trash[i].addEventListener("mouseleave", () => {
    trash[i].src = "svg/trash-svgrepo-com 1.svg";
  });
  editIcon[i].addEventListener("click", () => {
    editPopup.style.display = "block";
    editNoteInput.value = lists[i]
    edit.addEventListener("click", () => {
      let editInput = editNoteInput.value;
      lists.splice(i, 1, editInput);
      localStorage.setItem("lists", JSON.stringify(lists));
      location.reload();
    });
  });
  editCancel.addEventListener("click", () => [
    (editPopup.style.display = "none"),
  ]);
  editIcon[i].addEventListener("mouseover", () => {
    editIcon[i].src = "svg/Vector (4).svg";
  });
  editIcon[i].addEventListener("mouseleave", () => {
    editIcon[i].src = "svg/Vector (3).svg";
  });
}
// List icon hover color end

// Checkbox checked start

for (let i = 0; i < check.length; i++) {
  check[i].addEventListener("click", () => {
    if (check[i].checked == true) {
      list[i].classList.add("active");
      checkbox[i] = true;
      localStorage.setItem(`checkbox`, JSON.stringify(checkbox));
    } else {
      list[i].classList.remove("active");
      checkbox[i] = false;
      localStorage.setItem(`checkbox`, JSON.stringify(checkbox));
    }
  });
  if (checkbox[i]) {
    list[i].classList.add("active");
    check[i].checked = true;
  } else {
    list[i].classList.remove("active");
    check[i].checked = false;
  }
}
// Checkbox checked end

// SEARCH value and list value equal start
search.addEventListener("input", () => {
  let searchValue = search.value.toLowerCase();
  for (let i = 0; i < list.length; i++) {
    let listText = list[i].innerHTML.toLowerCase();
    if (listText.includes(searchValue)) {
      allList[i].style.display = "flex";
    } else {
      allList[i].style.display = "none";
    }
  }
});
// SEARCH value and list value equal end

// SELECT checked or unchecked function start
let selectValue = span.innerHTML;

function selectFunc() {
  selectValue = span.innerHTML;
  for (let i = 0; i < list.length; i++) {
    if (selectValue === "All") {
      allList[i].style.display = "flex";
    } else if (selectValue === "Complete" && checkbox[i]) {
      allList[i].style.display = "flex";
    } else if (selectValue === "Incomplete" && !checkbox[i]) {
      allList[i].style.display = "flex";
    } else {
      allList[i].style.display = "none";
    }
  }
}
option.forEach((x) =>
  x.addEventListener("click", () => {
    selectFunc();
  })
);
selectFunc();
// SELECT checked or unchecked function end
// Empty icon start
if (lists.length === 0) {
  if (darkModeLocal) {
    emptyImage.src="svg/Detective-check-footprint 1 (1).svg"
  }else{
    emptyImage.src="svg/Detective-check-footprint 1.svg"
  }
  empty.style.display = "block";
} else {
  empty.style.display = "none";
}
// Empty icon end
