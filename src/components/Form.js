import { useState } from 'react';

export default function Form({ list, setList }) {

    const [id, setId] = useState(list.length + 1);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description) return;

        setId(id + 1);
        setList([...list, { id, description, quantity, 'packed': false }]);

        setDescription('');
        setQuantity(1);
    };

    return (
        <form onSubmit={handleSubmit} className='add-form'>
            <h3>What do you need for your trip 😍?</h3>
            <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                placeholder='Enter an item'
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            <button>ADD</button>
        </form>
    );
}
