console.clear();
/**
 * Important Comments
 * Recheck fixed index in childNodes[index] before live upload the cite
 */

/* Tailwind Customisations */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        blue: "#6946F4" /* For buttons */,
        "dip-blue": "#19103F" /* For admin panel */,
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
    <img src="./icons/Avatar face.png" alt="User Icon">
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
    // const price = event.target.parentNode.childNodes[0].childNodes[1].innerHTML;
    localStorage.setItem(
      "price",
      event.target.parentNode.childNodes[0].childNodes[1].innerHTML
    );
    localStorage.setItem(
      "bookName",
      event.target.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML
    );
    let L = event.target.parentNode.parentNode.parentNode.childNodes.length;
    for (let i = 0; i < Math.floor((L + 1) / 2); i++) {
      const element =
        event.target.parentNode.parentNode ==
        event.target.parentNode.parentNode.parentNode.childNodes[i];
      if (
        event.target.parentNode.parentNode ==
        event.target.parentNode.parentNode.parentNode.childNodes[2 * i + 1]
      ) {
        localStorage.setItem("theBook", 2 * i + 1);
        // console.log('theBook Stored.', 2 * i + 1);
      }
    }
    // console.log(
    //   event.target.parentNode.parentNode ==
    //     event.target.parentNode.parentNode.parentNode.childNodes[3],
    //   event.target.parentNode.parentNode.parentNode.childNodes.length
    // );
    // console.info(event.target)
    // const bookName =
    //   event.target.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML;
    // const writer =
    //   event.target.parentNode.parentNode.childNodes[3].childNodes[3].innerHTML;
    // console.log();
    location.pathname = "/checkOut.html";
  });
});

if (location.pathname === "/checkOut.html") {
  /* Get the values getting from localStorage */
  const price = localStorage.getItem("price");
  const bookName = localStorage.getItem("bookName");
  const id = localStorage.getItem("theBook");
  console.log(id, bookName, price);

  /* Initialise quantity for new items */
  var quantity = 1;
  const tbody = document.querySelector("#cart-section tbody");

  /* Check! is it new or old item */
  const ExistTheBook = document.getElementById(id);
  // console.log(ExistTheBook, id);
  if (ExistTheBook) {
    // console.log(ExistTheBook.childNodes[5].innerHTML);
    const inputOnRow = ExistTheBook.childNodes[3].childNodes[0];

    /* Update the quantity */
    quantity = parseFloat(inputOnRow.getAttribute("value")) + 1 || 1;

    /* update the quantity value of the row */
    inputOnRow.setAttribute("value", quantity);
    // console.log(inputOnRow.getAttribute("value"), quantity);

    /* update the price value of the row */
    ExistTheBook.childNodes[5].innerHTML = price * quantity;
  } else {
    /* To adding new row to tbody, create some elements */
    const tr = document.createElement("tr");

    /* Construct the row */
    tr.setAttribute("id", id);
    tr.setAttribute("class", "h-12 px-2");
    tr.innerHTML = `<td class="ps-3">${bookName}</td><td class="text-center w-96"><input class="w-1/4 text-center" type="number" name="Quantity" id="quantity" value="${quantity}"></td><td class="text-center w-96">${
      price * quantity
    }</td>`;

    /* add the row to the tbody */
    tbody.appendChild(tr);
    // console.log(tbody);
  }
  let TotalPrice = document.getElementById("TotalPrice");
  const L = tbody.childNodes.length;
  for (let index = 0; index < Math.floor((L + 1) / 2); index++) {
    /* If tr dinamically added to tbody then must '2' In childNodes[2] else 5 */
    // console.log(tbody.childNodes[2 * index + 1].childNodes[5].innerHTML);
    console.log(tbody.childNodes[2 * index + 1].childNodes[2].innerHTML);
  }
  console.log(tbody.childNodes.length);
}
//   const sectionId = document.getElementById("book-shelf-section");
//   console.log(sectionId.childNodes);
//   console.log(sectionId.childNodes[1].childNodes[5].childNodes[1]);
//   sectionId.childNodes.inde
// }
