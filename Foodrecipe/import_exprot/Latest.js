


let con = document.getElementById("container")


let fetch_data = async (id) => {
 try{
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    let res = await fetch(url);
  
    let d = await res.json();
    // console.log("data:", d.meals[0]);
    data_arr.push(d.meals[0])

    if(data_arr.length===8){
    // console.log(data_arr.length)

    append(data_arr)
    }
    
 }
 catch(err){
     console.log('err:', err)

 }
  
};

let data_arr = []

let append = (data) => {
    console.log('data:', data)
    
    con.innerText = null

    data.map((el) => {
    // console.log('el:', el)

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

        con.append(div)

    })
}


for(var i=53056;i<=53063;i++){
    
    fetch_data(i);
}



let m = () => {
  window.location.href = "index.html"
};