import { React, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Header from "./Header";
import validate from "./Validation";
import State from "./State";
import { toast } from "react-toastify";

function UserDetails() {
  const [state, setState] = useState({
    name: "",
    email: "",
    mobile: "",
    registration: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    website: "",
    pincode: "",
    nameError: "",
    emailError: "",
    mobileError: "",
    registrationError: "",
    address1Error: "",
    address2Error: "",
    cityError: "",
    stateError: "",
    websiteError: "",
    pincodeError: "",
    nameValid: "",
    emailValid: "",
    mobileValid: "",
    registrationValid: "",
    address1Valid: "",
    address2Valid: "",
    cityValid: "",
    stateValid: "",
    websiteValid: "",
    pincodeValid: "",
  });

  const [singnatory, setSignatory] = useState([
    {
      auth: "",
      emailId: "",
      designation: "",
      mobileNo: "",
    },
  ]);

  const handleChange = ({ target }) => {
    let { name, value } = target;
    setState((pre) => ({ ...pre, [name]: value }));
    const data = validate(name, value);
    setState((previousData) => ({
      ...previousData,
      [name + "Valid"]: data.valid,
      [name + "Error"]: data.error,
    }));
  };
 
  const handleAdd = () => {
    let li = [
      ...singnatory,
      {
        auth: "",
        emailId: "",
        designation: "",
        mobileNo: "",
      },
    ];
    setSignatory(li);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...singnatory];
    list[index][name] = value;
    setSignatory(list);
  };

  const handleRemove = (index) => {
    const list = [...singnatory];
    list.splice(index, 1);
    setSignatory(list);
  };
const handleCilck = async(e)=>{
let validData = state.name && state.emailValid && state.registrationValid && state.address1Valid && state.address2Valid && state.stateValid && state.cityValid && state.websiteValid && state.pincodeValid && state.mobileValid;
if(validData){
  let data = 
{
  nameofTrustee:state.name,
  emailid:state.email,
  mobileNo:state.mobile,
  registrationNumber:state.registration,
  addressLine1:state.address1,
  addressLine2:state.address2,
  city:state.city,
  state:state.state,  
  pincode:state.pincode,
  website:state.website,
  imgsRestaurante: singnatory
}
try{
  let res = await fetch("http://localhost:8080/add/admin",{
  method: "POST",
  body: JSON.stringify(data),
  headers: {"Content-type": "application/json; charset=UTF-8"}
})
toast.success("successfully submitted")
 
console.log(res.json())

}catch(err){
  toast.error("something went wrong")
}
}
}
  console.log("state", state);
  return (
    <>
      <Header />
      <Card autoComplete="off" style={{ marginLeft: "70px", marginTop: "40px", width: "1200px" }}>
        <CardContent>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="name of trustee"
              variant="outlined"
              required
              name="name"
              value={state.name}
              helperText={state.nameError}
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="email id"
                variant="outlined"
                name="email"
                value={state.email}
              helperText={state.emailError}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="mobile number"
                variant="outlined"
                name="mobile"
                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                required
              helperText={state.mobileError}

                value={state.number}
                onChange={handleChange}
              />
            </FormControl>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="Registration "
              required
              variant="outlined"
              name="registration"
              helperText={state.registrationError}

              value={state.registration}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="address line 1"
              name="address1"
              helperText={state.address1Error}
              value={state.address1}
              variant="outlined"
              required
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="address line 2"
                name="address2"
                value={state.address2}
              helperText={state.address2Error}
                required
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">state</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                name="state"
              helperText={state.stateError}

                value={state.state}
                required
                input={<OutlinedInput label="Name" />}
              >
                {State.flat(Infinity).map((name,i) => (
                  <MenuItem key={i} value={name.state} >
                    {name.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">city</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
              helperText={state.cityError}

                name="city"
                value={state.city}
                required
                input={<OutlinedInput label="Name" />}
              >
                {State.flat(Infinity).map((name,i) => (
                  <MenuItem key={i} value={name.name}>
                    {name.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="pincode"
                name="pincode"
                required
              helperText={state.pincodeError}
                
                value={state.pincode}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="website"
                value={state.website}
                onChange={handleChange}
                name="website"
              helperText={state.websiteError}

                required
                variant="outlined"
              />
            </FormControl>
            <div>
              {singnatory.map((e, i) => {
                return (
                  <>
                    <Box>
                      <TextField
                        sx={{ m: 1, width: "25ch" }}
                        id="outlined-basic"
                        label={`authorised signature${i + 1}`}
                        variant="outlined"
                        name="auth"
                        required
                        value={e.auth}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="outlined-basic"
                          label="designation"
                          variant="outlined"
                          required
                          name="designation"
                          value={e.designation}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormControl>
                      <TextField
                        sx={{ m: 1, width: "25ch" }}
                        id="outlined-basic"
                        label="emailId"
                        name="emailId"
                        value={e.emailId}
                        required
                        onChange={(e) => handleInputChange(e, i)}
                        variant="outlined"
                      />
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="outlined-basic"
                          label="mobileNo"
                          required
                          variant="outlined"
                          name="mobileNo"
                          value={e.mobileNo}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormControl>
                      {singnatory.length - 1 === i && (
                        <AddCircleIcon onClick={handleAdd} />
                      )}

                      {singnatory.length !== 1 && (
                        <RemoveCircleIcon
                          onClick={() => handleRemove(i)}
                        />
                      )}
                    </Box>
                  </>
                );
              })}
            </div>
            <br />
            <Button type="button" class="btn btn-primary" onClick={handleCilck}>
              Submit
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default UserDetails;
