import React from 'react'
import ReactDOM from 'react-dom'
var database = [
    { "name":"Ironman", "human":true, "youtube":false, "movie":true, "book":true, "female":false},
    { "name":"Homer Simpson", "human":false, "youtube":false, "movie":true, "book":false, "female":false}
]
var listdata = database.map(data => [data.human,data.youtube,data.movie,data.book,data.female])
var count = 0
class Answers extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answers: Array(5).fill(null),
    }
  }
  handleSubmit = (event) =>{
    event.preventDefault()
    var check = 0
    var found = -1
    var answers = this.state.answers.slice()
    if (count>=4){
      for(let i=0;i<listdata.length;i++){
        for(let j=0;j<5;j++){
          if (listdata[i][j].toString() == answers[j]){
            check ++
          }
          if (check == 5){
            var found = i
          }
        }
      }
    }
    if (check >= 5){
      console.log(database[found])
      return
    }
    if (count > 4 && found == -1){
      console.log("Not in database")
      return
    }
    answers[count] = event.target[0].value
    console.log(answers)
    this.setState({
      answers: answers,
      count: count ++
    })
  }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
              <label>Question</label>
              <input type="text" id="input"></input>
            </form>
        )
    }
}