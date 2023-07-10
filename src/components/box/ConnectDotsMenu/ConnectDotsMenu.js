import React, { useState } from 'react'
import './ConnectDotsMenu.css'
import { Link } from 'react-router-dom';

const ConnectDotsMenu = () => {
  const [name1,setName1]=useState('');
  const [name2,setName2]=useState('');
  const [size,setSize]=useState(6);
  const [diff,setDiff]=useState(0);
  const [isSinglePlayer,setIsSinglePlayer]=useState(-1);
  const showSingle=()=>{
    document.getElementById('pge').style.zIndex=1000;
    document.getElementById('pge2').style.zIndex=1;
    document.getElementById('modeSelect').style.zIndex=2;
    setIsSinglePlayer(1);
  }
  const showMulti=()=>{
    document.getElementById('pge2').style.zIndex=1000;
    document.getElementById('pge').style.zIndex=1;
    document.getElementById('modeSelect').style.zIndex=2;
    setIsSinglePlayer(0);
  }
  const ShowMenu=()=>{
    document.getElementById('pge2').style.zIndex=2;
    document.getElementById('pge').style.zIndex=1;
    document.getElementById('modeSelect').style.zIndex=1000;
  }
  return (
    <>
    <div id="modeSelect">
        <div className="rules">
          <div className="rulesTxt">
            <h1 style={{textAlign:'center',fontSize:'26px'}}>Rules</h1>
            <ul>
              <li>Max two players can play in a multi player mode and in single player mode you play against the computer.</li>
              <li>The game starts with a board with nXn dots.</li>
              <li>Players take chance alternatively.</li>
              <li>A chance includes connecting two dots which were not already connected.</li>
              <li>If on connecting two dots a box is created with all its four sides connected then the current players scores a point and gets an extra chance.</li>
              <li>The game continues till there are no line is left to be drawn.</li>
              <li>The one with greater score wins the match.</li>
            </ul>
          </div>
        </div>
        <div className="single" onClick={showSingle}>
          Single Player Mode
        </div>
        <div className="multi" onClick={showMulti}>
          Multi Player Mode
        </div>
    </div>
    <div id='pge'>
      <div className="frm">
        <div className="pl1">
          <div className="inp1">
            Enter your Name:
          </div>
          <input 
            className='inpt'
            type="text" 
            value={name1}
            onChange={(e)=>setName1(e.target.value)}
          />
        </div>
        <div className="difficulty_size">
          <div className="inp1">
            Difficulty:
          </div>
          <select className='incWidthOfinp' value={diff} onChange={(e)=>setDiff(e.target.value)}>
            <option value="0">Beginner</option>
            <option value="1" selected>Intermediate</option>
            <option value="2">Hard</option>
          </select>
        </div>
        <div className="difficulty_size">
          <div className="inp1">
            Size of Matrix:
          </div>
          <select className='incWidthOfinp' value={size} onChange={(e)=>setSize(e.target.value)}>
            <option value="6">5X5 matrix</option>
            <option value="8" selected>7X7 matrix</option>
            <option value="10">9X9 matrix</option>
          </select>
        </div>
        <div className="sbmt">
          <div className="strtBtn" onClick={ShowMenu}>Back</div>
          <Link style={{textDecoration:'none'}} to={'/Game'} state={{isSinglePlayer,name1,diff,size}}>
            <div className="strtBtn">Start</div>
          </Link>
        </div>
      </div>
    </div>
    <div id='pge2'>
      <div className="frm">
        <div className="pl1">
          <div className="inp1">
            Enter player1 Name:
          </div>
          <input 
            className='inpt'
            type="text" 
            value={name1}
            onChange={(e)=>setName1(e.target.value)}
          />
        </div>
        <div className="pl1">
          <div className="inp1">
            Enter player2 Name:
          </div>
          <input 
            className='inpt'
            type="text" 
            value={name2}
            onChange={(e)=>setName2(e.target.value)}
          />
        </div>
        <div className="difficulty_size">
          <div className="inp1">
            Size of Matrix:
          </div>
          <select className='incWidthOfinp' value={size} onChange={(e)=>setSize(e.target.value)}>
            <option value="6">5X5 matrix</option>
            <option value="8" selected>7X7 matrix</option>
            <option value="10">9X9 matrix</option>
          </select>
        </div>
        <div className="sbmt">
          <div className="strtBtn" onClick={ShowMenu}>Back</div>
          <Link style={{textDecoration:'none'}} to={'/Game'} state={{isSinglePlayer,name1,name2,size}}>
            <div className="strtBtn">Start</div>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default ConnectDotsMenu
