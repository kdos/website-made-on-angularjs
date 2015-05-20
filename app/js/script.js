$(document).ready(function() {
	
    /* moving the menu sidewards*/
    var startLoc = 0,
        endLoc = 0,
        dist = 0,
        obj;
    obj = document.getElementById("slide");
    objLeftPos = obj.offsetLeft;
    objRightBound = 140*screen.width;
    obj.addEventListener("mousedown", start);

    function start(event) {
        event.preventDefault();
        startLoc = event.clientX;
        obj.addEventListener("mousemove", drag);
    };

    function drag(event) {
    	endLoc = event.clientX;
    	dist = endLoc - startLoc;
        if (dist < 0 || dist < objRightBound) {           
            obj.style.left = objLeftPos + dist + "px";
            obj.addEventListener("mouseout", remove);
        }
    }

    obj.addEventListener("mouseup", remove);

    function remove() {
        obj.removeEventListener("mousemove", drag);
    }

    /* responsive tabs*/


});



$(".button-collapse").sideNav({
    menuWidth: 350,
    closeOnClick: true
});
$('.materialboxed').materialbox();

console.log(screen.width);
