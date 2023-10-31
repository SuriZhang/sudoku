# Feature Highlights:
Besides standard functions of a Sudoku game, this project has the following noticeable features.
1. Two game modes are implemented: `INSERT` and `MARK`.   
Legal input contains only digits 1-9. If a digit is entered twice, it is considered as removal. Pressing backspace always removes the value in the current cell or the most recently entered mark value of the cell.   
`INSERT` mode means user is filling a cell with their answer. The answer will be validated on backend logic, if is conflicted with existing cells, those will be highlighted.  
`MARK` mode indicates users are not inputting their final answer but taking notes of potential values for the cell, marks of digits 1-9 will be displayed in a fixed position insde cell (i.e, digit 1 is always at the top-left corner anad digit-9 is always at the bottom right corner). This allows users to quickly identify the marks based on their positions.
The marks entered preserves the order of insertion so that user presses backspace always removes the most recent one which is in line with user habits.  
The display logic of cell is as follows: cell value (considered as user's answer or prefilled values in puzzle) has the highest priority, when a cell has a value, it is always displayed regardless of mode. If a cell has marks, it can only be edited in `MARK` mode, but it will be displayed in `INSERT` mode if the cell is currently empty. When a user inserts to a cell with marks in `INSERT` mode, the entered value overlays the marks, but if the value is removed, marks will be displayed again.

1. Single select and multi-select.  
The displayed puzzle grid allows user to select a cell on mouse click. If user holds Shift key, and click multiple cells, all clicked cells are selected.
Current multi-select allows the user to select any cells regardless if they are connected with each other or separated far away. In multi-select mode, click on the selected cells again to de-select it or click anywhere outside the grid to clear all selections.

# Project Design Breakdown:  
Some important components are explained in this section to help under the project structure.
- pages:
  - game: a parent component that holds all components related to the game. Game mode is set in this component.
  - useCalculateGridInfo: a custom hook which contains information that should be shared between a cell and the sudokuGrid. Cell value validation logic is implemented here.
  - cell: contains props that are specific to the cell itself (marks), which do not share with other cells on the grid.
  - sudokuGrid: used to load puzzles from database and render the 9x9 grid of cells, is responsible for changing puzzles for the user.
- utils:  
  - random: generates random stuff, used to test rendering and logic before hooked up with supabse.  
  - supabase: used to configure connection to supabase database.  
  - puzzleLoader: used to load data from `sudoku_puzzles` table.  
  - modeContext: set up Context of game mode.

# Possible Extensions and Improvements:
Below are some features could be implemented or extend some current features to improve the project but not realized due to limited time.
1. Multi-fill: Since we have implemented multi-select function, we could extend it when a user presses a digit key, fill all selected cells with the numebr (behavior should correspond to the current insert or mark mode). This is useful when a user wants to mark some connected cells in an area with the same number or select separate cells and fill with the same value.

1. Highlight same value cells: When a user select on a cell with value (whether it is prefilled or user-entered), the grid can highlight all cells with the same value. This is a useful feature to assist the user when completing a sudoku puzzle, this should be implemented in `useCalculateGridInfo` component. We could include this as an option to allow users to turn it on or off.

1. Highlight current row/column/box of the cell: According to rule of sudoku, the user should observe and compare with values on the same row, column and 3x3 box of the current cell, highlighting them is a visual assistance for the user. We could include this as an option to allow users to turn it on or off.

1. More mark feature: we could extend the current marks to support different marking approach. Currently the marks can be interpreted as potential values of the cell, in addition we could support marks indicating the impossible values of the current cell (maybe use a different color to indicate).

1. Minor UI nitpicks: When connected cells are selected, we could remove the connected border styles and only show a larger rectangle area with bold blue border.

1. Revert last insert operation: In `INSERT` mode, we should also support revert the same way as for `MARK` mode (possibly with up 5 reverts). To implement this, we need to keep track of the order of cell value insertion, this is helpful for the user to correct their wrong inputs.

1. Some UI on instructions: It would be good to include some instructions in the UI. This can be of dialog boxes, with the option for the user to skip.

1. Game Difficulty Levels: In the provided puzzles from supabase, there are ones with fewer digits pre-filled, we could implement logic to define a puzzle's difficulty based on number of prefilled cells and allow users to choose.

1. Stored Progress: Currently the game progress is not stored once the user selects a different puzzle, all progress are lost. We could store the answers or the filled numbers to database and allow users to resume their progress. To implement this, we could create two more tables: `users` and `user_progress`. The `progress` column in `user_progress` table should store the puzzle with (partially) filled numbers from user. When a user attempts to play a puzzle, we query the `user_progress` table to first determine if there is an entry, if yes, load and allow user to resume from last time, if no then load from `sudoku_puzzles` for a fresh game.  
If there is only one user, then the `user` table can be omitted.
    ```
    CREATE TABLE "public"."user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "username" text NOT NULL,
        "createdAt" timestamp NOT NULL,
        PRIMARY KEY ("id"),
        UNIQUE ("username")
    )

    CREATE TABLE "public"."user_progress" (
        "user_id" uuid NOT NULL, -- A reference to the user
        "puzzle_id" uuid NOT NULL, -- A reference to the Sudoku puzzle
        "progress" text NOT NULL, -- The user's last tracked puzzle status
        "isCompleted" boolean NOT NULL DEFAULT false, 
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        PRIMARY KEY ("user_id", "puzzle_id"),
        FOREIGN KEY ("user_id") REFERENCES "public"."users" ("id"),
        FOREIGN KEY ("puzzle_id") REFERENCES "public"."sudoku_puzzles" ("id")
    );
    ```

1. Timer: Add a timer with pause to keep track of time used to solve a sudoku. This should be an independent component that has less interaction with existing code.

1. Show Answer: Since puzzles are pre-generated, we can use backtrack algorithm to find the answers of the puzzle, store them in the database to avoid repeated calculation. Answers could be stored in the same "public"."sudoku_puzzles" table, add a column called `answer` of type text, so that each row of sudoku_puzzles stores the puzzle along with its answer. When a user selects a puzzle, we fetch the puzzle itself along with the answer.   
When a user attempts to show answer of the current puzzle, we render the full answers in the `SudokuGrid` component, use a different color to show cells that are incorrect.  

1. Show Hint: Given we already have the answer of the full puzzle, it is easy to implment show hint feature, it should behave as follows: when a user selects a cell, show hint should provide the correct answer of it. To further extend this, if in hard level, we could even show up to 3 numbers by hint to help the user reduce the options.

1. ToolBox: Currently all user inputs are captured by keyboard input, we could add a toolbox component (like a numpad with 1-9) to also take input digits from toolbox so that the web game can be interacted with only mouse event.

1. Shortcut on Mode change: Currently the game mode of `INSERT` and `MARK` are switched by button clicks, we could add eventlisteners to capture user behaviors as shortcuts, e.g., when a user rightclicks on a cell, it automatically switches to `MARK` mode for the cell.
