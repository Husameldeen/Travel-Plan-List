import './index.css';
import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import List from './List';
import Stats from './Stats';

const initialItems = [];

export default function App() {
    const [list, setList] = useState(initialItems)

    function handleDelete(id) {
        setList(() => list.filter(item => item.id !== id))
    }

    function handlePacked(id) {
        setList(list.map(item => item.id === id? {...item, packed: !item.packed} : item))
    }

    function handleClearList() {
        if (!list.length) return; 
        
        const confirmed = window.confirm('Are you sure you want to delete all items?')
        if (confirmed) setList([]);
    }
    
    return(
    <div>
        <Logo />
        <Form list={list} setList={setList} />
        <List list={list} onDelete={handleDelete} onPacked={handlePacked} onClearList={handleClearList}/>
        <Stats list={list} />
    </div>
    )
}

