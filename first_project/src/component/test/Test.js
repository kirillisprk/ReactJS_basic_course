import React, {useEffect, useState} from 'react';

export function Counter () {
    const [count, setCount] = useState(0);
    const updateCount = () => {
        setCount((prevCount) => prevCount + 1);
    }
    useEffect(() => {
        console.log('useEffect:', count);
    }, [count]);

    return (
        <div>
            <span className="counter">{count}</span>
            <button className="counter-button" onClick={updateCount}>+1</button>
        </div>
    )
}

export function Counter2 () {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
        </div>
    )
}
