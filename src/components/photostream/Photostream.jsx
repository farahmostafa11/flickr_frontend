import React,{useState,useEffect} from "react"
import ImageGrid from "./ImageGrid"
import NavBar from "./NavBar"
import './ImageGrid.css'
import {GetUserPhotos} from "../../services/userServices"
import GetPeoplePhotos from "../../services/peopleServices"
import $ from 'jquery'; 
import { Link , Route, useParams } from 'react-router-dom'

/** Renders Photostream component
 * @author Samar Nabil
 * @namespace Photostream
 * @category Functional Component
 * @extends Component
 * @property {Boolean} props.isUser -Indicate if it is my profile (true) or not 
 * @property {String} props.userId -Visitied account user id 
 */
function Photostream(props){

    //user/people boolean -> from userInfo token handling
    const [isUser , setIsUser] = useState(props.isUser)
    const [userId , setUserId] = useState(props.userId);
    const [isFav , setIsFav] = useState(false)

    //Get photos
    const [userPhotos, setUserPhotos] = useState([]);
    const [peoplePhotos, setPeoplePhotos] = useState([]);
    const [photos, setPhotos] = useState([]);

    //get request
    useEffect( () =>{
        if (props.isUser){
            //get user photos
                /** Get request for user photos
                * @memberof Photostream
                * @method GetUserPhotos
                * @returns respone of photo data 
                * @example 
                * [
                {
                    "_id": 0,
                    "photoUrl": "http://localhost:3000/api/v1/image/0",
                    "ownerId": 0,
                    "Fav": [
                    0
                    ],
                    "comments": [
                    0
                    ],
                    "title": 0,
                    "privacy": "string",
                    "description": "string",
                    "tags": [
                    "string"
                    ],
                    "peopleTags": [
                    {
                        "tagging": "string",
                        "tagged": [
                        "string"
                        ]
                    }
                    ],
                    "createdAt": "2021-06-07",
                    "UpdatedAt": "2021-06-07"
                }
                ]
                */
            GetUserPhotos().then( response => {
                setUserPhotos(response.data.photos);
                setIsUser(true);
            })
        }else{
            //get people photos by userId
            GetPeoplePhotos(userId).then( response => {
                setPeoplePhotos(response.data);
                setUserPhotos(response.data);
                setIsUser(false);
            })
        }
    },[props.isUser])

    return (
        <>
        <div className="photostream-body">
            <NavBar 
                viewMode = {isUser}
            />
            <div className="grid">
            {isUser?
                <>
                    {userPhotos.map(photo => (
                    <ImageGrid
                    id = {photo._id}
                    url ={photo.photoUrl} 
                    title ={photo.title} 
                    description = {photo.description}
                    privacy = {photo.privacy}
                    ownerId = {photo.ownerId}
                    numberOfFavs = {photo.Fav.length}
                    numberOfComments ={photo.comments.length}
                    ownerName = "YOU!"
                    viewMode = {isUser}
                    favMode = {isFav}
                    />
                ))}
                </>
                :
                <>
                    {peoplePhotos.map(photo => (
                    <ImageGrid
                    id = {photo._id}
                    url ={photo.photoUrl} 
                    title ={photo.title} 
                    description = {photo.description}
                    privacy = {photo.privacy}
                    ownerId = {photo.ownerId}
                    numberOfFavs = {photo.numberOfFavs}
                    numberOfComments ={photo.numberOfComments}
                    ownerName ={'you'}
                    viewMode = {isUser}
                    favMode = {true}
                    />
                ))}
                </>
            }

            <div className="placeholder"></div>
            </div>
        </div>
        </>
    ) 
}

export default Photostream;