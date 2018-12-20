import React from "react";

const Utils = {
  activeStorageUploadRenderer: ({ handleUpload, uploads, ready }) => (
    <div>
      <input
        type="file"
        disabled={!ready}
        onChange={e => handleUpload(e.currentTarget.files)}
      />

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
    </div>
  ),

  //combine two dictionaries together 
  //example: var a = { foo: true }, b = { bar: false };
  //result: { foo: true, bar: false }
  extend: (obj, src) => {
    for (var key in src) {
      if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
  }
}

export default Utils;