$(function() {
   // this works, but lets not spam the mazamas server for now
   $.ajax({
      url: 'http://crossorigin.me/http://mazamas.org/activities-events/climbing/',
      type: 'GET',
      success: function(res) {
          var record = {};
          $(res).find('#climb-schedule tbody tr').each( function (){
            record.details = $(this).find('td:nth-child(1)').html();
            record.climbNumber = $(this).find('td:nth-child(2)').html();
            record.departureDate = $(this).find('td:nth-child(3)').html();
            record.returnDate = $(this).find('td:nth-child(4)').html();
            record.peak = $(this).find('td:nth-child(5)').html();
            record.route = $(this).find('td:nth-child(6)').html();
            record.grade = $(this).find('td:nth-child(7)').html();
            record.leader = $(this).find('td:nth-child(8)').html();
            record.gradEmphasis = $(this).find('td:nth-child(9)').html();
            record.partySize = $(this).find('td:nth-child(10)').html();
            record.spotsRemaining = $(this).find('td:nth-child(11)').html();
            record.status = $(this).find('td:nth-child(12)').html();
            record.lastUpdate = $(this).find('td:nth-child(13)').html();
            var climb_table_row = '<li class="climb_panel panel">' +
                  '<span class="details">' + record.details + '</span>' +
                  '<span class="climbNumber">' + record.climbNumber + '</span>' +
                  '<span class="departureDate">' + record.departureDate + '</span>' +
                  '<span class="returnDate">' + record.returnDate + '</span>' +
                  '<span class="peak">' + record.peak + '</span>' +
                  '<span class="route">' + record.route + '</span>' +
                  '<span class="grade">' + record.grade + '</span>' +
                  '<span class="leader">' + record.leader + '</span>' +
                  '<span class="gradEmphasis">' + record.gradEmphasis + '</span>' +
                  '<span class="partySize">' + record.partySize + '</span>' +
                  '<span class="spotsRemaining">' + record.spotsRemaining + '</span>' +
                  '<span class="status">' + record.status + '</span>' +
                  '<span class="lastUpdate">' + record.lastUpdate + '</span>' +
                 '</li>';
            $("#mazama_climb_load").append(climb_table_row);
          });
          loadTable();
        }
      });


    // Function that renders the list items from our records
    function ulWriter(rowIndex, record, columns, cellWriter) {
      //console.log(record);
      var climb_table_row = '' +
        '<li class="climb_panel panel">' +
          '<div class="row">' +
            '<div class="small-2 columns">' +
              '<h6>Climb Number</h6>' +
              '<h1>' +
                '<strong><span class="climbNumber">' + record.climbNumber + '</span></strong>' +
              '</h1>' +
            '</div>' +
            '<div class="small-4 columns">' +
              '<h6>Departing</h6>' +
              '<h3 class="bordered_block">' +
                '<span class="departureDate">' + record.departureDate + '</span>' +
              '</h3>' +
            '</div>' +
            '<div class="small-6 columns end">' +
              '<h5 class="label_tag">' +
                '<span class="status label ' + record.status_tag + '">' + record.status + '</span>' +
              '</h5>' +
              '<h6>Returning</h6>' +
              '<h3 class="bordered_block">' +
                '<span class="returnDate">' + record.returnDate + '</span>' +
              '</h3>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="small-5 columns">' +
              '<h6>Peak</h6>' +
              '<h3>' +
                '<strong><span class="peak">' + record.peak + '</span></strong>' +
              '</h3>' +
              '<h6>Route</h6>' +
              '<h4>' +
                '<strong><span class="route">' + record.route + '</span></strong>' +
              '</h4>' +
            '</div>' +
            '<div class="small-5 columns">' +
              '<h6>Leader</h6>' +
              '<h3>' +
                '<span class="leader">' + record.leader + '</span>' +
              '</h3>' +
              '<h6>Grade</h6>' +
              '<h4>' +
                '<em><span class="grade">' + record.grade + '</span></em>' +
              '</h4>' +
            '</div>' +
            '<div class="small-2 columns">' +
              '<h6>Open Spots</h6>' +
              '<h4>' +
                '<span class="spotsRemaining">' + record.spotsRemaining + '</span>/<span class="partySize">' + record.partySize + '</span>' +
              '</h4>' +
              '<h6>Grad Emphasis</h6>' +
              '<h4>' +
                '<span class="gradEmphasis">' + record.gradEmphasis + '</span>' +
              '</h4>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="small-4 columns right">' +
              '<small class="right">Last Updated:<span class="lastUpdate">' + record.lastUpdate + '</span></small>' +
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

          if ( $li.find('span.status').html() == "Full" ) {
            record.status_tag = "alert";
          }
          if ( $li.find('span.status').html() == "Cancelled" ) {
            record.status_tag = "warning";
          }
          if ( $li.find('span.status').html() == "Open" ) {
            record.status_tag = "success";
          }
          record.lastUpdate = $li.find('span.lastUpdate').html();
    }

    function loadTable() {
      var dynatable = $('#mazama_climb_load')
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
    }


});
