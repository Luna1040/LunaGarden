//If there's no theme,create a theme string at localStorage
function Theme() {
    var theme,localTheme;
    if(localStorage.getItem("theme")){
        localTheme=JSON.parse(localStorage.getItem("theme"));
    }else{
        localTheme="glass";
        theme = localStorage.setItem("theme", JSON.stringify(localTheme));
    }
}
export {
    Theme
}