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

  // $(document).ready(function() {

    $("#banner").load("banner.html", function() {
      $("#header").load("header.html", function() {
        $("#footer").load("footer.html", function() {
          var selectedPage = $("#page-title").text().toLowerCase();
          $("#"+selectedPage+"-nav").addClass('active');
          document.getElementById("content").style.display = "block";
        });
      });
    });

  // }); 

  // $(window).on("load", function() {

  // });

}

function releaseNotesSetup() {
  // this loads the most current release notes on get
  // MUST BE UPDATED WITH NEW RELEASE NOTES
    $("#release-notes_4.0").addClass("font-weight-bold");
    //BUG ^ this bold isn't working and I have no idea why
    // maybe something to do with it happening before the DOM is loaded?


    $("#release-notes-body").load("release-notes_4.0.html");
    console.log($("#release-notes_4.0"));

}

function releaseNav(item) {

  // when adding new release notes, make sure the filename follows convention, and the new
  // <li> in release_notes.html has the same id as the filename!

  // have to hide and re-show footer to avoid visual glitch
  // document.getElementById("footer").style.display = "none";


  $(".release_nav").removeClass("font-weight-bold");
  $(item).addClass("font-weight-bold");
  

  $("#footer").addClass("d-none");
    $("#release-notes-body").empty();

  
  
    $("#release-notes-body").load(item.id+".html", function() {
      $("#footer").removeClass("d-none");
    });
  
  // $("#release-notes-body").empty();

  // $(".release-nav").removeClass("font-weight-600");
  // $("#item.id").addClass("font-weight-600");


  // $("#release-notes-body").load(item.id+".html", function() {

  // });

  // document.getElementById("footer").style.display = "block";

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

// var $form = $('form#contact-us-form');

// function sendContactForm() {
  
//   user_data = {
//     "Name": document.getElementById("contact-form-name").value,
//     "Email": document.getElementById("contact-form-email").value,
//     "Institution": document.getElementById("contact-form-inst").value,
//     "MoreInfo": document.getElementById("contact-form-moreinfo").value,
//     "Services":"pl2 Toolkit, pl2 Tutoring"
//   }
  
//   $.ajax({
//         url: "https://script.google.com/macros/s/AKfycby6e6dvopVzMSGZfMesDU_m1Msz8fHlv9A3yifb2v4H7tpADEQIm5JhvBbRZmQZQ-dn/exec",
//         method: "GET",
//         dataType: "json",
//         data: user_data
//       })
  

// }

// $('#contact-us-form').on('click', function(e) {
//   e.preventDefault();
//   var jqxhr = $.ajax({
//     url: "https://script.google.com/macros/s/AKfycbzS-RLdfTGccsy1d2_0w7eEGA7UgRF_-uq_BWUPiQGWrg09WxzC4fZ6Rt7o30b5jWVV/exec",
//     method: "GET",
//     dataType: "json",
//     data: $form.serializeObject()
//   }).success(
//     // do something
//     function() {console.log("Successful post!");}
//   );
// })
