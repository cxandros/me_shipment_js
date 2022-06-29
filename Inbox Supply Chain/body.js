var user;
var id_user;

/*
jQuery(document).ready(function (){
	var oTable = wpDataTables.table_1.dataTable();
	var setinggs = oTable.dataTableSettings[0];
	setinggs.fixedHeader = {
            header: true,
            footer: true
        }
	setinggs.pageLength=50
	oTable.DataTable().destroy()
	jQuery("#table_1").DataTable(setinggs);
})
*/
jQuery(window).load(function(){

	//Filter
	if(!window.filtros_cargados){
		//wpDataTables.table_1.addOnDrawCallback(get_filter);

		setTimeout(get_filter, 500);
		setTimeout(sticky_filter, 500);

		//get_filter();
		window.filtros_cargados = true;
		//wpDataTables.table_1.DataTable().ajax.reload();
	}
	setTimeout(function (){
		jQuery( jQuery('#table_1 tr')[1] ).change(function() {
			save_filter();
		});
	}, 500);



	tooltip();
	//fixed();
	dttt_button_add();
	//sticky_header();
	//sticky_filter();

	/*
	// When the user scrolls the page, execute myFunction
	window.onscroll = function() {myFunction()};

	// Get the header
	var header = document.getElementById("myHeader");

	// Get the offset position of the navbar
	var sticky = header.offsetTop;

	// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
	function myFunction() {
		if (window.pageYOffset > sticky) {
			header.classList.add("sticky");
		} else {
			header.classList.remove("sticky");
		}
	}
	*/



	//window.pathnamePrefix = 'me_ss';
	//var pathName = window.location.origin + '/cgi-bin/' + window.pathnamePrefix;

	window.pathnamePrefix = 'cgi-bin/me_ss';
	var pathName = window.location.origin + window.location.pathname + window.pathnamePrefix;

	//jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-05-dc > span > input').val();
	//jQuery("#table_1 > thead > tr:nth-child(2) > th.sort.column-customer > span > input").keyup();

	jQuery(jQuery(".dt-buttons")[0]).appendTo(jQuery(".clear")[0]); //baja los botones de export

	jQuery(".archive").click(function(){
		a = jQuery(this);
		id = a.data()['id'];
		id_user = a.data()['current_user'];
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/inbox_supply_chain_archive.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"id": id,
				"id_user": id_user
			}
		}
		console.log(settings["data"]);
		jQuery.ajax(settings).done(function(python_data) {
			console.log( python_data );
		})
		.fail(function(python_data) {
			console.log( python_data );
		})
		.always(function() {
			location.reload()
		});
	});


	jQuery(".re_entry").click(function(){
		a = jQuery(this);
		id_user = a.data()['current_user'];
		console.log('id_user: ' + id_user);
		id = a.data()['id'];
		qty_approved = a.data()['qty_approved'];
		var qty = prompt("Please enter new Qty",qty_approved);
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/inbox_supply_chain_reentry.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"id": id,
				"qty_approved": qty,
				"id_user": id_user
			}
		}
		console.log(settings["data"]);
		jQuery.ajax(settings).done(function(python_data) {
			console.log( python_data );
		})
		.fail(function(python_data) {
			console.log( python_data );
		})
		.always(function() {
			location.reload()
		});
	});


	jQuery(".arrived").click(function(){
		user = jQuery(this);
		id_user = user.data()['current_user'];
		var id = this.value.split('-')[0];
		console.log(id);

		jQuery('.shipment_id input').val(id);


		jQuery.fancybox.open({
			src  : '#hidden-content',
			type : 'inline',
			opts : {
				afterShow : function( instance, current ) {
					console.info( 'done!' );
				}
			}
		});

		/*
		user = jQuery(this);
		id_user = user.data()['current_user'];
		var id = this.value.split('-')[0];
		*/

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/inbox_supply_chain_arrived.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"id": id,
				"estado": "arrived",
				"id_user": id_user
			}
		}
		/*
		console.log(settings["data"]);
		jQuery.ajax(settings).done(function(python_data) {
			console.log( python_data );
		})
		.fail(function(python_data) {
			console.log( python_data );
		})
		.always(function() {
			location.reload()
		});
		*/
	});



	jQuery(".history").click(function(){
		var data = jQuery(this).data();

		window.location ="./?page_id=630&wdt_column_filter[id_shipment]=" + data.id
	})


	jQuery(".delete").click(function(){
		var a = jQuery(this);
		var id = a.data()['id'];
		console.log(id)
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/shipment_delete.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"id": id
			}
		}
		console.log(settings["data"]);
		var r = confirm("Are you sure?, Please confirm deletion. There is no undo!");
		if (r == true) {
			jQuery.ajax(settings).done(function(python_data) {
				console.log( python_data );
			})
			.fail(function(python_data) {
				console.log( python_data );
			})
			.always(function() {
				location.reload()
			});
		}
	});


	jQuery(".change_qty").click(function(){
		var a = jQuery(this);
		var id_user = a.data()['current_user'];
		console.log('id_user: ' + id_user);
		var id = a.data()['id'];
		var qty = prompt("Please enter new Qty");
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": pathName + "/inbox_supply_chain_reentry.py",
			"method": "POST",
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*",
				"Cache-Control": "no-cache",
			},
			"data": {
				"id": id,
				"qty_approved": qty,
				"id_user": id_user
			}
		}
		console.log(settings["data"]);
		jQuery.ajax(settings).done(function(python_data) {
			console.log( python_data );
		})
		.fail(function(python_data) {
			console.log( python_data );
		})
		.always(function() {
			window.location.reload()
		});
	});


	try {

		jQuery(".lt_info_button_group").click(function(){
			window.query = '';
			jQuery(jQuery('#table_1 tr')[1].children).each(function(i, obj) {
				var valor = jQuery(obj).children().children().val();
				var column_name = '';
				obj.classList.forEach(function(value){
					if (value.search('column-') != -1){
						column_name = value.split('column-')[1];
						//console.log(value);
					}
				})
				//var columna = equivalencias[jQuery(obj)[0].className.split(' ')[1].split('column-')[1]]? equivalencias[jQuery(obj)[0].className.split(' ')[1].split('column-')[1]]: jQuery(obj)[0].className.split(' ')[1].split('column-')[1]
				if (valor && valor !== '')
				query +='&wdt_column_filter[' + column_name + ']=' + valor
			})

			var a = jQuery(this);
			console.log(a.data());
			var src = window.location.origin + window.location.pathname + "/" + URLLtInfo? URLLtInfo: "";
			src = src + "&id=" + a.data().shipment_id;
			src = src + "&country=" + a.data().country;
			src = src + "&qty=" + a.data().qty;
			src = src + "&etd=" + a.data().etd;
			src = src + "&eta=" + a.data().eta;
			src = src + "&port=" + a.data().port;
			src = src + "&dc=" + a.data().dc;
			src = src + "&shipment=" + a.data().shipment;
			src = src + "&bol=" + a.data().bol;
			src = src + "&booking=" + a.data().booking;
			src = src + "&carrier=" + a.data().carrier;
			src = src + "&vessel_name=" + a.data().vessel_name;
			src = src + "&elecmetal_po=" + a.data().elecmetal_po;
			src = src + "&tracking_docs=" + a.data().tracking_docs;
			src = src + "&container_description=" + a.data().container_description;
			src = src + '&wdt_column_filter[shipment_id]=' + a.data().shipment_id;

			jQuery.fancybox.open({
				src  : encodeURI(src),
				type : 'iframe',
				opts : {
					afterShow : function( instance, current ) {
						console.info( 'done!' );
					},
					iframe : {
						preload : false
					},
					afterClose: function () { // USE THIS IT IS YOUR ANSWER THE KEY WORD IS "afterClose"
						parent.location.reload(true);
						//var src_supply = parent.location.origin + parent.location.pathname + parent.location.search.split("&")[0] + parent.window.query
						//var src_supply = parent.location.href + '&wdt_column_filter[shipment_id]=' + a.data().shipment_id;
						//window.location = src_supply;

					}
				}
			});
		})
		} catch (e) {
	}

});
