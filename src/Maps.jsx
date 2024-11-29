import L from "leaflet";
import {MapContainer,Marker,TileLayer,Popup,useMapEvents} from "react-leaflet"
import MarkIcon from "leaflet/dist/images/marker-icon.png"
import {data} from "./data"
import "leaflet/dist/leaflet.css";
import { useState } from "react";
L.Icon.Default.mergeOptions({
  iconUrl:MarkIcon,
})
const Maps=()=>{
    const[mouseHover,setMouseHover]=useState(null)

  return (

    <>
    <MapContainer center={[data[0].latitude,data[0].longitude]}  zoom={14} style={{height:"100vh",width:"100%"}} >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'></TileLayer>
     {
      data.length!=0 && data.map((ii,i)=>{
        return <Marker position={[ii.latitude,ii.longitude]} eventHandlers={
            {
                mouseover:(e)=>{
                    const marker=e.target
                    marker.openPopup();
                },
                mouseout:(e)=>{
                    const marker=e.target;
                    marker.closePopup();
                }
            }
        }>
          <Popup>{ii.name}</Popup>
        </Marker>
      })
     }
    </MapContainer>
    </>
  )
}

export default Maps;