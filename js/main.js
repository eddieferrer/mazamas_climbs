$(function() {

    // Function that renders the list items from our records
    function ulWriter(rowIndex, record, columns, cellWriter) {
      //console.log(record);
      var climb_table_row = '<li class="climb_panel panel">' +
        '<div class="row">' +
          '<div class="small-6 columns">' +
            '<h2>' +
              '<strong><span class="climbNumber">' + record.climbNumber + '</span></strong>' +
            '</h2>' +
            '<h3>' +
              '<span class="peak">' + record.peak + '</span>' +
            '</h3>' +
            '<h4>' +
              '<strong><span class="route">' + record.route + '</span></strong>' +
              '<em><span>Grade:<span class="grade">' + record.grade + '</span></span></em>' +
            '</h4>' +
          '</div>' +
          '<div class="small-3 columns">' +
            '<span class="departureDate">' + record.departureDate + '</span> > <span class="returnDate">' + record.returnDate + '</span> <br/>' +
            '<span>Add to Google Calendar</span>' +
            'Leader:' +
            '<span class="leader">' + record.leader +
            '</span>' +
            '<span class="gradEmphasis">' + record.gradEmphasis + '</span>' +
            '<span>Open Spots: <span class="spotsRemaining">' + record.spotsRemaining + '</span>/<span class="partySize">' + record.partySize + '</span></span>' +
          '</div>' +
          '<div class="small-3 columns">' +
            '<span class="details">' + record.details + '</span>' +
          '</div>' +
          '<div class="row">' +
            '<span class="status">' + record.status + '</span>' +
            '<span class="lastUpdate">' + record.lastUpdate + '</span>' +
          '</div>' +
        '</div>' +
      '</li>';

        return climb_table_row;
    }

    // Function that creates our records from the DOM when the page is loaded
    function ulReader(index, li, record) {
      // console.log(record);
      var $li = $(li);
          record.details = $li.find('span.details').html();
          record.climbNumber = $li.find('span.climbNumber').html();
          record.departureDate = $li.find('span.departureDate').html();
          record.returnDate = $li.find('span.returnDate').html();
          record.peak = $li.find('span.peak').html();
          record.route = $li.find('span.route').html();
          record.grade = $li.find('span.grade').html();
          record.leader = $li.find('span.leader').html();
          record.gradEmphasis = $li.find('span.gradEmphasis').html();
          record.partySize = $li.find('span.partySize').html();
          record.spotsRemaining = $li.find('span.spotsRemaining').html();
          record.status = $li.find('span.status').html();
          record.lastUpdate = $li.find('span.lastUpdate').html();
    }

    var dynatable = $('#XXXmazama_climb_load')
    .bind('dynatable:init', function(e, dynatable) {
      $('#sort').change( function(e) {
        dynatable.sorts.clear();
        dynatable.sorts.add($( "#sort option:selected" ).attr("data-value"), $( "#sort-direction" ).attr("data-direction")) // 1=ASCENDING, -1=DESCENDING
        dynatable.process();
        e.preventDefault();
      });
    })
    .bind('dynatable:init', function(e, dynatable) {
      dynatable.queries.functions["search-grade"] = function(record, queryValue) {
        for (var i = 0; i < queryValue.length; i++) {
           if ( record.grade.includes(queryValue[i]) ) {
             return true
           }
        }
        return false
      };
    })
    .bind('dynatable:init', function(e, dynatable) {
      dynatable.queries.functions["search-status"] = function(record, queryValue) {
         if ( record.status == queryValue ) {
           return true
         }
      };
    })
    .dynatable({
        features: {
            paginate: true,
            recordCount: true,
            search: false,
            perPageSelect: false,
            pushState: false
        },
        table: {
            bodyRowSelector: 'li'
        },
        dataset: {
            perPageDefault: 50,
            perPageOptions: [25, 50]
        },
        writers: {
            _rowWriter: ulWriter
        },
        readers: {
            _rowReader: ulReader
        },
        inputs: {
          queries: $('#search-status ')
        }
    }).data('dynatable');

    $('.search-grade').change( function() {
        var checked_values = [];
        $('.search-grade').each( function (){
          if ( $(this).is(":checked") ) {
            checked_values.push($(this).val());
          }
        });
        if ( checked_values.length > 0 ) {
          dynatable.queries.add("search-grade",checked_values);
        } else {
          dynatable.queries.remove("search-grade");
        }
        dynatable.process();
    });
    $('.search-status').change( function() {
        if ( $(this).val() == "" ) {
          dynatable.queries.remove("search-status");
        } else {
          dynatable.queries.add("search-status", $(this).val());
        }
        dynatable.process();
    });
    $('#sort-direction').click( function(e) {
      e.preventDefault();
      if ( $(this).attr("data-direction") === "-1") {
        $(this).attr("data-direction", "1");
        $('#sort').trigger("change");
        return
      }
      if ( $(this).attr("data-direction") === "1") {
        $(this).attr("data-direction", "-1");
        $('#sort').trigger("change");
        return
      }
    });

});
