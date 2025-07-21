let form = document.getElementById("form");
let user = {
  name: {
    container: "name-container",
    firstName: getId("Fname"),
    lastName: getId("Lname"),
  },
  addres: {
    container: "address-container",
    streetAddressLine1: getId("street-addressL1"),
    streetAddressLine2: getId("street-addressL2"),
    addresCity: getId("city"),
    addresStateProvince: getId("province"),
    postalZipCode: getId("postCode"),
  },
  phone: {
    container: "phone-container",
    number: getId("phone"),
  },
  email: {
    container: "email-container",
    addres: getId("email"),
  },
  knowsFrom: {
    container: "option-container",
    source: sourceSetter(),
  },
};
let section = [user.name, user.addres, user.phone, user.email];

function sourceSetter() {
  let initalOption = getId("select-option");
  if (initalOption.value !== "") {
    return initalOption;
  } else if (initalOption.value === "other") {
    return getId("other-option");
  } else {
    return getId("select-option");
  }
}

getId("select-option").addEventListener("change", () => {
  if (getValue("select-option") === "other") {
    getId("other-option-container").style.display = "flex";
    requieredError("option-container", false);
    requieredError("other-option-container", true);
  } else {
    getId("other-option-container").style.display = "none";
  }
});

addEventListener("submit", (event) => {
  event.preventDefault();

  section.forEach((element) => check(element));
});

function getValue(id) {
  let element = document.getElementById(id);
  return element.value;
}

function getId(id) {
  let element = document.getElementById(id);
  return element;
}

function check(obj) {
  requieredError(obj.container, false);
  if (obj === user.phone) {
    phoneValidation();
    return;
  }
  if (obj === user.email) {
    emailValidation();
    return;
  }
  for (let key in obj) {
    if (key === "container" || key === "streetAddressLine2") {
      continue;
    }
    obj[key].style.borderColor = "rgb(222, 223, 228)";
    if (obj[key].value === "") {
      obj[key].style.borderColor = "red";
      requieredError(obj.container, true);
    }
  }
}

function requieredError(container, on) {
  let error = " .error";
  if (on) {
    getId(container).style.backgroundColor = "rgb(255, 237, 237)";
    document.querySelector("#" + container + " .error").style.display = "flex";
  } else {
    getId(container).style.backgroundColor = "white";
    document.querySelector("#" + container + " .error").style.display = "none";
  }
}

function emailValidation() {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let userEmail = user.email.addres;
  let container = user.email.container;
  userEmail.style.borderColor = "rgb(222, 223, 228)";
  if (pattern.test(userEmail.value)) {
    requieredError(container, false);
  } else {
    requieredError(container, true);
    userEmail.style.borderColor = "red";
  }
}

function phoneValidation() {
  const pattern = /^[\d\s]+$/;
  let userPhone = user.phone.number;
  let container = user.phone.container;
  userPhone.style.borderColor = "rgb(222, 223, 228)";
  if (pattern.test(userPhone.value)) {
    requieredError(container, false);
  } else {
    requieredError(container, true);
    userPhone.style.borderColor = "red";
  }
}
