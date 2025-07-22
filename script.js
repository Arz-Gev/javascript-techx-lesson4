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
  status: false,
  sectionsToCheck: [],
  sectionsToPrint: [],
};

addEventListener("submit", (event) => {
  event.preventDefault();
  (user.sectionsToCheck = checkSectionInit()).forEach((element) =>
    check(element)
  );

  if (user.status) {
    (user.sectionsToPrint = printSectionInit()).forEach((element) =>
      print(element)
    );
    showSuccess(true);
    document.addEventListener("KeyboardEvent", () => {
      showSuccess(false);
      event.stopPropagation();
    });
  }
});

elementById("select-option").addEventListener("change", () => {
  if (valueById("select-option") === "other") {
    elementById("other-option-container").style.display = "flex";
    user.knowsFrom.selectType = 1;
    requieredError("option-container", false);
    elementById("select-option").style.borderColor = "rgb(222, 223, 228)";
  } else if (valueById("select-option") !== "") {
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
    user.knowsFrom.status = false;
  } else if (user.knowsFrom.selectType === 1) {
    if (elementById("other-option").value === "") {
      requieredError("other-option-container", true);
      elementById("other-option").style.borderColor = "rgb(242, 58, 60)";
      user.knowsFrom.status = false;
    } else {
      user.knowsFrom.source = elementById("other-option");
      requieredError("other-option-container", false);
      elementById("other-option").style.borderColor = "rgb(222, 223, 228)";
      user.knowsFrom.status = true;
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

function requieredError(container, condition) {
  let error = " .error";
  if (condition) {
    elementById(container).style.backgroundColor = "rgb(255, 237, 237)";
    document.querySelector("#" + container + " .error").style.display = "flex";
    user.status = false;
  } else {
    elementById(container).style.backgroundColor = "white";
    document.querySelector("#" + container + " .error").style.display = "none";
    user.status = true;
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
