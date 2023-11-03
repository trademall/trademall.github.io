import { RenderBoxes } from "./renderSignupBoxes.js";

RenderBoxes();

const signupForm = document.querySelector(".form-signup");
const signupButton = document.querySelector("#signupBtn");
const signupError = document.querySelector("#signupErr");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#confirm-password")
    .value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;

  if (password !== passwordConfirm) {
    signupError.textContent = "Passwords do not match";
    return;
  }

  signupButton.disabled = true;
  signupButton.textContent = "Signing up...";

  fetch("http://54.79.139.73:80/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "username": username,
      "password": password,
      "avatar": "https://i.imgur.com/4oQWz3C.png",
      "phone": phone,
      "email": email,
      "address": address
    }),
  })
    .then((res) => {
      if (res.status === 200) {
        window.location.replace("/login");
      } else {
        signupError.textContent = "Error signing up";
        signupButton.disabled = false;
        signupButton.textContent = "Sign up";
      }
    })
    .catch((err) => {
      signupError.textContent = "Error signing up";
      signupButton.disabled = false;
      signupButton.textContent = "Sign up";
    });
});