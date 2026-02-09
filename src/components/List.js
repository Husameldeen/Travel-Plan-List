import { useState } from 'react';

export default function List({ list, onDelete, onPacked, onClearList }) {
    const [sortBy, setSortBy] = useState('input');
    console.log(sortBy);

    let sortedItems;
    if (sortBy === 'input') sortedItems = list;
    if (sortBy === 'description') sortedItems = list.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === 'packed') sortedItems = list.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className='list'>
            <ul>
                {sortedItems.map(item => <Item item={item} key={item.id} onDelete={onDelete} list={list} onPacked={onPacked} />)}
            </ul>
            <div className='actions'>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value='input'>Sort by input</option>
                    <option value='description'>Sort by description</option>
                    <option value='packed'>Sort by packed</option>

                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    );
}

function Item({ item, onDelete, onPacked }) {
    return (
        <li>
            <input type='checkbox' value={item.packed} onChange={() => onPacked(item.id)} />
            <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDelete(item.id)}>❌</button>
        </li>
    );
}
