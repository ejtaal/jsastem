# -*- coding: utf-8 -*-

import sys
### Nope all this didn't seem to make it work when redirecting output to a pipe
#import os
#import codecs
#sys.stdout = codecs.getwriter('utf8')(sys.stdout)
#sys.stdin = codecs.getwriter('utf8')(sys.stdin)
#os.environ['PYTHONIOENCODING'] = 'UTF_8'

# However this 'hack' did, oh well
reload(sys)
sys.setdefaultencoding('utf-8')


from nltk.stem.isri import ISRIStemmer

import imp

foo = imp.load_source('nltk.stem.isri', './stemmers/nltk/nltk/stem/isri.py')
st = foo.ISRIStemmer()

for line in sys.stdin:
	#print line
	for word in line.split():
		print word, ' -> ', st.stem(word), ' '
