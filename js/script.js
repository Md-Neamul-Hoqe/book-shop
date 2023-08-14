console.clear();

/* Tailwind Customisations */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        blue: "#6946F4" /* For buttons */,
        "dip-blue": "#19103F" /* For admin panel */,
        "active-blue": "#2F216A" /* For active admin panel */,
        "light-gray": "#F1F1F1" /* For bg */,
        gray: "#A9A9A9" /* For body text */,
        borderGray: "#ABABAB",
        "dip-gray": "#545454" /* For navbar text */,
        "light-dark": "#3C3C3C" /* For heading text */,
      },
    },
  },
};

/* Navbar Login Btn to login.html */
function login() {
  location.href = location.origin + "/login.html";
}

/* Varify login informations */
function varification() {
  location.href = location.origin + "/index.html";
  logedIn(true);
}

logedIn(true);
function logedIn(signedIn) {
  if (location.pathname === "/index.html" && signedIn) {
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "w-10 h-auto rounded-full bg-[#BEE3EB]";
    loginBtn.innerHTML = `
    <img src="./icons/Avatar face.png" alt="User Icon" class="max-w-[40px] xl:max-w-full">
    `;
  }
}

if (
  location.pathname === "/login.html" ||
  location.pathname === "/createAccount.html"
) {
  const navBar = document.getElementById("links");
  navBar.style.display = "none";
  navBar.nextElementSibling.style.display = "none";
  //   console.log(navBar.nextElementSibling);
}

// function addToCart() {
const btn = document.querySelectorAll("#book-shelf-section .book button");
//   console.log(btn);

btn.forEach((button) => {
  button.addEventListener("click", function (event) {
    /* Save to the local Storage to use another page (checkOut.html) */
    localStorage.setItem(
      "price",
      event.target.parentElement.children[0].children[0].innerHTML
    );
    localStorage.setItem(
      "bookName",
      event.target.parentElement.parentElement.children[1].children[0].innerHTML
    );
    // console.log(event.target.parentElement.parentElement);
    const book = event.target.parentElement.parentElement;
    const bookShelf =
      event.target.parentElement.parentElement.parentElement.children;
    const theBookId = Array.from(bookShelf).indexOf(book);
    localStorage.setItem("theBookId", theBookId);

    console.log(Array.from(bookShelf).indexOf(book));

    location.pathname = "/checkOut.html";
  });
});

if (location.pathname === "/checkOut.html") {
  /* Get the values getting from localStorage */
  let getPrice = localStorage.getItem("price");
  const price = parseFloat(getPrice).toFixed(2);
  const bookName = localStorage.getItem("bookName");
  const id = localStorage.getItem("theBookId");

  const links = document.getElementById("links");

  links.children[3].children[0].innerHTML = `<img class='inline' src="./icons/shopping-cart.png" alt="cart">&nbsp;Checkout`;
  /* Initialise quantity for new items */
  var quantity = 1;
  const tbody = document.querySelector("#cart-section tbody");

  /* Check! is it new or old item */
  const existingBookInCartList = document.getElementById(id);

  /* check is new item added to the cart or not */
  let newBookSelected = false;
  if (existingBookInCartList) {
    const inputOnRow = existingBookInCartList.children[1].children[0];
    /* Update the quantity */
    quantity = parseFloat(inputOnRow.value) + 1 || 1;

    /* update the quantity value of the row */
    inputOnRow.setAttribute("value", quantity);

    /* update the price value of the row */
    existingBookInCartList.children[2].children[0].innerHTML = (
      price * quantity
    ).toFixed(2);
  } else {
    newBookSelected = true;
    /* To adding new row to tbody, create some elements */
    const tr = document.createElement("tr");

    /* Construct the row */
    tr.setAttribute("id", id);
    tr.setAttribute("class", "h-14");
    tr.innerHTML = `
    <td class="md:ps-5">${bookName}</td>
    <td class="text-center w-96"><input class="w-1/4 text-center" type="number" name="Quantity" id="quantity" value="${quantity}"></td>
    <td class="text-end w-96 md:pe-5">\$<span>${(price * quantity).toFixed(
      2
    )}</span></td>`;

    /* add the row to the tbody */
    tbody.appendChild(tr);
  }

  var numOfCartItems = tbody.children.length;

  // console.log(numOfCartItems);
  // console.dir(tbody.children[0].children[2].innerHTML);
  let total = 0;
  for (let index = 0; index < numOfCartItems; index++) {
    let currentPrice = tbody.children[index].children[2].children[0].innerHTML;

    total += parseFloat(currentPrice);
  }
  const TotalPrice = document.getElementById("TotalPrice");
  TotalPrice.innerHTML = total.toFixed(2);
}

/* admin_panel [add book] */
if (location.pathname === "/admin_panel.html") {
  // console.log("This is admin panel.");
  const fileInput = document.getElementById("bookInfo-image");
  fileInput.addEventListener(
    "change",
    function (fileUploadingEvent) {
      console.log(fileUploadingEvent);
      const numOfFiles = fileUploadingEvent.target.files.length;
      const fileName = fileUploadingEvent.target.files[0].name;
      const fileSize = fileUploadingEvent.target.files[0].size;
      const fileType = fileUploadingEvent.target.files[0].type;
      const theFile = fileUploadingEvent.target.files[0];
      const lastModifiedDate =
        fileUploadingEvent.target.files[0].lastModifiedDate;
      // if (fileName) {
      //   console.log(theFile);
      //   console.log(numOfFiles);
      //   console.log(fileUploadingEvent.target.files, fileSize, fileType);
      //   console.log(lastModifiedDate);
      // }
    },
    false
  );

  /* left side bar */
  const menuLinks = document
    .getElementById("leftSidebar")
    .querySelectorAll("li");
  console.log(menuLinks);
  // menuLinks.forEach((li) => {
  //   li.addEventListener("click", function (event) {
  //     event.target.style.backgroundColor = "bg-active-blue";
  //     // event.target.addClass = "bg-active-blue";
  //     // delete event.target.removeClass;
  //     console.log(event.target.classList);
  //   });
  //   li.addEventListener("dblclick", function (event) {
  //     if (event.target.style.backgroundColor == "bg-active-blue") {
  //       console.log(event.target.classList[event.target.classList.length - 1]);
  //       event.target.style.backgroundColor = "transparent";
  //       console.log(event.target.classList);
  //     }
  //   });
  // });
}
