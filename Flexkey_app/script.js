const button = document.getElementById('button');
button.addEventListener('click', function() {
    document.body.classList.add('page-twist');
        setTimeout(function() {
        window.location.href = 'home.html';         
    }, 2000); 
});