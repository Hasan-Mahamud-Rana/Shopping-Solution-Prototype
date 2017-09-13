$(".delete").on('click', function() {
	$('.case:checkbox:checked').parents("tr").remove();
	$('.check_all').prop("checked", false); 
	check();
});
var i=$('table tr').length;

$(".addmore").on('click',function(){
	count=$('table tr').length;
	
    var data="<tr><td><input type='checkbox' class='case'/></td>";
    	data+="<td><span id='snum"+i+"'>"+count+".</span></td>";
		data+="<td><input class='form-control autocomplete_txt' type='text' data-type='VareNummer' id='varenummer_"+i+"' name='varenummer[]'/></td>";
    	data+="<td><input class='form-control autocomplete_txt' type='text' data-type='navn' id='navn_"+i+"' name='navn[]'/></td>";
    	data+="<td><input class='form-control autocomplete_txt' type='text' data-type='s' id='s_"+i+"' name='s[]'/></td>";
    	data+="<td><input class='form-control autocomplete_txt' type='text' data-type='m' id='m_"+i+"' name='m[]'/></td>";
		data+="<td><input class='form-control autocomplete_txt' type='text' data-type='l' id='l_"+i+"' name='s[]'/></td>";
    	data+="<td><input class='form-control autocomplete_txt' type='text' data-type='xl' id='xl_"+i+"' name='xl[]'/></td>";
		data+="<td><input class='form-control autocomplete_txt' type='text' data-type='xxl' id='xxl_"+i+"' name='xxl[]'/></td>";
    	data+="<td><input class='form-control autocomplete_txt' type='text' data-type='xxxl' id='xxxl_"+i+"' name='xxxl[]'/></td>";
		data+="<td><input class='form-control autocomplete_txt' type='text' data-type='Indkobspris' id='indkobspris_"+i+"' name='indkobspris[]'/></td>";
		data+="<td><input class='form-control autocomplete_txt' type='text' data-type='Slagspris' id='slagspris_"+i+"' name='slagspris[]'/></td>";
    	data+="<td><input class='form-control' type='text' data-type='Total' id='total_"+i+"' name='total[]'/></td></tr>";
	$('table').append(data);
	row = i ;
	i++;
});
				
function select_all() {
	$('input[class=case]:checkbox').each(function(){ 
		if($('input[class=check_all]:checkbox:checked').length == 0){ 
			$(this).prop("checked", false); 
		} else {
			$(this).prop("checked", true); 
		} 
	});
}

function check(){
	obj=$('table tr').find('span');
	$.each( obj, function( key, value ) {
		id=value.id;
		$('#'+id).html(key+1);
	});
}

var multiple = [
"10055215|Boss Skjorte Blue|0|2|4|4|3|2|95,50|295,50|",
"10055216|Red Shorts|2|2|2|2|2|1|149|450|",
"10055217|Blue Shorts|2|4|3|5|1|6|49|250|",
"10055218|Green Shorts|2|3|6|2|5|1|179|550|",
"10055219|Gray Shorts|1|2|3|3|2|1|91|150|",
];

//autocomplete script
$(document).on('focus','.autocomplete_txt',function(){
	type = $(this).data('type');
	if(type =='VareNummer' )autoTypeNo=0;
	if(type =='navn' )autoTypeNo=1;
	//if(type =='s' )autoTypeNo=2; 
	//if(type =='m' )autoTypeNo=3; 
	//if(type =='l' )autoTypeNo=4; 
	//if(type =='xl' )autoTypeNo=5; 
	//if(type =='xxl' )autoTypeNo=6; 
	//if(type =='xxxl' )autoTypeNo=7;
	if(type =='Indkobspris' )autoTypeNo=8; 
	if(type =='Slagspris' )autoTypeNo=9; 	
	$(this).autocomplete({
       minLength: 0,
       source: function( request, response ) {
           var array = $.map(multiple, function (item) {
               var code = item.split("|");
               return {
                   label: code[autoTypeNo],
                   value: code[autoTypeNo],
                   data : item
               }
           });
           //call the filter here
           response($.ui.autocomplete.filter(array, request.term));
       },
       focus: function() {
      	 // prevent value inserted on focus
      	 return false;
       },
       select: function( event, ui ) {
         var names = ui.item.data.split("|");						
   		 id_arr = $(this).attr('id');
   		 id = id_arr.split("_");
   		 elementId = id[id.length-1];
		 $('#varenummer_'+elementId).val(names[0]);
   		 $('#navn_'+elementId).val(names[1]);
   		 $('#s_'+elementId).val(names[2]);
   		 $('#m_'+elementId).val(names[3]);
   		 $('#l_'+elementId).val(names[4]);
		 $('#xl_'+elementId).val(names[5]);
		 $('#xxl_'+elementId).val(names[6]);
		 $('#xxxl_'+elementId).val(names[7]);
		 $('#indkobspris_'+elementId).val(names[8]);
		 $('#slagspris_'+elementId).val(names[9]);
		  var sNumberValue = $('#s_'+elementId).val();
		 // alert(sNumberValue);
          var mNumberValue = $('#m_'+elementId).val();
		  var lNumberValue = $('#l_'+elementId).val();
		  var xlNumberValue = $('#xl_'+elementId).val();
		  var xxlNumberValue = $('#xxl_'+elementId).val();
		  var xxxlNumberValue = $('#xxxl_'+elementId).val();
		  var indkobsprisNumberValue = $('#indkobspris_'+elementId).val();
		  var sum = parseInt(sNumberValue) + parseInt(mNumberValue) + parseInt(lNumberValue) + parseInt(xlNumberValue) + parseInt(xlNumberValue) + parseInt(xxlNumberValue);
			//alert(sum);
			var ttl= sum * parseInt(indkobsprisNumberValue);
			//alert(ttl);
		$('#total_'+elementId).val(ttl);
       }
   });
	 
	 $.ui.autocomplete.filter = function (array, term) {
        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
        return $.grep(array, function (value) {
            return matcher.test(value.label || value.value || value);
        });
	 };
});