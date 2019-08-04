# Budge-it 💴💵💶💷

no web interface, nothing fancy CSV bank statement parser.

exposes data such as 

* Total spending and income with difference for the period in the CSV
* Monthly spending
* Matchers for entry grouping spending habits

fully open source, MIT license and im trying to make it multi-lingual.

# Breaking down
so you want to see your finances? I did (and then I didn't) currently this only works for Natwest bank statements but you can PR me a way to index any other bank's field indexes and ill happilly merge.

running `ts-node index.ts {YOUR CSV} {NUMBER OF ROWS TO SKIP}`

will give you a butt tonne of information about your finances.

### Future plans

* add pretty CLI graphs.
* foldable breakdowns to view what you want.
* maybe a http server/api.

i made this on my phone.

