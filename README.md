mongoose-embedded-tree-search
=============================

Search for, create and insert at adequate position as embedded document. Depth is set according to data length.

In this example, the following document will be used - parsed MS Excel documents:
- Plan of accounts of budget beneficiaries of Republic of Srpska
- Classification of the Functions of Government (COFOG)

Json array version of document - http://budzet.pej.st/ than follow links.

Original documents can be downloaded here http://bit.ly/Z1bwNA and here http://bit.ly/12RxcIF

## Example:
Data whose length is 6 will be 6-th level child of root object.

## Prerequisites
    $ mongod

## Installation
    $ npm install
    
## Running
    $ npm start
    or
    $ node app
