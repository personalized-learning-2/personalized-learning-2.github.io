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
    try {
        draw();

        let returning = localStorage['visited'];
        if (!returning) {
            localStorage['visited'] = true;
        }

        $('#covid-modal').modal({
            show: !returning
        });
    } catch(err) {}
}

function pageNavSetup() {
  // this is for testing; gets used to dynamically load header and footer

  $(document).ready(function() {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
  });

  $(window).on("load", function() {
    selectedPage = $("#page-title").text().toLowerCase();
    $("#"+selectedPage+"-nav").addClass('active');
    $(this).scrollTop(0);
  });
}

function contactUs() {
    var form = $('#contact-us-form');

    var name = document.getElementsByName("FullName")[0].value;
    var emailAddr = document.getElementsByName("EmailAddress")[0].value;
    var institution = document.getElementsByName("Institution")[0].value;
    var comments = document.getElementsByName("TellUsMore")[0].value;

    var subject= "Tell us more...";
    var body = "Email from: " + name;
    body += " (" + emailAddr + ") at: " + institution;
    body += "\n";
    body += "Comments: ";
    body += comments + "<";
    body += window.location.href;
    body += ">";
    var uri = "mailto:ctipper@cs.cmu.edu?subject=";
    uri += encodeURIComponent(subject);
    uri += "&body=";
    uri += encodeURIComponent(body);
    window.open(uri);

    return false;
}
