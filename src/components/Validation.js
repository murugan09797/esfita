const validate = (fieldName, value, value2) => {
  let valid;
  let error;
  let errorTwo;
  let validData;
  switch (fieldName) {
    case "name":
    case "authorizesSignature":
    case "address1":
    case "address2":
    case "website":
    case "printName":
      valid = value.length >= 3 && value.length <= 50;
      error = valid ? "" : "Please enter valid " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;

    case "email":
    case "emailid":
      valid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/);
      error = valid ? "" : "Please enter valid email address.";
      validData = {
        valid: valid ? true : false,
        error,
      };
      return validData;

    case "city":
    case "state":
      valid = value.length >= 3;
      error = valid ? "" : "Please enter valid " + fieldName;
      validData = {
        valid,
        error,
      };
      return validData;
    case "mobile":
    case "mobileNo":
      valid =
      isNaN(value) == false &&
        value.length == 10  
       error = valid ? "" : " Please enter valid number";
      validData = {
        valid,
        error,
      };
      return validData;
    case "pincode":
      valid = isNaN(value)  == false && value.length >= 3 && value.length <= 6;
      error = valid ? "" : " Please enter valid pincode";
      validData = {
        valid,
        error,
      };
      return validData;
    case "registration":
      valid = isNaN(value)  == false && value.length >= 3 && value.length <= 6;
      error = valid ? "" : " Please enter valid Register Number";
      validData = {
        valid,
        error,
      };
      return validData;
    default:
      return validData;
  }
};

export default validate;
