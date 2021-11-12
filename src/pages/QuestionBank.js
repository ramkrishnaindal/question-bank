import { useState, useEffect } from "react";

import CreateQuestionBankComponent from '../components/CreateQuestionBankComponent'
import ViewQuestionBanks from '../components/ViewQuestionBanks'
const QuestionBank=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [questionBanks, setQuestionBanks] = useState([]);
    useEffect(() => {
      setIsLoading(true);
      const loadData = async () => {
        const response = await fetch(`https://question-bank-json-server.herokuapp.com/questionBank`);
        const data = await response.json();
  
        setQuestionBanks(data);
        setIsLoading(false);
      };
      loadData();
    }, []);
  
    const addQuestionBankHandler=async (body)=>{
        let response= await fetch(`https://question-bank-json-server.herokuapp.com/questionBank`,{
            method:'POST',
            body:JSON.stringify(body),
            headers:{'Content-type':"application/json"}
        })
        
        response = await fetch(`https://question-bank-json-server.herokuapp.com/questionBank`);
        const data = await response.json();
  
        setQuestionBanks(data); 
    }
    const removeQuestionBankHandler=async (id)=>{
        let response= await fetch(`https://question-bank-json-server.herokuapp.com/questionBank/${id}`,{
            method:'DELETE',
            headers:{'Content-type':"application/json"}
        })
        
        response = await fetch(`https://question-bank-json-server.herokuapp.com/questionBank`);
        const data = await response.json();
  
        setQuestionBanks(data); 
    }
return(
<div style={{border:"2px solid rgb(247, 248, 249)"}}>
<CreateQuestionBankComponent addQuestionBank={addQuestionBankHandler}/>
<ViewQuestionBanks isLoading={isLoading} questionBanks={questionBanks} removeQuestionBank={removeQuestionBankHandler}/>
</div>)
}
export default QuestionBank