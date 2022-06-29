function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

var varso = getUrlVars()

if (typeof(varso.qty) != 'undefined') {
	localStorage.setItem("querystring", window.location.search);
} else {
	var querystring = localStorage.getItem("querystring");
	window.location = window.location.origin + window.location.pathname + querystring +'&tab=' + varso.tab
}

function duplicateField (fields) {
	jQuery("#field_bf9jp").val(fields.description);
	//jQuery("#field_b4cbo").val(fields.containern);
	jQuery("#field_osxl5").val(fields.mepartn);
	jQuery("#field_rvpmg").val(fields.netweightmt);
	jQuery("#field_n13gn").val(fields.netweightkg);
}
