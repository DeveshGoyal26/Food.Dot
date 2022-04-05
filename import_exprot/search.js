let search_w = JSON.parse(localStorage.getItem("search_w")) || [];

let container = document.getElementById("container")


let fetch_data = async (search_w) => {
 try{
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_w}`;

  let res = await fetch(url);

  let data = await res.json();
  console.log("data:", data.meals);

  append(data.meals)
 }
 catch(error){
   console.log('error:', error)
   
 }

};

fetch_data(search_w);


let append = (data) => {
    container.innerText = null

    data.map((el) => {
    console.log('el:', el)

        let div = document.createElement("div")
        div.addEventListener("click",function(){
          localStorage.setItem("mealid",JSON.stringify(el.idMeal))
          window.location.href = "Recipe.html"
        })

        let img_div = document.createElement("div")
        let img = document.createElement("img")
        img.src = el.strMealThumb
        img_div.append(img)

        let name = document.createElement("h2")
        name.innerText = el.strMeal

        let dish = document.createElement("p")
        dish.innerText = "DISH"

        div.append(img_div,name,dish)

        container.append(div)

    })
}

let m = () => {
  window.location.href = "index.html"
};