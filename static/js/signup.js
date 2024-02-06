import { RenderBoxes } from "./renderSignupBoxes.js";

RenderBoxes();

const signupForm = document.querySelector(".form-signup");
const signupButton = document.querySelector("#signupBtn");
const signupError = document.querySelector("#signupErr");
const successPrompt = document.querySelector("#success-prompt");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const passwordConfirm = document.querySelector("#confirm-password")
    .value;
  const phone = document.querySelector("#phone").value;
  const address = document.querySelector("#address").value;
  // const avatar = document.querySelector("#avatar").value;
  const avatar = "";

  if (password !== passwordConfirm) {
    signupError.textContent = "Passwords do not match";
    return;
  }

  signupButton.disabled = true;
  signupButton.textContent = "Signing up...";

  $.ajax({
    url: "http://47.89.209.202:8080/user/signup",
    type: "POST",
    data: JSON.stringify({
      "username": username,
      "password": password,
      "email": email,
      "phone": phone,
      "address": address,
      "avatar": avatar
    }),
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
      if (res.code == 200) {
        signupForm.classList.add("hidden");
        successPrompt.classList.remove("hidden");
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      } else {
        signupError.classList.remove("hidden");
        signupError.textContent = res.message;
        signupButton.disabled = false;
        signupButton.textContent = "Sign up";
      }
    },
    error: function (res) {
      signupError.classList.remove("hidden");
      signupError.textContent = res.message;
      signupButton.disabled = false;
      signupButton.textContent = "Sign up";
    }
  });
});