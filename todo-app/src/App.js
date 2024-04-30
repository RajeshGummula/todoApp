
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
// It provides unique ids
import { v4 as uuidv4 } from 'uuid';
function App() {
  // It contains single todo as a string
  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState([]);

  useEffect(()=>{
    let toCheckNullorNot=localStorage.getItem('todos')
    if(toCheckNullorNot){
  const todosfrmLocalStorage=JSON.parse(localStorage.getItem('todos'));
  setTodos(todosfrmLocalStorage)
    }
  },[])
const saveToLocalStorage=() => {
  localStorage.setItem("todos",JSON.stringify(todos))
  // here its a key value pair todos is the key
}



  const handleAdd=() => {
  setTodos([...todos,{todo,id:uuidv4(),isCompleted:false}])
  setTodo("");
  }
  const handleEdit=(e,id) => {
    let editTodo=todos.filter((todoItem)=>todoItem.id===id)
    setTodo(editTodo[0].todo);
    const newTodos=todos.filter((todoItem)=>{
      return todoItem.id!==id;
    })
    setTodos(newTodos);
    saveToLocalStorage();

  }
  const handleDelete=(e,id) => {
  const newTodos=todos.filter((todoItem)=>{
 return todoItem.id!==id;
  })
  setTodos(newTodos)
  saveToLocalStorage();
  }
  const handleInputChange=(e)=>{
  setTodo(e.target.value )
  }
const handleCheckboxChange=(e)=>{
let id=e.target.name;
let index=todos.findIndex((todoItem)=>todoItem.id===id)

let newTodos=[...todos];
newTodos[index].isCompleted=!(newTodos[index].isCompleted);
setTodos(newTodos);
saveToLocalStorage();
}
 
  
  return (
    <div className="App">
    <Navbar/>
  <div className='container bg-success rounded m-3 '> 
 
  <div className='addTodo'>
    <h4>addTodo</h4>
    <input type='text' className='mx-1 w-50' value={todo} onChange={handleInputChange}/>
    <button className='btn btn-primary'onClick={handleAdd} disabled={todo.length<3}>Add</button>
  </div>
  <h5 className='p-1'> My todos</h5>
  {/* It  contains all the todos as an array*/}
  <div className='todos'>
    {todos.length==0&&<div className='fs-3'>No Tasks to display</div>}
    {todos.map((todoItem)=>
// {/* It contains individual todo as a string */}  

  <div key={todoItem.id} className='todo d-flex my-3 w-50 justify-content-between'>
    <input type='checkbox' name={todoItem.id} value={todoItem.isCompleted} onChange={handleCheckboxChange}/>
  <div className={todoItem.isCompleted?'text-decoration-line-through':""}>{todoItem.todo}</div>
  <div className='buttons d-flex h-100'>
  <button className='btn btn-primary mx-2' onClick={(e)=>{handleEdit(e,todoItem.id)}}> Edit</button>

  <button className='btn btn-danger' onClick={(e)=>{handleDelete(e,todoItem.id)}}>delete</button>
  </div>
  </div>
)}
  </div>
  </div>
    </div>
  );
}

export default App;
