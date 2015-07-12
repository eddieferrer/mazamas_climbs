$(function() {

    // Function that renders the list items from our records
    function ulWriter(rowIndex, record, columns, cellWriter) {
      // console.log(record);
      var climb_block;
      climb_block = '<tr class="panel">' +
            '<td>' + record.details + '</td>' +
            '<td>' + record.climbNumber + '</td>' +
            '<td>' + record.departureDate + '</td>' +
            '<td>' + record.returnDate + '</td>' +
            '<td>' + record.peak + '</td>' +
            '<td>' + record.route + '</td>' +
            '<td>' + record.grade + '</td>' +
            '<td>' + record.leader + '</td>' +
            '<td>' + record.gradEmphasis + '</td>' +
            '<td>' + record.partySize + '</td>' +
            '<td>' + record.spotsRemaining + '</td>' +
            '<td>' + record.status + '</td>' +
            '<td>' + record.lastUpdate + '</td>' +
           '</tr>';
      if ( rowIndex > 0 ) {
          return climb_block;
      }
    }

    // Function that creates our records from the DOM when the page is loaded
    function ulReader(index, li, record) {
      // console.log(record);
      var $li = $(li);
          record.details = $li.find('td:nth-child(1)').html();
          record.climbNumber = $li.find('td:nth-child(2)').html();
          record.departureDate = $li.find('td:nth-child(3)').html();
          record.returnDate = $li.find('td:nth-child(4)').html();
          record.peak = $li.find('td:nth-child(5)').html();
          record.route = $li.find('td:nth-child(6)').html();
          record.grade = $li.find('td:nth-child(7)').html();
          record.leader = $li.find('td:nth-child(8)').html();
          record.gradEmphasis = $li.find('td:nth-child(9)').html();
          record.partySize = $li.find('td:nth-child(10)').html();
          record.spotsRemaining = $li.find('td:nth-child(11)').html();
          record.status = $li.find('td:nth-child(12)').html();
          record.lastUpdate = $li.find('td:nth-child(13)').html();
    }

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
    .dynatable({
        features: {
            paginate: true,
            recordCount: true,
            search: false,
            perPageSelect: false,
            pushState: false
        },
        table: {
            bodyRowSelector: 'tbody tr'
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
