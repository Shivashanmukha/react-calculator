import React from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick} className='btn btn-outline-dark w-25' value={props.value}
            style={{
              width: '60px',
              height: '60px',
              margin: '5px',
              backgroundColor: '#333', // Dark background
              color: '#fff', // White text
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              transition: 'background-color 0.3s, transform 0.2s',
            }}>
              {props.value}</button>
    </>
  )
}

export default Button
