import React from "react"
import GoogleMapReact from 'google-map-react'
import GoogleMarker from './GoogleMarker'

const GoogleMap = (props) => {
  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{ lat: 52.4313, lng: 30.9937 }}
        center={{ lat: props.user.location?.latitude, lng: props.user.location?.longitude }}
        defaultZoom={12}
      >
        {[
          props.user,
          { id: 55, location: { latitude: 52.4313, longitude: 30.9937 }, first_name: 'Vasya', last_name: 'Pupkin', photo: { url: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Berlin_Tierpark_Friedrichsfelde_12-2015_img23_Siberian_tiger.jpg'} },
          { id: 66, location: { latitude: 52.4330, longitude: 30.9961 }, first_name: 'Ivan', last_name: 'Susanin', photo: { url: 'https://cdni.rt.com/russian/images/2019.11/article/5dc1288902e8bd657e2f3d9c.jpg'} },
          { id: 77, location: { latitude: 52.4368, longitude: 30.9909 }, first_name: 'Victor', last_name: 'Ivan', photo: { url: 'https://icdn.lenta.ru/images/2020/08/25/15/20200825151053822/square_320_4403c8acdee3ebd80be3c5b119b6fef0.png'} },
        ].map((user, index) => (
          <GoogleMarker
            key={index}
            lat={user.location?.latitude}
            lng={user.location?.longitude}
            photo={user.photo?.url}
            firstName={user.first_name}
            lastName={user.last_name}
            userId={user.id}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
export default GoogleMap
