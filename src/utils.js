

// [
// null, null, null, null, null, null, 6, null, null,
// 1, null, null, null, 0, null, null, null, 8,
// null, null, 7, null, null, null, null, 2, null,
// 8, null, 2, null, null, 4, 0, null, null,
// 4, 1, null, null, null, null, null, null, null,
// null, null, 6, null, null, null, 5, 8, null,
// null, null, null, null, 8, 7, null, 3, null,
// null, 4, null, null, null, 1, null, 5, 0,
// null, 0, null, 3, null, null, null, null, null
// ]
export default function formatter(raw){
    for(let i=0; i<81;i++){
        if(raw[i] === null){ // when making the board, it renders -1s as blanks, not null.
            raw[i] = -1
        }else{
        raw[i] += 1 // it also gives me numbers 0-8 instead of 1-9? why.
        }
    }
    let formatted = [ ]
    for(let i = 0; i < 73; i+= 9)  {
        formatted.push(raw.slice(i, i + 9))
    }
    return formatted
}





