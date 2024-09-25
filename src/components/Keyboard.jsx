import React from 'react';
import { useEffect } from 'react';
import Button from './Button';

const useDiscoEffect = () => {
    useEffect(() => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `
        @keyframes discoLight {
          0% { background-color: #ff6666; }
          20% { background-color: #66ff66; }
          40% { background-color: #6666ff; }
          60% { background-color: #ffff66; }
          80% { background-color: #ff66ff; }
          100% { background-color: #66ffff; }
        }
        .disco-button {
          animation: discoLight 1.5s infinite;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }, []);
  };

const Keyboard = (props) => {
  console.log(props)
  return (
    <div className="container">
        <div className="d-flex">
            <Button value="AC" onClick={props.onClick} className='disco-button'/>
            <Button value="C" onClick={props.onClick} className='disco-button'/>
            <Button value="%" onClick={props.onClick} className='disco-button'/>
            <Button value="/" onClick={props.onClick} className='disco-button'/>
        </div>
        <div className="d-flex">
            <Button value="7" onClick={props.onClick} className='disco-button'/>
            <Button value="8" onClick={props.onClick} className='disco-button'/>
            <Button value="9" onClick={props.onClick} className='disco-button'/>
            <Button value="*" onClick={props.onClick} className='disco-button'/>
        </div>
        <div className="d-flex">
            <Button value="4" onClick={props.onClick} className='disco-button'/>
            <Button value="5" onClick={props.onClick} className='disco-button'/>
            <Button value="6" onClick={props.onClick} className='disco-button'/>
            <Button value="-" onClick={props.onClick} className='disco-button'/>
        </div>
        <div className="d-flex">
            <Button value="1" onClick={props.onClick} className='disco-button'/>
            <Button value="2" onClick={props.onClick} className='disco-button'/>
            <Button value="3" onClick={props.onClick} className='disco-button'/>
            <Button value="+" onClick={props.onClick} className='disco-button'/>
        </div>
        <div className="d-flex">
            <Button value="0" onClick={props.onClick} className='disco-button'/>
            <Button value="00" onClick={props.onClick} className='disco-button'/>
            <Button value="." onClick={props.onClick} className='disco-button'/>
            <Button value="=" onClick={props.onClick} className='disco-button'/>
        </div>
    </div>
  )
}

export default Keyboard
