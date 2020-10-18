
const toDoForm= document.querySelector(".js-toDoForm"),
toDoInput = toDoForm.querySelector("input"),
toDoList   = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];
// empty array 만듬.


function deleteToDo(event){

    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    //cleanToDos: filterFn가 체크된 아이템들의 arryay를 줌.
    toDos = cleanToDos;
    saveToDos();
}

//saveToDos : to Dos를 가져와서 로컬 스토리지 저장 함수. jsong stringfy는 js object를 string으로 바꿔줌.
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

//자바 스크립트는 local stroage 데이터를 모든 데이터를 string 저장
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    //append chiild is 아버지 element에 sth 을 넣는 것 
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj ={
        text: text,
        id : newId
    };
    toDos.push(toDoObj);
    //해야 할 일을 할때마다 'toDos'라는 array add
    saveToDos()
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos (){
    const loadedtoDos = localStorage.getItem(TODOS_LS);
        // null과 같은 nothing.. showing이라서
    if(loadedtoDos !== null){
        const parsedToDos = JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        //toDos 가져오고 , 이 라인에서 parse 해줌, js object text string변환
    }
}





function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit)
}

init();