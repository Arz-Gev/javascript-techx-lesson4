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
    number: getId("phone"),
  },
};

getId("select-option").addEventListener("change", () => {
  if (getValue("select-option") === "other") {
    getId("option-other").style.display = "flex";
  } else {
    getId("option-other").style.display = "none";
  }
});

addEventListener("submit", (event) => {
  event.preventDefault();
  check(user.name);
  check(user.addres);
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
    document.querySelector("." + container + " .error").style.display = "flex";
  } else {
    getId(container).style.backgroundColor = "white";
    document.querySelector("#" + container + " .error").style.display = "none";
  }
}
