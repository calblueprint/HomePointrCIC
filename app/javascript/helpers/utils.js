import React from "react";
import { Tag, Upload, Icon, message } from 'antd';
import Avatar from '../components/individual/Avatar.jsx';

const Utils = {
  activeStorageUploadRenderer: ({ handleUpload, uploads, ready, onURLChange, imageUrl, filename, type }) => {
    return(<div>
      <Avatar handleUpload={handleUpload} uploads={uploads} onURLChange={onURLChange} imageUrl={imageUrl} filename={filename} type={type}/>

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

  //combines two dictionaries together {a:1, b:2}, {c:3} -> {a:1, b:2, c:3}
  setup(obj, list) {
    for (var i=0; i < list.length; i++) {
      obj[i] = Utils.extend(obj[i], list[i])
    }
  },

  //
  titleize(original) {
    let result = original.split("_");
    var i;
    for (i = 0; i < result.length; i++) {
      result[i] =  result[i].charAt(0).toUpperCase() + result[i].slice(1);
    }
    return result.join(" ");
  },

  // render status tag for tenant card
  renderStatus: (statusInp, displayTag) => {

    let status = statusInp;

    if (typeof(status) === "string") {
      switch(status) {
        case "housed":
          status = 0;
          break;
        case "offer_of_tenancy":
          status = 1;
          break;
        case "interview":
          status = 2;
          break;
        case "received":
          status = 3;
          break;
        case "rejected":
          status = 4;
          break;
      }
    }

    const statusDict = {
        0: ["Accepted", "green"],
        1: ["Offered Tenancy", "cyan"],
        2: ["Interviewing", "blue"],
        3: ["Applied", "purple"],
        4: ["Declined", "red"],
        5: ["No Applications", "gold"]
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
