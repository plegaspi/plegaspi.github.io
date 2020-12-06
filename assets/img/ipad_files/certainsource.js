window['CertainSourceAT'] = (function(cs) {

	// Server side Options
	cs.server_opts = {
		client: "Newegg",
		siteid: 11334,
		enable: true,	// Enable tracking
  		log: false,	// logging to console,
  		version: "1.1",	// javascript version loaded below
  		domain: "link.newegg.csem2.com", // Domain that all requests should be made to
		emailFormat: "s", // s: sha256, m: md5, e or left blank: plain text
	};	
		
	// If this JS sourced by pacq then load iframe code; otherwise load main api code
	var v = cs.server_opts.version || "1.1";
	var src = "//static.onlinedialog.com/js/at/lib/certainsource.at-" + v + ".min.js";

	// Load main module after setting up server side options
	var d = document;
	var s = d.createElement('script'); s.type = 'text/javascript'; s.async = true;
	s.id = "certainsource-script";
	s.src = src;
	var h = d.getElementsByTagName('head')[0]; h.appendChild(s);

	return cs;

})(window['CertainSourceAT'] || {});
