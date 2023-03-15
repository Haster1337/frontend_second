let repositories = document.getElementsByClassName("repositories")[0];

let btn = document.getElementsByClassName("search")[0];

btn.onclick = function(e) {
  e.preventDefault();
  repositories.textContent = "";
  searchHandler();
}

async function searchHandler(){
  let input = document.getElementsByClassName("search_input")[0];
  let value = input.value;

  let isEmpty = true;

  let response = await fetch(`https://api.github.com/search/repositories?q=${value}&per_page=10`).then(
    success => {
      if (success.status !== 200) {
        return null;
      } else {
        return success.json();
      }
    })
    .then(res => res.items)
    .then(items => {
      if(items.length > 0){
        isEmpty = false;
      }
      for(let item of items){
        createRepository(item);
      }
    })
    .catch(
      fail => {
        isEmpty = false;
        errorHandler("Ошибка сервера!");
        return null;
      }
    );

  if(isEmpty){
    errorHandler("Ничего не найдено!");
  }   
}



function errorHandler(message){
  let tempDiv = document.createElement("div");
  tempDiv.classList.add("error")
  let p = document.createElement("p");
  p.textContent = message;
  tempDiv.append(p);
    
  repositories.append(tempDiv);
} 



function createRepository(item){
  let tempDiv = document.createElement("div");
  tempDiv.classList.add("repository")

  let textDiv = document.createElement("div");
  textDiv.classList.add("text__repository")
  let a = document.createElement("a");
  a.textContent = item.name;
  a.href = item.html_url;
  
  let h2 = document.createElement("h2")
  h2.textContent = item.owner.login;

  textDiv.append(a);
  textDiv.append(h2);

  let imgDiv = document.createElement("div");
  imgDiv.classList.add("img__repository")
  let img = document.createElement("img");
  img.alt = "Аватар автора";
  img.src = item.owner.avatar_url;
  imgDiv.append(img);
  
  tempDiv.append(imgDiv);
  tempDiv.append(textDiv);

  repositories.append(tempDiv);
}



