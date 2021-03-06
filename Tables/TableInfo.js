//Copyright (c) 2014 Paul Vauterin
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software
//and associated documentation files (the "Software"), to deal in the Software without restriction,
//including without limitation the rights to use, copy, modify, merge, publish, distribute,
//sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
//is furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
//INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
//PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
//DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
//ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

define([
        "require", "jquery", "_",
        "AXM/AXMUtils", "AXM/DOM"],
    function (
        require, $, _,
        AXMUtils, DOM) {

        var Module = {};


        Module.colInfo = function(id) {
            var coldef = AXMUtils.object('@ColInfo');
            coldef._id = id;
            coldef._name = id;
            coldef._dispSize = 140;
            coldef._onOpen = null;
            coldef._canSort = false;

            coldef.setName = function(iName) {
                coldef._name = iName;
                return coldef;
            };

            coldef.setDispSize = function(dispSize) {
                coldef._dispSize = dispSize;
                return coldef;
            };

            coldef.setOnOpen = function(onOpen) {
                coldef._onOpen = onOpen;
                return coldef;
            };

            coldef.enableSort = function() {
                coldef._canSort = true;
                return coldef;
            };

            coldef.getId = function() {
                return coldef._id;
            };

            coldef.getName = function() {
                return coldef._name;
            };

            coldef.canOpen = function() {
                return !!coldef._onOpen;
            };

            coldef.canSort = function() {
                return coldef._canSort;
            };

            coldef.callOnOpen = function() {
                if (!coldef.canOpen())
                    AXMUtils.reportBug('No column open handler');
                coldef._onOpen();
            };

            return coldef;
        };

        Module.tableInfo = function() {
            var tabledef = AXMUtils.object('@TableInfo');
            tabledef._columns = [];
            tabledef._onOpenRow = null;

            tabledef.addColumn = function(colId) {
                AXMUtils.Test.checkIsString(colId);
                var colInfo = Module.colInfo(colId);
                tabledef._columns.push(colInfo);
                return colInfo;
            };

            tabledef.setOnOpenRow = function(handler) {
                tabledef._onOpenRow = handler;
            };

            tabledef.getColumns = function() {
                return tabledef._columns;
            };

            tabledef.canOpenRow = function() {
                return !!tabledef._onOpenRow;
            };

            tabledef.callOnOpenRow = function(rowNr) {
                if (!tabledef.canOpenRow())
                    AXMUtils.reportBug('No row open handler');
                tabledef._onOpenRow(rowNr);
            };



            return tabledef;
        };

        return Module;
    });

