import React from 'react'
import background from '../assets/login.jpg'
import styled from 'styled-components'

const BackgroundImage = () => {
  return (
    <div>
      <Container>
            <img src={background} alt='background image' />
      </Container>
    </div>
  )
}

const Container = styled.div`
      height: 100vh;
      width: 100vw;
      img{
            height: 100vh;
            width: 100vw;
      }
`

export default BackgroundImage