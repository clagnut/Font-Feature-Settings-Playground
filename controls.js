$(document).ready(
function() {
	// dim controls
	$('#controls, #output').addClass("dimmed");
	
	// hide controls and set heading images to closed
	$('.group, #font, #otherfont').hide();
	$('#controls h3').addClass("closed");
	
	// show typeface selector by default
	$('#typefacegroup').toggleClass("closed");
	$('#typefacegroup').next(".group").slideToggle("medium");
	
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
    if ((typefaceSelect.selectedIndex + 1) == typefaceSelect.options.length) {
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