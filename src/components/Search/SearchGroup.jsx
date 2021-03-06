import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import { useParams } from 'react-router'
import GroupCard  from './GroupCard'
import Join from './Join'
import Header from "../navbar/mainNav"
import {GetGroupBySearch} from "../../services/groupServices"
import './SearchPeople.css'
import configData from "../../config/development.json"

import { get } from 'jquery'
const SERVER_URL = configData.SERVER_URL ;
const endpoint = 'http://localhost:3001/'
const end= '/group/'
const point= '/search'
/** Renders Group Card component to show group in search
 * @author Roaa Magdy
 * @namespace SearchGroup
 * @category Functional Component
 * @extends Component
 * @property {String} text -Word used in search bar (used in get requests to retrieve group accounts)
 */
function SearchGroup() {
    const {text}= useParams();
    const textt='group'
    const navStyle={
        color:'white'
    };
    let error=false;
    const [groups, setGroup] = useState([]);
    
useEffect(() => {
  (async function() {
    /** Get request for people
                * @memberof SearchGroup
                * @method GetGroupBySearch
                * @returns respone of group data 
                * @example 
                * [
                    {
                      "id": 0,
                      "url": "https://live.staticflickr.com/7698/buddyicons/132622657@N06_r.jpg?1429140120#132622657@N06",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "num_photos": "129",
                      "role": "member",
                      "createdAt": "2015-2-1"
                    },
                    {
                      "id": 1,
                      "url": "https://live.staticflickr.com/7698/buddyicons/132622657@N06_r.jpg?1429140120#132622657@N06",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "role": "",
                      "num_photos": "129",
                      "createdAt": "2015-2-1"
                    },
                    {
                      "id": 2,
                      "url": "https://picsum.photos/600/200?random=1",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "role": "member",
                      "num_photos": "129",
                      "createdAt": "2015-2-1"
                    },
                    {
                      "id": 3,
                      "url": "https://picsum.photos/400/400?random=3",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "role": "",
                      "num_photos": "129",
                      "createdAt": "2015-2-1"
                    },
                    {
                      "id": 4,
                      "url": "https://picsum.photos/300/400?random=1",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "role": "",
                      "num_photos": "129",
                      "createdAt": "2015-2-1"
                    },
                    {
                      "id": 5,
                      "url": "https://picsum.photos/400/400?random=1",
                      "name": "Samar Nabil",
                      "num_members": "3.3k",
                      "role": "member",
                      "num_photos": "129",
                      "createdAt": "2015-2-1"
                    }
                ]
                */
    let response = await GetGroupBySearch(text)
    for(var i=0;i<response.data.length;i++){
      let x = await axios.get(SERVER_URL+'group/members/'+response.data[i]._id,{headers:{token:localStorage.token}})
      if(x.data[i]&&x.data[i].role){
        response.data[i].role =x.data[i].role
      } 
    }
        if (response.status === 200){
            setGroup(response.data);
      }
  })();
}, []);
/////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="SearchPeople">
            <Header isLogged={true}/>
        <div className="SearchPeople-cont">
        <h4>Flickr groups</h4>
        {!error && groups.map((group) => (
///////////////////////////////////////linking here to handle pressing on the card to go to user account/////////////////////
            <div className="FollowingButton">
            <Link style={navStyle} to={`/group/${group.id}`}>
              <GroupCard
              key={group.id} 
              group_id={group.id}
            //   url={group.url} 
              groupname={group.name}
              followers={group.num_members} 
              role={group.role}
              noofimages={group.num_photos}
              date={group.createdAt} 
              />
              </Link>
              <Join
              key={group.id} 
              group_id={group.id}
              role={group.role}
              />
            </div>
              )) }
              {error && (<div>Error Loading {groups.map((group) =>(<p> {group.message}</p>))}</div>)}
        </div>
        
        </div>
    )
}

export default SearchGroup
