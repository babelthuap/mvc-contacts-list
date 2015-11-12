'use strict';

$(document).ready(function() {

  let FIELDS = ['Name', 'Email', 'Phone', 'Twitter', 'Group'];
  let $list = $('#list');
  let $editing;

  $('#add').click(add);
  $('#new input').on('keypress', e => {
    if (e.keyCode === 13) {
      add();
      $('#Name').focus();
    }
  })

  $list.on('click', '.remove', remove);
  $list.on('click', '.edit', edit);


  function add() {
    if ($('#Name').val()) {
      let info = {};
      fields.forEach(field => {
        info[field] = $(`input#${field}`).val();
      });

      $.post('/contacts', {contact: info})
      .done(addRow(info))
      .fail(err => console.log("ERROR ADDING CONTACT:", err));
    }
  }

  function addRow(info) {
    let keys = Object.keys(info);
    let $row = $('<tr>');
    keys.forEach(key => {
      $row.append( $('<td>').text(info[key]) );
    });

    let $edit = $('<button>').addClass('edit')
      .append( $('<i>').addClass("fa fa-pencil-square-o") )
      .attr('data-toggle', 'modal')
      .attr('data-target', '#myModal')
    let $remove = $('<button>').addClass('remove')
      .append( $('<i>').addClass("fa fa-times") );
    $row.append( $('<td>').append([$edit, $remove]) );

    $list.append($row);
  }

  function remove() {
    let $contact = $(this).closest('tr');
    console.log('remove!', $contact);
    console.log('hash:', hashContact($contact));

    $.ajax({
      method: 'DELETE',
      url: '/contacts',
      data: {hash: hashContact($contact)}
    })
    .done(() => $contact.remove())
    .fail(err => console.log("ERROR DELETING CONTACT:", err));
  }

  function edit() {
    let $update = $('#update');
    $update.off('click');

    $editing = $(this).closest('tr');
    $('#editName').text( $editing.find(':first-child').text() );

    FIELDS.forEach((field, i) => {
      let current = $editing.find(`td:nth-of-type(${i + 1})`).text();
      $(`#modal${field}`).val(current);
    });

    $update;



  }

  function hashContact($contact) {
    let data = '';
    $contact.find('td:not(:last-child)').each((_, td) => {
      data += '%' + td.innerHTML;
    });
    return md5(data);
  }

});
