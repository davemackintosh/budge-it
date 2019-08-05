# Budge-it 💴💵💶💷

no web interface, nothing fancy CSV bank statement parser.

exposes data such as 

* Total spending and income with difference for the period in the CSV
* Monthly spending
* Matchers for entry grouping spending habits

fully open source, MIT license and im trying to make it multi-lingual.

# Breaking down
so you want to see your finances? I did (and then I didn't) currently this only works for Natwest bank statements but you can PR me a way to index any other bank's field indexes and ill happilly merge.

running `ts-node index.ts {YOUR CSV} {NUMBER OF ROWS TO SKIP} {BANK NAME}`

will give you a butt tonne of information about your finances.

## Adding your bank

Currently, this only supports Natwest bank statements in CSV format. To add a new bank you simply need to take a look at your CSV and create a new [`Indexer`](https://github.com/davemackintosh/budge-it/blob/master/types/base.ts#L13-L19) for your bank. There is a folder of currently existing [bank's indexers here](https://github.com/davemackintosh/budge-it/tree/master/bank-indexes).

### Future plans

* add pretty CLI graphs.
* foldable breakdowns to view what you want without so much noise.
* maybe a http server/api.
* feature requests?

i made this on my phone.

[@daveymackintosh](https://twitter.com/daveymackintosh)
[@newworldcode](https://twitter.com/newworldcode)
