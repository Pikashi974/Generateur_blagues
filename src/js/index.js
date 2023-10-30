let blague;

async function init() {
  await getBlague();
}

init();

async function getBlague() {
  blague = await fetch("https://api.blablagues.net/?rub=blagues").then(
    (response) => {
      return response.json();
    }
  );
  let context = [
    blague.data.content.text_head == "",
    blague.data.content.text == "",
    blague.data.content.text_hidden == "",
  ].toString();
  switch (context) {
    //Aucune blague chargé
    case [true, true, true].toString():
      document.querySelector(".card-header").textContent =
        "Aucun humour dans la salle";
      document.querySelector(".card-header").style.display = "block";
      document.querySelector(".card-body").style.display = "none";
      document.querySelector(".card-footer").style.display = "none";
      break;
    //Blague en header
    case [false, true, true].toString():
      document.querySelector(".card-header").textContent =
        blague.data.content.text_head;
      document.querySelector(".card-header").style.display = "block";
      document.querySelector(".card-body").style.display = "none";
      document.querySelector(".card-footer").style.display = "none";
      break;
    //Blague dans le corps de la carte
    case [true, false, true].toString():
      document.querySelector(".card-text").textContent =
        blague.data.content.text;
      document.querySelector(".card-header").style.display = "none";
      document.querySelector(".card-body").style.display = "block";
      document.querySelector(".card-footer").style.display = "none";
      break;
    //Un simple pied de note
    case [true, true, false].toString():
      document.querySelector(".card-footer").textContent =
        blague.data.content.text_hidden;
      document.querySelector(".card-header").style.display = "none";
      document.querySelector(".card-body").style.display = "none";
      document.querySelector(".card-footer").style.display = "block";
      break;
    //Blague avec une entête et un corps
    case [false, false, true].toString():
      document.querySelector(".card-header").textContent =
        blague.data.content.text_head;
      document.querySelector(".card-text").textContent =
        blague.data.content.text;
      document.querySelector(".card-header").style.display = "block";
      document.querySelector(".card-body").style.display = "block";
      document.querySelector(".card-footer").style.display = "none";
      break;
    //Blague avec une entête et un pied de texte (question avec chute)
    case [false, true, false].toString():
      document.querySelector(".card-header").textContent =
        blague.data.content.text_head;
      document.querySelector(".card-footer").textContent =
        blague.data.content.text_hidden;
      document.querySelector(".card-header").style.display = "block";
      document.querySelector(".card-body").style.display = "none";
      document.querySelector(".card-footer").style.display = "block";
      break;
    //Blague avec les 3 morceaux
    default:
      document.querySelector(".card-header").textContent =
        blague.data.content.text_head;
      document.querySelector(".card-text").textContent =
        blague.data.content.text;
      document.querySelector(".card-footer").textContent =
        blague.data.content.text_hidden;

      document.querySelector(".card-header").style.display = "block";
      document.querySelector(".card-body").style.display = "block";
      document.querySelector(".card-footer").style.display = "block";
      break;
  }
}

document.querySelector("body").addEventListener("click", getBlague);

//https://www.blablagues.net/apix.html
