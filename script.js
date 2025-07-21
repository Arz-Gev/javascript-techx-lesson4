let user = {
  name: {
    status: false,
    container: "name-container",
    firstName: getId("Fname"),
    lastName: getId("Lname"),
  },
  addres: {
    status: false,
    container: "address-container",
    streetAddressLine1: getId("street-addressL1"),
    streetAddressLine2: getId("street-addressL2"),
    addresCity: getId("city"),
    addresStateProvince: getId("province"),
    postalZipCode: getId("postCode"),
  },
  phone: {
    status: false,
    container: "phone-container",
    number: getId("phone"),
  },
  email: {
    status: false,
    container: "email-container",
    addres: getId("email"),
  },
  knowsFrom: {
    status: false,
    container: "option-container",
    selectType: 0,
    source: "",
  },
  feedback: {
    text: getId("feedback"),
  },
  suggestion: {
    text: getId("suggestions"),
  },
  willRecomend: {
    answer: getId("recomend"),
  },
  referencePeople: {
    personOne: [getValue("1-1"), getValue("1-2"), getValue("1-3")],
    personTwo: [getValue("2-1"), getValue("2-2"), getValue("2-3")],
  },
  errors: 5,
};
let section = [user.name, user.addres, user.phone, user.email, user.knowsFrom];

function selectionHnadler() {
  if (user.knowsFrom.selectType === 0) {
    requieredError("option-container", true);
    getId("select-option").style.borderColor = "rgb(242, 58, 60)";
    user.knowsFrom.status = false;
  } else if (user.knowsFrom.selectType === 1) {
    if (getId("other-option").value === "") {
      requieredError("other-option-container", true);
      getId("other-option").style.borderColor = "rgb(242, 58, 60)";
      user.knowsFrom.status = false;
    } else {
      user.knowsFrom.source = getId("other-option");
      requieredError("other-option-container", false);
      getId("other-option").style.borderColor = "rgb(222, 223, 228)";
      user.knowsFrom.status = true;
    }
  }
}

getId("select-option").addEventListener("change", () => {
  if (getValue("select-option") === "other") {
    getId("other-option-container").style.display = "flex";
    user.knowsFrom.selectType = 1;
    requieredError("option-container", false);
    getId("select-option").style.borderColor = "rgb(222, 223, 228)";
  } else if (getValue("select-option") !== "") {
    user.knowsFrom.source = getId("select-option");
    user.knowsFrom.selectType = 2;
    requieredError("option-container", false);
    getId("select-option").style.borderColor = "rgb(222, 223, 228)";
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
  if (obj == user.knowsFrom) {
    selectionHnadler();
    return;
  }
  for (let key in obj) {
    if (
      key === "container" ||
      key === "streetAddressLine2" ||
      key === "status"
    ) {
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
  //added counter
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let userEmail = user.email.addres;
  let container = user.email.container;
  userEmail.style.borderColor = "rgb(222, 223, 228)";
  if (pattern.test(userEmail.value)) {
    requieredError(container, false);
    user.email.status = true;
    return;
  } else if (userEmail.value !== "") {
    user.email.status = false;
    requieredError(container, true);
    userEmail.style.borderColor = "red";
    return;
  }
  user.email.status = true;
}

function phoneValidation() {
  //added counter
  const pattern = /^[\d\s]+$/;
  let userPhone = user.phone.number;
  let container = user.phone.container;
  userPhone.style.borderColor = "rgb(222, 223, 228)";
  if (pattern.test(userPhone.value)) {
    requieredError(container, false);
    user.phone.status = true;
  } else {
    user.phone.status = false;
    requieredError(container, true);
    userPhone.style.borderColor = "red";
  }
}
