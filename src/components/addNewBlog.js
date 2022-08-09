import { useEffect, useState } from "react";
import { Input, Form, Button } from "reactstrap"
import { auth, storage, db } from "../config"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"


const AddNewBlog = () => {
  const navigate = useNavigate()
  const [userInfo] = useAuthState(auth)
  const [data, setData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    createdAt: Timestamp.now().toDate()

  })

  const handlePublish = () => {
    if (!data.title || !data.description || !data.imageUrl) {
      alert("fill in required fileds")
      return
    }
    const storageRef = ref(storage, `/images/${Date.now()}${data.imageUrl.name}`)
    const uploadImage = uploadBytesResumable(storageRef, data.imageUrl)
    uploadImage.on("image data upload",
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const file = collection(db, "myfire");
          addDoc(file, {
            title: data.title,
            description: data.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: userInfo.displayName
          })

        })
      }
    )
    navigate("/")

  }

  const handleChange = (e) => {
    if (e.target.name === "text") {
      setData({ ...data, description: e.target.value })
    }
    if (e.target.name === "title") {
      setData({ ...data, title: e.target.value })

    }
  }
  const handleImage = (e) => setData({ ...data, imageUrl: e.target.files[0] })

  console.log(data, "<<<<<<<<???>")

  return (
    <div className="col-sm-3 mt-5">
      {userInfo ?
        <Form>
          <Input
            name="title"
            value={data.title}
            placeholder="type your title"
            type="text"
            onChange={handleChange}
          // value={loginData.email}
          // onChange={handleCredentials}
          />
          <Input
            value={data.description}
            name="text"
            type="textarea"
            placeholder="type description"
            onChange={handleChange}

          />
          <Input
            name="image"
            type="file"
            accept='image/*'
            onChange={handleImage}
          />
          <Button color="primary" onClick={handlePublish}>Publish</Button>


        </Form> :
        <h4>Please <span style={{ color: "blue", fontSize: "2rem", cursor: "pointer" }} onClick={() => navigate("/login")}>sign in</span>  first or <span style={{ color: "blue", fontSize: "2rem", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</span>  a new Account</h4>
      }
    </div>
  )
}


export default AddNewBlog;
