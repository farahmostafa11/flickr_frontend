import React,{useState , useEffect } from 'react';
import axios from "axios"
import {addPhotoToAlbum , deletePhotoFromAlbum} from '../../services/albumServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/** Renders AddAlbumImages component  with album cover photo, title and number of existant photos
 * @author Khadija Khaled
 * @namespace AddAlbumImages
 * @category Functional Component
 * @extends Component
 * @property {String} props.albumCover -Album cover photo url
 * @property {String} props.albumTitle -Album title 
 * @property {Array} props.albumPhotos -Album photos
 * @property {Array} props.imgAddIds -Array of photos to be added to Album
 * @property {String} props.albumId -Album id
 */

function AddAlbumImages(props) {
    const check = <FontAwesomeIcon icon={faCheckCircle} color="cornflowerblue" size="1x"/>;
    const  { albumCover , albumTitle , albumPhotos , imgAddIds , albumId }= props;
    const [photoCount,setPhotoCount]= useState(albumPhotos.length);
    const [isChecked,setIsChecked]= useState(true);

    console.log(isChecked);
    
    const imgSelected={"photos":imgAddIds};


      /** Toggle isChecked boolean 
    * @memberof AddAlbumImages
    * @method toggleChecked
    */
    const toggleChecked = () => {
        if(isChecked) // was initially checked, hence the user want to delete this/these photos from the selected album
        {
           
            deletePhotoFromAlbum(albumId,imgSelected).then( response => {
              console.log(response)
              setPhotoCount(response.data.length);
          })
          setIsChecked(!isChecked);
        }
        else{ // was initially unchecked, hence the user want to add this/ these photos to the selected album 
            //addPhotoToAlbum(albumId,imgSelected);
            addPhotoToAlbum(albumId,imgSelected).then( response => {
              setPhotoCount(response.data.length);
          })
          setIsChecked(!isChecked);
        }
      };

    /** To check if it is present in the array of photos selected or not 
    * @memberof AddAlbumImages
    * @method containsPhotos
    * @param {object} obj - A photo object
    * @returns {boolean} - A boolean indicating the photo id is present within the array or not
    */
      function containsPhotos(obj) {
        return imgAddIds.some((elem) => elem._id === obj._id);
      }

        /** To check whether the selected photos ids are all present in a specific album or not
    * @memberof AddAlbumImages
    * @method isPhotoPresent
    * @returns {boolean} - A boolean indicating whether teh array of selected photos is totally included inside the album phtos' array
    */
    const isPhotoPresent =()=>{
        // for loop on elements of selected photos ids 
        // compare the id in each loop  with the ids present in the album
        // if true (the id is present) then count ++
        // after looping .. check whether the count is equal to array of selected ids
        // if yes .. this means all selected ids are present in this album .. then make it checked
        // if no .. not all the selected photos ids are present .. then make it unchecked

        let count =0;
        albumPhotos.forEach(element => {
            if(containsPhotos(element))
            {
                count = count + 1 ;
            }
        }); 
        if(count === imgAddIds.length)
        {
            setIsChecked(true);
        }
        else
        {
            setIsChecked(false);
        }
        


    };
  
    useEffect(() => {
        isPhotoPresent()
    },[]);


    return (
      <>

            <div className="userAlbumAdd" onClick={toggleChecked}>
              <div className="userAlbumCover">
                {/* <div className="row"> */}
                  <img className="img-responsive" id="contentAdd" src={albumCover} alt="image_flickr" />
                  <div className="albumAddInfo" >
                    <h5 className="albumTitleAdd">{albumTitle}</h5>
                    <h5 className="albumInfoAdd">
                    {photoCount}
                    {' '}
                    items
                    </h5>
                  </div>
                  {/* <div> */}
                  {isChecked &&
                  
                  <div className="checkIcon">
                    {check}
                  </div>
                  }
                  {/* </div> */}
                {/* </div> */}
            </div>
            </div>

      </>
     );
    }
    
export default AddAlbumImages;
    