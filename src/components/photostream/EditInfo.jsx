import React,{useState,useEffect} from "react"
import './EditInfo.css'
import Card from "./Card"
import DeleteModal from "../DeleteModal/DeleteModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import Header from "../navbar/mainNav"
import {GetUserPhotos} from "../../services/userServices"
import DeletePhoto from "../../services/photoServices"

/** Renders EditInfo component to edit photos 
 * @author Samar Nabil
 * @namespace EditInfo
 * @category Functional Component
 * @extends Component
 */
function EditInfo(){

    const back = <FontAwesomeIcon icon={faArrowLeft} color="DarkGrey"/>
    const navStyle={
        color:'white'
    };
    
    //Get photos
    const [photos, setPhotos] = useState([]);
    //get request
    useEffect( () =>{
        GetUserPhotos().then( response => {
            setPhotos(response.data.photos);
            console.log(response,"edit info")
        })
    },[photos])

    // Modal
    const [isModalOpen, setModalIsOpen] = useState(false);
    const [idToDelete,setID]=useState(0)

    /** Open/Close delete photo modal 
    * @memberof EditInfo
    * @method toggleModal
    * @param {String} id -Photo id to delete
    */
    function toggleModal(id){
        setID(id);
        console.log("editInfo",id);
        setModalIsOpen(!isModalOpen);
    }

    /** Confirm photo deletion by id 
    * @memberof EditInfo
    * @method ConfirmDelete
    */
    function confirmDelete(){
        const ids = {
            "photos":[idToDelete]
        };
        DeletePhoto(ids).then( response => {
            console.log(response);
        });
        //close delete modal
        toggleModal(idToDelete); 
    }

    
    return(
        <>
        <Header isLogged={true}/>
        <div className="EditInfo-body">
            <ul id="nav-list">
                <li id="nav-item"><Link  style={navStyle} to="/user"><a href="#" id="a">{back } Back to photostream</a></Link></li>
            <li id="right "><p id="a">Edit in <Link style={navStyle} to="/CameraRoll"><a id="a2" href="#" >Camera Roll</a></Link></p> </li>
            </ul>

            {/* cards */}
            <div className="card-grid">
            {photos.map(photo =>(
                <Card 
                    id = {photo._id}
                    url ={photo.photoUrl} 
                    title ={photo.title} 
                    description = {photo.description}
                    privacy = {photo.privacy}
                    ownerId = {photo.ownerId}
                    numberOfFavs = {photo.Fav.length}
                    numberOfComments ={photo.comments.length}
                    onDelete={toggleModal}
                />
            ))}
            </div>
            <main>
            {isModalOpen && 
            <DeleteModal onRequestClose={toggleModal} 
                onDelete={confirmDelete}
                title = "Delete 1 photo?"
                message = "You cannot reverse this action. Are you sure you want to permanently delete this photo?"
            />}
            </main>
        </div>
        </>
    )

}

export default EditInfo;