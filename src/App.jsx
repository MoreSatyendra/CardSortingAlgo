import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, ButtonGroup, Card } from '@chakra-ui/react'; //Importing chakra ui framework similar as material-ui

function App() {
  const originalArray = [5, 3, 0, 2, 1, 4];
  const [numbers, setNumbers] = useState(originalArray);
  const [isAnimating, setIsAnimating] = useState(false);
  

  //Sorting array using Bubble sort algorithm
  const bubbleSort = async (arr, ascending = true) => {
    setIsAnimating(true);
    let tempArray = [...arr];
    
    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray.length - i - 1; j++) {

        const shouldSwap = ascending 
          ? tempArray[j] > tempArray[j + 1]
          : tempArray[j] < tempArray[j + 1];

        if (shouldSwap) {
          // Swap elements
          [tempArray[j], tempArray[j + 1]] = [tempArray[j + 1], tempArray[j]];
          setNumbers([...tempArray]);
          // Add delay to make animation visible
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
    setIsAnimating(false);
  };

  //handling sorting based on the order
  const handleSort = (type) => {
    //while animating the function shouldn't be called
    if (isAnimating) return;
    
    switch (type) {
      //if in increasing order
      case 'asc':
        bubbleSort(numbers, true);
        break;
      //if in decreasing order
      case 'desc':
        bubbleSort(numbers, false);
        break;
      //Want to get original
      case 'original':
        setNumbers(originalArray);
        break;
      default:
        break;
    }
  };

  

  return (
    
    <div className="flex-row justify-cente items-centerp-8 max-w-2xl mx-auto">
      <div className="flex gap-4 mb-8">
      <ButtonGroup variant='outline' spacing='6'>
        <Button 
          onClick={() => handleSort('asc')} 
          disabled={isAnimating}
          colorScheme='blue'
          >
          Ascending
        </Button>
        <Button 
          onClick={() => handleSort('desc')} 
          disabled={isAnimating}
          colorScheme='blue'
          >
          Descending
        </Button>
        <Button 
          onClick={() => handleSort('original')} 
          disabled={isAnimating}
          colorScheme='red'
          >
          Original
        </Button>
          </ButtonGroup>
      </div>

      <div className="flex justify-center items-center gap-4 ">
        {numbers.map((number, index) => (
          <Card
            key={`${number}-${index}`}
            className={`w-32 h-32 flex items-center justify-center text-4xl font-bold transition-all duration-500 cursor-pointer hover:shadow-xl`}
            style={{
              backgroundColor: `hsl(${number * 60}, 70%, 60%)`,
              color: 'white'
            }}
          >
            {number}
          </Card>
        ))}
      </div>
    </div>
    
  )
}

export default App
