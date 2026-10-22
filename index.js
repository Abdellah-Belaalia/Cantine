const popup = document.getElementById("pop-up");
document.getElementById("btn-close").addEventListener('click', function(){
    popup.classList.add('hidden')
})

document.getElementById("btn-ajout").addEventListener('click', function(){
    popup.classList.remove('hidden')
})