let input = document.getElementById("search")
let search_suggestion = document.getElementById("search_suggestion")
let search_btn = document.getElementById("search_btn")

let search_data = async () => {
    try {
        
    let search = input.value

    if (search === "") {
        search_suggestion.style.display = "none";
      }
    let search_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`

    let res = await fetch(search_url)
    console.log('res:', res)

    let data = await res.json()
    console.log('data:', data)

    return data.meals;

    }

    catch(error) {

    console.log('error:', error)

    }
    
}





document.body.addEventListener("focusout",function(){
    setTimeout( function(){
        search_suggestion.style.display = "none"
    }, 100);
  })


let search_results = (data) => {
    search_suggestion.style.display = "flex";
    search_suggestion.innerText = null;

    data.map((el) => {

        let name_p = document.createElement("p");

        name_p.innerText = el.strMeal;

        name_p.addEventListener("click", function () {
            localStorage.setItem("search_w", JSON.stringify(el.strMeal));
            window.location.href = "search.html";
        });
        
        search_suggestion.append(name_p);
        
    })

}




let main = async () => {
    try{
    let data = await search_data()

    if(data===undefined){
        return false;
    }
    search_results(data)
}
catch(error){

    console.log('error:', error)

}

}




let timeout;



input.addEventListener("input", () => {
    
        if(timeout){
            clearTimeout(timeout);
        }

        timeout = setTimeout( () => {
            main();
        },1000)
})


search.addEventListener("focus", main);


search_btn.addEventListener("click",function() {
    if(search.value!=""){
        localStorage.setItem("search_w",JSON.stringify(search.value))
        window.location.href = "search.html"
    }
})


let m = () => {
    window.location.href = "index.html"
  };


