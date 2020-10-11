var {getString} = require("./ParseReplace") 

async function logIn(username, password) {
  let formData = new FormData();
  formData.append("Username", username);
  formData.append("Password", decrypt(password));

  try {
    let response = await fetch(
      "https://sfbrandeis.myschoolapp.com/api/SignIn",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "Set-Cookies" : "effbdb17-ece3-cc3d-9a71-c6cfb7452b06" },
        redirect: "follow",
        body: formData,
      }
    );
    return response.json();
  } catch (error) {}
}

async function getData() {
  try {
    let response = await fetch(
      "https://sfbrandeis.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&filter=2&dateStart=5%2F24%2F2020&dateEnd=5%2F30%2F5000&persona=2&statusList=&sectionList=",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      }
    );
    return response.json();
  } catch (error) {}
}

function encrypt(password) {
  const shift = 9;
  let newPassword = "";
  for (let char of password) {
    newPassword += String.fromCharCode(char.charCodeAt(0) + shift);
  }
  return newPassword;
}

function decrypt(password) {
  const shift = 9;
  let newPassword = "";
  for (let char of password) {
    newPassword += String.fromCharCode(char.charCodeAt(0) - shift);
  }
  return newPassword;
}

const removeTag = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

const parseLink = (str) => {
	str = str.toLowerCase();
	let regex = /href\s*=\s*\".*\"/g 
	let matched = str.match(regex)[0].match(/\".*\"/g)[0];
	return matched.replace(/"/g, "");;
}

module.exports = {
  logIn,
  getData,
  encrypt,
  decrypt,
  removeTag,
  parseLink,
  getString,
};
