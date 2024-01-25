import Square from "./Square.jsx";

const Board = ({ xIsNext, squares, onPlay }) => {

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? "X" : "O";
        onPlay(nextSquares, i);
    }

    const winnerInfo = calculateWinner(squares);
    const winner = winnerInfo ? winnerInfo[0] : null;
    const winSquares = winnerInfo ? winnerInfo[1] : []
    const nextPlayer = xIsNext ? "X" : "O";
    const status = winner ? "The Winner is: " + winner : "Next Player: " + nextPlayer;
    const boardRows = [...Array(3).keys()].map((row) => {
        const boardSqaures = [...Array(3).keys()].map((col) => {
            const position = row * 3 + col;
            return (
                <Square key={position} value={squares[position]} onSquareClick={() => handleClick(position)} win = {winSquares.includes(position)}/>
            )
        })

        return (
            <div key={row} className="board-row">
                {boardSqaures}
            </div>
        )
    })
    // let squareList = [];
    // for (let i = 0; i < 3; i++) {
    //     for (let j = 0; j < 3; j++) {
    //         const position = i * 3 + j;
    //         squareList.push(<Square key={position} value={squares[position]} onSquareClick={() => handleClick(position)} win = {winSquares.includes(position)}/>);
    //     }
    // }


    return (
        <div>
            <div className="status"> {status} </div>
            {boardRows}
        </div>
    )
}

const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function calculateWinner(squares) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }

    return null;
}

export default Board