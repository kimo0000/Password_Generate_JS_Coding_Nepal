const inpPass = document.querySelector(".result_input input"),
  iconCopy = document.querySelector(".result_input i"),
  progressBar = document.querySelector(".progress_bar"),
  lengthRange = document.querySelector(".pass_length .length"),
  inpRange = document.querySelector(".input_checkbox input"),
  options = document.querySelectorAll(".list_checkbox .option input"),
  btnGenerate = document.querySelector(".generate_password");

const AllCharacters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  upercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbole: "^!$%&|[](){}:;.,*+-#@<>~",
};

const generatePassword = () => {
  let staticPassword = "";
  let exludesChar = false;
  let randomPassword = "";
  const rangeLength = inpRange.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exclude-duplicate" && option.id !== "spaces") {
        staticPassword += AllCharacters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        exludesChar = true;
      }
    }
  });

  for (let i = 0; i < rangeLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];

    if (exludesChar) {
      //  console.log(randomPassword)
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  // console.log(randomPassword);
  inpPass.value = randomPassword;
};

btnGenerate.addEventListener("click", generatePassword);
inpRange.addEventListener("input", () => {
  lengthRange.innerText = inpRange.value;
  generatePassword();
  progressBar.id = `${
    inpRange.value <= 8 ? "weak" : inpRange.value <= 16 ? "medium" : "strong"
  }`;
});
iconCopy.addEventListener("click", () => {
  navigator.clipboard.writeText(inpPass.value);
  iconCopy.className = "fa-solid fa-check";
  setTimeout(() => (iconCopy.className = "fa-regular fa-copy"), 1500);
});
