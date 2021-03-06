import React, { useState, useEffect } from 'react'
import '../../fonts/font/flaticon.css'
import './Upload.css'
import flickrPhoto from '../../img/flickr.jpg'
import {PostPhoto} from '../../services/photoServices'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
const formdata=require('form-data');
const fileToArrayBuffer = require('file-to-array-buffer')
var arrayBufferToBuffer = require('arraybuffer-to-buffer');
//import fs  from  'fs';
/** Renders Upload component to make the user upload new photos
 * @author Farah Mostafa
 * @namespace Upload
 * @category Functional Component
 * @extends Component
 */
export default function Upload(){

    const navStyle={
        color:'black'
    };

    const [image, setImage] = useState("");
    const onchange = e =>{  
        console.log(e);
        //e.target.value
       setImage(e.target.files[0])
    };
   

    const [tag, setTag] = useState([]);
    const addtag = e => setTag(e.target.value);
    console.log(tag);

    const plus = <FontAwesomeIcon icon={faPlusCircle} color="DarkGrey" />;

    /** called once the user clicks add to add the selected photo to their account
    * @memberof Upload
    * @method addImageToCameraroll
    */

    const addImageToCameraroll = async () => {
       
        var d;var buffer;
       
       await fileToArrayBuffer(image).then(data=>{
        d=data;  

        console.log(data)})

        .catch(err=>console.log(err));
        
        const bufferarray =new arrayBufferToBuffer(d);
        var mybuffer=[]

        for(var i=0;i<bufferarray.length;i++)

        mybuffer.push(bufferarray[i]);
        
     
        const newImage = {
            title: "yoyo",
            description: "",
            file: mybuffer,
            privacy: "public",
            tags: tag
        }
        console.log("status1");
        /** sends the required photo information to the server (Post Request)
        * @memberof Upload
        * @method PostPhoto
        * @param {Array of buffers} newImage-the id of the user i am curruntly in his/her profile
        */
        PostPhoto(newImage).then(response=>{
        
        })
    };

    return(
        <div className="uploadNavbar">
            <nav className="navbar fix_nav">
            <div className="container-fluid">
            <div className="logoPlusNav">
            <Link className="uploadLink" style={navStyle} to="/user">
                <a className="flickLogoName" href="#top">
                    <img src={flickrPhoto} alt="flickrLogo"></img>
                </a>
            </Link>
            <Link  style={navStyle} to="/user">
                <span>Your Photostream</span>
            </Link>
            {image && <Link style={navStyle} to="/user"><button className="postPhoto" onClick={addImageToCameraroll} type='submit'>{plus}Add</button></Link>}
            </div>
            </div>
            </nav>
            <div className="uploadText">
                {!image && <div><h3>You can upload 1000 more photos and videos</h3>
                <p>Drag & drop photos here</p>
                <p>or</p></div>}
                <div>
                <p><form enctype="multipart/form-data"><input type="file"  accept="image/*" name="image" id="file"  onChange={onchange} /></form></p>
                <p><label for="file" >Upload Image</label></p>
                <p><img id="output" width="200" /></p>
                {image && <img src={image} alt="The current file" id="selectedImg" />}
                {image && <form>
                    <label for="tag">Add tag:</label><br/>
                    <input type="text" id="tag" name="text" onChange={addtag}/><br/>
                </form>}
                </div>
            </div>
        </div>
    );
    
}