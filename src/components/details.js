import { useState } from "react";
import capitalize from "../common/capitalizeText"
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap"
import { auth, storage, db } from "../config"
import { useAuthState } from "react-firebase-hooks/auth"

import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";



const Details = ({ data }) => {
  const [userInfo] = useAuthState(auth)
  const navigate = useNavigate()
  const handleRemove = async (id, image) => {

    try {
      navigate("/")
      await deleteDoc(doc(db, "myfire", id))
      const storageRef = ref(storage, image)
      await deleteObject(storageRef)

    } catch (error) {
      console.log(error.message)
    }

  }


  return (
    <Card
      style={{
        width: '18rem',
        marginTop: "30px"
      }}
    >
      <img
        alt="Card"
        src={data.imageUrl}
      />
      <CardBody>
        <CardTitle tag="h5">
          Created by: {capitalize(data.createdBy)}
        </CardTitle>
        <CardText>
          {capitalize(data.description)}.
        </CardText>
      </CardBody>

      {userInfo && <CardBody>
        <Button color="primary" className="me-5">Update</Button>
        <Button color="danger" onClick={() => handleRemove(data.id, data.imageUrl)}>Delete</Button>
      </CardBody>}
    </Card>
  )
}

export default Details;
