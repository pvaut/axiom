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

        var ranseed = 0;
        var random = function () {
            ranseed = (ranseed * 9301 + 49297) % 233280;
            return ranseed / (233280.0);
        };

        var alphabet='abcdefghijklmnopqrstuvwxyz      ';
        var alphabetlen = alphabet.length;

        var randomString = function(avLen) {
            var st = '';
            var len = Math.round(avLen * (1+0.5*random()));
            for (var i=0; i<len; i++) {
                st += alphabet[Math.floor(alphabetlen*random())];
            }
            return st;
        };


        Module.DummyData = function(rowCount, iranseed) {
            ranseed = iranseed;
            var tableData = AXMUtils.object('@TableData');
            tableData._cols = [];

            tableData.addTextCol = function(id, len) {
                tableData._cols.push({ tpe:'text', id:id, len:len});
            };

            tableData.addIntCol = function(id, minv, maxv) {
                tableData._cols.push({ tpe:'int', id:id, minv:minv, maxv:maxv});
            };

            tableData.addFloatCol = function(id, minv, maxv) {
                tableData._cols.push({ tpe:'float', id:id, minv:minv, maxv:maxv});
            };

            tableData.getRow = function(rowNr) {
                if ((rowNr<0) || (rowNr>=rowCount))
                    AXMUtils.reportBug('Invalid row number');
                ranseed = rowNr;
                var rowInfo =  {
                    index: rowNr+1
                };
                $.each(tableData._cols, function(colNr, colInfo) {
                    if (colInfo.tpe=='text')
                        rowInfo[colInfo.id] = randomString(colInfo.len);
                    if (colInfo.tpe=='int')
                        rowInfo[colInfo.id] = Math.round(colInfo.minv + random() * (colInfo.maxv-colInfo.minv));
                    if (colInfo.tpe=='float')
                        rowInfo[colInfo.id] = colInfo.minv + random() * (colInfo.maxv-colInfo.minv);
                });
                return rowInfo;
            };

            tableData.getRowCount = function() {
                return rowCount;
            };


            return tableData;
        };

        return Module;
    });

