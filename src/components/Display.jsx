// import React from 'react'

// const Display = (props) => {
//   return (
//     <>
//       <h1 className='p-1 border border-warning text-end'>{props.data}</h1>
//     </>
//   )
// }

// export default Display

import React from 'react';

const Display = (props) => {
  return (
    <div className='p-2 border border-warning rounded text-end' style={{ fontSize: '2rem', minHeight: '50px', backgroundColor: '#f9f9f9' }}>
      {props.data}
    </div>
    // <div className='disco-background border border-warning'>
    //   {props.data}
    // </div>
  );
}

export default Display;