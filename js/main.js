function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function displayItems(result){
  //console.log("made it to display time...")
  for (var n = 0; n < result.length; n++) {
    var topic = result[n];
    //console.log(topic);
    topic.editorials = _.sortBy(topic.editorials, 'date');
    header = '<div class="topic" id="' + topic.id + '"><h2>' + topic.topic + '</h2></div>';
    $(header).appendTo("#editIndex");
    for (var e = 0; e < topic.editorials.length; e++) {
      edit = topic.editorials[e];
      editHTML = '<div class="editorial" id="' + _.uniqueId('edit_') + '">'
      editHTML += '<span class="editHed"><a href="' + edit.url + '" target="_blank">' + edit.headline + '</a></span>';
      editHTML += '<span class="editDate"> ' + shortAP(edit.date) + '</span>';
      editHTML += '</div>';
      $("#" + topic.id).append(editHTML);

      $element = $(editHTML);

      $grid.isotope()
        .isotope( 'appended', $element )
        .isotope('layout');
    }
  }
}

var $grid = $('#editIndex').isotope({
  // options
  itemSelector: '.topic',
  percentPosition: true,
  masonry: {
   columnWidth: '.grid-sizer'
  },
  layoutMode: 'packery'
});

var filters = {};

$(function() {
  console.log("Hello, world!");

  var jqxhr = $.getJSON( "data/data.json", function() {
    console.log( "success loading data" );
  })
    .done(function(data) {
      //console.log(data.editorials);
      var groups = [];

      for (var i = 0; i < data.editorials.length; i++) {
          var item = data.editorials[i];
          if(isArray(item.keywords)){
            for (var a = 0; a < item.keywords.length; a++) {
              var keyword = item.keywords[a];
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

      displayItems(groups);

    })
    .fail(function() {
      console.log( "error" );
    });

});