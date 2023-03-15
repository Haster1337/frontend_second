let comments = document.getElementsByClassName("comments")[0];
let submitBtn = document.getElementById("submit");

let inputName = document.getElementsByClassName("name_input")[0];
let inputComment = document.getElementsByClassName("main_input")[0];
let inputDate = document.getElementsByClassName("date_input")[0];

submitBtn.onclick = (e) => {
  e.preventDefault();
  validate();
};

function validate(e) {
  let valid = true;

  const errors = document.getElementsByClassName("validation-error");
  while (errors.length > 0) {
    errors[0].parentNode.removeChild(errors[0]);
  }

  const authorField = document.getElementsByClassName("name_input")[0];

  let isEmpty = false;
  if (!authorField.value) {
    document.querySelector('label[for="author"]').innerHTML +=
      ' <span class="validation-error">Укажите имя</span>';
    valid = false;
    isEmpty = true;
  }

  if (authorField.value.length < 4 && !isEmpty) {
    document.querySelector('label[for="author"]').innerHTML +=
      ' <span class="validation-error">Минимальная длина имени автора - 4 символа</span>';
    valid = false;
  }

  const commentField = document.getElementsByClassName("main_input")[0];

  isEmpty = false;

  if (!commentField.value) {
    document.querySelector('label[for="comment"]').innerHTML +=
      ' <span class="validation-error">А где ваш комментарий?</span>';
    valid = false;
    isEmpty = true;
  }

  if (commentField.value.length < 10 && !isEmpty) {
    document.querySelector('label[for="comment"]').innerHTML +=
      ' <span class="validation-error">Минимальная длина комментария - 10 символов</span>';
    valid = false;
  }

  if (valid) {
    createComment();
  }
}

function createComment() {
    if(document.getElementsByTagName("h3")[0]){
        comments.removeChild(document.getElementsByTagName("h3")[0])
    }

  let newComment = document.createElement("div");
  newComment.classList.add("comment");

  let commentInfo = document.createElement("div");
  commentInfo.classList.add("comment_info");

  let nameH = document.createElement("h2");
  nameH.textContent = inputName.value;

  let commentDate = document.createElement("span");

  if (inputDate.value) {
    const date = new Date(inputDate.value);
    const today = new Date();

    const time = getTime(date);

    const booleanStatement =
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();

    if (validateTime) {
      commentDate.textContent = `Сегодня ${time}`;
    } else if (date.getDate() === today.getDate() - 1 && booleanStatement) {
      commentDate.textContent = `Вчера ${time}`;
    } else {
      addDate(date, time, commentDate);
    }
  } else {
    addDate(new Date(), null, commentDate);
  }

  let titleDiv = document.createElement("div");
  titleDiv.classList.add("comment_title");

  titleDiv.append(nameH);
  commentDate && titleDiv.append(commentDate);
  commentInfo.append(titleDiv);

  addBtns(commentInfo);

  let commentBody = document.createElement("p");
  commentBody.textContent = inputComment.value;

  newComment.append(commentInfo);
  newComment.append(commentBody);

  comments.append(newComment);
}

function addBtns(commentInfo){
  let btnDiv = document.createElement("div");
  btnDiv.classList.add("comment_btns");

  let likeBtn = document.createElement("button");
  let likeImg = document.createElement("img");
  likeImg.alt = "сердечко";
  likeImg.src = "img/free-icon-heart-shape-outline-25424.png";
  let isLiked = false;

  likeBtn.onclick = (e) => {
    isLiked = likeHandler(e, isLiked);
  } 

  likeBtn.append(likeImg);



  let deleteBtn = document.createElement("button");
  let deleteImg = document.createElement("img");
  deleteImg.alt = "мусор";
  deleteImg.src = "img/free-icon-delete-1214428.png";
  deleteBtn.append(deleteImg);

  deleteBtn.onclick = (e) => {
    deleteHandler(e);
  }

  btnDiv.append(likeBtn, deleteBtn);
  commentInfo.append(btnDiv);
}

function likeHandler(e, isLiked){
  if(isLiked){
    e.target.src = "img/free-icon-heart-shape-outline-25424.png";
    return false;
  } else {
    e.target.src = "img/free-icon-heart-2107845.png";
    return true;
  }
}

function deleteHandler(e) {
  comments.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);
}

function addDate(date, time = null, commentDate) {
  if (!time) {
    time = getTime(date);
  }

  if (validateTime(date)) {
    commentDate.textContent = `Сегодня ${time}`;
  } else {
      let year = date.getFullYear();
      let month =
        date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
      let dayOfMonth = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      commentDate.textContent = `${dayOfMonth}.${month}.${year} ${time}`;
  }

}

function getTime(date) {
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  return `${hour}:${minutes}`;
}

function validateTime(date){
  const today = new Date();
  const booleanStatement =
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear();

  if (today.getDate() === date.getDate() && booleanStatement) {
    return true;
  }
}