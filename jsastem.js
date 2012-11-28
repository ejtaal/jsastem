
/*
	Project: JavaScript Arabic Stemmer
	Name: jsastem.js
	Desc: This is a javascript port of the IRSI stemmer as part of the
		NLTK toolkit which is written in python.
	URL: https://github.com/ejtaal/jsastem
	License: GPL
	Copyright: Erik Taal <ejtaal@gmail.com> ((http://ejtaal.net)

	How to use: Simply include jsastem.js and call the jsastem() function
		with a single string as an argument. A string containing the root
		should be returned. Please note that in future versions this may become
		an array of possible roots...
*/

/*
Load data:

suffixes
prefixes
regexes
known_roots
?

*/

function jsastem( input) {
	var showdebug = 1;
	var stem = input;
	var candidate_roots = [];
	// Stemming step 1. Strip diacritics
	var stem = XRegExp.replace( stem, XRegExp('\\p{M}', 'g'), '');
	if ( showdebug == 1) debug( 'step 1. : ' + input + ' -> ' + stem);
	// Stemming step 2. remove length three and length two prefixes/suffixes in this order
	if (stem.length >= 6) { stem = stem.replace( /^(كال|بال|ولل|وال)(.*)$/i, "$2"); }
	if (stem.length >= 5) { stem = stem.replace( /^(ال|لل)(.*)$/i, "$2"); }
	if ( showdebug == 1) debug( 'step 2. : ' + stem);
	// Stemming step 3. remove length three and length two suffixes in this order
	if (stem.length >= 6) { stem = stem.replace( /^(.*)(تما|هما|تان|تين|كما)$/i, "$1"); }
	if (stem.length >= 5) { stem = stem.replace( /^(.*)(ون|ات|ان|ين|تن|كم|هن|نا|يا|ها|تم|كن|ني|وا|ما|هم)$/i, "$1"); }
	if ( showdebug == 1) debug( 'step 3. : ' + stem);
	// Stemming step 4. remove initial waw if found
	if (stem.length >= 4) { stem = stem.replace( /^وو/i, 'و'); }
	if ( showdebug == 1) debug( 'step 4. : ' + stem);
	// Stemming step 5. normalize initial hamza to bare alif
	if (stem.length >= 4) { stem = stem.replace( /^[آأإ]/i, 'ا'); }
	if ( showdebug == 1) debug( 'step 5. : ' + stem);
	if (stem.length <= 3) {
		return stem;
	}

	// Stemming step 6. process length four patterns and extract length three roots
	if (stem.length == 6) { 
		stem = stem.replace( /^[ام]ست(...)$/i, "$1");         // مستفعل - استفعل
		stem = stem.replace( /^[ام]ست(...)$/i, "$1");         // مستفعل - استفعل
		stem = stem.replace( /^[تم](.)ا(.)ي(.)$/i, "$1$2$3"); // تفاعيل - مفاعيل
		stem = stem.replace( /^م(..)ا(.)ة$/i, "$1$2");      // مفعالة
		stem = stem.replace( /^ا(.)[تط](.)ا(.)$/i, "$1$2$3");    // افتعال
		stem = stem.replace( /^ا(.)(.)و\2(.)$/i, "$1$2$3"); // افعوعل
		if (stem.length == 3 ) { return stem; }
		else {


			stem = stem.replace( /[ةهيكتان]$/i, "");     // single letter suffixes
			//if (stem.length == 4 ) { TODO: initiate 4 letter word routine? }
			//if (stem.length == 5 ) { TODO: initiate 5 letter word routine? }
			stem = stem.replace( /^(..)ا(..)$/i, "$1$2");   // فعالل
			stem = stem.replace( /^ا(...)ا(.)$/i, "$1$2");  // افعلال
			stem = stem.replace( /^مت(.۔..)$/i, "$1");      // متفعلل

			stem = stem.replace( /^[لبفسويتنامك]/i, "");     // single letter prefixes، added م for مفعلل
			if (stem.length == 6 ) { 
				stem = stem.replace( /^(..)ا(.)ي(.)$/i, "$1$2$3"); // فعاليل
				
			}
			//return stem;
		}
	}
	if ( showdebug == 1) debug( 'after length 6 : ' + stem);

	if (stem.length == 5) { 
		stem = stem.replace( /^ا(.)[اتط](.)(.)$/i, "$1$2$3");  //   افتعل   -  افاعل
		stem = stem.replace( /^م(.)(.)[يوا](.)$/i, "$1$2$3"); //   مفعول  -   مفعال  -   مفعيل
		stem = stem.replace( /^[اتم](.)(.)(.)ة$/i, "$1$2$3"); //   مفعلة  -    تفعلة   -  افعلة
		stem = stem.replace( /^[يتم](.)[تط](.)(.)$/i, "$1$2$3"); //   مفتعل  -    يفتعل   -  تفتعل
		stem = stem.replace( /^[تم](.)ا(.)(.)$/i, "$1$2$3");  //   مفاعل  -  تفاعل
		stem = stem.replace( /^(.)(.)[وا](.)ة$/i, "$1$2$3");  //   فعولة  -   فعالة
		stem = stem.replace( /^[ما]ن(.)(.)(.)$/i, "$1$2$3");  //   انفعل   -   منفعل
		stem = stem.replace( /^ا(.)(.)ا(.)$/i, "$1$2$3");     //    افعال
		stem = stem.replace( /^(.)(.)(.)ان$/i, "$1$2$3");     //    فعلان
		stem = stem.replace( /^ت(.)(.)ي(.)$/i, "$1$2$3");     //    تفعيل
		stem = stem.replace( /^(.)ا(.)و(.)$/i, "$1$2$3");     //    فاعول
		stem = stem.replace( /^(.)وا(.)(.)$/i, "$1$2$3");     //    فواعل
		stem = stem.replace( /^(.)(.)ائ(.)$/i, "$1$2$3");     //    فعائل
		stem = stem.replace( /^(.)ا(.)(.)ة$/i, "$1$2$3");     //    فاعلة
		stem = stem.replace( /^(.)(.)ا(.)ي$/i, "$1$2$3");     //    فعالي
		if (stem.length == 3 ) { return stem; }
		else {
			stem = stem.replace( /^[اتم]/i, ""); //    تفعلل - افعلل - مفعلل

			stem = stem.replace( /[ةهيكتان]$/i, "");     // single letter suffixes
			//if (stem.length == 4 ) { TODO: initiate 4 letter word routine? }
			stem = stem.replace( /^(..)ا(..)$/i, "$1$2");     //    فعالل
			stem = stem.replace( /^(...)ا(.)$/i, "$1$2");     //    فعلال
			stem = stem.replace( /^[لبفسويتنامك]/i, "");     // single letter prefixes، added م for مفعلل
			//return stem;
		}
	}
	if ( showdebug == 1) debug( 'after length 5 : ' + stem);

	if (stem.length == 4) { 
		stem = stem.replace( /^م(.)(.)(.)$/i, "$1$2$3");     // مفعل
		stem = stem.replace( /^(.)ا(.)(.)$/i, "$1$2$3");     // فاعل
		stem = stem.replace( /^(.)(.)[يوا](.)$/i, "$1$2$3"); // فعال   -   فعول    - فعيل
		stem = stem.replace( /^(.)(.)(.)ة$/i, "$1$2$3");     // فعلة
		if (stem.length == 3 ) { return stem; }
		else {
			stem = stem.replace( /^(.)(.)(.)[ةهيكتان]$/i, "$1$2$3");     // single letter suffixes
			if (stem.length == 3 ) { return stem; }
			stem = stem.replace( /^[لبفسويتناك](.)(.)(.)$/i, "$1$2$3");     // single letter prefixes
			//return stem;
		}
	}
	if ( showdebug == 1) debug( 'after length 4 : ' + stem);
/*
	TODO
	var matches = new array();
	var possible_roots = new array();
	if ( matches = stem.match( /(.)ئ(.)/)) {
		possible_roots[] = $matches[0] + 'و' + $matches[1];
		possible_roots[] = $matches[0] + 'ي' + $matches[1];
	}
	
	// Filter candidate_roots through known possible roots
*/
	return stem
}

// =============== end of jsastem.js ====================
