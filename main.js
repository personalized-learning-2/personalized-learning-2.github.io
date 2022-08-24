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

function initialize(status) {
    try {
        draw();

        let returning = localStorage['visited'];
        if (!returning) {
            localStorage['visited'] = true;
        }

        $("#" + status + "-modal").modal({
            show: !returning
        });
    } catch(err) {}
}

function contactModal(status) {
    $("#" + status + "-modal").modal("show");
}

function pageNavSetup() {
  // this is for testing; gets used to dynamically load header and footer

  // $(document).ready(function() {

    // $("#banner").load("banner.html", function() {
      $("#header").load("header.html", function() {
        $("#footer").load("footer.html", function() {
          var selectedPage = $("#page-title").text().toLowerCase();
          $("#"+selectedPage+"-nav").addClass('active');
          document.getElementById("content").style.display = "block";
        });
      });
    // });

  // }); 

  // $(window).on("load", function() {

  // });

}

function releaseNotesSetup() {
  // this loads the most current release notes on get
  // MUST BE UPDATED WITH NEW RELEASE NOTES
    $("#release-notes_4.3").addClass("font-weight-bold");
    //BUG ^ this bold isn't working and I have no idea why
    // maybe something to do with it happening before the DOM is loaded?


    $("#release-notes-body").load("release-notes_4.3.html");
    // console.log($("#release-notes_4.0"));

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

function validateBeforeSubmit_contactform(event) {
  $("#contact-form-name").change(function(event){
      if($("#contact-form-name").val() == ""){
          $("#contact-form-name").removeClass("form-control light-blue-background");
          $("#contact-form-name").addClass("form-control light-blue-background invalid-form");
          $("#warning-msg-name").text("Please provide your name");
      }
      else{
          $("#contact-form-name").removeClass("form-control light-blue-background invalid-form");
          $("#contact-form-name").addClass("form-control light-blue-background");
          $("#warning-msg-name").text("");
      }
  })

  $("#contact-form-email").change(function(event){
      if(!$("#contact-form-email").val().toLowerCase()
                  .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )){
          $("#contact-form-email").removeClass("form-control light-blue-background");
          $("#contact-form-email").addClass("form-control light-blue-background invalid-form");
          $("#warning-msg-email").text("Please provide a valid email");
      }
      else{
          $("#contact-form-email").removeClass("form-control light-blue-background invalid-form");
          $("#contact-form-email").addClass("form-control light-blue-background");
          $("#warning-msg-email").text("");
      }
  })

  $("#contact-form-inst").change(function(event){
      if($("#contact-form-inst").val() == ''){
          $("#contact-form-inst").removeClass("form-control light-blue-background");
          $("#contact-form-inst").addClass("form-control light-blue-background invalid-form");
          $("#warning-msg-inst").text("Please provide your institution");
      }
      else{
          $("#contact-form-inst").removeClass("form-control light-blue-background invalid-form");
          $("#contact-form-inst").addClass("form-control light-blue-background");
          $("#warning-msg-inst").text("");
      }
  })

  $("#contact-form-moreinfo").change(function(event){
      if($("#contact-form-moreinfo").val() == ''){
          $("#contact-form-moreinfo").removeClass("form-control light-blue-background");
          $("#contact-form-moreinfo").addClass("form-control light-blue-background invalid-form");
          $("#warning-msg-msg").text("Please complete this section");
      }
      else{
          $("#contact-form-moreinfo").removeClass("form-control light-blue-background invalid-form");
          $("#contact-form-moreinfo").addClass("form-control light-blue-background");
          $("#warning-msg-msg").text("");
      }
      
  })
}

function validateOnSubmit_contactform() {
    var isSubmit = true;
    if($("#contact-form-name").val() == ''){
        $("#contact-form-name").removeClass("form-control light-blue-background");
        $("#contact-form-name").addClass("form-control light-blue-background invalid-form");
        $("#warning-msg-name").text("Please provide your name")
        isSubmit = false;
    }
    if(!$("#contact-form-email").val().toLowerCase()
                .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )){
        $("#contact-form-email").removeClass("form-control light-blue-background");
        $("#contact-form-email").addClass("form-control light-blue-background invalid-form");
        $("#warning-msg-email").text("Please provide a valid email")
        isSubmit = false;
    }
    if($("#contact-form-inst").val() == ''){
        $("#contact-form-inst").removeClass("form-control light-blue-background");
        $("#contact-form-inst").addClass("form-control light-blue-background invalid-form");
        $("#warning-msg-inst").text("Please provide your institution")
        isSubmit = false;
    }
    if($("#contact-form-moreinfo").val() == ''){
        $("#contact-form-moreinfo").removeClass("form-control light-blue-background");
        $("#contact-form-moreinfo").addClass("form-control light-blue-background invalid-form");
        $("#warning-msg-msg").text("Please complete this section")
        isSubmit = false;
    }
    return isSubmit;
}

function submitData_contactform(e) {
    e.preventDefault();
    if(validateOnSubmit_contactform()){
        $(":button[type=submit]").prop('disabled', true);
        $("#contact-form-name").prop('disabled', true);
        $("#contact-form-email").prop('disabled', true);
        $("#contact-form-inst").prop('disabled', true);
        $("#contact-form-moreinfo").prop('disabled', true);
        $(":input[type=checkbox]").prop('disabled', true);
        var formdata = {
            email: $("#contact-form-email").val(),
            name: $("#contact-form-name").val(),
            institution: $("#contact-form-inst").val(),
            msg: $("#contact-form-moreinfo").val(),
            // need to check value of checkbox
            pl2training: $("#contact-form-pl2training").is(':checked') ? $("#contact-form-pl2training").val() : "",
            pl2toolkit: $("#contact-form-pl2toolkit").is(':checked') ? $("#contact-form-pl2toolkit").val() : "",
            pl2tutors: $("#contact-form-pl2tutors").is(':checked') ? $("#contact-form-pl2tutors").val() : "",
            eventinfo: $("#contact-form-eventinfo").is(':checked') ? $("#contact-form-eventinfo").val() : "",
            career: $("#contact-form-career").is(':checked') ? $("#contact-form-career").val() : "",
            page: $("title").text(),
        };
        $.ajax({
            type: "POST",
            // url for appscript generated by google form
            url: "https://script.google.com/macros/s/AKfycbzxvBn4Ca_gSwxDCLeQuOe71ZzVG8I28ucYAZld-3iF99Ika5ES9PkJGLRFBqCpklQs/exec", 
            data: formdata,
            dataType: "json",
            success: function(result){
                $(window).scrollTop(0);
                $("#mainContainer").removeClass("container-fluid p-3 p-sm-0 d-block");
                $("#mainContainer").addClass("container-fluid p-3 p-sm-0 d-none");
                $("#successPage").removeClass("container-fluid p-3 p-sm-0 d-none");
                $("#successPage").addClass("container-fluid p-3 p-sm-0 d-block");
                setTimeout(
                    function()
                    {
                    window.location="index.html";
                }, 5000);
            },
            error: function(result){
                $(window).scrollTop(0);
                $("#mainContainer").removeClass("container-fluid p-3 p-sm-0 d-block");
                $("#mainContainer").addClass("container-fluid p-3 p-sm-0 d-none");
                $("#failurePage").removeClass("container-fluid p-3 p-sm-0 d-none");
                $("#failurePage").addClass("container-fluid p-3 p-sm-0 d-block");
        }})
    }
    else{
        e.preventDefault();
        e.stopPropagation();
    }
}

function validateBeforeSubmit_home(event) {
  $("#contact-form-name").change(function(event){
      if($("#contact-form-name").val() == ""){
          $("#contact-form-name").removeClass("form-control");
          $("#contact-form-name").addClass("form-control invalid-form");
          $("#warning-msg-name").text("Please provide your name");
      }
      else{
          $("#contact-form-name").removeClass("form-control invalid-form");
          $("#contact-form-name").addClass("form-control");
          $("#warning-msg-name").text("");
      }
  })

  $("#contact-form-email").change(function(event){
      if(!$("#contact-form-email").val().toLowerCase()
                  .match(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )){
          $("#contact-form-email").removeClass("form-control");
          $("#contact-form-email").addClass("form-control invalid-form");
          $("#warning-msg-email").text("Please provide a valid email");
      }
      else{
          $("#contact-form-email").removeClass("form-control invalid-form");
          $("#contact-form-email").addClass("form-control");
          $("#warning-msg-email").text("");
      }
  })

  $("#contact-form-inst").change(function(event){
      if($("#contact-form-inst").val() == ''){
          $("#contact-form-inst").removeClass("form-control");
          $("#contact-form-inst").addClass("form-control invalid-form");
          $("#warning-msg-inst").text("Please provide your institution");
      }
      else{
          $("#contact-form-inst").removeClass("form-control invalid-form");
          $("#contact-form-inst").addClass("form-control");
          $("#warning-msg-inst").text("");
      }
  })

  $("#contact-form-moreinfo").change(function(event){
      if($("#contact-form-moreinfo").val() == ''){
          $("#contact-form-moreinfo").removeClass("form-control");
          $("#contact-form-moreinfo").addClass("form-control invalid-form");
          $("#warning-msg-msg").text("Please complete this section");
      }
      else{
          $("#contact-form-moreinfo").removeClass("form-control invalid-form");
          $("#contact-form-moreinfo").addClass("form-control");
          $("#warning-msg-msg").text("");
      }
      
  })
}

function validateOnSubmit_home(){
  var isSubmit = true;
  if($("#contact-form-name").val() == ''){
      $("#contact-form-name").removeClass("form-control");
      $("#contact-form-name").addClass("form-control invalid-form");
      $("#warning-msg-name").text("Please provide your name")
      isSubmit = false;
  }
  if(!$("#contact-form-email").val().toLowerCase()
              .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              )){
      $("#contact-form-email").removeClass("form-control");
      $("#contact-form-email").addClass("form-control invalid-form");
      $("#warning-msg-email").text("Please provide a valid email")
      isSubmit = false;
  }
  if($("#contact-form-inst").val() == ''){
      $("#contact-form-inst").removeClass("form-control");
      $("#contact-form-inst").addClass("form-control invalid-form");
      $("#warning-msg-inst").text("Please provide your institution")
      isSubmit = false;
  }
  if($("#contact-form-moreinfo").val() == ''){
      $("#contact-form-moreinfo").removeClass("form-control");
      $("#contact-form-moreinfo").addClass("form-control invalid-form");
      $("#warning-msg-msg").text("Please complete this section")
      isSubmit = false;
  }
  return isSubmit;
}

function submitData_home(e) {
  e.preventDefault();
  if(validateOnSubmit_home()){
      $(":button[type=submit]").prop('disabled', true);
      $("#contact-form-name").prop('disabled', true);
      $("#contact-form-email").prop('disabled', true);
      $("#contact-form-inst").prop('disabled', true);
      $("#contact-form-moreinfo").prop('disabled', true);
      $(":input[type=checkbox]").prop('disabled', true);
      var path = window.location.pathname;
      var page = path.split("/").pop();
      var formdata = {
          email: $("#contact-form-email").val(),
          name: $("#contact-form-name").val(),
          institution: $("#contact-form-inst").val(),
          msg: $("#contact-form-moreinfo").val(),
          // need to check value of checkbox
          pl2training: $("#contact-form-pl2training").is(':checked') ? $("#contact-form-pl2training").val() : "",
          pl2toolkit: $("#contact-form-pl2toolkit").is(':checked') ? $("#contact-form-pl2toolkit").val() : "",
          pl2tutors: $("#contact-form-pl2tutors").is(':checked') ? $("#contact-form-pl2tutors").val() : "",
          eventinfo: $("#contact-form-eventinfo").is(':checked') ? $("#contact-form-eventinfo").val() : "",
          career: $("#contact-form-career").is(':checked') ? $("#contact-form-career").val() : "",
          page: (page.substring(0, page.length - 5) === "index") ? "home" : page.substring(0, page.length - 5),
      };
      $.ajax({
          type: "POST",
          // url for appscript generated by google form
          url: "https://script.google.com/macros/s/AKfycbzxvBn4Ca_gSwxDCLeQuOe71ZzVG8I28ucYAZld-3iF99Ika5ES9PkJGLRFBqCpklQs/exec", 
          data: formdata,
          dataType: "json",
          success: function(result){
              contactModal("success");
              $(":button[type=submit]").prop('disabled', false);
              $("#contact-form-name").prop('disabled', false).val("");
              $("#contact-form-email").prop('disabled', false).val("");
              $("#contact-form-inst").prop('disabled', false).val("");
              $("#contact-form-moreinfo").prop('disabled', false).val("");
              $(":input[type=checkbox]").prop('disabled', false);
              $(":input[type=checkbox]").prop('checked', false);
          },
          error: function(result){
              contactModal("failure");
              $(":button[type=submit]").prop('disabled', false);
              $("#contact-form-name").prop('disabled', false);
              $("#contact-form-email").prop('disabled', false);
              $("#contact-form-inst").prop('disabled', false);
              $("#contact-form-moreinfo").prop('disabled', false);
              $(":input[type=checkbox]").prop('disabled', false);
      }})
      
  }
  else{
      e.preventDefault();
      e.stopPropagation();
  }
}
  
  function submitData_solution(e) {
      e.preventDefault();
      if(validateOnSubmit_contactform()){
          $(":button[type=submit]").prop('disabled', true);
          $("#contact-form-name").prop('disabled', true);
          $("#contact-form-email").prop('disabled', true);
          $("#contact-form-inst").prop('disabled', true);
          $("#contact-form-moreinfo").prop('disabled', true);
          var path = window.location.pathname;
          var page = path.split("/").pop();
          var formdata = {
              email: $("#contact-form-email").val(),
              name: $("#contact-form-name").val(),
              institution: $("#contact-form-inst").val(),
              msg: $("#contact-form-moreinfo").val(),
              // need to check value of checkbox
              pl2training: $("#contact-form-pl2training").is(':checked') ? $("#contact-form-pl2training").val() : "",
              pl2toolkit: $("#contact-form-pl2toolkit").is(':checked') ? $("#contact-form-pl2toolkit").val() : "",
              pl2tutors: $("#contact-form-pl2tutors").is(':checked') ? $("#contact-form-pl2tutors").val() : "",
              eventinfo: $("#contact-form-eventinfo").is(':checked') ? $("#contact-form-eventinfo").val() : "",
              career: $("#contact-form-career").is(':checked') ? $("#contact-form-career").val() : "",
              page: page.substring(0, page.length - 5),
          };
          $.ajax({
              type: "POST",
              // url for appscript generated by google form
              url: "https://script.google.com/macros/s/AKfycbzxvBn4Ca_gSwxDCLeQuOe71ZzVG8I28ucYAZld-3iF99Ika5ES9PkJGLRFBqCpklQs/exec", 
              data: formdata,
              dataType: "json",
              success: function(result){
                contactModal("success");
                $(":button[type=submit]").prop('disabled', false);
                $("#contact-form-name").prop('disabled', false).val("");
                $("#contact-form-email").prop('disabled', false).val("");
                $("#contact-form-inst").prop('disabled', false).val("");
                $("#contact-form-moreinfo").prop('disabled', false).val("");
              },
              error: function(result){
                contactModal("failure");
                $(":button[type=submit]").prop('disabled', false);
                $("#contact-form-name").prop('disabled', false);
                $("#contact-form-email").prop('disabled', false);
                $("#contact-form-inst").prop('disabled', false);
                $("#contact-form-moreinfo").prop('disabled', false);
          }})
      }
      else{
          e.preventDefault();
          e.stopPropagation();
      }
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

function getScrollPercentage() {
    $(window).on('scroll', function(){
        var s = $(window).scrollTop(),
            d = $(document).height(),
            c = $(window).height();
      
        var scrollPercent = (1 - (s / (d - c))) * 100;
        // var scrollWidth = scrollPercent * $(window).width();
        console.log(scrollPercent.toString() + "vw");
        $("#rainbow-bar-top-cover").css("width", scrollPercent.toString() + "vw");
      })
}
