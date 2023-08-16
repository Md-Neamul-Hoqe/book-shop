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

logedIn(true); /* How to remove login button when signed in logedIn(false) */
function logedIn(signedIn) {
  if (location.pathname === "/index.html" && signedIn) {
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "w-10 h-auto rounded-full bg-[#BEE3EB]";
    loginBtn.innerHTML = `
    <img src="./icons/Avatar face.png" alt="User Icon" class="max-w-[40px] xl:max-w-full">
    `;
  }
}

/**
 * =============================
 * Home Page Page
 * =============================
 */
/* "Buy Now" button */
const btn = document.querySelectorAll("#book-shelf-section .book button");
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

    const book = event.target.parentElement.parentElement;
    const bookShelf =
      event.target.parentElement.parentElement.parentElement.children;
    const theBookId = Array.from(bookShelf).indexOf(book);
    localStorage.setItem("theBookId", theBookId);

    location.pathname = "/checkOut.html";
  });
});

if (
  location.pathname === "/login.html" ||
  location.pathname === "/createAccount.html"
) {
  const navBar = document.getElementById("links");
  navBar.style.display = "none";
  navBar.nextElementSibling.style.display = "none";
}

/**
 * =============================
 * Check Out Page
 * =============================
 */

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

  // console.dir(tbody.children[0].children[2].innerHTML);
  let total = 0;
  for (let index = 0; index < numOfCartItems; index++) {
    let currentPrice = tbody.children[index].children[2].children[0].innerHTML;

    total += parseFloat(currentPrice);
  }
  const TotalPrice = document.getElementById("TotalPrice");
  TotalPrice.innerHTML = total.toFixed(2);
}

/**
 * ====================================================
 * Admin Panel Page
 * ====================================================
 */
if (location.pathname === "/admin_panel.html") {
  /* [file upload not functional] */
  /* admin_panel [add book] */
  // const fileInput = document.getElementById("bookInfo-image");
  // fileInput?.addEventListener(
  //   "change",
  //   function (fileUploadingEvent) {
  //     const numOfFiles = fileUploadingEvent.target.files.length;
  //     const fileName = fileUploadingEvent.target.files[0].name;
  //     const fileSize = fileUploadingEvent.target.files[0].size;
  //     const fileType = fileUploadingEvent.target.files[0].type;
  //     const theFile = fileUploadingEvent.target.files[0];
  //     const lastModifiedDate =
  //       fileUploadingEvent.target.files[0].lastModifiedDate;
  //     // if (fileName) {
  //     //   console.log(theFile);
  //     //   console.log(numOfFiles);
  //     //   console.log(fileUploadingEvent.target.files, fileSize, fileType);
  //     //   console.log(lastModifiedDate);
  //     // }
  //   },
  //   false
  // );

  function uploadBook(id, name, author, price) {
    if (
      author.value &&
      name.value &&
      typeof parseFloat(price.value) == "number"
    ) {
      const tr = document.createElement("tr");
      tr.setAttribute("id", id);
      tr.setAttribute("class", "h-4");
      tr.innerHTML = `<td class="py-3 pl-11">${name.value}</td>
  <td>${author.value}</td>
  <td>$<span>${price.value}</span></td>
  <td class="pr-10 text-center">
      <img class="inline cursor-pointer mr-2" width="24" height="24" src="./icons/pen.png" alt="edit">
      <img class="inline cursor-pointer" width="24" height="24" src="./icons/delete.png" alt="delete">
  </td>`;

      shelfTBody.appendChild(tr);

      // shelfTBody.replaceChild(document.getElementById(id), tr);
      /* How to add edited row in the deleted id */

      /* Clear Input Fields */
      (name.value = ""), (author.value = ""), (price.value = "");
      return true;
    } else {
      alert("Please Fill All The Fields Properly.");
      return false;
    }
  }

  /* Manage Books */
  const shelfTBody = document.getElementById("shelfTBody");

  /* Edit Books */
  updateList();
  function updateList() {
    const actions = shelfTBody.childNodes;
    // console.log(actions);
    actions.forEach((action) => {
      // console.log(action);
      action.addEventListener("click", function (e) {
        /* Edit button clicked */
        const theRow = e.target.parentElement.parentElement;
        if (e.target.getAttribute("alt") === "edit") {
          // console.log('Updated: ',theRow);
          const id = (document.getElementById("Id").value =
            theRow.getAttribute("id"));
          const nameOld = theRow.children[0].innerText;
          const authorOld = theRow.children[1].innerText;
          const priceOld = theRow.children[2].children[0].innerText;

          /* Set Old Values on edit-book to editing */
          document.getElementById("editBookInfo-name").value = nameOld;
          document.getElementById("editBookInfo-author").value = authorOld;
          document.getElementById("editBookInfo-price").value = priceOld;

          menuLinksUpdate("edit-book");
          location.hash = "#edit-book";
          theRow.remove();
        }

        /* Delete button clicked */
        if (e.target.getAttribute("alt") === "delete") {
          alert("The row is deleted.");
          // console.log("Deleted: ", theRow);
          theRow.remove();
        }
      });
    });
  }

  function editBook() {
    const id = document.getElementById("Id").value;
    const name = document.getElementById("editBookInfo-name");
    const author = document.getElementById("editBookInfo-author");
    const price = document.getElementById("editBookInfo-price");

    /* Edit book  */
    if (uploadBook(id, name, author, price)) {
      alert("The value is updated.");
    } else {
      alert("Error: The value can't updated.");
    }
  }

  /* Upload To The Bookshelf */
  function addBook() {
    const id = shelfTBody.lastElementChild.getAttribute("id") + 1;
    const bookInfoName = document.getElementById("bookInfo-name");
    const bookInfoPrice = document.getElementById("bookInfo-price");
    const bookInfoAuthor = document.getElementById("bookInfo-author");

    if (uploadBook(id, bookInfoName, bookInfoAuthor, bookInfoPrice)) {
      alert("The book is uploaded successfully");
    } else {
      alert("Erorr: Can't Uploaded.");
    }
  }

  /* left side bar */
  /* To Get Live elements [menuLinks] must use querySelector/All or forms */
  const menuLinks = document.querySelectorAll("#leftSidebar li");

  /* update menu links active effects and page show/hide when clicked */
  menuLinks.forEach((li) => {
    li.addEventListener("click", function (event) {
      let clickedHash = this.children[0].hash.slice(1);
      menuLinksUpdate(clickedHash);
    });
  });

  /* Show ClickedHash page [hide others] | change active link to current page link */
  function menuLinksUpdate(clickedHash) {
    const clickedPageid = document.getElementById(clickedHash);

    if (clickedPageid.classList.contains("hidden")) {
      /* hidden section clicked */
      clickedPageid.classList.remove("hidden");
      location.hash = clickedHash;

      menuLinks.forEach((liSibling) => {
        let hash = liSibling.children[0].hash.slice(1);
        if (hash !== clickedHash) {
          let pageId = document.getElementById(hash);

          if (!pageId.classList.contains("hidden")) {
            pageId.classList.add("hidden");
            liSibling.classList.remove("bg-gradient-to-b");
          }
        } else {
          /* if hash === clickedHash then active effect to the menu list 'li' */
          liSibling.classList.add("bg-gradient-to-b");
        }
      });
    }
  }
}
