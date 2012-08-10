#!/bin/sh

# To test:
# echo '\u062a\u0645\u0644 \u0647\u0645\u0644 \u062a\u0627\u0646 \u062a\u064a\u0646 \u0643\u0645\u0644' |
# unescape-unicode.pl | escape-unicode.pl

# Do the reverse of:
#perl -C -Mutf8 -pi -e 's/\\u([0-9a-fA-F]{4})/chr(hex(join("",$1)))/ge'
perl -C -Mutf8 -MEncode -pi -e 's/(.)/{ ord($1) > 255 ?  sprintf("\\u%04x", ord $1) : $1 }/ge'
