$(function() {
   var current_date = new Date();

   if (current_date.getMonth() > 9 || current_date.getMonth() < 2 || current_date.getMonth() == 2 && current_date.getDate() < 21 ) {
     $('.date_lock').removeClass('hide');
   } else {
     $('.date_loading').removeClass('hide');
     $.ajax({
        url: 'https://crossorigin.me/http://mazamas.org/activities-events/climbing/',
        //use this to test offline url: 'mazamas_climbs_bak.html',
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
   }

    // Function that renders the list items from our records
    function ulWriter(rowIndex, record, columns, cellWriter) {
      //console.log(record);
      var climb_table_row = '' +
        '<li class="climb_panel panel">' +
          '<h5 class="label_tag">' +
            '<span class="status label ' + record.status_tag + '">' + record.status + '</span>' +
          '</h5>' +
          '<div class="row">' +
            '<div class="small-12 medium-2 columns">' +
              '<h6>Climb Number</h6>' +
              '<h1>' +
                '<strong><span class="climbNumber">' + record.climbNumber + '</span></strong>' +
              '</h1>' +
            '</div>' +
            '<div class="small-6 medium-4 columns">' +
              '<h6>Departing</h6>' +
              '<h3 class="bordered_block">' +
                '<span class="departureDate">' + record.departureDate + '</span>' +
              '</h3>' +
            '</div>' +
            '<div class="small-6 medium-4 large-6 columns end">' +
              '<h6>Returning</h6>' +
              '<h3 class="bordered_block">' +
                '<span class="returnDate">' + record.returnDate + '</span>' +
              '</h3>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="small-6 medium-4 columns">' +
              '<h6>Peak</h6>' +
              '<h3>' +
                '<strong><span class="peak">' + record.peak + '</span></strong>' +
              '</h3>' +
              '<h6>Route</h6>' +
              '<h4>' +
                '<strong><span class="route">' + record.route + '</span></strong>' +
              '</h4>' +
            '</div>' +
            '<div class="small-6 medium-4 columns">' +
              '<h6>Leader</h6>' +
              '<h3>' +
                '<span class="leader">' + record.leader + '</span>' +
              '</h3>' +
              '<h6>Grade</h6>' +
              '<h4>' +
                '<em><span class="grade">' + record.grade + '</span></em>' +
              '</h4>' +
            '</div>' +
            '<div class="small-12 medium-4 large-4 columns end">' +
              '<div class="small-float">' +
                '<h6>Open Spots</h6>' +
                '<h4>' +
                  '<span class="spotsRemaining">' + record.spotsRemaining + '</span>/<span class="partySize">' + record.partySize + '</span>' +
                '</h4>' +
              '</div>' +
              '<div class="small-float">' +
                '<h6>Grad Emphasis</h6>' +
                '<h4>' +
                  '<span class="gradEmphasis">' + record.gradEmphasis + '</span>' +
                '</h4>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="row">' +
            '<div class="small-12 medium-4 columns right">' +
              '<small class="right"><em>Last Updated: <span class="lastUpdate">' + record.lastUpdate + '</span></em></small>' +
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

          record.departureDateMJS = moment($li.find('span.departureDate').html(), 'ddd, DD MMM YYYY').format('MMDDYYYY');
          record.returnDateMJS = moment($li.find('span.returnDate').html(), 'ddd, DD MMM YYYY').format('MMDDYYYY');

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
          var record_substring = record.grade.split("(");
          for (var i = 0; i < queryValue.length; i++) {
             if ( record_substring[0].includes(queryValue[i])) {
               return true
             }
          }
          return false
        };
      })
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions["search-restriction"] = function(record, queryValue) {
          for (var i = 0; i < queryValue.length; i++) {
             if ( record.grade.includes(queryValue[i]) ) {
               return true
             }
          }
          return false
        };
      })
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions["search-weekend"] = function(record, queryValue) {
          var weekends = ["Fri", "Sat", "Sun"];
          for (var i = 0; i < weekends.length; i++) {
             if ( record.departureDate.includes(weekends[i]) ) {
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
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions["search-emphasis"] = function(record, queryValue) {
          for (var i = 0; i < queryValue.length; i++) {
             if ( record.gradEmphasis.includes(queryValue[i]) ) {
               return true
             }
          }
          return false
        };
      })
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions["search-guardian"] = function(record, queryValue) {
          var guardian_peaks = ["Adams", "Hood", "Helens"];
          for (var i = 0; i < guardian_peaks.length; i++) {
             if ( record.peak.includes(guardian_peaks[i]) ) {
               return true
             }
          }
          return false
        };
      })
      .bind('dynatable:init', function(e, dynatable) {
        dynatable.queries.functions["search-sixteen"] = function(record, queryValue) {
          var sixteen_peaks = ["Rainier", "Shasta", "Adams", "Hood", "Baker", "Glacier", "Jefferson", "Sister", "Stuart", "Shuksan", "Helens", "Olympus", "Jack", "Washington"];
          for (var i = 0; i < sixteen_peaks.length; i++) {
             if ( record.peak.includes(sixteen_peaks[i]) ) {
               return true
             }
          }
          return false
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
            queries: $('#search-status, #search'),
            queryEvent: 'blur change keyup'
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
      $('.search-restriction').change( function() {
          var checked_values = [];
          $('.search-restriction').each( function (){
            if ( $(this).is(":checked") ) {
              checked_values.push($(this).val());
            }
          });
          if ( checked_values.length > 0 ) {
            dynatable.queries.add("search-restriction",checked_values);
          } else {
            dynatable.queries.remove("search-restriction");
          }
          dynatable.process();
      });
      $('.search-emphasis').change( function() {
          var checked_values = [];
          $('.search-emphasis').each( function (){
            if ( $(this).is(":checked") ) {
              checked_values.push($(this).val());
            }
          });
          if ( checked_values.length > 0 ) {
            dynatable.queries.add("search-emphasis",checked_values);
          } else {
            dynatable.queries.remove("search-emphasis");
          }
          dynatable.process();
      });
      $('.search-weekend').change( function() {
        if ( $(this).is(":checked") ) {
          dynatable.queries.add("search-weekend", $(this).val());
        } else {
          dynatable.queries.remove("search-weekend");
        }
        dynatable.process();
      });
      $('.search-guardian').change( function() {
        if ( $(this).is(":checked") ) {
          dynatable.queries.add("search-guardian", $(this).val());
        } else {
          dynatable.queries.remove("search-guardian");
        }
        dynatable.process();
      });
      $('.search-sixteen').change( function() {
        if ( $(this).is(":checked") ) {
          dynatable.queries.add("search-sixteen", $(this).val());
        } else {
          dynatable.queries.remove("search-sixteen");
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
      $('#reset-filters').click( function(e) {
        e.preventDefault();
        $('#filter-form')[0].reset();
        $('#search').val('');
        dynatable.queries.remove("search-grade");
        dynatable.queries.remove("search-restriction");
        dynatable.queries.remove("search-emphasis");
        dynatable.queries.remove("search-weekend");
        dynatable.queries.remove("search-guardian");
        dynatable.queries.remove("search-sixteen");
        dynatable.queries.remove("search-status");
        dynatable.process();
      });
    }
});
