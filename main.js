function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#F4F6F8';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    
    // ctx.lineTo(0, 80);
    ctx.lineTo(1800, 500);
    ctx.lineTo(3000, 1200);

    ctx.lineTo(3000, 0);
    
    ctx.fill();
    ctx.closePath();
  }
}

function initialize() {
    draw();

    let returning = localStorage['visited'];
    if (!returning) {
        localStorage['visited'] = true;
    }

    $('#covid-modal').modal({
        show: !returning
    });
}
