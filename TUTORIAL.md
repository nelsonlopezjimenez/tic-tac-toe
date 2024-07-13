# Tutorial: Tic-Tac-Toe

You will build a small tic-tac-toe game during this tutorial. This tutorial does not assume any existing React knowledge. The techniques you’ll learn in the tutorial are fundamental to building any React app, and fully understanding it will give you a deep understanding of React.
```
Note
This tutorial is designed for people who prefer to learn by doing and want to quickly try making something tangible. If you prefer learning each concept step by step, start with Describing the UI.
```

## The tutorial is divided into several sections:

1. Setup for the tutorial will give you a starting point to follow the tutorial.
1. Overview will teach you the fundamentals of React: components, props, and state.
1. Completing the game will teach you the most common techniques in React development.
1. Adding time travel will give you a deeper insight into the unique strengths of React.

## What are you building? 

In this tutorial, you’ll build an interactive tic-tac-toe game with React.

If the finalgame code doesn’t make sense to you yet, or if you are unfamiliar with the code’s syntax, don’t worry! The goal of this tutorial is to help you understand React and its syntax.

We **recommend** that you check out the tic-tac-toe game above before continuing with the tutorial. One of the features that you’ll notice is that there is a numbered list to the right of the game’s board. This list gives you a history of all of the moves that have occurred in the game, and it is updated as the game progresses.

Once you’ve played around with the finished tic-tac-toe game, keep scrolling. You’ll start with a simpler template in this tutorial. Our next step is to set you up so that you can start building the game.

### Setup for the tutorial 

#### Step 1: Inspecting the starter code 

1. The Files section with a list of files like App.js, index.js, styles.css and a folder called public
1. The contents of that file should be:

```js
export default function Square() {
  return <button className="square">X</button>;
}
```
1. Open the browser. It should be displaying a square with a X in it:
```
x-filled square

```
1. Now let’s have a look at the files in the starter code.

1. ***App.js ***
The code in App.js creates a component. In React, a component is a piece of reusable code that represents a part of a user interface. Components are used to render, manage, and update the UI elements in your application. Let’s look at the component line by line to see what’s going on:
```js
export default function Square() {
  return <button className="square">X</button>;
}
```
The first line defines a function called Square. The export JavaScript keyword makes this function accessible outside of this file. The default keyword tells other files using your code that it’s the main function in your file.

The second line returns a button. The return JavaScript keyword means whatever comes after is returned as a value to the caller of the function. <button> is a JSX element. A JSX element is a combination of JavaScript code and HTML tags that describes what you’d like to display. className="square" is a button property or prop that tells CSS how to style the button. X is the text displayed inside of the button and </button> closes the JSX element to indicate that any following content shouldn’t be placed inside the button.

1. styles.css 

This file defines the styles for your React app. The first two CSS selectors (* and body) define the style of large parts of your app while the .square selector defines the style of any component where the className property is set to square. In your code, that would match the button from your Square component in the App.js file.

1. index.js 
You won’t be editing this file during the tutorial but it is the **bridge** between the component you created in the App.js file and the web browser.
```js
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

import App from './App';
```
Lines 1-5 bring all the necessary pieces together:

1. React
1. React’s library to talk to web browsers (React DOM)
1. the styles for your components
1. the component you created in App.js.
1. The remainder of the file brings all the pieces together and injects the final product into index.html in the public folder.

#### Step 2: Building the board 

Let’s get back to App.js. This is where you’ll spend the rest of the tutorial.

Currently the board is only a single square, but you need nine! If you just try and copy paste your square to make two squares like this:
```js
export default function Square() {
  return <button className="square">X</button><button className="square">X</button>;
}
```
You’ll get this error:
```
Console
/src/App.js: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX Fragment <>...</>?
```
React components need to return a single JSX element and not multiple adjacent JSX elements like two buttons. To fix this you can use Fragments (<> and </>) to wrap multiple adjacent JSX elements like this:

```js
export default function Square() {
  return (
    <>
      <button className="square">X</button>
      <button className="square">X</button>
    </>
  );
}
```
Now you should see:
```
two x-filled squares

```

Great! Now you just need to copy-paste a few times to add nine squares and…
```
nine x-filled squares in a line

```

Oh no! The squares are all in a single line, not in a grid like you need for our board. To fix this you’ll need to group your squares into rows with divs and add some CSS classes. While you’re at it, you’ll give each square a number to make sure you know where each square is displayed.

In the App.js file, update the Square component to look like this:
```js
export default function Square() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```

The CSS defined in styles.css styles the divs with the className of board-row. Now that you’ve grouped your components into rows with the styled divs you have your tic-tac-toe board:

tic-tac-toe board filled with numbers 1 through 9
But you now have a problem. Your component named Square, really isn’t a square anymore. Let’s fix that by changing the name to Board:

```js

export default function Board() {
  return (
    <>
      <div className="board-row">
        <button className="square">1</button>
        <button className="square">2</button>
        <button className="square">3</button>
      </div>
      <div className="board-row">
        <button className="square">4</button>
        <button className="square">5</button>
        <button className="square">6</button>
      </div>
      <div className="board-row">
        <button className="square">7</button>
        <button className="square">8</button>
        <button className="square">9</button>
      </div>
    </>
  );
}
```

Psssst… That’s a lot to type! It’s okay to copy and paste code from this page. However, if you’re up for a little challenge, we recommend only copying code that you’ve manually typed at least once yourself.

#### Step 3: Passing data through props 

Next, you’ll want to change the value of a square from empty to “X” when the user clicks on the square. With how you’ve built the board so far you would need to copy-paste the code that updates the square nine times (once for each square you have)! Instead of copy-pasting, React’s component architecture allows you to create a reusable component to avoid messy, duplicated code.

First, you are going to copy the line defining your first square (```js<button className="square">1</button>```) from your Board component into a new Square component:

```js
function Square() {
  return <button className="square">1</button>;
}

```
Then you’ll update the Board component to render that Square component using JSX syntax:

```js
// ...
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```
Note how unlike the browser divs, your own components Board and Square must start with a **capital letter**.

Let’s take a look:
```
one-filled board
```
Oh no! You lost the numbered squares you had before. Now each square says “1”. To fix this, you will use props to pass the value each square should have from the parent component (Board) to its child (Square).

Update the Square component to read the value prop that you’ll pass from the Board:

```js
function Square({ value }) {
  return <button className="square">1</button>;
}
```
function Square({ value }) indicates the Square component can be passed a prop called value.

Now you want to display that value instead of 1 inside every square. Try doing it like this:
```js
function Square({ value }) {
  return <button className="square">value</button>;
}
```
Oops, this is not what you wanted:
```
value-filled board
```

You wanted to render the JavaScript variable called value from your component, not the word “value”. To “escape into JavaScript” from JSX, you need curly braces. Add curly braces around value in JSX like so:
```js
function Square({ value }) {
  return <button className="square">{value}</button>;
}
```
For now, you should see an empty board:
```
empty board

```

This is because the Board component hasn’t passed the value prop to each Square component it renders yet. To fix it you’ll add the value prop to each Square component rendered by the Board component:

```js
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
```
Now you should see a grid of numbers again:

tic-tac-toe board filled with numbers 1 through 9
Your updated code should look like this:

```js
function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}

```

#### Step 4: Making an interactive component 

Let’s fill the Square component with an X when you click it. Declare a function called handleClick inside of the Square. Then, add onClick to the props of the button JSX element returned from the Square:
```js
function Square({ value }) {
  function handleClick() {
    console.log('clicked!');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```

In the browser:  you need to open your browser’s Console. For example, if you use the Chrome browser, you can view the Console with the keyboard shortcut Shift + Ctrl + J (on Windows/Linux) or Option + ⌘ + J (on macOS).

If you click on a square now, you should see a log saying "clicked!" in the Console tab of the Browser. Clicking the square more than once will log "clicked!" again. Repeated console logs with the same message will not create more lines in the console. Instead, you will see an incrementing counter next to your first "clicked!" log.

As a next step, you want the Square component to “remember” that it got clicked, and fill it with an “X” mark. To “remember” things, components use state.

React provides a special function called **useState** that you can call from your component to let it “remember” things. Let’s store the current value of the Square in state, and change it when the Square is clicked.

Import useState at the top of the file. Remove the value prop from the Square component. Instead, add a new line at the start of the Square that calls useState. Have it return a state variable called value:

```js
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    //...
```   
value stores the value and setValue is a function that can be used to change the value. The null passed to useState is used as the initial value for this state variable, so value here starts off equal to null.

Since the Square component no longer accepts props anymore, you’ll remove the value prop from all nine of the Square components created by the Board component:
```js
// ...
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}
```

#### Step 5: Using State and Set State

Now you’ll change Square to display an “X” when clicked. Replace the console.log("clicked!"); event handler with setValue('X');. Now your Square component looks like this:
```js
function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
```
By calling this set function from an onClick handler, you’re telling React to re-render that Square whenever its <button> is clicked. After the update, the Square’s value will be 'X', so you’ll see the “X” on the game board. Click on any Square, and “X” should show up:
```
adding xes to board

```
Each Square has its own state: the value stored in each Square is completely independent of the others. When you call a set function in a component, React automatically updates the child components inside too.

After you’ve made the above changes, your code will look like this:

```js
import { useState } from 'react';

function Square() {
  const [value, setValue] = useState(null);

  function handleClick() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />

```

#### React Developer Tools 

For local development, React DevTools is available as a Chrome, Firefox, and Edge browser extension. Install it, and the Components tab will appear in your browser Developer Tools for sites using React.

### Completing the game 

By this point, you have all the basic building blocks for your tic-tac-toe game. To have a complete game, you now need to alternate placing “X”s and “O”s on the board, and you need a way to determine a winner.

#### Step 6: Lifting state up 

Currently, each Square component maintains a part of the game’s state. To check for a winner in a tic-tac-toe game, the Board would need to somehow know the state of each of the 9 Square components.

How would you approach that? At first, you might guess that the Board needs to “ask” each Square for that Square’s state. Although this approach is technically possible in React, we discourage it because the code becomes difficult to understand, susceptible to bugs, and hard to refactor. Instead, the best approach is to store the game’s state in the parent Board component instead of in each Square. The Board component can tell each Square what to display by passing a prop, like you did when you passed a number to each Square.

To collect data from multiple children, or to have two child components communicate with each other, declare the shared state in their parent component instead. The parent component can pass that state back down to the children via props. This keeps the child components in sync with each other and with their parent.

Lifting state into a parent component is common when React components are refactored.

Let’s take this opportunity to try it out. Edit the Board component so that it declares a state variable named squares that defaults to an array of 9 nulls corresponding to the 9 squares:

```js
// ...
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    // ...
  );
}
```
Array(9).fill(null) creates an array with nine elements and sets each of them to null. The useState() call around it declares a squares state variable that’s initially set to that array. Each entry in the array corresponds to the value of a square. When you fill the board in later, the squares array will look like this:

['O', null, 'X', 'X', 'X', 'O', 'O', null, null]
Now your Board component needs to pass the value prop down to each Square that it renders:

```js
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
```
Next, you’ll edit the Square component to receive the value prop from the Board component. This will require removing the Square component’s own stateful tracking of value and the button’s onClick prop:

```js
function Square({value}) {
  return <button className="square">{value}</button>;
}
```
At this point you should see an empty tic-tac-toe board:

empty board

```js
import { useState } from 'react';

function Square({ value }) {
  return <button className="square">{value}</button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} />
        <Square value={squares[1]} />
        <Square value={squares[2]} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} />
        <Square value={squares[4]} />
        <Square value={squares[5]} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} />
        <Square value={squares[7]} />
        <Square value={squares[8]} />
      </div>
    </>
  );
}
```


Show more
Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.

Next, you need to change what happens when a Square is clicked. The Board component now maintains which squares are filled. You’ll need to create a way for the Square to update the Board’s state. Since state is private to a component that defines it, you cannot update the Board’s state directly from Square.

Instead, you’ll pass down a function from the Board component to the Square component, and you’ll have Square call that function when a square is clicked. You’ll start with the function that the Square component will call when it is clicked. You’ll call that function onSquareClick:

function Square({ value }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
Next, you’ll add the onSquareClick function to the Square component’s props:

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
Now you’ll connect the onSquareClick prop to a function in the Board component that you’ll name handleClick. To connect onSquareClick to handleClick you’ll pass a function to the onSquareClick prop of the first Square component:

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={handleClick} />
        //...
  );
}
Lastly, you will define the handleClick function inside the Board component to update the squares array holding your board’s state:

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick() {
    const nextSquares = squares.slice();
    nextSquares[0] = "X";
    setSquares(nextSquares);
  }

  return (
    // ...
  )
}
The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method. Then, handleClick updates the nextSquares array to add X to the first ([0] index) square.

Calling the setSquares function lets React know the state of the component has changed. This will trigger a re-render of the components that use the squares state (Board) as well as its child components (the Square components that make up the board).

Note
JavaScript supports closures which means an inner function (e.g. handleClick) has access to variables and functions defined in a outer function (e.g. Board). The handleClick function can read the squares state and call the setSquares method because they are both defined inside of the Board function.

Now you can add X’s to the board…  but only to the upper left square. Your handleClick function is hardcoded to update the index for the upper left square (0). Let’s update handleClick to be able to update any square. Add an argument i to the handleClick function that takes the index of the square to update:

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }

  return (
    // ...
  )
}
Next, you will need to pass that i to handleClick. You could try to set the onSquareClick prop of square to be handleClick(0) directly in the JSX like this, but it won’t work:

<Square value={squares[0]} onSquareClick={handleClick(0)} />
Here is why this doesn’t work. The handleClick(0) call will be a part of rendering the board component. Because handleClick(0) alters the state of the board component by calling setSquares, your entire board component will be re-rendered again. But this runs handleClick(0) again, leading to an infinite loop:

Console
Too many re-renders. React limits the number of renders to prevent an infinite loop.
Why didn’t this problem happen earlier?

When you were passing onSquareClick={handleClick}, you were passing the handleClick function down as a prop. You were not calling it! But now you are calling that function right away—notice the parentheses in handleClick(0)—and that’s why it runs too early. You don’t want to call handleClick until the user clicks!

You could fix this by creating a function like handleFirstSquareClick that calls handleClick(0), a function like handleSecondSquareClick that calls handleClick(1), and so on. You would pass (rather than call) these functions down as props like onSquareClick={handleFirstSquareClick}. This would solve the infinite loop.

However, defining nine different functions and giving each of them a name is too verbose. Instead, let’s do this:

export default function Board() {
  // ...
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        // ...
  );
}
Notice the new () => syntax. Here, () => handleClick(0) is an arrow function, which is a shorter way to define functions. When the square is clicked, the code after the => “arrow” will run, calling handleClick(0).

Now you need to update the other eight squares to call handleClick from the arrow functions you pass. Make sure that the argument for each call of the handleClick corresponds to the index of the correct square:

export default function Board() {
  // ...
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
};
Now you can again add X’s to any square on the board by clicking on them:

filling the board with X
But this time all the state management is handled by the Board component!

This is what your code should look like:


App.js
Download
Reset

Fork
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>


Show more
Now that your state handling is in the Board component, the parent Board component passes props to the child Square components so that they can be displayed correctly. When clicking on a Square, the child Square component now asks the parent Board component to update the state of the board. When the Board’s state changes, both the Board component and every child Square re-renders automatically. Keeping the state of all squares in the Board component will allow it to determine the winner in the future.

Let’s recap what happens when a user clicks the top left square on your board to add an X to it:

Clicking on the upper left square runs the function that the button received as its onClick prop from the Square. The Square component received that function as its onSquareClick prop from the Board. The Board component defined that function directly in the JSX. It calls handleClick with an argument of 0.
handleClick uses the argument (0) to update the first element of the squares array from null to X.
The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index 0 to change from null to X.
In the end the user sees that the upper left square has changed from empty to having a X after clicking it.

Note
The DOM <button> element’s onClick attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. You could give any name to the Square’s onSquareClick prop or Board’s handleClick function, and the code would work the same. In React, it’s conventional to use onSomething names for props which represent events and handleSomething for the function definitions which handle those events.