import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMovies, getGenres } from '../store'
import { firebaseAuth } from '../utils/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import styled from 'styled-components'
import NotAvailable from '../components/NotAvailable'
import Slider from '../components/Slider'
import Navbar from '../components/Navbar'
import SelectGenre from '../components/SelectGenre'

const Movies = () => {

      const navigate = useNavigate()

      const [ isScrolled, setIsScrolled ] = useState(false)
    
      const genresLoaded = useSelector((state) => state.netflix.genresLoaded )
      const movies = useSelector((state) => state.netflix.movies )
      const genres = useSelector((state) => state.netflix.genres )
    
      const dispatch = useDispatch()
      
      useEffect(() => {
        dispatch(getGenres())
      },[])
    
      useEffect(() => {
        if( genresLoaded ) dispatch( fetchMovies({ type : "movie" }) )
      },[genresLoaded])
    
      window.onscroll = () => {
        setIsScrolled( window.scrollY === 0 ? false : true )
        return () => (window.onscroll = null)
      }

      onAuthStateChanged(firebaseAuth, (currentUser)=> {
            // if( currentUser ) navigate('/')
          })

      return (
            <Container>
                  <div className="navbar">
                        <Navbar isScrolled={isScrolled} />
                  </div>
                  <div className='data'>
                        <SelectGenre genres={genres} type='movie'/>
                        {
                              movies ? <Slider movies={movies} /> :
                              <NotAvailable type={'Movies'}/>
                        }
                  </div>
            </Container>
      )
}

const Container = styled.div`
      .data {
            margin-top: 8rem;
            .not-available {
                  text-align: center;
                  color: white;
                  margin-top: 4rem;
            }
      }
`

export default Movies