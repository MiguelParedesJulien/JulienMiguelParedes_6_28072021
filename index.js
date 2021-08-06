fetch("./data.json")
   .then((response) => {
      return response.json();
   })
   .then((json) => {
      json.media.forEach((media) => {
         //console.log(media.image ? media.image : media.video);
         if (media.image || media.video) {
            let element;
            if (media.image) {
               element = document.createElement("img");
               element.src = "./Photos/Portfolio/" + media.image;
            } else {
               element = document.createElement("video");
               element.src = "./Photos/Portfolio/" + media.video;
            }
            document.body.appendChild(element);
         }
      });
   });
