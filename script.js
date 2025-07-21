let form = document.getElementById("form");
let user = {
  name: {
    container: "name-container",
    firstName: getId("Fname"),
    lastName: getId("Lname"),
  },
  addres: {
    streetAddressLine1: getId("street-addressL1"),
    streetAddressLine2: getId("street-addressL2"),
    addresCity: getId("city"),
    addresStateProvince: getId("province"),
    postalZipCode: getId("postCode"),
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
  getId(obj.container).style.backgroundColor = "rgb(255, 237, 237)";
  for (let key in obj) {
    if (obj[key].value === "") {
      obj[key].style.borderColor = "red";
      getId(obj.container).style.backgroundColor = "rgb(255, 237, 237)";
    }
  }
}
