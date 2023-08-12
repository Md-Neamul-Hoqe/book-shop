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
  console.log(location.href);
  logedIn(true);
}

logedIn(false);
function logedIn(signedIn) {
  if (location.pathname === "/index.html" && signedIn) {
    console.log(location.pathname);
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.className = "w-10 h-auto";
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
