import { createContext,useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Connect_dots.css'
import Make_grid from './box/Make_grid/Make_grid';
import ScoreBoard from './box/ScoreBoard/ScoreBoard';
import Results from './box/results/Results';
import { Link } from 'react-router-dom';
const Data=createContext();

const Connect_dots = () => {
    const loc=useLocation();
    let userName,userName2,diff,gridSize,isSingle;
    diff=0;userName2="Computer";
    isSingle=loc.state.isSinglePlayer;
    if(isSingle===1){
        diff=loc.state.diff;
    }
    else{
        userName2=loc.state.name2;
    }
    userName=loc.state.name1;
    diff=loc.state.diff;
    gridSize=loc.state.size;
    const [userScore,setUserScore]=useState(0);
    const [compScore,setCompScore]=useState(0);
    const [descr,setDescr]=useState([]);
    const [chance,setChance]=useState(0);
    const resetAll=()=>{
        setUserScore(0);
        setCompScore(0);
        setDescr([]);
        document.getElementById('userHourGlass').style.display='block';
        document.getElementById('compHourGlass').style.display='none';
        let i,j;
        for(i=1;i<=gridSize;i++){
            for(j=1;j<gridSize;j++){
                document.getElementById(`0,${i},${j}`).style.backgroundColor='#bfd7da';
            }
        }
        for(i=1;i<gridSize;i++){
            for(j=1;j<=gridSize;j++){
                document.getElementById(`1,${i},${j}`).style.backgroundColor='#bfd7da';
            }
        }
        for(i=1;i<gridSize;i++){
            for(j=1;j<gridSize;j++){
                document.getElementById(`2,${i},${j}`).style.backgroundColor='#bebba9';
            }
        }
    }
    return (
        <div className="connectDotsGame">
            <Data.Provider value={{gridSize,userScore,setUserScore,compScore,setCompScore,userName,userName2,descr,setDescr,resetAll,diff,isSingle,chance,setChance}}>
                <div className="mainGame">
                    <div className="mainGrid">
                        <Make_grid/>
                    </div>
                    <div className="cont1">
                        <div className="btns">
                            <div className="restrt stylebtns" onClick={resetAll}>Restart</div>
                            <Link style={{textDecoration:'none'}} to={'/'}><div className="quitMainMenu stylebtns">Quit to main menu</div></Link>
                        </div>
                        <div className="gameInfo">
                            <ScoreBoard/>
                        </div>
                    </div>
                    <div style={userScore+compScore===(gridSize-1)*(gridSize-1)?{visibility:'visible'}:{visibility:'hidden'}} className="res">
                        <Results/>
                    </div>
                </div>
            </Data.Provider>
        </div>
    )
}
export default Connect_dots
export {Data}
