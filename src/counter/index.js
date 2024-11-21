import {useState} from 'react'

export const LimitedCounter = () => {
    const [counter, setCounter] = useState(0);
    const min = 0
    const max = 10

    return (
        <>
            <h1>
                Counter: {counter}
            </h1>

            <button value={counter} aria-label='increment' onClick={() => setCounter(counter< max ? counter +1 : counter )}>
                Increment
            </button>

            <button value={counter}  aria-label='decrement' onClick={() => setCounter(counter > min ? counter -1 : counter )}>
                Decrement
            </button>
        </>
    )

} 