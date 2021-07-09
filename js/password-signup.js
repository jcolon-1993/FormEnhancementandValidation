// Place in iife
(function ()
{
  // Store password inputs
  var password = document.getElementById("password");
  var passwordConfirm = document.getElementById("conf-password");

  // Function Adds class name fail if less than 8 characters
  function setErrorHighlighter(e)
  {
    // get target element
    var target = e.target || e.srcElement;
    // If length is less than 8 characters
    if (target.value.length < 8)
    {
      // Set class to fail
      target.className = "fail";
    }
    // Otherwise
    else
    {
      // Set class to pass
      target.className = "pass";
    }
  }

  // Function used remove className of fail
  function removeErrorHighlighter(e)
  {
    // Get target element
    var target = e.target || e.srcElement;
    // If class is already set to fail
    if (target.className === "fail")
    {
      target.className = "";
    }
  }

  // Function checks to see if passwords match
  function passwordsMatch(e)
  {
    // get target element
    var target = e.target || e.srcElement;
    // If passwords match and longer than 8 characters
    if ((password.value === target.value) && target.value.length >= 8)
    {
      // Set class to pass
      target.className = "pass";
    }
    // Otherwise
    else
    {
      // Set class to fail
      target.className = "fail";

    }
  }
  // Event listeners to be used
  addEvent(password, "focus", removeErrorHighlighter);
  addEvent(password, "blur", setErrorHighlighter);
  addEvent(passwordConfirm, "focus", removeErrorHighlighter);
  addEvent(passwordConfirm, 'blur', passwordsMatch);
}());
