import React from "react";
import { Tag, Upload, Icon, message } from 'antd';
import Avatar from '../components/individual/Avatar.jsx';

const Utils = {
  activeStorageUploadRenderer: ({ handleUpload, uploads, ready, imageUrl, filename, type }) => {
    return(<div>
      <Avatar handleUpload={handleUpload} uploads={uploads} imageUrl={imageUrl} filename={filename} type={type}/>

      {uploads.map(upload => {
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

  // render status tag for tenant card
  renderStatus: (statusInp, displayTag) => {

    let status = statusInp;

    if (typeof(status) === "string") {
      switch(status) {
        case "housed":
          status = 0;
          break;
        case "interview":
          status = 1;
          break;
        case "received":
          status = 2;
          break;
        case "rejected":
          status = 3;
          break;
      }
    }

    const statusDict = {
        0: ["Accepted", "green"],
        1: ["Interviewing", "blue"],
        2: ["Applied", "purple"],
        3: ["Declined", "red"],
        4: ["No Applications", "gold"]
    }

    if (displayTag) {
      const finalStatus = statusDict[status][0];
      const color = statusDict[status][1];
      return(
        <Tag color={color} className="tag">{finalStatus}</Tag>
      )
    }
  }

}

export default Utils;
