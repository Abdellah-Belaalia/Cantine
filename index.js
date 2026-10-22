const popup = document.getElementById("pop-up");
document.getElementById("btn-close").addEventListener('click', function(){
    popup.classList.add('invisible')
})

document.getElementById("btn-ajout").addEventListener('click', function(){
    popup.classList.remove('invisible')
})

const 