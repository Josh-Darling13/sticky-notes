import React from "react";




const Note = (props) =>{
	console.log(props);

	const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
	};

	const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
	};

	const clickDelete = () =>{
		props.removeNote(props.note.id)
	}

return(

	<li className="note">
		{console.log(props.note)}
		<input 
		className="note__title"
		type="text"
		placeholder="title"
		value={props.note.title}
		onChange={updateTitle}
	/>
		
	<textarea 
		className="note__description"
		placeholder="Description..."
		value={props.note.description}
		onChange={updateDescription}
	/>
		
		<span 
		className="note__delete"
		onClick={clickDelete}
		>X</span>
	</li>
	);
};

export default Note;


