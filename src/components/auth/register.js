import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config"
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [registerData, setRegisterData] = useState({ email: "", password: "", name: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const handleCredentials = (e) => {
    if (e.target.name === "email") {
      setRegisterData({ ...registerData, email: e.target.value })
    } else if (e.target.name === "name") {
      setRegisterData({ ...registerData, name: e.target.value })

    }

    else {
      setRegisterData({ ...registerData, password: e.target.value })
    }
  }
  const handleShow = () => {

    setShowPassword(true)
  }
  const handleHide = () => {
    setShowPassword(false)

  }

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      updateProfile(auth.currentUser, { displayName: registerData.name })

      setMessage('')
      navigate("/")
    } catch (err) {
      setMessage(err.message)
      console.log(err)
    }
  }
  return (
    <div className="col-12 col-sm-3 mt-5">

      {message && <p style={{ color: "red" }}>{message}</p>}

      <Form>
        <FormGroup>
          <Label htmlFor="name">
            Name
          </Label>
          <Input type="text" placeholder="type your name" id="name" name="name" onChange={handleCredentials} />
        </FormGroup>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="type your email"
            type="email"
            value={registerData.email}
            onChange={handleCredentials}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="type your password"
            type={showPassword ? "text" : "password"}
            value={registerData.password}
            onChange={handleCredentials}
          />
          {!showPassword ? <FiEyeOff onClick={handleShow} /> :
            <FiEye onClick={handleHide} />}
        </FormGroup>
        <Button color="success" onClick={handleRegister}>
          Register
        </Button>

      </Form>
    </div>
  )
}
export default Register;


