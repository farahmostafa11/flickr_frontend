import React, {useState} from 'react';
import axios from "axios"
import {addTag, addPeopleTag ,UpdatePhotos} from '../../services/photoServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import './EditModal.css';
import DropdownPrivacy from './DropdownPrivacy'; 
const endpoint = 'http://localhost:3001/'


/** Renders EditModal component to edit title, description, add tags or add people tags to selected photos 
 * @author Khadija Khaled
 * @namespace EditModal
 * @category Functional Component
 * @extends Component
 * @property {Array} props.imgEditIds -Array of photos ids to edit
 */
function EditModal(props) {

  const {imgEditIds} =props; // array of selected photos to edit to pass them to the API
  //console.log(imgEditIds); 


  const tag = <FontAwesomeIcon icon={faTag} color="DarkGrey" />;
  const people = <FontAwesomeIcon icon={faUserFriends} color="DarkGrey" />;
  const [tagAdded,setTagAdded] = useState(false);
  const [peopleAdded, setPeopleAdded]= useState(false);
  const [titleAdded,setTitleAdded] = useState(false);
  const [descriptionAdded, setDescriptionAdded]= useState(false);
  const [inputTag, setInputTag] = useState("");
  const [inputPeople , setInputPeople] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription , setInputDescription] = useState("");
  
  
 /** Saves the current value of the photo tag in input tag
    * @memberof EditModal
    * @method handleTagChange
    * @param {event} event -Tirggered event on change in input value
    */
  function handleTagChange(event){ // on tag input change .. take this change to set the new tag and indicate that there was a change in this field
    setTagAdded(true);
    const newTag = event.target.value;
    setInputTag(newTag);
    console.log(inputTag);
    if(newTag==="")
    {
      setTagAdded(false);
    }
    console.log('tagAdded');
    console.log(tagAdded);
  }


 /** Saves the current value of the people tag in input tag
    * @memberof EditModal
    * @method handlPeopleChange
    * @param {event} event -Tirggered event on change in input value
    */
  function handlePeopleChange(event){
    setPeopleAdded(true);
    const newPeople = event.target.value;
    setInputPeople(newPeople);
    console.log(inputPeople);
    if(newPeople==="")
    {
      setPeopleAdded(false);
    }
    console.log('peopleAdded');
    console.log(peopleAdded);
  }


  /** Saves the current value of the photo title in input tag
    * @memberof EditModal
    * @method handleTitleChange
    * @param {event} event -Tirggered event on change in input value
    */
  function handleTitleChange(event) {
    setTitleAdded(true);
    const newTitle = event.target.value;
    setInputTitle(newTitle);
    console.log(inputTitle);
    if(newTitle==="")
    {
      setTitleAdded(false);
    }
    console.log('titleAdded');
    console.log(titleAdded);
  }

    /** Saves the current value of the photo description in textarea tag
    * @memberof EditModal
    * @method handleDescriptionChange
    * @param {event} event -Tirggered event on change in input value
    */
  function handleDescriptionChange(event) {
    setDescriptionAdded(true);
    const newDescription  = event.target.value;
    setInputDescription(newDescription);
    console.log(inputDescription);
    if(newDescription==="")
    {
      setDescriptionAdded(false);
    }
    console.log('descrpAdded');
    console.log(descriptionAdded);
  }


// To addPeopleTag
const updatedPhotoPeopleTag ={
  "photos":imgEditIds,
  "tagged":[inputPeople]
};


// To addPeopleTag
const updatedPhotoTag ={
  "photos":imgEditIds,
  "tag":inputTag
};

//to add title
const updatedTitle ={
  "photos":imgEditIds,
  "title":inputTitle
};
//to add description
const updatedDescription ={
  "photos":imgEditIds,
  "description":inputDescription
};
//to add title & description
const updatedTitleDescription ={
  "photos":imgEditIds,
  "title":inputTitle,
  "description":inputDescription
};


    /** Passes the correct parameters to the API update requests based on user changes
    * @memberof EditModal
    * @method confirmEdit
    */
function confirmEdit()
{
  if(tagAdded) // call addTag handler
  {
    console.log(updatedPhotoTag);
    addTag(updatedPhotoTag).then( response => {
      console.log(response.status);
  }) 

  }
  if(peopleAdded) // call addPeople handler
  {
    console.log(updatedPhotoPeopleTag);
    addPeopleTag(updatedPhotoPeopleTag).then( response => {
      console.log(response.status);
    }) 

  }
  if(titleAdded && descriptionAdded) // call update title & description handler with object title and description
  {
      //updatedTitleDescription
      UpdatePhotos(updatedTitleDescription).then( response => {
        console.log(response.status);
      })
      
  }
  else if(titleAdded && !descriptionAdded) // call update title & description handler with only title changed
  {
    //updatedTitle
    UpdatePhotos(updatedTitle).then( response => {
        console.log(response.status);
      })


  }else if(!titleAdded && descriptionAdded) // call update title & description handler with only description
  {
    //updatedDescription
    UpdatePhotos(updatedDescription).then( response => {
        console.log(response.status);
      })
  }
}

  return (
    <>

      <div className="modal__backdrop_edit">
        <div className="modal__container_edit">
          <span className="close_edit" onClick={props.onRequestEditClose}>&times;</span>
          <h3 className="modal__title_edit">
            Editing
            {' '}
            {props.countEdit}
            {' '}
            photos
            {' '}
          </h3>
          <div className="title-desc-container">
            <input className="edit-title" type="text" placeholder="Change title"  onChange={handleTitleChange}/>
            <hr />
            <textarea className="edit-description" placeholder="Change description"  onChange={handleDescriptionChange}/>

          </div>
          <span className="privacy-label">Who can see this photo ?</span>

          <span className="space" />
          <DropdownPrivacy 
          imgEditIds={imgEditIds}
          />

          <div className="row">
            <div className="edit-tag">
              {tag}
              {'  '}
              <input type="text" className="no-outline" placeholder="Add new tags"  onChange={handleTagChange} />
            </div>
            <div className="edit-tag">
              {people}
              {'  '}
              <input type="text" className="no-outline" placeholder="Add new people" onChange={handlePeopleChange} />
            </div>
          </div>
          <div className="edit-footer">
            <button
              id="save_edit"
              type="button"
              onClick={confirmEdit} 
            >
              Save
            </button>
            <button id="cancel_edit" type="button" onClick={props.onRequestEditClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default EditModal;
