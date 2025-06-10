import React from 'react'
import {useEffect,useState,Link} from 'react'
import {useNavigate} from 'react-router-dom'

function Profile()
{   const [user,setUser]=useState({});
    const [orders,setOrders]=useState([]);
    const [favitems,setfavItems]=useState([]);

    return (
        <div>profile</div>
    );
}

export default Profile