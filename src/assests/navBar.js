
import { Nav, NavItem, NavLink } from "reactstrap"
import { Link } from "react-router-dom"
import { auth } from "../config"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import capitalize from "../common/capitalizeText"
const Navigation = () => {
  const [userInfo] = useAuthState(auth)
  console.log(userInfo, "<<<<<<<<")
  return (


    <Nav pills>
      <NavItem>
        <NavLink
          active
        >
          <Link to="/" style={{ color: "white" }}>
            Home
          </Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink >
          <Link to='addNewBlog'>
            Publish
          </Link>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink >
          Contacts
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink>
          More...
        </NavLink>
      </NavItem>
      <NavItem>
        {userInfo ? <NavLink style={{ cursor: "pointer" }} onClick={() => signOut(auth)}>
          Log out
        </NavLink> : ""}
      </NavItem>
      <NavItem>
        {userInfo ? <NavLink style={{ fontWeight: "bold" }}>Welcome {capitalize(userInfo.displayName)}</NavLink> : ""}
      </NavItem>
    </Nav>
  )
}

export default Navigation;
