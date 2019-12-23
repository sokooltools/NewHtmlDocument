// =======================================================================================================
// Help.js
// =======================================================================================================
$(document).ready(function() {

	// Add tooltips.
	$("#help_btnScrollToTop").attr('title', "Click to go to the 'Table of Contents' at the top of this page.");
	$("#help_btnShowCommon").prop("title", 'Click to show a help page common to all help pages.');
	$("#help_btnClose").prop("title", "Click to close this help page.");
		
	$("#help_btnShowCommon").text("Go to 'Common' Help");

	$("#help_btnShowCommon").on("click", function() {
		var pA = window.location.pathname.split("/");
		location.href = "common.htm?tok=" + document.title + "&ret=" + pA[pA.length - 1];
		return false;
	});
	
	var pg = getQueryStringByName("tok");
	$("#help_btnGoBack").text("Back to " + pg + "" ).prop("title", "Click to go back to the " + pg + " page.");

	$("#help_btnGoBack").on("click", function() {
		location.href = getQueryStringByName("ret");
	});

	$("#help_Toolbar").on("click", function(e) {
		if (e.ctrlKey)
			showImageNames();
		return false;
	});

	$("#help_btnClose").on("click", function() {
		window.close();
	});

	$("#help_btnScrollToTop, .li2 > a").on("click", function() {
		window.scrollTo(0, 0);
	});

	// -------------------------------------------------------------------------------------------
	// Creates and automatically adds a 'Table of Contents' to the page.
	// -------------------------------------------------------------------------------------------
	(function createTableOfContents() {
		var sel = $("LI.li2 > a");
		sel.attr('title', "Click to go to the top of this page...");
		sel.attr('href', "#");
		var mid = Math.round(sel.length / 2);
		var str = "<table id='help_toc_table'>";
		str += "<caption id='help_toc_caption'>Table of Contents</caption>";
		str += "<tr>";
		str += "<td class='td1'>";
		str += "<ol start='1'>";
		for (var i = 0; i < mid; i++) {
			sel[i].id = "A" + (i + 1);
			if (sel[i].innerHTML != "")
				str += "<li class='li1'><a href='#" + sel[i].id + "'>" + sel[i].innerHTML + "</a></li>";
			else {
				var sec = "Step " + (i + 1);
				str += "<li class='li1'><a href='#" + sel[i].id + "'>" + sec + "</a></li>";
				sel[i].innerHTML = sec;
			}
		}
		str += "</ol>";
		str += "</td>";
		str += "<td class='td1'>";
		str += "<ol start='" + (mid + 1) + "'>";
		for (i = mid; i < sel.length; i++) {
			sel[i].id = "A" + (i + 1);
			if (sel[i].innerHTML != "")
				str += "<li class='li1'><a href='#" + sel[i].id + "'>" + sel[i].innerHTML + "</a></li>";
			else {
				sec = "Step " + (i + 1);
				str += "<li class='li1'><a href='#" + sel[i].id + "'>" + sec + "</a></li>";
				sel[i].innerHTML = sec;
			}
		}
		str += "</ol>";
		str += "</td>";
		str += "</tr>";
		str += "</table>";
		$('#help_toc_table').replaceWith(str);
		sel = $("LI.li1 > a");
		sel.attr('title', "Click to jump directly to this topic on the page...");
		sel.click(function() {
			scrollToElement(this.hash.replace('#',''));
		});
	})();

	// Scroll the selected topic into view adjusting for the header bar.
	function scrollToElement(elId) {
		document.getElementById(elId).scrollIntoView(true);
		if  ($(window).height() + $(window).scrollTop() !== $(document).height())
		{
			$('html, body').animate({
				scrollTop: "-=56"
			}, "fast");
		}
	};
	
	// -------------------------------------------------------------------------------------------
	// Shows the name of each image on the page. (This is for debug and thus executed manually).
	// -------------------------------------------------------------------------------------------
	function showImageNames() {
		if ($("div").hasClass("centered"))
			return;
		const sel1 = $("img");
		const sel2 = $("[src$='.png'],[src$='.jpg']");
		for (let i = 0; i < sel1.length; i++) {
			sel1[i].outerHTML += `<div class='centered'> [${sel2[i].src.substring(sel2[i].src.lastIndexOf("/") + 1)}]</div>`;
		}
		window.console.log(`Now showing ${sel2.length} image names...`);
	};

	$("body").append("<a href='#' title='Click to scroll to the top of this page...' id='hb-gotop' style='display:none;'>Scroll to Top</a>");

	$.fn.scrollToTop = function()
	{
		$(this).hide().removeAttr("href");
		if ($(window).scrollTop() !== "0") {
			$(this).fadeIn("slow");
		}
		var scrollDiv = $(this);
		$(window).scroll(
			function()
			{
				if ($(window).scrollTop() === "0") {
					$(scrollDiv).fadeOut("slow");
				}
				else {
					$(scrollDiv).fadeIn("slow");
				}
			}
		);
		$(this).on("click", 
			function() {
				$("html, body").animate(
				{
					scrollTop: 0
				}, "slow");
			}
		);
	}
	$("#hb-gotop").scrollToTop();

});

// -------------------------------------------------------------------------------------------
// Returns the query string content corresponding to the specified name.
// -------------------------------------------------------------------------------------------
function getQueryStringByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
