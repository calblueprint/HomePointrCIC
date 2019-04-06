
export class AttachmentUpload {
  constructor(attachment) {
    this.attachment = attachment
    this.directUpload = new DirectUpload(attachment, this.directUploadUrl, this)
  }

  start() {
    this.directUpload.create(this.directUploadDidComplete.bind(this))
  }

  directUploadWillStoreFileWithXHR(xhr) {
    xhr.upload.addEventListener("progress", event => {
      const progress = event.loaded / event.total * 100
      this.attachment.setUploadProgress(progress)
    })
  }

  directUploadDidComplete(error, attributes) {
    if (error) {
      throw new Error(`Direct upload failed: ${error}`)
    }
    this.attachment.setAttributes({
      sgid: attributes.attachable_sgid,
      url: this.createBlobUrl(attributes.signed_id, attributes.filename)
    })
  }

  createBlobUrl(signedId, filename) {
    return this.blobUrlTemplate
      .replace(":signed_id", signedId)
      .replace(":filename", encodeURIComponent(filename))
  }

  get directUploadUrl() {
    return window.location.origin + "/rails/active_storage/direct_uploads"
  }

  get blobUrlTemplate() {
    return window.location.origin + "/rails/active_storage/blobs/:signed_id/:filename"
  }
}
