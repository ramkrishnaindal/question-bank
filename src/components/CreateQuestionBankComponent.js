import { useRef,useState } from 'react';
import classes from './CreateQuestionBankComponent.module.css';
import {v4 as uuid} from 'uuid'
const CreateQuestionBankComponent =  () => {
    const [titleIsValid,setTitleIsValid]= useState(true)
    const titleInputRef=useRef();
  const onTitleChangeHandler=()=>{
    if(titleInputRef.current.value.trim()==='')
    {
        setTitleIsValid(false);
        return;
    }
    setTitleIsValid(true);
  }
  const saveHandler=async(e)=>{
    e.preventDefault();
    if(titleInputRef.current.value.trim()==='')
    {
        setTitleIsValid(false);
        return;
    }
    setTitleIsValid(true);
    const body={
        id:uuid(),
        title:titleInputRef.current.value,
        questions:[]
    }
    const response= await fetch('http://localhost:3004/questionBank',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{'Content-type':"application/json"}
    })
    const data=await response.json();
    console.log(data)
  }
  return (
    <div className={`row justify-content-center align-items-center ${classes.content}`}>
      <div className="col-10 ">
        <form onSubmit={saveHandler}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Question bank title
            </label>
            <input className="form-control" id="title" type="text" ref ={titleInputRef} onChange={onTitleChangeHandler}/>
            {!titleIsValid && <label className='form-text' style={{color:'red'}}> Please enter a title</label>}
          </div>
          <div className={classes.actions}>
              <button type="submit"  className="btn btn-outline-primary d-block ms-auto my-3"> Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateQuestionBankComponent;
