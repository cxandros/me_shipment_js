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
					jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +'.sticky_filter > span > input').val(valor);
					jQuery('#table_1 > thead > tr:nth-child(2) > th.sort.column-'+ column_name +'.sticky_filter > span > input').keyup();
				}

			}
		})

	})
}

var bl

jQuery(window).load(function(){
	//window.pathnamePrefix = 'me_ss';
	//var pathName = window.location.origin + '/cgi-bin/' + window.pathnamePrefix;

	window.pathnamePrefix = 'cgi-bin/me_ss';
	var pathName = window.location.origin + window.location.pathname + window.pathnamePrefix;
	setTimeout(function (){

	wpDataTables.table_1.addOnDrawCallback(
		function(){
			jQuery(".bl").click(function(){
				jQuery.post( pathName + "/inbox_long_teng_bl.py",
							{
								id: this.value
							},
							function(data,status){
								alert("Data: " + data + "\nStatus: " + status);
							});
			});
		})
	},500);
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
