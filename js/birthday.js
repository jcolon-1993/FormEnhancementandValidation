// Place in iife
(function ()
{
  // DOB input
  var $birth = $("#birthday");
  // consent checkbox
  var $parentsConsent = $("#parents-consent");
  // Checkbox containera
  var $consentContainer = $("#consent-container");
  // Create the date picker using jQuery UI
  $birth.prop("type", "text").data("type", "date").datepicker(
    {
      // Sets date format
      dateFormat: "yy-mm-dd"
    });
    // Event listener for when DOB input loses focus, then calls checkDate()
    $birth.on("blur change", checkDate);

    // Function checks DOB of user
    function checkDate()
    {
      // Breaks up date into arrays using .split()
      var dob = this.value.split("-");
      // Pass toggleParentsConsent() the date of birth as a date object
      toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
    }

    // Function decides whether or not to show checkbox
    function toggleParentsConsent(date)
    {
      // Stop function if date is invalid
      if (isNaN(date)) return;
      // Declare Date object
      var now = new Date();
      // Check to see if less than 13 years old
      if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13))
      {
        // Remove hide class
        $consentContainer.removeClass("hide");
        // Give it focus
        $parentsConsent.focus();
      }
      // Otherwise, add hide to class
      else
      {
        $consentContainer.addClass("hide");
        // Set checked to false
        $parentsConsent.prop("checked", false);
      }
    }
}());
