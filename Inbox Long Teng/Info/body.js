jQuery(window).load(function(){
	//window.pathnamePrefix = 'me_ss';
	//var pathName = window.location.origin + '/cgi-bin/' + window.pathnamePrefix;

	window.pathnamePrefix = 'cgi-bin/me_ss';
	var pathName = window.location.origin + window.location.pathname + window.pathnamePrefix;

	var vars = getUrlVars()
	if (vars.edit === 'false') {
		jQuery("input").prop("disabled", true);
		setInterval(function(){
			jQuery("select").prop("disabled", true);
		}, 500);
		jQuery("select").change(function(){jQuery(this).prop("disabled", true)})
		jQuery("#frm_form_9_container").hide();
		jQuery("#frm_form_14_container").hide();
		jQuery(".clean_info").hide();
		jQuery(".edit").hide();


	}

	if (vars.tab === 'container') {
		jQuery("div.sow-tabs-tab:nth-child(2)").click()
	}
	if(vars.tab === 'upload'){
		jQuery("div.sow-tabs-tab:nth-child(3)").click()
	}
	jQuery(".duplicate").click(function(){
		duplicateField(jQuery(this).data());
	})


	var coll = document.getElementsByClassName("collapsible");
	var i;

	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function() {
			this.classList.toggle("active");
			jQuery("#collapsible_content2").toggle()
			/*var collapsible_content = this.nextElementSibling;
			if (collapsible_content.style.display === "block") {
				collapsible_content.style.display = "none";
			} else {
				collapsible_content.style.display = "block";
			}*/
		});
	}


	jQuery(".container_file_all").click(function(){

		window.location ="./?page_id=1996&id=" + vars.id;
	});

		jQuery(".delete_all").click(function(){
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": pathName + "/shipment_container_delete_all.py",
				"method": "POST",
				"headers": {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "*/*",
					"Cache-Control": "no-cache",
				},
				"data": {
					"shipment_id": vars.id
				}
			}
			console.log(settings["data"]);
			var r = confirm("Are you sure?, Please confirm deletion. There is no undo!");
			if (r == true) {
				jQuery.ajax(settings).done(function(data_python) {
					console.log( data_python );
				})
				.fail(function(data_python) {
					console.log( data_python );
				})
				.always(function() {
					//location.reload()
					wpDataTables.table_1.DataTable().ajax.reload()
				});
			}
		});




	wpDataTables.table_1.addOnDrawCallback(function(){
		if (vars.edit === 'false') {
			jQuery(".edit").hide();
		}

		jQuery(".container_upload_file").click(function(){
			var data = jQuery(this).data();
			window.location ="./?page_id=1986&id=" + data.shipment_id + "&container=" + data.container_id;
		})


		jQuery(".container_file").click(function(){
			var data = jQuery(this).data();
			window.location ="./?page_id=1996&id=" + data.shipment_id + "&container=" + data.container_id;
		})
		jQuery(".clean_info").click(function(){

			var data = jQuery(this).data();
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": pathName + "/inbox_long_teng_shipment_clear_info.py",
				"method": "POST",
				"headers": {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "*/*",
					"Cache-Control": "no-cache",
				},
				"data": {
					"shipment_id": vars.id
				}
			}
			console.log(settings["data"]);
			var r = confirm("Are you sure?, Please confirm. There is no undo!");
			if (r == true) {
				jQuery.ajax(settings).done(function(data_python) {
					console.log( data_python );
				})
				.fail(function(data_python) {
					console.log( data_python );
				})
				.always(function() {
					//location.reload()
					parent.jQuery.fancybox.getInstance().close()
				});
			}
		})

		jQuery(".delete").click(function(){
			var data = jQuery(this).data();
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": pathName + "/shipment_container_delete.py",
				"method": "POST",
				"headers": {
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "*/*",
					"Cache-Control": "no-cache",
				},
				"data": {
					"shipment_id": data.shipment_id,
					"container_id": data.container_id,
				}
			}
			console.log(settings["data"]);
			var r = confirm("Are you sure?, Please confirm deletion. There is no undo!");
			if (r == true) {
				jQuery.ajax(settings).done(function(data_python) {
					console.log( data_python );
				})
				.fail(function(data_python) {
					console.log( data_python );
				})
				.always(function() {
					//location.reload()
					wpDataTables.table_1.DataTable().ajax.reload()
				});
			}
		});

	})

})
