import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
var database = [
    { "name":"Ironman", "human":true, "youtube":false, "movie":true, "book":true, "female":false},
    { "name":"Homer Simpson", "human":false, "youtube":false, "movie":true, "book":false, "female":false}
]
var questiondatabase = [
  { "question":"Are they human?", "id":0},
  { "question":"Are they on youtube?", "id":1},
  { "question": "Are they in movies?", "id":2},
  { "question": "Are they in books?", "id":3},
  { "question": "Are they female?", "id":4},
]
var listdata = database.map(data => [data.human,data.youtube,data.movie,data.book,data.female])
var count = 0
var found = -1
class Question extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      question: questiondatabase[count].question
    }
    
  }
  render(){
    if (count <= 4){
      this.state.question = questiondatabase[count].question
    }
    else{
      this.state.question = "Answer:"
    }
    return(
      <div className="center">
        <h1>{this.state.question}</h1>
      </div>
    )
  }

}

class DatabaseEdit extends React.Component {
  constructor(props){
    super(props)
  }
  handleSubmit = (event) =>{
    event.preventDefault()
    var name = event.target[0].value
    var answers = this.props.answers
    var newadd = { "name":name.toString(), "human":answers[0],"youtube":answers[1],"movie":answers[2],"book":answers[3],"female":answers[4]}
    database.push(newadd)
    console.log(database)
  }
  render(){
    console.log("reached")
    return(
      <div>
        <div className='center'>
          <h1>Who were you thinking of?</h1>
        </div>
        <div className='center'>
          <form onSubmit={this.handleSubmit}>
            <input type="text"></input>
          </form>
        </div>
      </div>
    )
  }
}
class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answers: Array(5).fill(null),
    }
  }
  handleInput(answer){
    var answers = this.state.answers.slice()
    answers[count] = answer
    console.log(answers)
    this.setState({
      answers: answers,
      count: count ++
    })
    if (count>=4){
      for(let i=0;i<listdata.length;i++){
        if (found == -1){
          var check = 0
          for(let j=0;j<5;j++){
            if (listdata[i][j] == answers[j]){
              check ++
            }
            if (check == 5){
              var found = i
            }
          }
        }
      }
    }
    if (check >= 5){
      fetch('/answer',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(database[found])
      })
      return
    }
    if (count > 4 && found == -1){
      console.log("ok")
    }
  }
    render(){
      if (count > 4 && found == -1){
        return(
          <div className="center" id="game">
            <DatabaseEdit answers = {this.state.answers} />
          </div>
        )
      }
      else{
        return(
          <div>
            <div className='center'>
              <Question count = {this.state.count}/>
            </div>
            <div className='center'>
              <button className='button' onClick={() => this.handleInput(true)}>True</button>
              <button className='button' onClick={() => this.handleInput(false)}>False</button>
            </div>
          </div>
        )
        }
    }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root') /* controls root container, essentially updates whole page */
)