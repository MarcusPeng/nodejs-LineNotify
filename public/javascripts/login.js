var btnLogin = document.getElementById("btnLogin");
btnLogin.onmouseenter = function(){
    this.src = "/images/btn_login_hover.png";
};
btnLogin.onmouseout = function(){
    this.src = "/images/btn_login_base.png";
};
btnLogin.onclick = function(){
    this.src = "/images/btn_login_press.png";
};
