import CreateQuestion from "./CreateQuestion";
const Questions=(props)=>{
if( props.questions && props.questions.length==0)
{
    return <><div
    className={`row justify-content-center align-items-center`}
  >
      No Questions found. Please consider adding at least one.
      </div>
      <CreateQuestion questionBankId={props.questionBankId}/>
      </>
}
return null;
}
export default Questions