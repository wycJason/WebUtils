// Since this switch is only meant for modern browsers, there is not any code for supporting old browsers

function Switch(node) {
	this.switchRoot = node;
	this.switchRoot.onclick = this.switchClickEventHanlder;
}

Switch.prototype.switchClickEventHanlder = function (e) {
  e.target = e.target || e.srcElement;
  if(e.target.className.indexOf("switch-button") < 0) return;
  if(!this.classList.contains("checked")) {
    this.classList.add("checked");
  } else{
    this.classList.remove("checked");
  }
  this.checked = !this.checked;
};

var switches = document.querySelectorAll(".switch");

if(typeof switches !== "undefined" && switches.length) {
  for(var i = switches.length - 1; i >=0; --i){
    new Switch(switches[i]);
  }
}
