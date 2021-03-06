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
        "AXM/AXMUtils", "AXM/Msg", "AXM/Panels/Frame"
    ],
    function (
        require, $, _,
        AXMUtils, Msg, Frame
    ) {

        var Module = {};

        Module.create = function(iFrameRoot) {
            var rootWindow = {};
            rootWindow._rootFrame = iFrameRoot;

            rootWindow.render = function() {
                var st = rootWindow._rootFrame.createHtml();
                $('.AXMContainer').html(st);
                rootWindow._rootFrame.attachEventHandlers();
                rootWindow._monitorResize();
            };


            rootWindow._prevSizeX = 0;
            rootWindow._prevSizeY = 0;
            rootWindow._monitorResize = function () {
                var myparent = $('#' + rootWindow._rootFrame.getId()).parent();
                var sizeX = myparent.innerWidth();
                var sizeY = myparent.innerHeight();
                if ((sizeX!=rootWindow._prevSizeX) || (sizeY!=rootWindow._prevSizeY)) {
                    rootWindow._doResize(sizeX, sizeY, {});
                    rootWindow._prevSizeX = sizeX;
                    rootWindow._prevSizeY = sizeY;
                    Msg.broadcast('MsgBrowserResized', {sizeX: sizeX, sizeY: sizeY})
                }
                setTimeout(rootWindow._monitorResize, 100);
            };



            rootWindow._doResize = function (sizeX, sizeY, params) {
                //var myparent = $('#' + rootWindow._rootFrame.getId()).parent();
                //var sizeX = myparent.innerWidth();
                //var sizeY = myparent.innerHeight();
                rootWindow._rootFrame.setPosition(0, 0, sizeX, sizeY, params);
            };


            return rootWindow;
        };


        return Module;
    });

