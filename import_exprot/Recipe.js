let id = JSON.parse(localStorage.getItem("mealid"))||[]


let container = document.getElementById("container")




let fetch_data = async (url) => {

    try{



    let res = await fetch(url)

    let data = await res.json()

    console.log('data:', data.meals[0])

    return data.meals[0]
    }
    catch(error){
        console.log('error:', error)

    }

    
}




let append = (data) => {

    let  upper_div = document.createElement("div")

    let name = document.createElement("h1")
    name.innerText = data.strMeal

    let img_iframe_div = document.createElement("div")

    let img_div = document.createElement("div")
    let img = document.createElement("img")
    img.src = data.strMealThumb
    img_div.append(img)


    let iframe_div = document.createElement("div")
    let iframe = document.createElement("iframe");
    let v_id = ""
    for(var f=data.strYoutube.length-1;f>=0;f--){
        if(data.strYoutube[f]==="="){
            break;
        }
        v_id = v_id + data.strYoutube[f]
    }
    iframe.src = `https://www.youtube.com/embed/${v_id.split("").reverse().join("")}`;
    iframe.allow = "fullscreen";
    iframe_div.append(iframe)


    img_iframe_div.append(img_div,iframe_div)


    let tag_cat_area_div = document.createElement("div")

    let tags = document.createElement("p")
    tags.innerText = "Tags - " + data.strTags

    let cat = document.createElement("p")
    cat.innerText = "Category - " + data.strCategory

    let area = document.createElement("p")
    area.innerText = data.strArea + " Dish"

    tag_cat_area_div.append(tags,cat,area)


    upper_div.append(name,tag_cat_area_div,img_iframe_div)





    let mid_div = document.createElement("div")

    let m = document.createElement("h2")
    m.innerText = "Method"

    let p = document.createElement("ol");

    let text = data.strInstructions
  
    text = text.split(/\r?\n/);
    console.log(text)
  
    for (var i = 0; i < text.length; i++) {

        let t = text[0].split(" ")
        if("STEP"===t[0]){
            var li = document.createElement("div");
        }
        else {
            var li = document.createElement("li");
        }

        if(text[i][1]===Number){
      for (var a = 0; a < text[i].length; a++) {
        if (text[i][a] === ".") {
          text[i] = text[i].slice(a + 1, text[i].length);
          break;
        }
      }
    }
  
      
    if(text[i]!=""){
  
      li.innerText = text[i];

      p.append(li);
      
    }
      
    }




    let Ingredient = document.createElement("div")

    let heading = document.createElement("h2")
    heading.innerText = "Ingredients"
    Ingredient.append(heading)


    for(var s=1;s<=20;s++){
            let a = `strIngredient${s}`
            let g = `strMeasure${s}`
        if(data[a]==null || data[a]==""){
            break;
        }
        else{
            let p = document.createElement("p")
            p.innerText = data[a] +" "+ data[g]
            Ingredient.append(p)
        }
    }


    mid_div.append(m,p)




container.append(upper_div,document.createElement("hr"),mid_div,document.createElement("hr"),Ingredient)


}




let main = async (url) => {

    let data = await fetch_data(url)

    if(data==undefined){
        return false;
    }

    append(data)
}



let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

main(url)

let m = () => {
    window.location.href = "index.html"
  };
