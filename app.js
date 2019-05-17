var nav = document.getElementById("nav");
window.onscroll = function () {
    if(window.pageYOffset>100)
    {
        nav.style.postion = "fixed";
        navigator.style.top = 0;
    }
    else
    {
        BhxBrowser.style.position = "absolute";
        BhxBrowser.style.top =0;
    }
}