// Récupération du fichier json photographes

fetch("./data.json").then((response) => {
   if (response.ok) {
      response.json().then((json) => {
         photographData = json;
         photographers = json.photographers;
         photographMedia = json.medias;
         showPhotographers(json);
      });
   }
});

const photographList = document.querySelector(".photographersList");
/**
 * @param  {JSON} photographData // Récupération du tableau des photographes pour les afficher sur index.html
 */
function showPhotographers(photographData) {
   for (let i = 0; i < photographers.length; i++) {
      // console.log(photographData["medias"]);
      const link = document.createElement("a");
      const item = document.createElement("article");
      const id = document.createElement("section");
      const photo = document.createElement("div");
      const img = document.createElement("img");
      const name = document.createElement("h2");
      const descript = document.createElement("section");
      const city = document.createElement("h3");
      const phrase = document.createElement("h3");
      const price = document.createElement("h3");
      const tagContainer = document.createElement("section");

      // console.log(sortTag);

      item.setAttribute("class", "photographItem");
      id.setAttribute("class", "photographItem__id");
      photo.setAttribute("class", "photographItem__id__photo");
      name.setAttribute("class", "photographItem__id__name");
      descript.setAttribute("class", "photographItem__descript");
      descript.setAttribute("tabindex", 0);
      city.setAttribute("class", "photographItem__descript__city");
      phrase.setAttribute("class", "photographItem__descript__phrase");
      price.setAttribute("class", "photographItem__descript__price");
      tagContainer.setAttribute("class", "photographItem__tags");

      link.setAttribute("href", `photographers.html?id=${photographers[i].id}`);
      img.setAttribute("src", `./Photos/Photographers/${photographers[i].portrait}`);
      link.setAttribute("aria-label", `${photographers[i].name}`);
      img.setAttribute("alt", "");
      name.textContent = photographers[i].name;
      city.textContent = `${photographers[i].city}, ${photographers[i].country}`;
      phrase.textContent = photographers[i].tagline;
      price.textContent = `${photographers[i].price}€ / jour`;

      const photographTag = photographData["photographers"][i]["tags"];

      for (let t = 0; t < photographTag.length; t++) {
         const tagLink = document.createElement("a");
         const span = document.createElement("h4");
         span.textContent = `#${photographTag[t].toLowerCase()}`;
         span.setAttribute("tabindex", 0);
         item.classList.add(`${photographTag[t].toLowerCase()}`);
         tagContainer.appendChild(tagLink);
         tagLink.appendChild(span);
      }

      photo.appendChild(img);
      link.appendChild(photo);
      link.appendChild(name);
      id.appendChild(link);
      descript.appendChild(city);
      descript.appendChild(phrase);
      descript.appendChild(price);
      item.appendChild(id);
      item.appendChild(descript);
      item.appendChild(tagContainer);

      photographList.appendChild(item);
   }
}
