//   <!-- script for dropdown toogle -->

$(".dropdown-menu").css({
  display: "none",
});

$(document).ready(function () {
  $(".menu").click(function () {
    $(".dropdown-menu").slideToggle();
  });
});
//    <!-- script for modes -->

$(document).ready(function () {
  // ////////////////////////////////////////////////////red mode
  $(".red").click(function () {
    $(".main-wrapper").css({
      backgroundColor: "#bc4749", //bcg of body
    });
    $(".accordian-item").css({
      backgroundColor: "white", // accordion
      color: "#000",
    });
    $(".text-content2").css({
      backgroundColor: "white", //heading
      color: "#000",
    });
    $(".started").css({
      backgroundColor: "#fff", //getting started
      color: "#bc4749",
    });
    $("input").css({
      backgroundColor: "#fff", // input
      color: "#bc4749",
    });
    $("footer li >a").css({
      color: "#fff", //font color footer
    });
    $("footer >p").css({
      color: "#fff", //font color footer
    });
    $("footer >a").css({
      textDecoration: "none", //font color footer
    });
    $("header").css({
      backgroundImage:
        " linear-gradient(to top, rgba(236, 202, 202, 0.854) 0, rgba(43, 32, 32, 0.48) 59%, rgba(40, 27, 27, 0.94) 100%),url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    });
  });
  /////////////////////////////////////////////////////////light mode
  $(".light").click(function () {
    $(".main-wrapper").css({
      backgroundColor: "#fff", //bcg of body
    });
    $(".accordian-item").css({
      backgroundColor: "#2d2d2d", // accordion
      color: "#fff",
    });
    $(".text-content").css({
      color: "#000", /// paragraph text above input
    });
    $(".section-title").css({
      color: "#222", //title of body
    });
    $("#lang").css({
      color: "#222", //footer dropdown
    });
    $(".footer-text").css({
      color: "#222", //footer text last line
    });
    $("input").css({
      backgroundColor: "#333", //footer text last line
    });
    $("header").css({
      backgroundImage:
        "linear-gradient(to top, rgba(212, 208, 208, 0.854) 0, rgb(0 0 0 / 48%) 59%, rgba(202, 202, 202, 0.94) 100%) ,url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    });
  });
  //////////////////////////////////////////////////////sky blue mode
  $(".sky").click(function () {
    $(".main-wrapper").css({
      backgroundColor: "#98c1d9", //bcg of body
    });

    $(".section-title").css({
      color: "#222", //title of body
    });
    $("header").css({
      backgroundImage:
        "linear-gradient(to top, rgba(88, 110, 122, 0.854) 0, rgba(15, 16, 16, 0.48) 59%, rgba(85, 122, 132, 0.443) 100%) ,url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    });
  });
  // /////////////////////////////////////////////////////yellow mode
  $(".yellow").click(function () {
    $(".main-wrapper").css({
      backgroundColor: "#f2cc8f", //bcg of body
    });

    $(".section-title").css({
      color: "#222", //title of body
    });
    $("header").css({
      backgroundImage:
        " linear-gradient(to top, rgba(122, 107, 88, 0.854) 0, rgba(16, 16, 15, 0.48) 59%, rgba(132, 115, 85, 0.669) 100%) ,url(https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg)",
    });
    $("footer a").css({
      color: "#222", //title of body
    });
    $("footer-text").css({
      color: "#222", //title of body
    });
    $(".footer-text").css({
      color: "#222", //footer text last line
    });
    $("input").css({
      backgroundColor: "#333", //footer text last line
    });
  });
});
// script for accordian
$(document).ready(function () {
  //rotation of icon
  let a = true;

  $(".icon").click(function () {
    if (a) {
      $(this).css({ transform: "rotate(45deg)" });
      console.log("45");
    } else {
      $(this).css({ transform: "rotate(0deg)" });
      console.log("45");
    }
    a = !a;
  });

  // functions for accordian //
  // first paragraph
  $(".plus1").click(function () {
    $(".item1").slideToggle();
  });
  // second paragraph
  $(".plus2").click(function () {
    $(".item2").slideToggle();
  });
  // third paragraph
  $(".plus3").click(function () {
    $(".item3").slideToggle();
  });
  // four paragraph
  $(".plus4").click(function () {
    $(".item4").slideToggle();
  });
  // fifth paragraph
  $(".plus5").click(function () {
    $(".item5").slideToggle();
  });
  // sixth paragraph
  $(".plus6").click(function () {
    $(".item6").slideToggle();
  });
});
// email validation
// function to validate email
function validateEmail(email) {
  //  store regular expression in variable
  let reg_exp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  // test if expression match or not
  return reg_exp.test(email);
}
// to print validation msg
function handleEmail() {
  let msg = document.getElementById("error");
  let mail = document.getElementById("email").value;
  msg.innerText = "";
  if (validateEmail(email)) {
    // msg.text(email + " is valid");
    msg.innerText = email + "is valid";
    // result.css("color", "blue");
  } else {
    // result.text(email + " is not valid");
    msg.innerText = email + "is  not valid";

    // result.css("color", "red");
  }
  return false;
}
