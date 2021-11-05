import CreateQuestion from "./CreateQuestion";
import ViewQuestions from "./ViewQuestions";
const Questions=(props)=>{
  console.log("resetNew",props.resetNew);
  const content=<><ViewQuestions questions={props.questions} removeQuestion={props.removeQuestion}/>
  <CreateQuestion questionBankId={props.questionBankId} addQuestion={props.addQuestion}  resetNew={props.resetNew}/>
  </>
if( props.questions && props.questions.length==0)
{
    return <><div
    className={`row justify-content-center align-items-center`}
  >
      No Questions found. Please consider adding at least one.
      </div>
      <CreateQuestion questionBankId={props.questionBankId} addQuestion={props.addQuestion} resetNew={props.resetNew}/>
      </>
}
else
{
  return !props.questions?null:content
  
  
  
}
return null;
}
export default Questions