document.addEventListener("DOMContentLoaded", function(event) {
    let guestName = document.getElementById("guest-name");
    let inputName = document.getElementById("name");
        inputName.addEventListener('keyup', function (e) {
            guestName.textContent = this.value;
            localStorage.setItem('name', this.value);
            if(e.keyCode === 13) {
                this.value = '';
                this.blur();
            }
            clearTimeout(this.delayedClean);
            this.delayedClean = setTimeout(function(){
                inputName.value = '';
                inputName.blur();
            },7000);
        });
        inputName.addEventListener('blur', function () {
            this.value = '';
        });
    let a = localStorage.getItem('name')
    if(a) {
        guestName.textContent = a;
    };
});