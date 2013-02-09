mongoose-embedded-tree-search
=============================

Search for, create and insert at adequate position as embedded document. Depth is set according to data length.

In this example, the following document will be used - parsed MS Excel document - 
Plan of accounts of budget beneficiaries of Republic of Srpska

Json array version of document - http://kontni-plan-parsed.pej.st/service/get

Original document can be downloaded here - http://bit.ly/Z1bwNA

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
