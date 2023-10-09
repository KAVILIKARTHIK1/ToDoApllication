import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, List } from '@mui/material';
import { FormControl, TextField} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';


function App() {
  const [task, setTask]=useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  const submitTask=()=>{
    setTask([
      ...task,
      {title: title , summary : summary},
    ]);
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        ...task,
        {title: title , summary : summary},
      ])
    )
   setOpen(!open);
   setTitle("")
   setSummary("")
  }
  const deleteTask=(index)=>{
    const duplication =[...task];
    duplication.splice(index,1);;
    setTask(duplication)
    localStorage.setItem('tasks',JSON.stringify(duplication))
  }
  const loadSavedTask=()=>{
    const tasks=localStorage.getItem('tasks');
    if(tasks) setTask(JSON.parse(tasks));
  }
  useEffect(()=>{
    loadSavedTask();
  },[])
  return (
    <div className="App">
       <h1>To-Do-Aplication</h1>
       <List className="list" sx={({ width: '100%',maxWidth: 360, display: 'flex',flexDirection: 'column',gap: '10px'})}>
        {task.map((item,index)=>{
          return (
            <ListItem className="list-item" sx={{display: 'flex', border: '1px solid #D4F1F4', borderRadius: '4px'}}>
              <ListItemText primary={item.title} secondary={item.summary}>
              <h1>{item.title}</h1>
              <p>{item.summary}</p>
              </ListItemText>
              <DeleteIcon sx={({color: 'red', cursor: 'pointer'})} onClick={()=>deleteTask(index)}/>
            </ListItem>
          )
        })}
       </List>
       <Button variant="contained" onClick={()=>setOpen(!open)}>Add Task</Button>
       <Dialog sx={{width: 520, height: 420}} onClose={()=>setOpen(false)} open={open}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center'}}>
          <TextField value={title} id="filled-basic" label="Title" variant="filled" onChange={(e)=>setTitle(e.target.value)} />
          <TextField value={summary} id="filled-basic" label="Summary" variant="filled" onChange={(e)=>setSummary(e.target.value)}/>
        <div className='btn'>
        <Button variant="text" onClick={()=>setOpen(false)}>Cancle</Button>
        <Button variant="contained" onClick={submitTask}>Create Item</Button>
        </div>
        </FormControl>
        </DialogContent>
       </Dialog>  
    </div>
  );
}

export default App;
