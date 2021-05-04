// Like function
let likes = document.querySelectorAll('.photo-grid__like');

for (let i = 0 ; i < likes.length; i++) {
  likes[i].addEventListener('click', function(){ likes[i].classList.toggle('photo-grid__like_active'); }); 
}