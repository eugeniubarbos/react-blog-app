import { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config"
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const handleCredentials = (e) => {
    if (e.target.name === "email") {
      setLoginData({ ...loginData, email: e.target.value })
    } else {
      setLoginData({ ...loginData, password: e.target.value })
    }
  }
  const handleShow = () => {

    setShowPassword(true)
  }
  const handleHide = () => {
    setShowPassword(false)

  }
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      setMessage('')
      navigate('/')

    } catch (error) {
      setMessage(error.message)
      console.log(error.message)
    }
  }
  return (
    <div className="col-12 col-sm-3 mt-5">
      {message && <p style={{ color: "red" }}>{message}</p>}
      <Form>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="type your email"
            type="email"
            value={loginData.email}
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
            value={loginData.password}
            onChange={handleCredentials}
          />
          {!showPassword ? <FiEyeOff onClick={handleShow} /> :
            <FiEye onClick={handleHide} />}
        </FormGroup>
        <Button color="success" onClick={handleSignIn}>
          Login
        </Button>

      </Form>
    </div>
  )
}
export default Login;
