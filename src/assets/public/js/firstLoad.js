function load() {
    //Create todoList
    var todoList, dataObj;
    if (localStorage.getItem("todoList")) {
        dataObj = JSON.parse(localStorage.getItem("todoList"));
    } else {
        dataObj = [];
        todoList = localStorage.setItem("todoList", JSON.stringify(dataObj));
    }
    //Create passwordKeeper string
    var pswList, dataObject;
    if (localStorage.getItem("pswList")) {
        dataObject = JSON.parse(localStorage.getItem("pswList"));
    } else {
        dataObject = [{
            web: 'http://xn--ilr89m.com',
            name: 'Luna',
            password: '1040657022',
            Email: "z13021971276@outlook.com"
        }];
        pswList = localStorage.setItem("pswList", JSON.stringify(dataObject));
    }
    //Create userInfo
    var userInfo, data;
    if (localStorage.getItem("userInfo")) {
        data = JSON.parse(localStorage.getItem("userInfo"));
    } else {
        data = [];
        userInfo = localStorage.setItem("userInfo", JSON.stringify(data));
    }

    // document.getElementsByTagName("button").onclick(function (){
    //     document.getElementsByClassName("ripple").remove()
    // })
    // var posX = this.offsetLeft;
    //     var posY = this.offsetTop;
    //     var buttonWidth = this.width;
    //     var buttonHeight = this.height;
    //
    //     this.prep
}
export {
    load
}