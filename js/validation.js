// Put in iife
(function ()
{
  // Disable HTML5 Validation
  document.forms.register.noValidate = true;
  // Event listener when form is submitted
  $("form").on("submit", function(e)
  {
    // Collection of form controls
    var elements = this.elements;
    // Custom valid object
    var valid = {};
    // isValid: checks form controls
    var isValid;
    // isFormValid: checks entire form
    var isFormValid;

    // Performs generic checks
    for (var i = 0; i < elements.length - 1; i++)
    {
      // Checks to see if form and form controls are valid
      isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
      // If does not pass these two tests
      if (!isValid)
      {
        // Show error messages
        showErrorMessage(elements[i]);
      }
      // Otherwise, remove error messages
      else
      {
        removeErrorMessage(elements[i]);
      }
      // Add element to the valid object
      valid[elements[i].id] = isValid;
    }

    // Perform custom validation
    // Call validateBio(), if not valid
    if (!validateBio())
    {
      // Show error message
      showErrorMessage(document.getElementById("bio"));
      // Update valid object-not valid
      valid.bio = false;
    }
    // Otherwise remove error
    else
    {
      removeErrorMessage(document.getElementById("bio"));
    }
    // Call validatePassword() and if not valid
    if (!validatePassword())
    {
      // Show error message
      showErrorMessage(document.getElementById("password"));
      // update the valid object
      valid.password = false;
    }
    // Otherwise, remove error message
    else
    {
      removeErrorMessage(document.getElementById("password"));
    }
    // Call validateParentConsent and if not valid
    if (!validateParentConsent())
    {
      // Show error message
      showErrorMessage(document.getElementById("parents-consent"));
      // Update the valid object
      valid.parentsConsent = false;
    }
    // Otherwise, remove error message
    else
    {
      removeErrorMessage(document.getElementById("parents-consent"));
    }

    /* Did it pass / can it submit the form
    Loop through valid object, if there are errors set isFormValid to false*/
    // Chechs properties of the valid object
    for (var field in valid)
    {
      // if it is not valid, set isFormValid variable to false
      if (!valid[field])
      {
        isFormValid = false;
        // Stop loop, error was found
        break;
      }
      // Otherwise, the form is valid and ok to submit
      isFormValid = true;
    }
    // If the form did not validate, prevent it being submitted
    if (!isFormValid)
    {
        e.preventDefault();
    }
  });
  // Function Checks if attribute is present and has a value
  function validateRequired(el)
  {
    // Is this element required?
    if (isRequired(el))
    {
      // Is value not empty (True/false)
      var valid = !isEmpty(el);
      // if value variable holds false
      if (!valid)
      {
        // Set the error message
        setErrorMessage(el, "Field is required");
      }
      // Return valid variable (true / falss)
      return valid;
    }
    // If not required, all is okay
    return true;
  }

  // Function checks whether the element has a required attribute
  function isRequired(el)
  {
    // Checks to see if support the html5 required attribute
    return ((typeof el.required === "boolean") && el.required)
    // Checks to see if required attribute is present in older browsers
    || (typeof el.required === "string");
  }

  // Function checks to see if the element has a value
  function isEmpty(el)
  {
    // Check used in modern browsers
    return !el.value
    // Check used in older browsers
    ||  el.value === el.placeholder;
  }

  // Function to store error messages
  function setErrorMessage(el, message)
  {
    // Store error message with associated element
    $(el).data("errorMessage", message);
  }


  // Function to display error messages
  function showErrorMessage(el)
  {
    // Find element with the error
    var $el = $(el);
    // Does it have errors already
    var $errorContainer = $el.siblings(".error");

    // Run block if no errors found
    if (!$errorContainer.length)
    {
      // Create a <span> to hold the error and add it after the element with the error
      $errorContainer = $("<span class='error'></span>").insertAfter($el);
    }
    // Add error message
    $errorContainer.text($(el).data("errorMessage"));
  }
  // This function removes any existing error messages
  function removeErrorMessage(el)
  {
    // Gets the sibling of this form control used to hold the error message
    var errorContainer = $(el).siblings("error.message");
    // Remove the element that contains the error message
    errorContainer.remove();
  }

  // Function validated input to be consistent across all browsers
  function validateTypes(el)
  {
    // If element has not value, return true;
    if (!el.value) return true;

    // Otherwise get the value from .data() or get the type of input
    var type = $(el).data("type") || el.getAttribute("type");
    // is type a method of validate object?
    if (typeof validateType[type] === "function")
    {
      // If yes, check if the value validates
      return validateType[type](el);
    }
    // Otherwise, return true as it cannot be tested.
    else
    {
      return true;
    }
  }

  // Function used to check if Bio length is less than 140 characters
  function validateBio()
  {
    // Store reference to bio text area
    var bio = document.getElementById("bio");
    // Is bio <= 140 characters?
    var valid = bio.value.length <= 140;
    // If not, set an error message
    if (!valid)
    {
      setErrorMessage(bio, "Your bio should not exceed 140 characters");
    }
    // return boolean value
    return valid;
  }
  // Function used to check if password length is long enough
  function validatePassword()
  {
    // Store reference to element
    var password = document.getElementById("password");
    var passwordConfirm = document.getElementById("conf-password");

    // Is its value >= 8 chars and does the password match?
    var valid = password.value.length >= 8 && password.value === passwordConfirm.value;

    // If not, set error message
    if (!valid)
    {
      setErrorMessage(password, "Password must be at least 8 characters and passwords must match");
    }

    // Return true / false
    return valid;
  }
  // Function used to check if user is under 13 years
  function validateParentConsent()
  {
    // Store references to elements
     var parentsConsent = document.getElementById("parents-consent");
     var consentContainer = document.getElementById("consent-container");
     // Valid set to true by default
     var valid = true;
     // If checkbox is visible
     if (consentContainer.className.indexOf("hide") === -1)
     {
       // Update valid varible to checked/not checked
       valid = parentsConsent.checked;
       // If not, set the error message
       if (!valid)
       {
         setErrorMessage(parentsConsent, "You need your parents\' consent");
       }
     }
     // Return whether valid or not.
     return valid;
  }

  // Checks if data is valid
  // Returns true if valid, false otherwise
  var validateType =
  {
    // Creates email method
    email: function(el)
    {
      // Store result of test in valid
      var valid = /[^@]+@[^@]+/.test(el.value);
      // If value of valid is not true, store error message
      if (!valid)
      {
        setErrorMessage(el, "Please enter a valid email");
      }
      // Return the valid variable
      return valid;
    },
    // Creates number method
    number: function(el)
    {
      // Regular expression used to test if user input is valid for a number
      var valid = /^\d+$/.test(el.value);
      if (!valid)
      {
        setErrorMessage(el, "Please enter a valid number")
      }
      return valid;
    },
    // Creates date method
    date: function(el)
    {
      // Regular expression used to test if user input is valid for a date
      var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
      if (!valid)
      {
        setErrorMessage(el, "Please enter a valid date");
      }
      return valid;
    }
  };
}());
