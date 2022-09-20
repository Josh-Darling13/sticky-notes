import React from "react";
import Note from "./Note.js";

const NotesList = (props) =>{

	const keepSearchMatches = (note) => note.doesMatchSearch === true;
	const searchMatches = props.notes.filter(keepSearchMatches);

	const renderNote = (note) => (
	<Note 
		removeNote={props.removeNote}
		onType={props.onType}
		note={note}
		key={note.id}
	/>);
	const noteElements = searchMatches.map(renderNote);
	return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList; 