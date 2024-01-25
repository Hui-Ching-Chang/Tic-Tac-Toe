const Square = ({ value, onSquareClick, win }) => {
    let squareClass = win ? "winsquare" : "square";

    return (
        <div>
            <button className={squareClass} onClick={onSquareClick}>
                {value}
            </button>
        </div>
    )
}

export default Square