import React from 'react'
import './Box.css'
import { useContext } from 'react'
import { Data } from '../Connect_dots'

const Box = ({box_i_index,box_j_index}) => {
    const data=useContext(Data);
    const n=data.gridSize;
    const diff=data.diff;
    const isSingle=data.isSingle;
    let compTakingChance=false;
    const checkIfBlack=(color)=>{
        return (color==='rgb(0, 0, 0)');
    }
    const fillBox=(i,j,isComp)=>{
        document.getElementById(`2,${i},${j}`).style.backgroundColor=(isComp)?'#03fc3d':'#fc0303';
    }
    const checkTop=(i,j,copyHoriLine,copyVertLine)=>{
        if(i-1>=1){
            return (copyHoriLine[i-1][j]+copyVertLine[i-1][j]+copyVertLine[i-1][j+1]);
        }
        return 0;
    }
    const checkBottom=(i,j,copyHoriLine,copyVertLine)=>{
        if(i+1<=n){
            return (copyHoriLine[i+1][j]+copyVertLine[i][j]+copyVertLine[i][j+1]);
        }
        return 0;
    }
    const checkLeft=(i,j,copyHoriLine,copyVertLine)=>{
        if(j-1>=1){
            return (copyHoriLine[i][j-1]+copyHoriLine[i+1][j-1]+copyVertLine[i][j-1]);
        }
        return 0;
    }
    const checkRight=(i,j,copyHoriLine,copyVertLine)=>{
        if(j+1<=n){
            return (copyHoriLine[i][j]+copyHoriLine[i+1][j]+copyVertLine[i][j+1]);
        }
        return 0;
    }
    // making line according to the id and checking for score update, description update and chance update. It returns whether the chance is over or not
    const makeLine=(id,isComp,idx,desc)=>{
        document.getElementById(id).style.backgroundColor='#000000';
        data.setDescr(desc);
        const arr=id.split(',');
        let isVert,i,j,totalScoreUpdate;
        let copyHoriLine=Array.from({length: n+1},()=> Array.from({length: n}, () => false));
        let copyVertLine=Array.from({length: n},()=> Array.from({length: n+1}, () => false));
        for(i=1;i<=n;i++){
            for(j=1;j<n;j++){
                if(checkIfBlack(document.getElementById(`0,${i},${j}`).style.backgroundColor))
                copyHoriLine[i][j]=true;
            }
        }
        for(i=1;i<n;i++){
            for(j=1;j<=n;j++){
                if(checkIfBlack(document.getElementById(`1,${i},${j}`).style.backgroundColor))
                copyVertLine[i][j]=true;
            }
        }
        totalScoreUpdate=0;isVert=+arr[0];i=+arr[1];j=+arr[2];
        if(isVert){
            if(checkLeft(i,j,copyHoriLine,copyVertLine)===3){
                fillBox(i,j-1,isComp);
                totalScoreUpdate++;
            }
            if(checkRight(i,j,copyHoriLine,copyVertLine)===3){
                fillBox(i,j,isComp);
                totalScoreUpdate++;
            }
        }
        else{
            if(checkTop(i,j,copyHoriLine,copyVertLine)===3){
                fillBox(i-1,j,isComp);
                totalScoreUpdate++;
            }
            if(checkBottom(i,j,copyHoriLine,copyVertLine)===3){
                fillBox(i,j,isComp);
                totalScoreUpdate++;
            }
        }
        if(totalScoreUpdate===0)
        {
            if(isComp===1){
                document.getElementById('userHourGlass').style.display='block';
                document.getElementById('compHourGlass').style.display='none';
            }
            else{
                document.getElementById('userHourGlass').style.display='none';
                document.getElementById('compHourGlass').style.display='block';
            }
            return 1;
        }
        else{
            if(isComp===0){
                let prevScore=data.userScore;
                data.setUserScore(prevScore+idx+totalScoreUpdate);
            }
            else{
                let prevScore=data.compScore;
                data.setCompScore(prevScore+idx+totalScoreUpdate);
            }
        }
        return 0;
    }
    const randomIndex=(size)=>{
        return Math.floor(Math.random()*size);
    }
    // recursively finds how many maximum chances one take(in one direction meaning the completion of current square depends on the previous one) such that in each turn a box is made. It returns the sequence of ids in which those lines should be connected.  
    function slve(id,horiMat,vertMat,sequenceOfIds){
        let arr=id.split(',');
        let isVert,i,j;
        isVert=+arr[0];i=+arr[1];j=+arr[2];
        if(isVert){
            vertMat[i][j]=true;
            if(j+1<=n && checkLeft(i,j,horiMat,vertMat)===3){
                if(!horiMat[i][j] && checkBottom(i,j,horiMat,vertMat)===3){
                    let newId=`0,${i},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!horiMat[i+1][j] && checkTop(i+1,j,horiMat,vertMat)===3){
                    let newId=`0,${i+1},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!vertMat[i][j+1] && checkLeft(i,j+1,horiMat,vertMat)===3){
                    let newId=`1,${i},${j+1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                return sequenceOfIds;
            }
            else if(j-1>=1 && checkRight(i,j,horiMat,vertMat)===3){
                if(!horiMat[i][j-1] && checkBottom(i,j-1,horiMat,vertMat)===3){
                    let newId=`0,${i},${j-1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!horiMat[i+1][j-1] && checkTop(i+1,j-1,horiMat,vertMat)===3){
                    let newId=`0,${i+1},${j-1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!vertMat[i][j-1] && checkRight(i,j-1,horiMat,vertMat)===3){
                    let newId=`1,${i},${j-1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                return sequenceOfIds;
            }
            return sequenceOfIds;
        }
        else{
            horiMat[i][j]=true;
            if(i+1<=n && checkTop(i,j,horiMat,vertMat)===3){
                if(!vertMat[i][j] && checkRight(i,j,horiMat,vertMat)===3){
                    let newId=`1,${i},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!horiMat[i+1][j] && checkTop(i+1,j,horiMat,vertMat)===3){
                    let newId=`0,${i+1},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!vertMat[i][j+1] && checkLeft(i,j+1,horiMat,vertMat)===3){
                    let newId=`1,${i},${j+1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                return sequenceOfIds;
            }
            else if(i-1>=1 && checkBottom(i,j,horiMat,vertMat)===3){
                if(!vertMat[i-1][j] && checkRight(i-1,j,horiMat,vertMat)===3){
                    let newId=`1,${i-1},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!horiMat[i-1][j] && checkBottom(i-1,j,horiMat,vertMat)===3){
                    let newId=`0,${i-1},${j}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                else if(!vertMat[i-1][j+1] && checkLeft(i-1,j+1,horiMat,vertMat)===3){
                    let newId=`1,${i-1},${j+1}`;
                    sequenceOfIds.push(newId);
                    return slve(newId,horiMat,vertMat,sequenceOfIds);
                }
                return sequenceOfIds;
            }
            return sequenceOfIds;
        }
    }
    // finding the id of the most optimal line keeping in mind that completing a box is priority,if a box is being completed then we will find the sequence of ids by slve function and return it else do in the following order-> the one line which on making either maximum lines surrounding either of two boxes(left or right for vertical line and top or bottom for horizontal one) is minimal first we go with one which makes 1line represented in the oneLineMade then to the twoLineMade and finally to threeLineMade.
    const findOptimal=(ifIcolorThisId)=>{
        let i,j,k,id;
        let cpyHoriLine=Array.from({length: n+1},()=> Array.from({length: n}, () => false));
        let cpyVertLine=Array.from({length: n},()=> Array.from({length: n+1}, () => false));
        for(i=1;i<=n;i++){
            for(j=1;j<n;j++){
                if(checkIfBlack(document.getElementById(`0,${i},${j}`).style.backgroundColor))
                cpyHoriLine[i][j]=true;
            }
        }
        for(i=1;i<n;i++){
            for(j=1;j<=n;j++){
                if(checkIfBlack(document.getElementById(`1,${i},${j}`).style.backgroundColor))
                cpyVertLine[i][j]=true;
            }
        }
        if(ifIcolorThisId!==''){
            const arr=ifIcolorThisId.split(',');
            let isVert,i,j;
            isVert=+arr[0];i=+arr[1];j=+arr[2];
            if(isVert){
                cpyVertLine[i][j]=true;
            }
            else{
                cpyHoriLine[i][j]=true;
            }
        }
        let oneLineMade,twoLineMade,threeLineMade,boxCompleted;
        oneLineMade=[];twoLineMade=[];threeLineMade=[];boxCompleted=[];
        for(i=1;i<=n;i++){
            for(j=1;j<n;j++){
                if(!cpyHoriLine[i][j]){
                    id=`0,${i},${j}`;
                    k=Math.max(checkTop(i,j,cpyHoriLine,cpyVertLine),checkBottom(i,j,cpyHoriLine,cpyVertLine));
                    if(k===0){
                        oneLineMade.push(id);
                    }
                    else if(k===1){
                        twoLineMade.push(id);
                    }
                    else if(k===2){
                        threeLineMade.push(id);
                    }
                    else{
                        boxCompleted.push(id);
                    }
                }
            }
        }
        for(i=1;i<n;i++){
            for(j=1;j<=n;j++){
                if(!cpyVertLine[i][j]){
                    id=`1,${i},${j}`;
                    k=Math.max(checkLeft(i,j,cpyHoriLine,cpyVertLine),checkRight(i,j,cpyHoriLine,cpyVertLine));
                    if(k===0){
                        oneLineMade.push(id);
                    }
                    else if(k===1){
                        twoLineMade.push(id);
                    }
                    else if(k===2){
                        threeLineMade.push(id);
                    }
                    else{
                        boxCompleted.push(id);
                    }
                }
            }
        }
        let ans=[];
        if(boxCompleted.length){
            let arrOfSequenceOfIds=[];
            boxCompleted.forEach(id => {
                let sequenceOfIds=[];
                sequenceOfIds.push(id);
                let temp=slve(id,cpyHoriLine,cpyVertLine,sequenceOfIds);
                console.log(temp);
                let toBeAdded=[];
                temp.forEach(id => {
                    toBeAdded.push(id);
                });
                arrOfSequenceOfIds.push(toBeAdded);
            });
            arrOfSequenceOfIds.forEach(seq=>{
                seq.forEach(id=>{
                    if(id!==ans[ans.length-1])
                    ans.push(id);
                });
            });
        }
        return ans;
    }
    // computer takes chance 
    const takeChance=(desc)=>{
        compTakingChance=true;
        let finalIndex=0;
        // if difficulty is beginner we should not always let the comp find the optimal sequenceOfIds rather lett it be random because if computer never makes the optimal line it make the game boring
        if(diff>0 || Math.random()>=0.6){
            let sequenceOfIds=findOptimal('');
            finalIndex=sequenceOfIds.length;
            console.log(sequenceOfIds);
            sequenceOfIds.forEach((id,index) => {
                setTimeout(() => {
                    console.log(`comp->${id}`);
                    const arr=id.split(',');
                    let i,j,isVert;
                    isVert=+arr[0];i=+arr[1];j=+arr[2];
                    let finalDesc=[];
                    if(isVert===1){
                        finalDesc.push(<div className='clickedLine' key={id} style={{color:'green'}}>Computer connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1}</div>);
                    }
                    else{
                        finalDesc.push(<div className='clickedLine' key={id} style={{color:'green'}}>Computer connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1}</div>)
                    }
                    desc.forEach(elem=>{
                        finalDesc.push(elem);
                    });
                    console.log('comp chlra');
                    console.log(finalDesc);
                    makeLine(id,1,index,finalDesc);
                    desc=finalDesc;
                    finalIndex=index+1;
                }, (index+1)*1500);
            });
        }
        setTimeout(()=>{
            let i,j,k,id;
            let cpyHoriLine=Array.from({length: n+1},()=> Array.from({length: n}, () => false));
            let cpyVertLine=Array.from({length: n},()=> Array.from({length: n+1}, () => false));
            for(i=1;i<=n;i++){
                for(j=1;j<n;j++){
                    console.log(document.getElementById(`0,${i},${j}`).style.backgroundColor);
                    if(checkIfBlack(document.getElementById(`0,${i},${j}`).style.backgroundColor))
                    cpyHoriLine[i][j]=true;
                }
            }
            for(i=1;i<n;i++){
                for(j=1;j<=n;j++){
                    console.log(document.getElementById(`1,${i},${j}`).style.backgroundColor);
                    if(checkIfBlack(document.getElementById(`1,${i},${j}`).style.backgroundColor))
                    cpyVertLine[i][j]=true;
                }
            }
            let oneLineMade,twoLineMade,threeLineMade,boxCompleted;
            oneLineMade=[];twoLineMade=[];threeLineMade=[];boxCompleted=[];
            for(i=1;i<=n;i++){
                for(j=1;j<n;j++){
                    if(!cpyHoriLine[i][j]){
                        id=`0,${i},${j}`;
                        k=Math.max(checkTop(i,j,cpyHoriLine,cpyVertLine),checkBottom(i,j,cpyHoriLine,cpyVertLine));
                        if(k===0){
                            oneLineMade.push(id);
                        }
                        else if(k===1){
                            twoLineMade.push(id);
                        }
                        else if(k===2){
                            threeLineMade.push(id);
                        }
                        else{
                            boxCompleted.push(id);
                        }
                    }
                }
            }
            for(i=1;i<n;i++){
                for(j=1;j<=n;j++){
                    if(!cpyVertLine[i][j]){
                        id=`1,${i},${j}`;
                        k=Math.max(checkLeft(i,j,cpyHoriLine,cpyVertLine),checkRight(i,j,cpyHoriLine,cpyVertLine));
                        if(k===0){
                            oneLineMade.push(id);
                        }
                        else if(k===1){
                            twoLineMade.push(id);
                        }
                        else if(k===2){
                            threeLineMade.push(id);
                        }
                        else{
                            boxCompleted.push(id);
                        }
                    }
                }
            }
            let finalId='';
            // if the level is hard or random value is >=.8(low possibility) then the computer would think of another optimal approach and make the line that either doesnt dive the user a point or the one which ultimately gives least 
            if(diff>1 || Math.random()>=0.8){
                if(oneLineMade.length){
                    finalId=oneLineMade[randomIndex(oneLineMade.length)];
                }
                else if(twoLineMade.length){
                    finalId=twoLineMade[randomIndex(twoLineMade.length)];
                }
                else if(threeLineMade.length){
                    let minUserGain=n*n;
                    let optimalIdForComp='';
                    threeLineMade.forEach(id=>{
                        let userGain=findOptimal(id).length;
                        if(userGain<minUserGain){
                            minUserGain=userGain;
                            optimalIdForComp=id;
                        }
                    });
                    finalId=optimalIdForComp;
                }
            }
            else{
                let unvisitedLine=[];
                oneLineMade.forEach(id=>{
                    unvisitedLine.push(id);
                });
                twoLineMade.forEach(id=>{
                    unvisitedLine.push(id);
                });
                threeLineMade.forEach(id=>{
                    unvisitedLine.push(id);
                });
                finalId=unvisitedLine[randomIndex(unvisitedLine.length)];
            }
            if(finalId!==''){
                const arr=finalId.split(',');
                let i,j,isVert;
                isVert=+arr[0];i=+arr[1];j=+arr[2];
                let finalDesc=[];
                if(isVert===1){
                    finalDesc.push(<div className='clickedLine' key={finalId} style={{color:'green'}}>Computer connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1}</div>);
                }
                else{
                    finalDesc.push(<div className='clickedLine' key={finalId} style={{color:'green'}}>Computer connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1}</div>)
                }
                desc.forEach(elem=>{
                    finalDesc.push(elem);
                });
                console.log('comp chlra');
                console.log(finalDesc);
                makeLine(finalId,1,finalIndex,finalDesc);
                desc=finalDesc;
            }
        },(finalIndex+1)*1500);
        compTakingChance=false;
    }
    // on user click 
    const handleClick=(event)=>{
        if(compTakingChance&&(isSingle===1))
        return;
        const id=event.target.id;
        if(checkIfBlack(document.getElementById(id).style.backgroundColor))
        return;
        document.getElementById(id).style.backgroundColor='#000000';
        const arr=id.split(',');
        let i,j,isVert;
        isVert=+arr[0];i=+arr[1];j=+arr[2];
        let finalDesc=[];
        const chance=data.chance;
        if(isVert){
            finalDesc.push(<div className='clickedLine' key={id} style={{color:isSingle===1||chance===0?'red':'green'}}>{isSingle===1||chance===0?data.userName:data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {i*n+(j-1)+1}</div>);
        }
        else{
            finalDesc.push(<div className='clickedLine' key={id} style={{color:isSingle===1||chance===0?'red':'green'}}>{isSingle===1||chance===0?data.userName:data.userName2} connected dot {(i-1)*n+(j-1)+1} to dot {(i-1)*n+j+1}</div>);
        }
        (data.descr).forEach(elem=>{
            finalDesc.push(elem);
        });
        // if user's chance is over then comp takes chance 
        if(isSingle===1){
            if(makeLine(id,0,0,finalDesc)){
                takeChance(finalDesc);
            }
        }
        else{
            if(makeLine(id,chance,0,finalDesc)){
                data.setChance((chance+1)%2);
            }
        }
    }
    return (
        <div className='cont' >
            <div className='part1'>
                {
                    box_i_index>0 && box_j_index>0?
                    <div className='box'  id={`2,${box_i_index},${box_j_index}`}></div>
                    :
                    <></>
                }
                {
                    box_i_index>0?
                    <div className="incWidth">
                        <div className='vertical_line'  id={`1,${box_i_index},${box_j_index+1}`} onClick={handleClick}></div>
                    </div>
                    :
                    <></>
                }
            </div>
            <div className='part2'>
                {
                    box_j_index>0?
                    <div className="incHeight">
                        <div className='horizontal_line'  id={`0,${box_i_index+1},${box_j_index}`} onClick={handleClick}></div>
                    </div>
                    :
                    <></>
                }
                <div className='dot'>{box_i_index*(n)+box_j_index+1}</div>
            </div>
        </div>
  )
}

export default Box


