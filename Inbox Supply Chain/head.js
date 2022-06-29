var fixed = function (){
	var oTable = wpDataTables.table_1.dataTable();
	var setinggs = oTable.dataTableSettings[0];
	setinggs.fixedHeader = {
            header: true,
            footer: true
        }
	setinggs.pageLength=50
	oTable.DataTable().destroy()
	jQuery("#table_1").DataTable(setinggs);
}

//var equivalencias = {'01-shipmen4t':'01-Shipment'}

var tooltip = function (){
	/*var oTable = wpDataTables.table_1.dataTable();
	var setinggs = oTable.dataTableSettings[0];
	setinggs.pageLength=1000;

	oTable.DataTable().destroy();
	*/

	//var ooTable = wpDataTables.table_1.DataTable(setinggs);
	jQuery('#table_1').on('mousemove', 'td', function(e) {
		var target_class = e.currentTarget.className;
		//console.log(target_class);
		if (target_class.includes("ship-info") || target_class.includes("re-entry") || target_class.includes("change_qty") || target_class.includes("file") || target_class.includes("arrived") || target_class.includes("history") || target_class.includes("delete")) {
			console.log(true);
		}
		else {
			var rowData = e.currentTarget.innerText
			//console.log(rowData.length);
			if (rowData.length > 5) {
				jQuery("#tooltip").text(rowData).animate({ left: e.pageX - 50, top: e.pageY - 50 }, 1);
				if (!jQuery("#tooltip").is(':visible')) jQuery("#tooltip").show();
			}
			else {
				jQuery("#tooltip").hide();
			}

		}
	})
	jQuery('#table_1').on('mouseleave', function(e) {
		jQuery("#tooltip").hide()
	})
}

var dttt_button_add = function (){
	jQuery(".buttons-print").addClass('DTTT_button DTTT_button_print');
	jQuery(".buttons-copy").addClass('DTTT_button DTTT_button_copy');
	jQuery(".buttons-csv").addClass('DTTT_button DTTT_button_csv');
	jQuery(".buttons-excel").addClass('DTTT_button DTTT_button_xls');
}

var sticky_header = function (){
    jQuery('.wdtheader').each(function(i, obj) {
        obj.classList.add('sticky_header');
    });
}

var sticky_filter = function (){
    jQuery(jQuery('#table_1 tr')[1].children).each(function(i, obj) {
        obj.classList.add('sticky_filter');
    });
}

//Filter
var save_filter = function (){
	jQuery(jQuery('#table_1 tr')[1].children).each(function(i, obj) {
		var valor = jQuery(obj).children().children().val();
		var column_name = '';
		obj.classList.forEach(function(value){
			if (value.search('column-') != -1){
				column_name = value.split('column-')[1];
				//console.log(value);
			}
		})

		if (valor && valor !== ''){
			console.log('column_name: ' + column_name + ' valor: ' + valor);
			localStorage.setItem(column_name, valor);
		} else {
			console.log('column_name: ' + column_name + ' valor: ' + '');
			localStorage.setItem(column_name, '');
		}
	})
}

var get_filter = function (){
	console.log('get filter');
	jQuery(jQuery('#table_1 tr')[1].children).each(function(i, obj) {
		var valor = '';
		var column_name = '';
		obj.classList.forEach(function(value){
			if (value.search('column-') != -1){
				column_name = value.split('column-')[1];
				//console.log(value);

				try {
					valor = localStorage.getItem(column_name);
				} catch (e) {
					console.log(e);
				}

				if (valor && valor !== ''){
					console.log(column_name);
					console.log('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +'.sticky_filter > span > input')
					//jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +'.sticky_filter > span > input').val(valor);
					//jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +'.sticky_filter > span > input').keyup();
					jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +' > span > input').val(valor);
					jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +' > span > input').keyup();


				}

			}
		})

	})
}
