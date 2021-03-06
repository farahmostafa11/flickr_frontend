import React, {useState,useEffect}from 'react'
import AlbumCard from './AlbumCard'
import './AlbumPreview.css'
import GetUserAlbums,{GetPeopleAlbums} from "../../services/albumServices"

/** Renders Photostream component
 * @author Samar Nabil
 * @namespace AlbumPreview
 * @category Functional Component
 * @extends Component
 * @property {Boolean} props.isUser -Indicate if it is my profile (true) or not 
 * @property {String} props.userId -Visitied account user id 
 */
function AlbumPreview(props){

    //user/people boolean -> from userInfo token handling
    const [isUser , setIsUser] = useState(props.isUser)
    const [userId , setUserId] = useState(props.userId)
    const [username , setUserName] = useState(props.userName)

    //Get user albums
    const [userAlbums, setUserAlbums] = useState([]);
    const [peopleAlbums, setPeopleAlbums] = useState([]);

    //get request
    useEffect( () =>{
        if(isUser){
            //get user photos
            GetUserAlbums().then( response => {
                setUserAlbums(response.data);
            })
        }else{
            //get people photos by userId
            GetPeopleAlbums(username).then( response => {
                setPeopleAlbums(response.data);
            })
        }
    },[userAlbums])



    return(
        <>
        <div className="albumPreview">
            <div className="album-grid">
                {isUser?
                    <>
                    {userAlbums.map (album =>(
                        <AlbumCard 
                        id={album._id}
                        coverUrl = {album.coverPhoto.photoUrl}
                        title = {album.title}
                        ownerId = {album.ownerId}
                        numberOfPhotos = {album.photos.length}
                        viewMode={false}
                        favMode = {false}
                        isUser={isUser}
                        userId={userId}
                        />
                        
                    ))}
                    </>
                : 
                    <>
                    {peopleAlbums.map (album =>(
                        <AlbumCard 
                        id={album.id}
                        coverUrl = {album.coverPhoto.photoUrl}
                        title = {album.title}
                        ownerId = {album.ownerId}
                        numberOfPhotos = {album.photos.length}
                        viewMode={false}
                        favMode = {true}
                        isUser={isUser}
                        userId={userId}
                        />
                    ))} 
                    </>
                }
            </div>
        </div>
        
        </>
        )
}

export default AlbumPreview;