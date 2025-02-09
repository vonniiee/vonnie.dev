//UGHGHHGHGHGHGHHGHGH

var x = 0;
var add = 0.004;
const padge = 100;

var interval = 0;

function easeOutCirc(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

String.prototype.visualLength = function() {
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth * 4;
}

document.addEventListener("DOMContentLoaded", (event) => {
    var message;
    let viewport_width = document.documentElement.clientWidth;
    console.log(viewport_width);
    let i = "i";
    while (true) {
	message = "H" + i + " :3";
	console.log(message.visualLength() + message);
	if(message.visualLength() >= (viewport_width - padge)) {
	    break;
	} else {
	    i += 'i';
	}
    }
    var left_pointer = 0;
    var right_pointer = message.length - 1;
    var front = document.getElementById("front");
    var back = document.getElementById("back");
    interval = setInterval(() => {
	x += add;
	if(x >= 0.9) {
	    add *= -1;
	}
	x = Math.min(0.9, Math.max(0, x));
    }, 1);
    setInterval(() => {
	var current_n = Math.round((message.length / 2) * easeOutCirc(x));
	if((current_n - front.innerHTML.length) > 0) {
	    front.innerHTML += message[left_pointer];
	    back.innerHTML = message[right_pointer] + back.innerHTML;
	    left_pointer += 1;
	    right_pointer -= 1;
	}
	if((current_n - front.innerHTML.length) < 0) {
	    front.innerHTML = front.innerHTML.substring(0, front.innerHTML.length - 1);
	    back.innerHTML = back.innerHTML.substring(1, back.innerHTML.length);
	}
    }, 1);
});



