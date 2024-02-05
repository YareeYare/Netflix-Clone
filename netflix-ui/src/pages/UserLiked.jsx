import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUserLikedMovies } from '../store'
import { firebaseAuth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Card from '../components/Card'

export default React.memo(
      function UserLiked(){
            const navigate = useNavigate()

            const [ isScrolled, setIsScrolled ] = useState(false)
      
            const movies = useSelector((state) => state.netflix.movies )

            const [email, setEmail] = useState(undefined)

            // This is provided by FireBase
            onAuthStateChanged(firebaseAuth, (currentUser) => {
                  if (currentUser) setEmail(currentUser.email)
                  else navigate('/login')
            });
      
            const dispatch = useDispatch()
            
            useEffect(() => {
                  if(email) { 
                        dispatch(getUserLikedMovies(email))
                  }
            },[email])
      
            window.onscroll = () => {
            setIsScrolled( window.scrollY === 0 ? false : true )
            return () => (window.onscroll = null)
            }

            return (
                  <Container>
                        <Navbar isScrolled={isScrolled} />
                        <div className="content flex column">
                              <h1>My List</h1>
                              <div className="grid flex">
                                    { movies && movies.map( (movie,index) => {
                                          return (<Card movieData={movie} index={index} key={movie.id} isLiked={true} />)
                                    })}
                              </div>
                        </div>
                  </Container>
            )
      }
)

const Container = styled.div`
      .content {
            margin: 2.3rem;
            margin-top: 8rem;
            margin-right: 0rem;
            padding-left: 2.6rem;
            gap: 3rem;
            h1 {
                  margin-left: 3rem;
            }
            .grid {
                  flex-wrap: wrap;
                  gap: 6rem;
            }
      }
`