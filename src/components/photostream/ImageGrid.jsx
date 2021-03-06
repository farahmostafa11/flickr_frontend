import React,{useState} from "react"
import CommentBox from "../Comments/CommentBox"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar,faPlusSquare,faComment,faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import {PostUserFavs,DeleteUserFavs} from '../../services/userServices'

/** Renders ImageGrid component
 * @author Samar Nabil
 * @namespace ImageGrid
 * @category Functional Component
 * @extends Component
 * @property {String} props.id -Photo id
 * @property {String} props.url -Photo url 
 * @property {String} props.titile -Photo title
 * @property {String} props.description -Photo descirption
 * @property {String} props.privacy -Photo privacy (public/private)
 * @property {String} props.ownerId -Photo owner id
 * @property {Number} props.numberOfFavs -Photo number of likes
 * @property {Number} props.numberOfComments -Photo number of Comments
 * @property {String} props.ownerName -Photo owner name (YOU!)
 * @property {Boolean} props.viewMode -Indication if it's my account or others
 * @property {Boolean} props.favMode -Indication to allow likes or not (cannot like my photos)
 */
function ImageGrid(props){

    const fav = <FontAwesomeIcon icon={faStar} color="white"/>
    const addTo = <FontAwesomeIcon icon={faPlusSquare} color="white"/>
    const comment = <FontAwesomeIcon icon={faComment} color="white"/>
    const open = <FontAwesomeIcon icon={faFolderOpen} color="white" />
    const [isUser, setIsUser] = useState(props.viewMode);
    const [isFav , setIsFav] = useState(true);
    // overlay
    const [isMousedOver, setMouseOver] = useState(false);
    //Comment Box
    const [isComment, setIsComment] = useState(false);

    /** Sets photo size (css) to width & height of aspect ratio of loaded image
    * @memberof ImageGrid
    * @method setItemRatio
    */
    function setItemRatio() {
        this.parentNode.style.setProperty('--ratio', this.naturalHeight / this.naturalWidth)    
    }

    /** Waits for the photo to load before assigning size to prevent from crashing
    * @memberof ImageGrid
    * @method waitForLoad
    */
    function waitForLoad(){
        this.addEventListener('load', setItemRatio)
    }

    /** Shows a shadow overlay over the photo with its information (title,number of likes, number of comments, owner name)
    * @memberof ImageGrid
    * @method handleMouseOver
    */
    function handleMouseOver() {
        setMouseOver(true);
    }

    /** Remove shadow overlay & hide information
    * @memberof ImageGrid
    * @method handleMouseOut
    */
    function handleMouseOut() {
        setMouseOver(false);
    }

    /** Open comment window to write a comment
    * @memberof ImageGrid
    * @method openCommentBox
    */
    function openCommentBox(){
        setIsComment(!isComment);
    }

    /** Add or remove photo from favorites (like & unlike)
    * @memberof ImageGrid
    * @method addToFav
    */
    function addToFav(){
        const object={
            photo_id:props.id
        }

        PostUserFavs(object).then( response => {
        // PostUserFavs(props.id,object).then( response => {
            console.log(response);  })
            .catch( err=>{ 
            if(err.status === 500){
                DeleteUserFavs(props.id).then( response => {
                    console.log(response);
                })
            }});
            
      
    }

    function deleteFav(){
        DeleteUserFavs(props.id).then( response => {
            console.log(response);
        })
    }

    return(
        <>
            <div className="item">
           <Link to={`/imagedetails/${props.id}`}> <button className="open-photo">{open}</button></Link>
                <img 
                src={props.url} 
                onLoad={event => (
                    event.currentTarget.naturalHeight? setItemRatio.call(event.currentTarget) : waitForLoad.call(event.currentTarget) 
                )}
                alt={props.title}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                />
                <div className="shadow-overlay" style={{display: isMousedOver || isComment?"block":"none"}}
                    onMouseOver={handleMouseOver} 
                    onMouseOut={handleMouseOut}>
                    <h1>{props.title}</h1>
                    <ul  className="tools">
                        <li><a href="#" id="para">by {props.ownerName}</a></li>
                        <div id="info">
                            <li>{addTo}</li>
                            <li  onClick={openCommentBox}> {comment} {props.numberOfComments}</li>
                            
                                <>
                                {/*isFav? <li onClick={deleteFav}>{fav} {props.numberOfFavs}</li>:<li> {fav} {props.numberOfFavs}</li>*/}
                                </>
                            :
                                <> 
                                {isFav?<li onClick={addToFav}>{fav} {props.numberOfFavs}</li>:<li> {fav} {props.numberOfFavs}</li>}
                               
                                </>
                           
                        </div>   
                    </ul>
                    
                    {isComment && <CommentBox numberOfComments= {props.id} photo_id={props.id} onClick={openCommentBox}/>}
                </div>
            </div> 
        </>
    )
}

export default ImageGrid;