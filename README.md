
JSASTEM - JavaScript Arabic Stemmer
===================================

This little project aims to create a simple arabic stemmer 
implemented in JavaScript.

Why?
====

Good question. Because I need one for my other project,
Mabhathu Tulab (A student's place of research) which
is an Arabic - Arabic dictionary, similar to http://baheth.info
but better of course ;) Its main feature is that the
user may click on any word of a dictionary entry that may then
be further explained by an overlay.

How?
====

It seems no-one has implemented one in JavaScript yet, for
good reason I imagine. The ISRI stemmer as implemented by the
NLTK project seems like a very straight forward stemmer, nothing
too complicated and time consuming for my needs. This project
therefore aims to port the python script into javascript.

Plans
=====

Hopefully I can find some time to increase accuracy. Some words
can be derived from multiple possible theoretical roots so these
could be enumerated in the return value. Prior to returning them
they could be compared against some known lists of existing roots
to filter out unknown roots.

License, Copyright & Contact
============================
	
License: GPL
Copyright: Erik Taal <ejtaal@gmail.com> ((http://ejtaal.net)

