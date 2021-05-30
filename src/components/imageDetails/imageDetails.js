import React,{useState,useEffect}  from 'react'
import '../../fonts/font/flaticon.css'
import './imageDetails.css'
import { Carousel } from 'react-responsive-carousel';
import defaultProfile from '../../img/deefault.jpg';
import t1 from '../../img/img/dBackground.jpg';
import t2 from '../../img/img/ddBackground.jpg'
import ViewedImage from './ViewedImage'
import axios from "axios"
const endpoint = 'http://localhost:3001/'
//import { Link } from 'react-router-dom'
export default function ImageDetails(props){
    
    const [images, setPhotos] = useState([]);
    const [image, setImage] = useState("");
    const [selectedId,setSelectedI]=useState(props.photo_id);
    //const Id=(props.photo_id).toString();
    console.log("imageeeee"+image);
    console.log("idddddddddd"+props.photo_id);
    useEffect(() => {
        const fetchData = async () => {
        const {data,status} = await axios.get( endpoint+'photos');
        console.log(status);
        if (status === 200){
            setPhotos(data);
        }
        const response = await axios.get( endpoint+'photos?id='+props.photo_id);
        console.log(response);
        if (response.status === 200){
            console.log("status2",response.status);
            setImage(response.data[0].photo_url);
            console.log(response.data[0].photo_url);
        }
            
        
    };
    
        fetchData();
    },[]);
    console.log(image);
    return(
        <div className="showedImage">
            <div id="carouselExampleControls" className="carousel slide"  data-bs-interval="false">
            <div className="carousel-inner">
            <div className="carousel-item active adjustCarousel-item">
                <div className="imageSlide">
                    <img src={image} alt=""></img>
                </div>
            </div>
            {images.map(photo=>(<ViewedImage url={photo.photo_url}/>))} 
                </div>
                <button className="carousel-control-prev adjustbutton" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button className="carousel-control-next adjustbutton" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
                </div>
        </div>
    );
}