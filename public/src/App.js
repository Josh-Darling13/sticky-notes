import React, {Component} from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {

  state = {
    notes: [{
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    },
    ],
    searchText: ""
    };

    addNote = () =>{
        //create the format of the notes class:
      const newNote = {
          id: Date.now(),
          title: "",
          description: "",
          doesMatchSearch: true,
        }
        //add new note to state. 
        this.setState({ notes: [newNote, ...this.state.notes]})
    }

    onType = (editMeIt, updatedKey, updatedValue ) =>{
      // editMeIt == id of edited noted
      // updatedKey == title or description field
      // updatedValue == the value of title or description 
      //
      // comunicates between APP.js and Note.js
      // the info needed to update state
      /**
       * needs to up date state. return all resoures
       * except for the note that has been changed
       *  then find out which note was changed,
       * what part of it was changed, then get the
       * value that was changed, and update the
       * affected note.
       */

       const updatedNotes = this.state.notes.map( note => {
         if (note.id !== editMeIt){
           return note;
         } else {
           if (updatedKey === "title"){
             note.title = updatedValue;
             return note;
           } else {
            note.description = updatedValue;
            return note;
           }
         }
       })
       this.setState({notes: updatedNotes});
    }

    onSearch = (text) =>{
      /**
       * works with Header.js where the search component is
       */

       const newSearchText = text.toLowerCase();
       const updatedNotes = this.state.notes.map( note =>{
        if(!newSearchText){
          note.doesMatchSearch = true;
          return note;
        } else {
          const title = note.title.toLowerCase();
          const description = note.description.toLowerCase();
          const titleMatch = title.includes(newSearchText);
          const descriptionMatch = description.includes(newSearchText);
          const hasMatch = titleMatch || descriptionMatch;
          note.doesMatchSearch = hasMatch;
          return note;
        }
      });
      this.setState({
        notes: updatedNotes,
        searchText: newSearchText
      })
    };

    removeNote = (noteId) =>{
      const updatedNotes = this.state.notes.filter( note => note.id !== noteId)
      this.setState({notes: updatedNotes})
    }

    componentDidUpdate (){
      const stringifiedNotes = JSON.stringify(this.state.notes);
      localStorage.setItem("savedNotes", stringifiedNotes);
    }

    componentDidMount(){
      const stringifiedNotes = localStorage.getItem("savedNotes");
      if (stringifiedNotes){
        const savedNotes = JSON.parse(stringifiedNotes);
        this.setState({notes: savedNotes});
      }

    }

  render(){

    return(
      <div>
        <Header 
          onSearch={this.onSearch} 
          addNote={this.addNote} 
          searchText= {this.state.searchText}
         />
        <NotesList 
          removeNote={this.removeNote}
          onType={this.onType} 
          notes= {this.state.notes}
         />
      </div>
    )
  }
}

export default App;
