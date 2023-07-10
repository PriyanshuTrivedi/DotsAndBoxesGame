import React, { useContext } from 'react'
import { Data } from '../../Connect_dots'
import './Results.css'
import { Link } from 'react-router-dom';

const Results = () => {
    const data=useContext(Data);
    const userName=data.userName;
    const user1Score=data.userScore,compScore=data.compScore;
    const diff=Math.abs(user1Score-compScore);
    const winner=user1Score>compScore?userName:"Computer";
    return (
        <div className="resBox">
            <div className="mainRes">
                {winner} wins by a score difference of {diff}.
            </div>
            <div className="btn">
                <div className="restart mrgn" onClick={data.resetAll}>Restart</div>
                <Link style={{textDecoration:'none'}} to={'/'}><div className="mainMenu mrgn">Main Menu</div></Link>
            </div>
        </div>
    )
}

export default Results
