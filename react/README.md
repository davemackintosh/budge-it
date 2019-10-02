# Budge It (web) 💴💵💶💷
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)
> In development.

CSV bank statement parser.

exposes data such as 

* Total spending and income with difference for the period in the CSV
* Monthly spending
* Matchers for entry grouping spending habits

fully open source, MIT license and im trying to make it multi-lingual.

# Breaking down
so you want to see your finances? I did (and then I didn't) currently this only works for Natwest bank statements but you can PR me a way to index any other bank's field indexes and ill happilly merge.

will give you a butt tonne of information about your finances.

## Adding your bank

**Currently supported banks**

* Natwest
* Halifax (beta)
* HSBC (beta)
* Add yours following the below

Currently, this only supports Natwest bank statements in CSV format. To add a new bank you simply need to take a look at your CSV and create a new [`Indexer`](https://github.com/davemackintosh/budge-it-web/blob/master/types/bank.ts#L1-L20) for your bank. There is a folder of currently existing [bank's indexers here](https://github.com/davemackintosh/budge-it-web/tree/master/src/shared/indexers).

## Currencies
Although I've not yet made the effort to make this multi-lingual (I will) I have set up a base for using multiple currencies and formatting of currency in your locale. This is configured by browser's language settings (after some jiggery-pokery). This doesn't affect the amounts you see and only shows the relevant currency symbol for your language.

To add your currency, you simply need to add the supported [`locale -a` value](http://man7.org/linux/man-pages/man1/locale.1.html) value to map to the [ISO 4217 currency code](https://www.iso.org/iso-4217-currency-codes.html) to the [currency map here](https://github.com/davemackintosh/budge-it-web/blob/master/src/shared/utils.ts#L183-186) 

## Matchers
A matcher is a configuration that tests the entry to output it as either a necessary item or an unnecessary expenditure and counts towards what you could have saved (but didn't) or had to spend.

You can [add your own matchers here](https://github.com/davemackintosh/budge-it-web/blob/master/src/shared/matchers.ts#L27-97)

[@daveymackintosh](https://twitter.com/daveymackintosh)
[@newworldcode](https://twitter.com/newworldcode)

