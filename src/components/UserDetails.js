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
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  input: {
    color: "red"
  }
});

function UserDetails() {

  const classes = useStyles();
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
      authorizesSignature: "",
      emailid: "",
      Designation: "",
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
        authorizesSignature: "",
        emailid: "",
        Designation: "",
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
  const handleCilck = async (e) => {
    let validData = state.name && state.emailValid && state.registrationValid && state.address1Valid && state.address2Valid && state.stateValid && state.cityValid && state.websiteValid && state.pincodeValid && state.mobileValid;
    if (validData) { 
      let data = {
        nameofTrustee: state.name,
        emailid: state.email,
        mobileNo: state.mobile,
        registrationNumber: state.registration,
        addressLine1: state.address1,
        addressLine2: state.address2,
        city: state.city,
        state: state.state,
        pincode: state.pincode,
        website: state.website,
        imgsRestaurante: singnatory
      }
      try {
        let res = await fetch("http://192.168.2.96:8080/add/admin", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        toast.success("successfully submitted") 
        console.log(res)
      } catch (err) {
        toast.error("something went wrong")
      }
    } else {
      toast.warn("Please give valid data required feilds")

    }
  }
  console.log("state", state,singnatory);
  return (
    <>
    <div className="main-card">
      <Header />
      
      <Card autoComplete="off" style={{ marginLeft: "70px", marginTop: "40px", width: "1200px" }}>
        <CardContent>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="Name of trustee"
              inputProps={{ className: classes.input }}
              variant="outlined"
              autoComplete="off"
              required
              error={state.nameError !== ""}
              name="name"
              value={state.name}
              helperText={state.nameError}
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Email id"
                variant="outlined"
                name="email"
                autoComplete="off"
                value={state.email}
                error={state.emailError !== ""}
                helperText={state.emailError}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Mobile number"
                variant="outlined"
                name="mobile"
                autoComplete="off" 
                 required
                helperText={state.mobileError}
                error={state.mobileError !== ""}
                value={state.number}
                onChange={handleChange}
              />
            </FormControl>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="Registration number"
              required
              autoComplete="off" 
              variant="outlined"
              name="registration"
              helperText={state.registrationError} 
              error={state.registrationError !== ""} 
              value={state.registration}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              sx={{ m: 1, width: "25ch" }}
              id="outlined-basic"
              label="Address line 1"
              name="address1"
              helperText={state.address1Error}
              error={state.address1Error !== ""}
              value={state.address1}
              autoComplete="off" 
              variant="outlined"
              required
              onChange={handleChange}
            />
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Address line 2"
                name="address2"
                value={state.address2}
                helperText={state.address2Error}
                error={state.address2Error !== ""}
                autoComplete="off" 
                required
                variant="outlined"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">State</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                name="state"
                autoComplete="off" 
                // helperText={state.stateError} 
                error={state.stateError !== ""}
                value={state.state}
                required
                input={<OutlinedInput label="Name" />}
              >
                {State.flat(Infinity).map((name, i) => (
                  <MenuItem key={i} value={name.state} >
                    {name.state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">City</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={handleChange}
                // helperText={state.cityError}
                error={state.cityError !== ""}
                autoComplete="off" 
                name="city"
                value={state.city}
                required
                input={<OutlinedInput label="Name" />}
              >
                {State.flat(Infinity).map((name, i) => (
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
                label="Pincode"
                name="pincode"
                required
                helperText={state.pincodeError}
                error={state.pincodeError !== ""}
                autoComplete="off" 
                value={state.pincode}
                onChange={handleChange}
                variant="outlined"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Website"
                value={state.website}
                onChange={handleChange}
                name="website"
                helperText={state.websiteError}
                autoComplete="off" 
                error={state.websiteError !== ""}
                required
                variant="outlined"
              />
            </FormControl>
            <div>
              {singnatory.map((e, i) => {
                return (
                  <div key={i} >
                    <Box >
                      <TextField
                        sx={{ m: 1, width: "25ch" }}
                        id="outlined-basic"
                        label={`Authorised signature${i + 1}`}
                        variant="outlined"
                        name="authorizesSignature"
                        required
                        autoComplete="off" 
                        value={e.authorizesSignature}
                        onChange={(e) => handleInputChange(e, i)}
                      />

                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Designation"
                          variant="outlined"
                          required
                          autoComplete="off" 
                          name="Designation"
                          value={e.Designation}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormControl>
                      <TextField
                        sx={{ m: 1, width: "25ch" }}
                        id="outlined-basic"
                        label="Email Id"
                        name="emailid"
                        value={e.emailid}
                        required
                        autoComplete="off" 
                        onChange={(e) => handleInputChange(e, i)}
                        variant="outlined"
                      />
                      <FormControl
                        sx={{ m: 1, width: "25ch" }}
                        variant="outlined"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Mobile number"
                          required
                          autoComplete="off" 
                          variant="outlined"
                          name="mobileNo"
                          value={e.mobileNo}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </FormControl>
                      {singnatory.length - 1 === i && (
                        <AddCircleIcon style={{ color:"red" }} onClick={handleAdd} />
                      )}

                      {singnatory.length !== 1 && (
                        <RemoveCircleIcon style={{ color:"red" }}
                          onClick={() => handleRemove(i)}
                        />
                      )}
                    </Box>
                  </div>
                );
              })}
            </div>
            <br />
            <div style={{textAlign: "center"}} >
            <button   className="button"  onClick={handleCilck}>
              Submit
            </button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
     
    </>
  );
}

export default UserDetails;
