# Feature Lists:
Besides standard functions of a Sudoku game, this project has the following noticeable features.
1. Two game modes are implemented: `INSERT` and `MARK`. Legal input contains only digits 1-9, and backspace keydown event. If a digit is entered twice, it is considered as removal. Backspace always removes the value in the current cell or the most recently entered mark value.  
`INSERT` mode means user is filling a cell with their answer. The answer will be validated on backend logic, if conflicted with existing cells, those will be highlighted.  
`MARK` mode indicates users are not inputting their final answer, digits are 1-9 are allowed and will be displayed in a fixed position insde cell (i.e, digit 1 is always at the top-left corner anad digit-9 is always at the bottom right corner). This allows users to quickly identify the marks based on their positions.
The marks entered preserves the order of insertion so that user presses backspace always remove the most recent one which is in line with user habits.  
The display logic of cell is as follows: cell value(considered as user's answer or prefilled values in puzzle) has the highest priority, when a cell has a value, it is always displayed regardless of mode. If a cell has marks, it can only be edited in `MARK` mode, but it will be displayed in `INSERT` mode.  

1. Single select and multi-select.  
The displayed puzzle grid allows user to select a cell on mouse click. If user holds Shift key, and click multiple cells all clicked cells are selected.

# Possible Extensions:
Below are some features could be implemented to improve the project but not realized due to limited time.
1. Multi-fill: Since we have implemented multi-select function, we could extend it when a user presses a digit key, fill all selected cells with the numebr (behavior should correspond to the current insert or mark mode).
1. Game Difficulty Levels: In the provided puzzles from supabase, there are ones with fewer digits pre-filled, we could implement logic to define a puzzle's difficulty based on number of prefilled cells and allow users to choose.
1. Stored Progress: Currently the game progress is not stored, we could store the answers or even the filled numbers to database and allow users to resume their progress. To implement this, we could create two more tables: `users` and `user_progress`. The `progress` column in `user_progress` table should store the puzzle with (partially) filled numbers from user. When a user attempts to play a puzzle, we query the `user_progress` table to first determine if there is an entry, if yes, load and allow user to resume from last time, if no then load from `sudoku_puzzles` for a fresh game.  
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
When a user attempts to show answer of the current puzzle, we render the full answers in the `SudokuGrid` component, highlight cells that are incorrect.  
1. Show Hint: Given we already have the answer of the full puzzle, it is easy to implment show hint feature, it should behave as follows: when a user selects a cell, show hint should provide the correct answer of it. To further extend this, if in hard level, we could even show up to 3 numbers by hint to help the user reduce the options.
1. ToolBox: Currently all user inputs are captured by keyboard input, we could add a toolbox component (like a numpad with 1-9) to also take input digits from toolbox.
1. Shortcut on Mode change: Currently the game mode of `INSERT` and `MARK` are switched by button clicks, we could add eventlisteners to capture user behaviors (e.g., when a user rightclicks on a cell, it automatically swithes to `MARK` mode for the cell).