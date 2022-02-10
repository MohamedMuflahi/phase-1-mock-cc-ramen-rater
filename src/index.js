// write your code here
let menuHolder,ramenDetail,ramenDetailImage,ramenDetailName,ramenDetailRes,ratingDisplay,commentDisplay;
let newRamenForm,editRamenForm,submitButton;
let inputsArray = [];
let inputsArrayEdit = [];
let patchRequestInfo;
document.addEventListener('DOMContentLoaded', ()=> {
    init();
})
function init(){
    menuHolder = document.getElementById('ramen-menu');
    //ramenDetail = document.getElementById('ramen-detail');
    ramenDetailImage = document.getElementById('ramen-detail-image');
    ramenDetailName = document.getElementById('ramen-detail-name');
    ramenDetailRes = document.getElementById('ramen-detail-res');
    ratingDisplay = document.getElementById('rating-display');
    commentDisplay = document.getElementById('comment-display');
    newRamenForm = document.getElementById('new-ramen');
    editRamenForm = document.getElementById('edit-ramen');
    submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', PostRequest);
    editButton = document.getElementById('editButton');
    editButton.addEventListener('click', ()=>{
        PatchRequest(patchRequestInfo)
    });
    //console.log(ramenDetail,ramenDetailImage,ramenDetailName,ramenDetailRes);

    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => {
        //console.log(data);
        data.map((e)=>{
            CreateMenuItems(e);
        })
        
    })
    getFormInputChildren();
}
function CreateMenuItems(data){
    let menuItem = document.createElement('img');
    menuItem.src = data.image;
    menuItem.addEventListener('click',()=>{
        ramenDetailImage.src = data.image;
        ramenDetailName.textContent = data.name;
        ramenDetailRes.textContent = data.restaurant;
        ratingDisplay.textContent = data.rating;
        commentDisplay.textContent = data.comment;
        patchRequestInfo = data;
    })
    menuHolder.appendChild(menuItem);

}
function PostRequest(){
    fetch('http://localhost:3000/ramens', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: inputsArray[0].value,
            restaurant: inputsArray[1].value,
            image: inputsArray[2].value,
            rating:inputsArray[3].value,
            comment: inputsArray[4].value
        }),
    })
    .then(response => response.json())
    .then(data => {
        CreateMenuItems(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}
function PatchRequest(e){
    
    fetch(`http://localhost:3000/ramens/${e.id}`, {
    method: 'PATCH',
    body: JSON.stringify({
    rating: inputsArrayEdit[0].value,
    comment: inputsArrayEdit[1].value
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((data) => {
        e.rating = data.rating;
        e.comment = data.comment;
        ratingDisplay.textContent = data.rating;
        commentDisplay.textContent = data.comment;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
}
function getFormInputChildren(){
    for (let i = 0; i < newRamenForm.children.length; i++) {
        if(newRamenForm.children[i].tagName == 'INPUT'|| newRamenForm.children[i].tagName == 'TEXTAREA'){
            inputsArray.push(newRamenForm.children[i]);
            
        } //name = 0   res = 1  image = 2 rating =3   comment = 4button =5
    }
    for (let i = 0; i < editRamenForm.children.length; i++) {
        if(editRamenForm.children[i].tagName == 'INPUT'|| editRamenForm.children[i].tagName == 'TEXTAREA'){
            inputsArrayEdit.push(editRamenForm.children[i]);
            
        } //rating = 0 comment = 0
    }
}