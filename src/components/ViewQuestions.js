import ViewQuestion from "./ViewQuestion"
const ViewQuestions=(props)=>{
    return <div style={{maxHeight:"500px",overflowY:"auto",overflowX:"hidden"}}>
    {props.questions.map((qns,index)=><ViewQuestion index={index} key={qns.id} question={qns} removeQuestion={props.removeQuestion.bind(null,qns.id)}/>)}
    </div>
}
export default ViewQuestions