document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let terms = document.getElementById("terms").checked;

    // Validate date of birth
    let dobDate = new Date(dob);
    let today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    let monthDifference = today.getMonth() - dobDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    if (age < 18 || age > 55) {
      alert("Age must be between 18 and 55.");
      return;
    }

    let user = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      terms: terms,
    };

    // Save user data to local storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    // Add user to table
    addUserToTable(user);

    // Clear form
    document.getElementById("registrationForm").reset();
  });

function addUserToTable(user) {
  let table = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  let newRow = table.insertRow();

  let nameCell = newRow.insertCell(0);
  let emailCell = newRow.insertCell(1);
  let passwordCell = newRow.insertCell(2);
  let dobCell = newRow.insertCell(3);
  let termsCell = newRow.insertCell(4);

  nameCell.textContent = user.name;
  emailCell.textContent = user.email;
  passwordCell.textContent = user.password;
  dobCell.textContent = user.dob;
  termsCell.textContent = user.terms;
}

// Load saved users from local storage on page load
window.onload = function () {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => addUserToTable(user));
};
