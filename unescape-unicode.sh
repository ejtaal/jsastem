#!/bin/sh

# To test:
# echo '\u062a\u0645\u0644 \u0647\u0645\u0644 \u062a\u0627\u0646 \u062a\u064a\u0646 \u0643\u0645\u0644' |
# unescape-unicode.pl

# Hmm this one lines takes up a whole page as sub unescape on:
# http://cpansearch.perl.org/src/ITWARRIOR/Unicode-Escape-0.0.2/lib/Unicode/Escape.pm

perl -C -Mutf8 -pi -e 's/\\u([0-9a-fA-F]{4})/chr(hex(join("",$1)))/ge'
