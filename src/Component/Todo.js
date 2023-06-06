import React, { useState,useEffect } from 'react';

function Todo() {
  const [newitem, setnewitem] = useState('');
  const [newDate, setnewDate] = useState('');
  const [newDesc, setnewDesc] = useState('');
  const [items, setitems] = useState([]);


  useEffect(() => {
    const savedItems = localStorage.getItem('todoItems');
    if (savedItems) {
      setitems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(items));
  }, [items]);



  function additems() {
    if (!newitem || !newDate || !newDesc) {
      alert('Please enter all fields');
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newitem,
      date: newDate,
      desc: newDesc,
    };
    setitems(oldlist => [...oldlist, item]);
    setnewitem('');
    setnewDate('');
    setnewDesc('');
  }

  function deleteitem(id) {
    const Newarray = items.filter(item => item.id !== id);
    setitems(Newarray);
  }

  return (
    <div>
      <h1 className='h1'>To-Do List</h1>
      <div className='New'>
        <input type='text' placeholder='Enter your task' value={newitem} onChange={e => setnewitem(e.target.value)} />
        <input type='date' placeholder='Enter the date' value={newDate} onChange={e => setnewDate(e.target.value)} />
        <textarea
          placeholder='Enter the description'
          value={newDesc}
          onChange={e => setnewDesc(e.target.value)}
          className='description-input'
        ></textarea>    
          </div>
      <button onClick={additems}>Add</button>
      <div className='cards-container'>
        {items.map(item => (
          <div key={item.id} className='card'>
            <div className='card-item'>{item.value}</div>
            <div className='card-item'>{item.date}</div>
            <div className='card-item'>{item.desc}</div>
            <button onClick={() => deleteitem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;