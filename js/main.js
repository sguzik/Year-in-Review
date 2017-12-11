/*
 * JS for Editorial Index
 * Author: smg
 *
 * Created as a 2017 end of year project. Inspired by the NYT Trump Insults index:
 * https://www.nytimes.com/interactive/2016/01/28/upshot/donald-trump-twitter-insults.html
 *
 * Requires Isotope (for display + filtering) and Underscore.js
 */

// ------ checks if a variable is an array
function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

// ------ does what it says
function goToByScroll(id) {
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top
    }, 'slow');
}

// ------ does what it says
function displayItems(result){
  for (var l = 0; l < result.length; l++) {
    var letter = result[l];
    if (letter.topics.length > 0){
      //set up the letter flags for the index
      //need to handle the final letter differently (it's a number)
      if ( l === 26 ){
        $("#" + letter.id).html('<a href="#' + letter.id + '">#</a>');
        header = '<div class="stamp edit-grid-item" id="letter_' + letter.id + '"><h2>#</h2></div>';
      } else{
        $("#" + letter.id).html('<a href="#' + letter.id + '">' + letter.id + '</a>');
        header = '<div class="stamp edit-grid-item" id="letter_' + letter.id + '"><h2>' + letter.id + '</h2></div>';
      }
      for (var n = 0; n < letter.topics.length; n++) {
        var topic = letter.topics[n];
        topic.editorials = _.sortBy(topic.editorials, 'date');
        //if this is the first topic in the letter, add the topic header to the box
        if (n === 0){
          header += '<div class="topic edit-grid-item" id="' + topic.id + '"><h3>' + topic.topic + '</h3></div>';
        }else{
          header = '<div class="topic edit-grid-item" id="' + topic.id + '"><h3>' + topic.topic + '</h3></div>';
        }
        $(header).appendTo("#editIndex");
        for (var e = 0; e < topic.editorials.length; e++) {
          edit = topic.editorials[e];
          editHTML = '<div class="editorial" id="' + _.uniqueId('edit_') + '">'
          editHTML += '<span class="editHed"><a href="' + edit.url + '" target="_blank">' + edit.headline + '</a>';
          editHTML += '<span class="editDate"> ' + shortAP(edit.date) + '</span></span>';
          editHTML += '</div>';
          $("#" + topic.id).append(editHTML);
        }
      }
    }
  }
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}

//array of letters for alphabetizing the index
var letters = [
  {id: 'A', topics:[]}, {id: 'B', topics:[]}, {id: 'C', topics:[]}, {id: 'D', topics:[]},
  {id: 'E', topics:[]}, {id: 'F', topics:[]}, {id: 'G', topics:[]}, {id: 'H', topics:[]},
  {id: 'I', topics:[]}, {id: 'J', topics:[]}, {id: 'K', topics:[]}, {id: 'L', topics:[]},
  {id: 'M', topics:[]}, {id: 'N', topics:[]}, {id: 'O', topics:[]}, {id: 'P', topics:[]},
  {id: 'Q', topics:[]}, {id: 'R', topics:[]}, {id: 'S', topics:[]}, {id: 'T', topics:[]},
  {id: 'U', topics:[]}, {id: 'V', topics:[]}, {id: 'W', topics:[]}, {id: 'X', topics:[]},
  {id: 'Y', topics:[]}, {id: 'Z', topics:[]}, {id: 'numbers', topics:[]}
];

//array to hold the groups
var groups = [];

// quick search regex
var qsRegex;

var $grid = $('.edit-grid').isotope({
  initLayout: false,
  itemSelector: '.edit-grid-item',
  percentPosition: true,
  masonry: {
   columnWidth: '.grid-sizer'
  },
  layoutMode: 'masonry',
  filter: function() {
    //hide the letter flag and links when searching
    if (qsRegex){
      if ( qsRegex.source === '(?:)'){
        $(".letter h2").removeClass("deactive");
        $("#index-letters").removeClass("deactive");
      } else{
        $(".letter h2").addClass("deactive");
        $("#index-letters").addClass("deactive");
      }
    }
    return qsRegex ? $(this).text().match( qsRegex ) : true;
  }
});

$grid.isotope( 'on', 'arrangeComplete', function() {
  console.log('arrange is complete');
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope();
}, 200 ) );

$(function() {
  var jqxhr = $.getJSON( dataURL, function() {
    console.log( "success loading data" );
  })
    .done(function(data) {
      //each item arrives as an individual item, we want it grouped
      for (var i = 0; i < data.editorials.length; i++) {
          var item = data.editorials[i];
          //need to differentiate between editorials that have multiple keywords
          if(isArray(item.keywords)){
            for (var a = 0; a < item.keywords.length; a++) {
              var keyword = item.keywords[a];
              //check to see if we're encountering a new keyword
              if(!_.find(groups, {topic: keyword}) ){
                newGroup = {
                  topic: keyword,
                  id: _.uniqueId('topic_'),
                  editorials: []
                }
                groups.splice(_.sortedIndex(groups, newGroup, 'topic'), 0, newGroup );
              }
              insertIndex = _.findIndex(groups, {topic: keyword});
              groups[insertIndex].editorials.push({
                  headline: item.headline,
                  date: item.date,
                  url: item.url
              });
            }
          }else{
            if (!_.find(groups, {topic: item.keywords}) ) {
              newGroup = {
                topic: item.keywords,
                id: _.uniqueId('topic_'),
                editorials: []
              }
              groups.splice(_.sortedIndex(groups, newGroup, 'topic'), 0, newGroup );
            }
            insertIndex = _.findIndex(groups, {topic: item.keywords});
            groups[insertIndex].editorials.push({
                headline: item.headline,
                date: item.date,
                url: item.url
            });
          }

      }

      //alphabetizing the groups for display
      for (var t = 0; t < groups.length; t++) {
        var group = groups[t];
        insertIndex = _.findIndex(letters, {id: group.topic.charAt(0) });
        if (insertIndex >= 0){
        }else{
          insertIndex = 26;
        }
        letters[insertIndex].topics.push(group);
      }

      displayItems(letters);
    })
    .fail(function() {
      console.log( "error: data failed to load." );
    });
  jqxhr.done(function(){
    $grid.isotope( 'reloadItems' ).isotope();

    $(".letter-link").click(function() {
      clicked = this;
      goToByScroll("letter_" + $(clicked).attr("id"));
    });
    console.log("done");
  })
});