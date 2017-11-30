function isArray(what) {
    return Object.prototype.toString.call(what) === '[object Array]';
}

function displayItems(result){
  //console.log("made it to display time...")
  for (var n = 0; n < result.length; n++) {
    var topic = result[n];
    //console.log(topic);
    header = '<h2>' + topic.topic + '</h2><div id="' + topic.id + '"></div>';
    $(header).appendTo("#editIndex");
    for (var e = 0; e < topic.editorials.length; e++) {
      edit = topic.editorials[e];
      editHTML = '<div id="' + _.uniqueId('edit_') + '">'
      editHTML += '<p><a href="' + edit.url + '">' + edit.headline + '</a></p>';
      editHTML += '</div>';
      $(editHTML).appendTo("#" + topic.id);
    }
  }

  /*
  for (var topic in result){
    console.log(topic);
    header = "<h2>" + topic + "</h2>";
    $(header).appendTo("#editIndex");
  }
  */
}

$(function() {
  console.log("Hello, world!");

  // Assign handlers immediately after making the request,
  // and remember the jqxhr object for this request
  var jqxhr = $.getJSON( "data.json", function() {
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
                  url: item.url
              });
            }
          }else{
            if (!_.find(groups, {topic: item.keywords}) ) {
              //true
              //groups.splice(_.sortedIndex(groups, item.keywords), 0, item.keywords);
              //groups[item.keywords] = [];
              newGroup = {
                topic: item.keywords,
                id: _.uniqueId('topic_'),
                editorials: []
              }
              groups.splice(_.sortedIndex(groups, newGroup, 'topic'), 0, newGroup );
            }
            //console.log(groups);
            insertIndex = _.findIndex(groups, {topic: item.keywords});
            //console.log( _.findIndex(groups, {topic: item.keywords}) );
            groups[insertIndex].editorials.push({
                headline: item.headline,
                url: item.url
            });
          }

      }

      var result = [];
      //groups.sort();
      console.log("groups...");
      console.log(groups);
      /*
      for (var x in groups) {
          //console.log(groups);
          //var arr = [];
          //result[x] = groups[x];
          var obj = {};
          obj[x] = groups[x];
          result.push(obj);
      }
      console.log(_.keys(result));
      _.sortBy(result, _.keys(result));

      console.log(result);
      //result = result.sort();
      */
      displayItems(groups);

    })
    .fail(function() {
      console.log( "error" );
    })

  // Perform other work here ...

});