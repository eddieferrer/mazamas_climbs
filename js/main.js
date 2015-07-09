$(function() {
    var thead = '<tr>' +
            '<th>' + 'Climb' + '</th>' +
            '<th>' + 'Leave' + '</th>' +
            '<th>' + 'Return' + '</th>' +
            '<th>' + 'Peak' + '</th>' +
            '<th>' + 'Route' + '</th>' +
            '<th>' + 'grade' + '</th>' +
            '<th>' + 'Leader' + '</th>' +
            '<th>' + 'gradEmphasis' + '</th>' +
            '<th>' + 'partySize' + '</th>' +
            '<th>' + 'Spots' + '</th>' +
            '<th>' + 'Status' + '</th>' +
            '<th>' + 'Updated' + '</th>' +
            '<th>' + 'details' + '</th>' +
          '</tr>';

    $('#mazama_climb_load').find('thead').html(thead);

    // Function that renders the list items from our records
    function ulWriter(rowIndex, record, columns, cellWriter) {
      var tr;
      tr = '<tr>' +
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
            '<td>' + record.details + '</td>' +
           '</tr>';
      if ( rowIndex > 0 ) {
          return tr;
      }
    }

    // Function that creates our records from the DOM when the page is loaded
    function ulReader(index, li, record) {
      console.log(record);
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

    $('#mazama_climb_load').dynatable({
     table: {
       headRowSelector: 'thead tr',
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
     }
    });
});
