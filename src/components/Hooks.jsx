import React, { useState, useEffect } from 'react';

function ContadorHooks() {
    const [count, setCount] = useState(0);

    const incrementar = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        console.log('Componente montado o actualizado');
    }, []); // El array vacío [] simula componentDidMount

    return (
        <div>
            <p>Contador: {count}</p>
            <button onClick={incrementar}>Incrementar</button>
        </div>
    );
}