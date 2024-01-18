import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Netflix_Video from '../assets/Netflix_Video.mp4'
import { IoPlayCircleSharp } from 'react-icons/io5' 
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri' 
import { BsCheck } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai' 
import { BiChevronDown } from 'react-icons/bi' 

import { firebaseAuth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'
import { removeFromLikedMovies } from '../store'
import { useDispatch } from 'react-redux'

export default React.memo(

      function Card({ movieData, isLiked = false }){
            const navigate = useNavigate()

            const [isHovered, setIsHovered] = useState(false)
            const [email, setEmail] = useState(undefined)

            // This is provided by FireBase
            onAuthStateChanged(firebaseAuth, (currentUser) => {
                  if (currentUser) setEmail(currentUser.email)
                  else navigate('/login')
            });

            const addToList = async () => {
                  try {
                        await axios.post('http://localhost:5001/api/user/add', { email, data:movieData })
                  } catch(err) {
                        console.log( err )
                  }
            }

            const dispatch = useDispatch()

            return (
                  <Container
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                  >
                        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`}  alt='movie' />

                        { isHovered && (
                                    <div className='hover'>
                                          <div className='image-video-container'>
                                                <img
                                                      src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
                                                      alt='movie'
                                                      onClick={() => navigate('/player')}
                                                />
                                                <video src={Netflix_Video} autoPlay loop controls muted />
                                          </div>

                                          <div className="info-container flex column">
                                                <h3 className='name' onClick={() => navigate('./player')} >{ movieData.name }</h3>
                                                <div className="icons flex j-between">
                                                      <div className="controls flex">
                                                            <IoPlayCircleSharp
                                                                  title='play'
                                                                  onClick={() => navigate('/player')}
                                                            />
                                                            <RiThumbUpFill title='Like' />
                                                            <RiThumbDownFill title='Dislike' />
                                                            {
                                                                  isLiked ? (
                                                                        <BsCheck title='Remove from list' onClick={()=>dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))} />
                                                                  ) : (
                                                                        <AiOutlinePlus title='Add to my list' onClick={addToList} />
                                                                  )
                                                            }
                                                      </div>
                                                      <div className="info">
                                                            <BiChevronDown title='More Info' />
                                                      </div>
                                                </div>

                                                <div className="genres flex">
                                                      <ul className='flex'>{ movieData.genres.map( (genre) => {
                                                            return <li key={genre} >{ genre }</li>
                                                      })}</ul>
                                                </div>
                                          </div>
                                    </div>
                              )
                        }

                  </Container>
            )
      }
)

const Container = styled.div`
      max-width: 230px;
      width: 230px;
      height: 100%;
      cursor: pointer;
      position: relative;
      
      img {
            border-radius: 0.2rem;
            width: 130%;
            z-index: 10;
      }
      .hover {
            z-index: 90;
            height: max-content;
            width: 20rem;
            position: absolute;
            top: -18vh;
            left: 0;
            border-radius: 0.3rem;
            box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
            background-color: #181818;
            transition: 0.3s ease-in-out;
            .image-video-container {
                  position: relative;
                  height: 140px;
                  img {
                        width: 100%;
                        height: 140px;
                        object-fit: cover;
                        border-radius: 0.3rem;
                        top: 4;
                        z-index: 4;
                        position: absolute;
                  }
                  video {
                        display: none;
                        width: 100%;
                        height: 140px;
                        object-fit: cover;
                        border-radius: 0.3rem;
                        top: 0;
                        z-index: 5;
                        position: absolute;
                  }
            }

            .info-container {
                  padding: 1rem;
                  gap: 0.5rem;
            }

            .icons {
                  .controls {
                        display: flex;
                        gap: 1rem;
                  }
            }

            svg {
                  font-size: 2rem;
                  cursor: pointer;
                  transition: 0.3s ease-in-out;
                  &: hover {
                        color: #b8b8b8;
                  }
            }
            
            .genres {
                  ul {
                        gap: 1rem;
                        li {
                              padding-right: 0.7rem;
                              &: first-of-type {
                                    list-style-type: none;
                              } 
                        }
                  }
            }
      }

`