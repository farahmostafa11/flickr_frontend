import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import './AddPhotos.css'
import PhotosToAdd from "./PhotosToAdd"
import {PostGroupPhotos} from "../../services/groupServices"
import {GetUserPhotos} from "../../services/userServices"

/** Renders AddPhotos component
 * @author Samar Nabil
 * @namespace AddPhotos
 * @category Functional Component
 * @extends Component 
 */
function AddPhotos(props){

    const path = props.location.pathname;
    var index = path.split('/');
    var id = index[2];
    //console.log(id);

    const [UrltoAdd ,setUrl] = useState([]);
    const [idToAdd ,setId] = useState([]);

    //Get photos
    const [userPhotos, setUserPhotos] = useState([]);
    console.log({idToAdd});

    //get request
    useEffect( () =>{
        //get user photos
        GetUserPhotos().then( response => {
            setUserPhotos(response.data.photos);
        })
    },[])

    /** Append chosen photos to an array photo ids to add to group and array of photos url to show selection
    * @memberof AddPhotos
    * @method addPhoto
    * @param {string} id -Photo id
    * @param {String} url -Photo url
    */
    function addPhoto(id,url){
        setId(idToAdd => [...idToAdd,id]);
        setUrl(UrltoAdd => [...UrltoAdd,url]);
    }  

    /** Remove chosen photos from array of photo ids and array of photos url 
    * @memberof AddPhotos
    * @method removePhoto
    * @param {string} id -Photo id
    * @param {String} url -Photo url
    */
    function removePhoto(id,url){
        setId(prevItem => {
            return prevItem.filter(
                (item,index) =>{
                    return item !== id;
                }
            )
        });

        setUrl(prevItem => {
            return prevItem.filter(
                (item,index) =>{
                    return item !== url;
                }
            )
        });
    }

    /** Confirm adding photos to group and redirect back to group pool
    * @memberof AddPhotos
    * @method addToPool
    */
    function addToPool(){
        //Api
        //post user photos
        idToAdd.map(photo_id =>{
            PostGroupPhotos(id,photo_id).then( response => {
                console.log(response);
                //link to group pool
                props.history.push('/group/'+id);
            })
        })
    }

    function errorMessage(){
        alert('Darn! Flickr is only able to add 6 photos at a time to a group. After you add these, why not come back and add some more?')
    }

    const size = userPhotos.length;
    const sizeToDelete = idToAdd.length;


    return(
        <>
        <div className="AddPhotos-body">
            <h1>Add photos</h1>
            <h3>Select items to add to group</h3>
            <div className="add-table">
                <div className="col1">
                    <div className="first">
                        <h4>Your Photostream <p>({size} items)</p></h4>
                    </div>
                    <div className="second">
                        <div className="img-grid">
                        {userPhotos.map(photo => (
                            <PhotosToAdd 
                                url = {photo.photoUrl}
                                id = {photo._id}
                                onAdd = {addPhoto}
                                onRemove ={removePhoto}
                                onError = {errorMessage}
                                size = {sizeToDelete}
                            />
                        ))}
                        </div>
                    </div>
                </div>
                <div className="col2">
                    <div className="first">
                    <h4>Your Selections</h4>
                    <p>you can add: 6 at a time</p>
                    </div>
                    <div className="second">
                        <div className="add-grid" >
                        {UrltoAdd.map(url => (
                            <img src={url}/>
                        ))}
                        </div>
                    </div>
                    <div className="third">
                    {sizeToDelete === 0?
                        <button disabled={true}>ADD TO GROUP</button>
                        :
                        <button onClick={addToPool}>ADD TO GROUP</button>
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
    )

}

export default AddPhotos;