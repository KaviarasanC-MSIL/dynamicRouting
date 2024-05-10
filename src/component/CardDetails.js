import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

export const CardDetails = () => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(id)

  useEffect(() => {
    const fetchData = () => {
      try {
        fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setComment(data);
            setLoading(false)
          })
      } catch (error) {
        console.log("Unable to fetch the data" + error)
      }
    }
    fetchData()
  }, [id]);
  return (
    <>

      <div className="user-cards">
        {loading ? <div className='loader'></div> :
          comment && <div className="user-card" >
            <img src={`https://robohash.org/${comment.name}.png?set=set1&size=150x150`} alt={""} />
            <div>
              <h2>{comment.name}</h2>
              <h4>{comment.name}</h4>
              <p>{comment.body}</p>
            </div>

          </div>
        }
      </div>
    </>
  )
}
