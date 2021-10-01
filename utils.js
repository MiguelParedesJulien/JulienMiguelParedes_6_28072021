class Image {
   constructor(data) {
      this.source = data.image;
      this.isVideo = false;
   }
}

class video {
   constructor(data) {
      this.source = data.video;
      this.isVideo = true;
   }
}

class mediaFactory {
   constructor(data) {
      if ("image" in data) {
         //let imageContent = new image(data);
         //imageContent.createImage;
         return new image(data);
      }
      if ("video" in data) {
         //let videoContent = new video(data);
         //videoContent.createVideo;
         return new video(data);
      }
   }
}
