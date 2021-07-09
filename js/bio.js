// Place in iife
(function ()
{
  var bio = $("#bio");
  var bioCounter = $("#bio-count");
  // Show the counter when the field is focused and update the class
  bio.on("focus", updateCounter);
  bio.on("keyup", updateCounter);

  // When we leave the textarea, we hide the counter unless there too many characters
  bio.on("blur", function()
  {
    if (bioCounter.text() >= 0)
    {
      bioCounter.addClass("hide");
    }
  });
  // Function updates the number of characters that you have left to use
  function updateCounter(e)
  {
    var count = 140 - bio.val().length;
    var status = "";
    if (count < 0)
    {
      status = "error";
    }
    else if (count <= 15)
    {
      status = "warn";
    }
    else
    {
      status = "good";
    }

    // Remove previous class
    bioCounter.removeClass("error warn good hide");
    // Add new class
    bioCounter.addClass(status);
    bioCounter.text(count);
  }
}());
