
import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
// It provides unique ids
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
function App() { 
  // It contains single todo as a string
  const [todo,setTodo]=useState("");
  const [todos,setTodos]=useState([]);
  // the below hook is used to show the finished todos wheneever the check box is ticked if it is false  it shows only unfinished tasks
  const [finishedtodos,setFinishedtodos]=useState(true);

  // toget the data from the local storage
  useEffect(()=>{
    let toCheckNullorNot=localStorage.getItem('todos')
    if(toCheckNullorNot){
  const todosfrmLocalStorage=JSON.parse(localStorage.getItem('todos'));
  setTodos(todosfrmLocalStorage)
    }
  },[])
// To save the entered data into the local storage
const saveToLocalStorage=() => {
  localStorage.setItem("todos",JSON.stringify(todos))
  // here its a key value pair todos is the key
  // localStorage.setItem() stores the data in our pc we can get the data by using JSON.parse(localStorage.getItem()) 
}

// ON Clicks and On Change handling Functions
const handleshowFinishedTodos=()=>{
setFinishedtodos(!finishedtodos)
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
  <div className='container bg-success rounded my-3  h-100'> 
 
  <div className='addTodo'>
    <h4 className='text-center py-2'>Manage Your Tasks at One Place</h4>
    <input type='text' className='mx-1 w-75 rounded' value={todo} onChange={handleInputChange}/>
    <button className='btn btn-primary'onClick={handleAdd} disabled={todo.length<3}><IoIosAdd /></button>
  </div>
  <h5 className='p-1'> My todos</h5>  
  {/* It  contains all the todos as an array*/}
  <input type='checkbox' checked={finishedtodos} onChange={handleshowFinishedTodos}/> Show Finished
  <div className='todos'>
    {todos.length==0&&<div className='fs-3'>No Tasks to display</div>}
    {todos.map((todoItem)=>{
// {/* It contains individual todo as a string */}  

  return(finishedtodos||!todoItem.isCompleted)&&<div key={todoItem.id} className='todo d-flex my-3 w-75 justify-content-between'>
    <input type='checkbox' name={todoItem.id} checked={todoItem.isCompleted} onChange={handleCheckboxChange}/>
  <div className={todoItem.isCompleted?'text-decoration-line-through':""}>{todoItem.todo}</div>
  <div className='buttons d-flex h-100'>
  <button className='btn btn-primary mx-2' onClick={(e)=>{handleEdit(e,todoItem.id)}}> <CiEdit /></button>

  <button className='btn btn-danger' onClick={(e)=>{handleDelete(e,todoItem.id)}}><MdDeleteOutline /></button>
  </div>
  </div>
}
)}
  </div>
  </div>
    </div>
  );
}

export default App;
