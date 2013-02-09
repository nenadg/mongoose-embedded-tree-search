mongoose-embedded-tree-search
=============================

Search for, create and insert at adequate position as embedded document. Depth is set according to data length.

In this example, the following document will be used - parsed MS Excel document - 
Plan of accounts of budget beneficiaries of Republic of Srpska

Json array version of document - http://kontni-plan-parsed.pej.st/service/get

Original document can be downloaded here -
http://www.vladars.net/sr-SP-Cyrl/Vlada/Ministarstva/mf/Servisi/Gradjani/Documents/Prilog%202%20-%20NOVI%20KONTNI%20PLAN%20(2).xls

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
