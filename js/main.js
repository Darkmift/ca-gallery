console.log('Starting up');
//toggle "contact me" aside element
function openCanvas() {
    document
        .querySelector('.offcanvas-btn')
        .classList.toggle('offcanvas-btn-open');
    document
        .querySelector('.offcanvas-aside')
        .classList.toggle('offcanvas-aside-open');
}
