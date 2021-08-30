import React,{useState,useEffect} from 'react'
import { useHistory } from 'react-router'
import {Button} from 'react-bootstrap'
import axios from "axios"
import Form from 'react-bootstrap/Form'
import MyHeader from './MyHeader'
const EditStory = (props) => {
    

    const [story, setStory] = useState([]);
    const [stateofTask, setmyTask] = useState("");

    const history=useHistory();

    const getStoryDetail = async() =>{
        
        let response = await axios.get(`http://localhost:3001/story/${props.match.params.id}`);
        setStory(response.data);
    }

    useEffect(() =>{
        
        
         getStoryDetail();
        
         // getallCategories();
    },[])

    const handleInputChange = (event) => {
        
        event.persist();
        setStory({ ...story, [event.target.name]: event.target.value });
        
    };

    const handleSubmit = async () => {
        
        
          
          story.status=stateofTask;
            if(story.title==="")
            alert("Enter title");
            else if(story.description==="" )
            alert("enter description");
            else if(story.task==="")
            alert("enter task");
            else if(story.status==="")
            alert("enter status");
        else{
         await axios.patch(`http://localhost:3001/story/${props.match.params.id}`, story);
         
        
        history.push("/");
        }
    }
    return (
        <div>
            <MyHeader/>
        <div className="container p-5">

            <h3 style={{textAlign:"center",margin:"15px 0"}}>Edit your Scrum</h3>
            <Form.Group>
                    <Form.Label>Story Title</Form.Label>
                    <Form.Control value={story.title} type="text" name="title" required onChange={handleInputChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Story Description</Form.Label>
                    <Form.Control value={story.description} type="text" name="description"  required onChange={handleInputChange}/>

                </Form.Group>
                <Form.Group>
                    <Form.Label>Task</Form.Label>
                    <Form.Control value={story.task} type="text" name="task"  required onChange={handleInputChange}/>
                </Form.Group>
                <Form.Group style={{marginTop:"10px"}}>
                    <Form.Label>Task Status:</Form.Label>&nbsp;&nbsp;&nbsp;
                    {/* <Form.Control value={story.status} type="text" name="status" required onChange={handleInputChange}/> */}
                    <select onChange={(e)=>{
                     const stateofTask=e.target.value;
                    setmyTask(stateofTask);

                     }} required>
                        <option value="" selected>Choose</option>
                        <option value="Not Done" >Not Done</option>
                        <option value="In Process" >In Process</option>
                            <option value="Completed" >Completed</option>
                    </select>
                </Form.Group>
                
                <div className="submit">
                    <Button onClick={handleSubmit} name = "edit" variant="dark">
                        Edit Submit
                    </Button>
                </div>
                </div>
        </div>
    )
}

export default EditStory
