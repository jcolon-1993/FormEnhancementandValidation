// Helper function to add an event listener
function addEvent(el, event, callback)
{
  // addEventListener works
  if ("addEventListener" in el)
  {
    // Use it
    el.addEventListener(event, callback, false);
  }
  // Otherwise, make callback a method
  else
  {
    el["e" + event + callback] = callback;
    // Add second method
    el[event + callback] = function()
    {
      // use it to call prev function
      el["e" + event + callback](window.event)
    };
    // Use attachEvent() to call the second function, which then call the first one
    el.attachEvent("on" + event, el[event + callback]);
  }
}
