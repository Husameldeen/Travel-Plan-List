import './index.css';
import { useState } from 'react';

const initialItems = [];

export default function App() {
    const [list, setList] = useState(initialItems)

    function handleDelete(id) {
        setList(() => list.filter(item => item.id !== id))
    }

    function handlePacked(id) {
        setList(list.map(item => item.id === id? {...item, packed: !item.packed} : item))
    }
    
    return(
    <div>
        <Logo />
        <Form list={list} setList={setList} />
        <List list={list} onDelete={handleDelete} onPacked={handlePacked} />
        <Stats list={list} />
    </div>
    )
}

function Logo() {
    return (
        <h1>
            ⛺ Travel list 💼
        </h1>
    )
}

function Form({list, setList}) {
    
    const [id, setId] = useState(list.length + 1)
    const [description, setDescription] = useState('')
    const [quantity, setQuantity] = useState(1)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description) return;
        
        setId(id + 1);
        setList([...list, {id, description, quantity, 'packed': false}]);

        setDescription('');
        setQuantity(1);
    }
    
    return (
        <form onSubmit={handleSubmit} className='add-form'>
            <h3>What do you need for your trip 😍?</h3>
            <select value={quantity} onChange={e => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input 
                placeholder='Enter an item'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>ADD</button>
        </form>
    )
}

function List({list, onDelete, onPacked}) {
    const [sortBy, setSortBy] = useState('input');
console.log(sortBy)

    let sortedItems;
    if (sortBy === 'input') sortedItems = list;
    if (sortBy === 'description') sortedItems = list.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === 'packed') sortedItems = list.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className='list'>
            <ul>
                {sortedItems.map(item => <Item item={item} key={item.id} onDelete={onDelete} list={list} onPacked={onPacked}/>)}
            </ul>
            <select className='actions' value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value='input'>Sort by input</option>
                <option value='description'>Sort by description</option>
                <option value='packed'>Sort by packed</option>

            </select>
        </div>
    )
}

function Item({ item, onDelete, onPacked }) {
    // const [isChecked, setIsChecked] = useState(false);
    // console.log(isChecked)
    return (
        <li>
            <input type='checkbox' value={item.packed} onChange={() => onPacked(item.id)}/>
            <span style={item.packed? {textDecoration: 'line-through'} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDelete(item.id)}>❌</button>
        </li>
    )
}

function Stats({ list }) {
    if (!list.length) {
        return (
            <footer className='stats'>
                <em>
                    Start adding some items to your packing list
                </em>
            </footer>
        )
    }

    const numItems = list.length
    const packedItems = list.filter(item => item.packed).length
    const packedPerc = Math.floor((packedItems/numItems)*100)

    return (
        <footer className='stats'>
            <em>
                {packedPerc === 100? "You packed everything, Ready to go!" : `You have ${numItems} items on your list, and you already packed ${packedItems} (${packedPerc}%)`}
            </em>
        </footer>
    )
}