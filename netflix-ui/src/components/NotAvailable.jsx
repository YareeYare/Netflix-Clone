import React from 'react'

const NotAvailable = ({ type }) => {
      return (
            <h1 className='not-available'>
                  No {type} Available for selected genre
            </h1>
      )
}

export default NotAvailable