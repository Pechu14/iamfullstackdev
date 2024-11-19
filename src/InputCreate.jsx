import { useState } from "react";

const InputCreate = ({urlApi, onTaskCreated}) => {
    const [taskTitle, setTaskTitle] = useState("")


    const handleInputChange = (e) => {
        setTaskTitle(e.target.value);
    };

    const handleAddTask = async () => {
        if(!taskTitle.trim()){
            alert("el titulo estávacio,por favor escriba algo")
            return;
        }
    
   
    try {
        const response = await fetch(`${urlApi}/create`,{
            method:"POST",
            headers: {
                "Content-Type" : "application/json",
            },

            body: JSON.stringify({title: taskTitle})
        });

        if(response.ok) {
            const newTask = await response.json();
            alert("tarea añadida");
            setTaskTitle("");
            if(onTaskCreated){
                onTaskCreated(newTask);
            }
        }else{
            alert("error al añadir la tarea");
        }
        }catch (error){
        console.error("error al con la conexion del back", error);
        alert("problema al añadir la tarea")
    };
    }



    return (
        <div>
            <input
            type="text"
            value={taskTitle}
            onChange={handleInputChange}
            placeholder="Añade aqui la tarea"
            />
            <button onClick={handleAddTask}>Añadir tarea</button>
        </div>
    );
};

export default InputCreate;