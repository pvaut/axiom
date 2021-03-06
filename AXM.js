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
        "AXM/Msg", "AXM/AXMUtils",
        "AXM/Application",
        "AXM/Tables/TableData", "AXM/Tables/TableInfo",
        "AXM/Controls/Controls", "AXM/Controls/Compound",
        "AXM/Panels/Frame", "AXM/Panels/PanelForm", "AXM/Panels/PanelTable",
        "AXM/Windows/RootWindow", "AXM/Windows/PopupWindow", "AXM/Windows/SimplePopups"
    ],
    function (
        require, $, _,
        Msg, Utils,
        Application,
        TableData, TableInfo,
        Controls, Compound,
        Frame, PanelForm, PanelTable,
        RootWindow, PopupWindow, SimplePopups
    ) {

        var Module = {
            Msg: Msg,
            Utils: Utils,
            Test: Utils.Test,
            Application: Application,
            Tables: {
                TableData:TableData,
                TableInfo: TableInfo
            },
            Controls: Controls,
            Panels: {
                Frame: Frame,
                PanelForm: PanelForm,
                PanelTable: PanelTable
            },
            Windows: {
                RootWindow: RootWindow,
                PopupWindow: PopupWindow,
                SimplePopups: SimplePopups
            }
        };

        //Module.Panels = {
        //    Frame: require("AXM/Frame")
        //};



        return Module;
    });

