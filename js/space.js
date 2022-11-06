//variables globales
const API_URL = 'https://images-api.nasa.gov/';

// const button = document.getElementById('btnBuscar');
// let search = document.getElementById('inputBuscar').value;


//funciones

const getJSONData = async (url) => {

    debugger;
    const result = {};
    try {
        const response = await fetch(url);
        if (response.ok) {
            result.data = await response.json();
            result.status = "ok";
        } else {
            throw Error(response.statusText);
        }
    }
    catch (error) {
        result.status = 'error';
        result.data = error;
    }
    return result;

}

const searchGalaxy = (search) => {
    return getJSONData(`${API_URL}search?q=${search}`);
}


function showGalaxy(array) {

    let htmlGalaxyAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comment = array[i];

        htmlGalaxyAppend += `  
                <div class="col-sm">
                    <div class="card">
                        <img class="card-img-top rounded img-responsive" src="${comment.links[0].href}" alt="Card image cap" style="width: auto; height: 195px;">
                        <div class="card-body" style="width: auto; height: 195px;overflow: auto;">
                            <h4 class="card-title">${comment.data[0].title}</h4>
                            <p class="card-text">${comment.data[0].description}</p>                      
                        </div>
                        <div class="card-footer text-muted">
                            <p class="card-text">${comment.data[0].date_created}</p>
                        </div>
                    </div>
                </div>
        
            `

        document.getElementById("contenedor").innerHTML = htmlGalaxyAppend;

    }
}


const sendGalaxy = async () => {

    debugger;
    const searchValue = document.getElementById('inputBuscar').value;
    if (searchValue) {
      const response = await searchGalaxy(searchValue);
      if (response.status === "ok") {
        console.log(response.data.collection.items);
        showGalaxy(response.data.collection.items);
      } else {
        alert("OCURRIÓ UN ERROR");
      }
    }

};
  
window.addEventListener("load", () => {

    debugger;
    const formSearch = document.getElementById('btnBuscar');
    formSearch.addEventListener("click", sendGalaxy);

});

