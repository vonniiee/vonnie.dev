//UGHGHHGHGHGHGHHGHGH

var add = 0.0045;
var x = add;
const padge = 100;
const content_delay = 500;
const pages = ["main", "me", "projects", "friends", "socials"]


var xterval = 0;
var aniterval = 0;

var firstDoneMain = false;

var page_dict = {}

function copyDiscord() {
    navigator.clipboard.writeText("siobhanniiee");
    let tooltip = document.getElementById("tooltip");
    tooltip.classList.remove("hidden");
    tooltip.classList.add("shown");
    setTimeout(() => {
	tooltip.classList.remove("shown");
	tooltip.classList.add("away");
	setTimeout(() => {
	    tooltip.classList.remove("away");
	    tooltip.classList.add("hidden");
	}, 500)
    }, 700)
}

function easeOutCirc(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInCirc(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

async function fetchPages() {
    let promises = pages.map((x) => fetch(x + ".html"));
    let resps = await Promise.all(promises);
    let texts_promises = resps.map((x) => x.text());
    let texts = await Promise.all(texts_promises);
    let i = 0;
    for (const page of pages) {
	page_dict[page] = texts[i];
	i += 1;
    }
}

String.prototype.visualLength = function() {
    var ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function setPage(oldPage, page, didJustLoad) {
	try {
    umami.track(props => ({...props, url: '/' + page, title: page.capitalize()})); 
	}
	catch(e) {}
    if(didJustLoad) {
	document.body.innerHTML = page_dict[page] + document.body.innerHTML;
	//main's intro requires some extra
	if (page === "main") {
	    let intro = document.getElementById("intro");
	    intro.classList.add("animating");
	    intro.classList.remove("done");
	    let content_lines = document.getElementsByClassName("content-element");
	    let container = document.getElementById("main-container");
	    container.classList.add("animating");
	    container.classList.remove("done");
	    let front = document.getElementById("front");
	    let back = document.getElementById("back");
	    front.innerHTML = "";
	    back.innerHTML = "";
	
	    for (const line of content_lines) {
		line.classList.add("init");
		line.classList.remove("ready");
	    }
	} else {
	    let container = document.getElementById(page + "-container");
	    container.classList.add("firsthere");
	};
    } else {
	let ruler = document.getElementById("ruler")
	if (ruler) {
	    ruler.remove();
	}
	document.body.innerHTML = page_dict[page] + document.body.innerHTML;
	let old_container = document.getElementById(oldPage + "-container");
	old_container.classList.add("gone");
	setTimeout(() => {
	    old_container.remove();
	}, 400);
	let new_container = document.getElementById(page + "-container");
	new_container.classList.add("here");
    }
}

window.addEventListener("hashchange", async (event) => {
    console.log(event);
    let old = new URL(event.oldURL).hash.substring(1) ? new URL(event.oldURL).hash.substring(1) : "main";
    let page = new URL(event.newURL).hash.substring(1) ? new URL(event.newURL).hash.substring(1) : "main";
    setPage(old, page, false);
});

window.addEventListener("load", async (event) => {
    await fetchPages();
    setPage(null, window.location.hash.substring(1) ? window.location.hash.substring(1) : "main", true);
    setTimeout(() => {
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
	xnterval = setInterval(() => {
	    x += add;
	    if(x >= 0.7) {
		add *= -1;
	    }
	    x = Math.min(0.7, Math.max(0, x));
	}, 1);
	aniterval = setInterval(() => {
	    var current_n = Math.round((message.length / 2) * easeOutCirc(x));
	    if((current_n - front.innerHTML.length) > 0) {
		front.innerHTML += message[left_pointer];
		back.innerHTML = message[right_pointer] + back.innerHTML;
		left_pointer += 1;
		right_pointer -= 1;
	    }
	    if((current_n - front.innerHTML.length) < 0) {
		if (front.innerHTML != "Hii") {
		    front.innerHTML = front.innerHTML.substring(0, front.innerHTML.length - 1);
		}
		if (back.innerHTML != " :3") {
		    back.innerHTML = back.innerHTML.substring(1, back.innerHTML.length);
		}
	    }
	}, 1);

	setInterval(() => {
	    if (x <= 0) {
		clearInterval(xterval);
		clearInterval(aniterval);
	    }

	    if (x <= 0.35 && !firstDoneMain && add < 0) {
		doMain();
		firstDoneMain = true;
	    }
	}, 100);
    }, 150);
});

function doMain() {
    let intro = document.getElementById("intro");
    intro.classList.remove("animating");
    intro.classList.add("done");
    setTimeout(doContentReveal, 150);
}

function doContentReveal() {
    let content_lines = document.getElementsByClassName("content-element");
    let step = 1.0 / content_lines.length;
    let y = 0;
    let container = document.getElementById("main-container");
    container.classList.remove("animating");
    container.classList.add("done");
    
    for (const line of content_lines) {
	setTimeout(() => {
	    line.classList.remove("init");
	    line.classList.add("ready");
	}, easeInCirc(y) * content_delay);
	y += step;
    }
}
