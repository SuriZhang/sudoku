import React from 'react';

const Sudoku = () => {
    const grid :number[][] = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => 0));

    const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, cellIndex: number) => {
        const newGrid = [...grid];
        // newGrid[rowIndex][cellIndex] = parseInt(event.target.value) || 0;
        // setGrid(newGrid);
    };

    return (
        <div className="border-collapse border border-slate-400">
            {grid.map((row, rowIndex) => (
                <div className="border border-slate-300" key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <input
                            className="border border-slate-300"
                            key={cellIndex}
                            type="number"
                            min="1"
                            max="9"
                            value={cell || ''}
                            // onChange={(event) => handleCellChange(event, rowIndex, cellIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Sudoku;
                        
                      