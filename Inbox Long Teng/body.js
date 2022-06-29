var user;
var id_user;

jQuery(window).load(function(){
	sticky_header();
	sticky_filter();

	//Filter
	if(!window.filtros_cargados){
		get_filter();
		window.filtros_cargados = true;

		wpDataTables.table_1.DataTable().ajax.reload();
	}

	jQuery( jQuery('#table_1 tr')[1] ).change(function() {
		save_filter();
	});

	//window.pathnamePrefix = 'me_ss';
	//var pathName = window.location.origin + '/cgi-bin/' + window.pathnamePrefix;

	window.pathnamePrefix = 'cgi-bin/me_ss';
	var pathName = window.location.origin + window.location.pathname + window.pathnamePrefix;

  wpDataTables.table_1.addOnDrawCallback(function(){

	  jQuery(".split").click (function (){
		  var id = jQuery(this).data()['id'];
		  var qty_shiped = parseFloat (jQuery(this).data()['qty_shiped']);
		  var qty = prompt("Enter QTY", 0);
		  /*if (String(qty)%1 !== 0) {
			  window.alert('invalid value')
			  return
		  }*/

		  qty = qty.replace(/\s+/g,"");

		  if (!isNumber(qty)) {
			  window.alert('Invalid value')
			  return
		  }

		  if (qty <= 0) {
			  window.alert('Invalid value')
			  return
		  }

		  if (qty_shiped <= qty) {
			  alert ('qty shiped <= qty')
			  return;
		  }
		  var data = {
			  "shipment_id": id,
			  "new_qty": String(qty)
		  }

		  var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": pathName + "/inbox_long_teng_child_shipment.py",
		  "method": "POST",
		  "headers": {
			  "Content-Type": "application/x-www-form-urlencoded",
			  "Accept": "*/*",
			  "Cache-Control": "no-cache",
		  },
		  "data": data
	  }
	  jQuery.ajax(settings).done(function(python_response) {
		  console.log( python_response );
	  })
	  .fail(function(python_response) {
		  console.log( python_response );
	  })
	  .always(function() {
		  location.reload()
		  //wpDataTables.table_1.DataTable().ajax.reload()
	  });
	  });


	  jQuery(".lt_reset_button").click(function(){
		var a = jQuery(this);
		var id = a.data()['shipment_id'];
		//var id = '1';
		console.log(id)
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/inbox_long_teng_delete_childs.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"shipment_id": id
			}
		}
		console.log(settings["data"]);
		var r = confirm("Are you sure?, Please confirm deletion. There is no undo!");
		if (r == true) {
			jQuery.ajax(settings).done(function(python_response) {
				console.log( python_response );
			})
			.fail(function(python_response) {
				console.log( python_response );
			})
			.always(function() {
				//location.reload()
				wpDataTables.table_1.DataTable().ajax.reload()
			});
		}
	});

  })
})
