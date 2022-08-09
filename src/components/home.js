import { useEffect, useState } from "react";

import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from "../config"
import { Card, CardBody, CardTitle, CardText } from "reactstrap"
import { useNavigate } from "react-router-dom"
import capitalize from "../common/capitalizeText"
function Home({ fetchDataFromHome }) {
  const [files, setFiles] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const files = collection(db, "myfire")
    console.log(files, "???????")
    const queryByDate = query(files, orderBy("createdAt", "desc"))
    console.log(queryByDate, "queryByDate")
    onSnapshot(queryByDate, (snapshot) => {
      console.log(snapshot, "<<<<<<")
      const files = snapshot.docs.map(i => ({
        id: i.id,
        ...i.data()
      }))
      setFiles(files)
    })
  }, [])
  const handleDetails = (item) => {
    fetchDataFromHome(item)
    navigate("/details")

  }
  console.log(capitalize("asdasd"))
  return (
    <>
      {files.length ? files.map(item => {
        return (
          <div key={item.id} className="col-12 col-sm-3" onClick={() => handleDetails(item)}>
            <Card
              style={{
                width: '18rem',
                marginTop: "10px",
                height: "380px"
              }}
            >
              <CardBody>
                <CardTitle tag="h5">
                  Created by: {capitalize(item.title)}
                </CardTitle>

              </CardBody>
              <img
                alt="Card image cap"
                src={item.imageUrl}
                width="100%"
                height="200px"
              />
              <CardBody>
                <CardText>
                  {capitalize(item.description.slice(0, 20))}...
                </CardText>
              </CardBody>
              <CardBody>
                <CardText>
                  created by: {capitalize(item.createdBy)}
                </CardText>
              </CardBody>
            </Card>
          </div>
        )
      }) : <p>No blogs published yet</p>}
    </>
  )
}

export default Home;
