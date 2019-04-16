import React from "react";
import { Tag, Upload, Icon, message } from 'antd';
import Avatar from '../components/individual/Avatar.jsx';

const Utils = {
  activeStorageUploadRenderer: ({ handleUpload, uploads, ready, imageUrl, filename, type }) => {
    return(<div>
      <Avatar handleUpload={handleUpload} uploads={uploads} imageUrl={imageUrl} filename={filename} type={type}/>

      {uploads.map(upload => {
        // console.log(upload)
        switch (upload.state) {
          case 'waiting':
            return <p key={upload.id}>Waiting to upload {upload.file.name}</p>
          case 'uploading':
            return (
              <p key={upload.id}>
                Uploading {upload.file.name}: {upload.progress}%
              </p>
            )
          case 'error':
            return (
              <p key={upload.id}>
                Error uploading {upload.file.name}: {upload.error}
              </p>
            )
          case 'finished':
            return <p key={upload.id}>Finished uploading {upload.file.name}</p>
        }
      })}
    </div>)
  },

  //combine two dictionaries together
  //example: var a = { foo: true }, b = { bar: false };
  //result: { foo: true, bar: false }
  extend: (obj, src) => {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  },

  setup(obj, list) {
    for (var i=0; i < list.length; i++) {
      obj[i] = Utils.extend(obj[i], list[i])
    }
  },

  //     0 - matched with a house
  //     1 - interviewing with a house
  //     2 - applied
  //     3 - rejected
  //     4 - not applied yet
  renderStatus: (statusNum, displayTag) => {

    const statuses = {
      0: ["Accepted", "green"],
      1: ["Interviewing", "blue"],
      2: ["Applied", "purple"],
      3: ["Declined", "red"],
      4: ["No Applications", "gold"]
    }

    if (displayTag) {
      const status = statuses[statusNum][0];
      const color = statuses[statusNum][1];
      return(
        <Tag color={color} className="tag">{status}</Tag>
      )
    }

    // if (num === 0 || num === "housed") {
    //   return (
    //     <React.Fragment key='status'>
    //       <h2 style={{color:"green"}}>housed</h2>
    //     </React.Fragment>
    //   )
    // } else if (num === 1 || num === "interview") {
    //   return (
    //     <React.Fragment key='status'>
    //       <h2 style={{color:"yellow"}}>interviewing with house</h2>
    //     </React.Fragment>
    //   )
    // } else if (num === 2 || num === "received") {
    //   return (
    //     <React.Fragment key='status'>
    //       <h2 style={{color:"orange"}}>applied</h2>
    //     </React.Fragment>
    //   )
    // } else if (num === 3 || num === "rejected") {
    //   return (
    //     <React.Fragment key='status'>
    //       <h2 style={{color:"red"}}>rejected</h2>
    //     </React.Fragment>
    //   )
    // } else if (num === 4) {
    //   return (
    //     <React.Fragment key='status'>
    //       <h2 style={{color:"red"}}>not applied</h2>
    //     </React.Fragment>
    //   )
    // } else {
    //   return null
    // }
  }

}

export default Utils;
