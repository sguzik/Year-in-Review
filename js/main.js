$(function() {
  console.log("Hello, world!");

  // Assign handlers immediately after making the request,
  // and remember the jqxhr object for this request
  var jqxhr = $.getJSON( "data.json", function() {
    console.log( "success" );
  })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

  // Perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function() {
    console.log( "second complete" );
  });
});