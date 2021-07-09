// Place in iife
(function ()
{
  // Test to see if placeholder is supported
  if ("placeholder" in document.createElement("input"))
  {
    return;
  }
  // Get number of forms
  var length = document.forms.length;
  // loop through each one
  for (var i = 0; i < length; i++)
  {
    // Call show placeholder()
    showPlaceholder(document.forms[i].elements);
  }

  // Function stores elements in placeholder
  function showPlaceholder(elements)
  {
    // For each element, store element
    for (var i = 0; i < elements.length; i++)
    {
      var el = elements[i];
      // If no placeholder set, go to next element
      if (!el.placeholder)
      {
        continue;
      }
      // Otherwise, set text to gray
      el.style.color = "#666666";
      // Add placeholder text
      el.value = el.placeholder;

      // Event listener for when element gains focus
      addEvent(el, "focus", function()
      {
        // If value matches placeholder text, clear value and change to black
        if (this.value === this.placeholder)
        {
          this.value = "";
          this.style.color = "#000000";
        }
      });

      // Event listener for when element loses focus
      addEvent(el, "blur", function()
      {
        // If the input is empty
        if (this.value === "")
        {
          // Make value placeholder
          this.value = this.placeholder;
          // Make text gray
          this.style.color = "#666666";
        }
      });
    }
  }
}());
