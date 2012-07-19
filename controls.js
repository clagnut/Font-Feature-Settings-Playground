$(document).ready(
function() {
	// dim controls
	$('#controls, #output').addClass("dimmed");
	
	// hide controls and set heading images to closed
	$('.group, #font, #otherfont').hide();
	$('#controls h3').addClass("closed");
	
	// show typeface selector by default
	$('#typefacegroup, #projectgroup').toggleClass("closed");
	$('#typefacegroup, #projectgroup').next(".group").show();
	
	// show/hide control group
	$('#controls h3').click(
		function() {
			$(this).toggleClass("closed");
			$(this).next(".group").slideToggle("fast");
		}
	);
	
	// update changes
	$("#inputForm").change(
		function() {
			refreshFeatures();
		}
	)
	$("#reset").click(
		function() {
			window.location.reload();
		}
	)
	refreshFont();
	refreshFeatures();
})

var defaultOff = [
  'smcp', 'c2sc',
  'lnum', 'onum', 'tnum', 'pnum',
  'frac', 'afrc',
  'zero', 'nalt',
  'kern',
  'liga', 'dlig', 'hlig', 'clig',
  'swsh', 'calt', 'hist',
  'ss01', 'ss02', 'ss03', 'ss04', 'ss05',
];

var defaultOn = [ 'liga', 'kern' ];

function refreshFeatures() {

  var mfeatures = "";
  var wfeatures = "";
  var f;
  for (f in defaultOn) {
    if (!document.getElementById(defaultOn[f]).checked) { mfeatures += defaultOn[f] + "=0, "; }
    if (!document.getElementById(defaultOn[f]).checked) { wfeatures += "&quot;" + defaultOn[f] + "&quot; 0, "; }
  }
  for (f in defaultOff) {
    if (document.getElementById(defaultOff[f]).checked) { mfeatures += defaultOff[f] + "=1, "; }
    if (document.getElementById(defaultOff[f]).checked) { wfeatures += "&quot;" + defaultOff[f] + "&quot; 1, "; }
  }
  mfeatures = mfeatures.substring(0, mfeatures.length - 2);
  wfeatures = wfeatures.substring(0, wfeatures.length - 2);
  document.getElementById("mozfeatures").innerHTML = mfeatures;
  document.getElementById("mozfeatures13").innerHTML = wfeatures;
  document.getElementById("msfeatures").innerHTML = wfeatures;
  document.getElementById("ofeatures").innerHTML = wfeatures;
  document.getElementById("webkitfeatures").innerHTML = wfeatures;
  document.getElementById("w3cfeatures").innerHTML = wfeatures;

  refreshSample();

};

function refreshSample() {

  var sample = document.getElementById("sampleText");

  italic = document.getElementById("italic").checked ? "italic" : "";
  italicfamily = italic ? "'" + document.getElementById("font").value+" Italic', " : "";
  fontFamily = italicfamily + "'"+document.getElementById("font").value+"'";
  sample.style.fontFamily = fontFamily + ", sans-serif";
  sample.style.fontStyle = italic;

  var mfeatures = document.getElementById("mozfeatures").innerHTML;
  sample.style.MozFontFeatureSettings = "'" + mfeatures + "'";
  var wfeatures = document.getElementById("webkitfeatures").innerHTML;
  document.getElementById("w3cfeatures").innerHTML = wfeatures;
  sample.style.msFontFeatureSettings = wfeatures;
  sample.style.oFontFeatureSettings = wfeatures;
  sample.style.WebkitFontFeatureSettings = wfeatures;
  sample.style.FontFeatureSettings = wfeatures;

};

function refreshFont() {
    var typefaceSelect = document.getElementById("typeface");
    if ((typefaceSelect.selectedIndex) == 0) {
        $('#otherfont').show();
    } else {
        $('#otherfont').hide();    
        document.getElementById("font").value = typefaceSelect.value;  
    }
}

function refreshOther() {    
    document.getElementById("font").value = document.getElementById("otherfont").value;
    refreshSample();
}

function getFamilies() {
	var all_styles = document.getElementsByTagName('style');
	var fontdeck_style = all_styles[0];
	var style_rules = fontdeck_style.childNodes[0].nodeValue;
	var style_rules_ar = style_rules.split("font-family:'");
	var families = new Array();
    
	for (var i = 1; i < style_rules_ar.length; i++) {
		families[i-1] = style_rules_ar[i].split("'")[0];
    } 
    
    return families;  
}

function initFamilies() {
	var families = getFamilies();
	var typeface_select = document.getElementById("typeface");
	for (var i = 0; i < families.length; i++) {
		var option = document.createElement("option");
		var family = document.createTextNode(families[i]);
		option.appendChild(family);
		option.setAttribute("value", families[i]);
		typeface_select.appendChild(option);
    }
}

window.onload = initFamilies;