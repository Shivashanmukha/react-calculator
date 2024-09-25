import React from 'react';
import { useState, useEffect } from 'react';
import Keyboard from './Keyboard';
import Display from './Display';

const colors = ['#ff6666', '#66ff66', '#6666ff', '#ffff66', '#ff66ff', '#66ffff'];

const useDiscoEffect = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      @keyframes discoShadow {
        0% { box-shadow: 0 0 20px 5px rgba(255, 0, 0, 0.8); }
        20% { box-shadow: 0 0 20px 5px rgba(0, 255, 0, 0.8); }
        40% { box-shadow: 0 0 20px 5px rgba(0, 0, 255, 0.8); }
        60% { box-shadow: 0 0 20px 5px rgba(255, 255, 0, 0.8); }
        80% { box-shadow: 0 0 20px 5px rgba(255, 0, 255, 0.8); }
        100% { box-shadow: 0 0 20px 5px rgba(0, 255, 255, 0.8); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
};

// const Calculator = () => {
//   const [data,setData]=useState('0')
//   const [lastOperation, setLastOperation] = useState(null); // Track if last operation was '='
 
//   // color on heading
//   const [headingColor, setHeadingColor] = useState(colors[0]);
//   useEffect(() => {
//     let colorIndex = 0;
//     const interval = setInterval(() => {
//       colorIndex = (colorIndex + 1) % colors.length;
//       setHeadingColor(colors[colorIndex]);
//     }, 1000); // Change color every second

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, []);

//   // function to handle the user Input
//   function handleClick(e){
//     console.log(e.target.value)

//     let curVal=e.target.value

//     // updating the Display based user Input
//     if(data===0){
//       setData(curVal)
//     }else{
//       setData(prev=>prev+""+curVal)
//     }

//     // calculating the results
//     if(curVal=="="){
//       // let result=eval(data)
//       // setData(result)
//       try {
//         const result = eval(data); // Handle evaluation safely
//         setData(result.toString()); // Display the result
//         setLastOperation('='); // Set the last operation to '='
//       } catch {
//         setData("Error");
//         setLastOperation(null); // Reset last operation on error
//       }
      
//     }else if(curVal=="AC"){
//       setData(0)
//     }else if(curVal=="C"){
//       let sval = data  // This is the value that is present  in the display
//       // console.log(sval.slice(0,sval.length-1))
//       // setData(sval.slice(0,sval.length-1))
//       if(sval.length>1){
//         setData(sval.slice(0,sval.length-1))
//       }else{
//         setData(0)
//       }
//     }
//   }

const Calculator = () => {
  const [data, setData] = useState('0');
  const [resultShown, setResultShown] = useState(false); // Track if result was shown

  const [headingColor, setHeadingColor] = useState(colors[0]);

  useEffect(() => {
    let colorIndex = 0;
    const interval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setHeadingColor(colors[colorIndex]);
    }, 1000); // Change color every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // keyboard function
  useEffect(() => {
    const handleKeyPress = (event) => {
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '=', 'Enter', 'Backspace', 'Escape', '.'];

      if (allowedKeys.includes(event.key)) {
        let keyPressed = event.key;
        
        if (keyPressed === 'Enter') {
          keyPressed = '=';
        } else if (keyPressed === 'Backspace') {
          keyPressed = 'C'; // Using C for clear (last character)
        } else if (keyPressed === 'Escape') {
          keyPressed = 'AC'; // Using Escape for all clear
        }

        handleClick({ target: { value: keyPressed } });
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [data]); // Adding `data` as dependency to ensure it's always in sync


  function handleClick(e) {
    const curVal = e.target.value;

    if (curVal === "=") {
      try {
        const result = eval(data); // Handle evaluation safely
        setData(result.toString()); // Display the result
        setResultShown(true); // Mark that result was shown
      } catch {
        setData("Error");
        setResultShown(false); // Reset on error
      }
    } else if (curVal === "AC") {
      setData("0");
      setResultShown(false); // Reset
    } else if (curVal === "C") {
      setData(data.length > 1 ? data.slice(0, -1) : "0");
      setResultShown(false); // Reset
    } else {
      if (resultShown) {
        // If the result was shown, start fresh with the new input
        setData(curVal);
        setResultShown(false); // Reset
      } else {
        // Append to the current data
        setData(prevData => (prevData === "0" ? curVal : prevData + curVal));
      }
    }
  }

  return (
    <>
    <div
    style={{
        backgroundImage: `url('./src/assets/calculator.jpg')`, // Replace with your image path
        backgroundSize: 'cover',
        // backgroundPosition: 'center',
        width: '100%',
        height: '100vh', // Set the height of the container
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
    {/* <div className='d-flex justify-content-center align-item-center'>
      <h1 style={{color:'red'}}>CALCULATOR</h1>
    </div> */}
    {/* Title with dynamic color change */}
      <h1 style={{
        marginBottom: '20px',
        textAlign: 'center',
        color: headingColor, // Apply dynamic color
        transition: 'color 1s ease-in-out'
      }}>
        CALCULATOR
      </h1>
    <div className='card mx-auto mt-5'
        style={{
          width: '100%',
          maxWidth: '300px',
          // padding: '10px',
          boxShadow: '0 0 20px 5px rgba(255, 0, 0, 0.8)',
          animation: 'discoShadow 6.5s infinite',
          borderRadius: '10px',
          backgroundColor: 'white',
          color: 'black'
        }}
      >
        <Display data={data} />
      <div className="card-body bg-dark">
        <Keyboard onClick={handleClick}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Calculator


