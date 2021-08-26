// DOM Elements
const submitBtn = document.querySelector("#submit");
const prenom = document.querySelector("#prenom");
const nom = document.querySelector("#nom");
const email = document.querySelector("#email");
const doc = document.querySelector("#js-document"),
   header = document.querySelector("header");
// let form = document.querySelector("#inscription");

submitBtn.onclick = function (e) {
   e.preventDefault();
   console.log(prenom.value);
   console.log(nom.value);
   console.log(email.value);
};

// Ouverture de la modale
// Récupérer les composants de type aria-haspopup="dialog" du document, ainsi que les fenêtres modales liées
const triggers = document.querySelectorAll("[aria-haspopup='dialog']");
// Selection de tous les éléments focalisables de la modale
const focusableElementsArray = ["[href]", "button:not([disabled])", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "[tabindex]:not([tabindex='-1'])"];
const keyCodes = {
   tab: 9,
   enter: 13,
   escape: 27,
};
// Fonction open qui passe l'attribut aria-hidden à false pour pouvoir afficher la modale et désactiver le document principal
const open = function (dialog) {
   const focusableElements = dialog.querySelectorAll(focusableElementsArray);
   const firstFocusableElement = focusableElements[0];
   const lastFocusableElement = focusableElements[focusableElements.length - 1];

   dialog.setAttribute("aria-hidden", false);
   doc.setAttribute("aria-hidden", true);
   header.setAttribute("aria-hidden", true);

   // return si pas d'élément focusable
   if (!firstFocusableElement) {
      return;
   }
   // Pour que le focus se charge après le lancement de la modale qui apparaît avec une transition
   window.setTimeout(() => {
      firstFocusableElement.focus();

      // trapping focus inside the dialog
      focusableElements.forEach((focusableElement) => {
         if (focusableElement.addEventListener) {
            focusableElement.addEventListener("keydown", (event) => {
               const tab = event.which === keyCodes.tab;

               if (!tab) {
                  return;
               }

               if (event.shiftKey) {
                  if (event.target === firstFocusableElement) {
                     // shift + tab
                     event.preventDefault();

                     lastFocusableElement.focus();
                  }
               } else if (event.target === lastFocusableElement) {
                  // tab
                  event.preventDefault();

                  firstFocusableElement.focus();
               }
            });
         }
      });
   }, 100);
};
// Fonction close qui passe l'attribut aria-hidden à true pour pouvoir fermer la modale et réactiver le document principal
const close = function (dialog, trigger) {
   dialog.setAttribute("aria-hidden", true);
   doc.setAttribute("aria-hidden", false);

   // restoring focus
   trigger.focus();
};

triggers.forEach((trigger) => {
   const dialog = document.getElementById(trigger.getAttribute("aria-controls"));
   // Récupérer éléments ayant data-dismiss en attribut (boutons de fermeture) et appeler la fonction close
   const dismissTriggers = dialog.querySelectorAll("[data-dismiss]");

   // Au clic donc du trigger, on envoie la fonction (open)
   trigger.addEventListener("click", (event) => {
      event.preventDefault();

      open(dialog);
   });

   trigger.addEventListener("keydown", (event) => {
      if (event.which === keyCodes.enter) {
         event.preventDefault();

         open(dialog);
      }
   });

   // close dialog
   dialog.addEventListener("keydown", (event) => {
      if (event.which === keyCodes.escape) {
         close(dialog, trigger);
      }
   });

   dismissTriggers.forEach((dismissTrigger) => {
      const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

      dismissTrigger.addEventListener("click", (event) => {
         event.preventDefault();

         close(dismissDialog, trigger);
      });
   });

   window.addEventListener("click", (event) => {
      if (event.target === dialog) {
         close(dialog, trigger);
      }
   });
});

// Champ prénom
prenom.addEventListener("change", function () {
   validPrenom(this);
});

const validPrenom = function (inputPrenom) {
   let prenomErreur = document.getElementById("prenomErreur");
   let prenomRegExp = new RegExp("^[a-zA-Z]{2}[a-zA-Z-'éèêàâôöïäüÊÈ]*$", "g");
   let testPrenom = prenomRegExp.test(inputPrenom.value);
   // console.log(testPrenom);

   if (testPrenom) {
      prenomErreur.innerHTML = "";
      return true;
   } else {
      prenomErreur.innerHTML = "Saisissez uniquement des lettres et 2 caractères minimum";
      prenomErreur.classList.add("errorAnim");
      return false;
   }
};

// Champ nom
nom.addEventListener("change", function () {
   validNom(this);
});

const validNom = function (inputNom) {
   let nomErreur = document.getElementById("nomErreur");
   let nomRegExp = new RegExp("^[a-zA-Z]{2}[a-zA-Z-'éèêàâôöïäüÊÈ]*$", "g");
   let testNom = nomRegExp.test(inputNom.value);
   // console.log(testNom);

   if (testNom) {
      nomErreur.innerHTML = "";
      return true;
   } else {
      nomErreur.innerHTML = "Saisissez uniquement des lettres et 2 caractères minimum";
      nomErreur.classList.add("errorAnim");
      return false;
   }
};

// Champ email
email.addEventListener("change", function () {
   validEmail(this);
   console.log(email);
});

//*** Fonction verification email pendant la saisie de l'utilisateur ***//
const validEmail = function (inputEmail) {
   // emailErreur correspond à un span dans le html qui servira à afficher notre message d'erreur
   let emailErreur = document.getElementById("emailErreur");
   // La RegExp correspondant à ce champ
   let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
   // On teste si la valeur saisie dans l'input respecte la RegExp correspondante
   let testEmail = emailRegExp.test(inputEmail.value);
   // console.log(inputEmail.value);

   // Si la valeur saisie dans l'input respecte les règles de la RegExp, testEmail vaut "true"
   // Donc si testEmail est true, on renvoie true, sinon on renvoie false et fait apparaître un message d'erreur
   if (testEmail) {
      emailErreur.innerHTML = "";
      return true;
   } else {
      emailErreur.innerHTML = "Email invalide";
      emailErreur.classList.add("errorAnim");
      return false;
   }
};
