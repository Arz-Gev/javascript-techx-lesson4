let user = {
  name: {
    container: "name-container",
    firstName: elementById("Fname"),
    lastName: elementById("Lname"),
  },
  addres: {
    container: "address-container",
    streetAddressLine1: elementById("street-addressL1"),
    streetAddressLine2: elementById("street-addressL2"),
    addresCity: elementById("city"),
    addresStateProvince: elementById("province"),
    postalZipCode: elementById("postCode"),
  },
  phone: {
    container: "phone-container",
    number: elementById("phone"),
  },
  email: {
    container: "email-container",
    addres: elementById("email"),
  },
  knowsFrom: {
    container: "option-container",
    selectType: 0,
    source: "",
  },
  feedback: {
    text: elementById("feedback"),
  },
  suggestion: {
    text: elementById("suggestions"),
  },
  willRecomend: {
    answer: elementById("recomend"),
  },
  referencePeople: {
    personOne: [valueById("1-1"), valueById("1-2"), valueById("1-3")],
    personTwo: [valueById("2-1"), valueById("2-2"), valueById("2-3")],
  },
  sectionsToCheck: [],
  sectionsToPrint: [],
};

addEventListener("submit", (event) => {
  event.preventDefault();
  (user.sectionsToCheck = checkSectionInit()).forEach((element) =>
    check(element)
  );

  if (checkIfErrorScroll()) {
    showSuccess(true);
  }
});

function checkIfErrorScroll() {
  const div = document.querySelectorAll(".error");

  for (let child of div) {
    const style = window.getComputedStyle(child);
    if (style.display !== "none") {
      child.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
  }
  return true;
}

elementById("select-option").addEventListener("change", () => {
  if (valueById("select-option") === "other") {
    elementById("other-option-container").style.display = "flex";
    user.knowsFrom.selectType = 1;
    requieredError("option-container", false);
    elementById("select-option").style.borderColor = "rgb(222, 223, 228)";
  } else {
    elementById("other-option-container").style.display = "none";
    user.knowsFrom.source = elementById("select-option");
    user.knowsFrom.selectType = 2;
    requieredError("option-container", false);
    elementById("select-option").style.borderColor = "rgb(222, 223, 228)";
  }
});

function selectionHnadler() {
  if (user.knowsFrom.selectType === 0) {
    requieredError("option-container", true);
    elementById("select-option").style.borderColor = "rgb(242, 58, 60)";
  } else if (user.knowsFrom.selectType === 1) {
    if (elementById("other-option").value === "") {
      requieredError("other-option-container", true);
      elementById("other-option").style.borderColor = "rgb(242, 58, 60)";
    } else {
      user.knowsFrom.source = elementById("other-option");
      requieredError("other-option-container", false);
      elementById("other-option").style.borderColor = "rgb(222, 223, 228)";
    }
  }
}

function showSuccess(condition) {
  let switcher = document.querySelectorAll("#submission-switcher");
  condition
    ? switcher.forEach((e) => {
        e.style.display = "flex";
      })
    : switcher.forEach((e) => {
        e.style.display = "none";
      });
}

function valueById(id) {
  let element = document.getElementById(id);
  return element.value;
}

function elementById(id) {
  let element = document.getElementById(id);
  return element;
}

function checkSectionInit() {
  return [user.name, user.addres, user.phone, user.email, user.knowsFrom];
}
function printSectionInit() {
  return [user.name, user.addres, user.phone, user.email, user.knowsFrom];
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

function requieredError(container, condition) {
  let error = " .error";
  if (condition) {
    elementById(container).style.backgroundColor = "rgb(255, 237, 237)";
    document.querySelector("#" + container + " .error").style.display = "flex";
  } else {
    elementById(container).style.backgroundColor = "white";
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
    return;
  } else if (userEmail.value !== "") {
    requieredError(container, true);
    userEmail.style.borderColor = "red";
    return;
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
