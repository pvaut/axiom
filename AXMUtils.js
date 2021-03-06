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
        "require", "jquery", "_", "AXM/Test"],
    function (
        require, $, _, Test) {

        var Module = {
            Test: Test
        };

        Module.object = function(typeStr) {
            var obj = {
                __typeStrings: [typeStr]
            };
            return obj;
        }


        String.prototype.AXMInterpolate = function (args) {
            var newStr = this;
            for (var key in args) {
                newStr = newStr.replace('{' + key + '}', args[key]);
            }
            return newStr;
        }

        Module.BmpFile = function(bmpId) {
            return 'scripts/AXM/Bitmaps/'+bmpId+'.png';
        }



        Module._uniqueID = 0;

        Module.getUniqueID = function () {
            Module._uniqueID++;
            return 'ID' + Module._uniqueID;
        };

        Module._zindex = 0;

        Module.getNextZIndex = function () {
            Module._zindex+=100;
            return Module._zindex;
        };


        Module.reportBug = function(msg) {
            alert(msg);
            debugger;
        };


        Module.getBrowserSize = function() {
            return {
                sizeX: $(window).width(),
                sizeY: $(window).height()
            };
        };


        Module.create$ElDragHandler = function($El, handlerStart, handlerMove, handlerStop) {

            var handlerId = 'DGH'+Module.getUniqueID();

            var positStartX = null;
            var positStartY = null;

            var handleMouseDown = function (ev) {
                positStartX = ev.pageX;
                positStartY = ev.pageY;
                $(document).bind("mouseup."+handlerId, handleMouseUp);
                $(document).bind("mousemove."+handlerId, handleMouseMove);
                handlerStart({});
                ev.stopPropagation();
                return false;
            };

            var handleMouseUp = function (ev) {
                $(document).unbind("mouseup."+handlerId);
                $(document).unbind("mousemove."+handlerId);
                handlerStop({});
                ev.stopPropagation();
                return false;
            };

            var handleMouseMove = function(ev) {
                var positX = ev.pageX;
                var positY = ev.pageY;
                handlerMove({
                    diffTotalX:positX-positStartX,
                    diffTotalY:positY-positStartY
                });
                ev.stopPropagation();
                return false;
            };

            $El.mousedown(handleMouseDown);

        };


        Module.create$ElScrollHandler = function($El, handler) {

            var getMouseWheelDeltaY = function (ev) {
                var delta = 0;
                var ev1 = ev;
                if (ev.originalEvent)
                    ev1 = ev.originalEvent;
                if ((ev1.wheelDeltaX !== undefined) && (ev1.wheelDelta) ) { // check that we are scrolling vertically
                    if (Math.abs(ev1.wheelDeltaX) >= Math.abs(ev1.wheelDelta))
                        return 0;
                }
                if (ev1.wheelDelta) { delta = ev1.wheelDelta / 120; }
                else
                if (ev1.detail) { delta = -ev1.detail / 3; }
                return delta;
            }

            var getMouseWheelDeltaX = function (ev) {
                var ev1 = ev;
                if (ev.originalEvent)
                    ev1 = ev.originalEvent;
                if ((ev1.wheelDeltaX !== undefined) && (ev1.wheelDelta) ) { // check that we are scrolling horizontally
                    if (Math.abs(ev1.wheelDeltaX) >= Math.abs(ev1.wheelDelta))
                        return ev1.wheelDeltaX / 120;
                }
                return 0;
            }

            $El.bind('DOMMouseScroll mousewheel', function(ev) {
                //console.log('scrollevent');
                handler({
                    deltaY: getMouseWheelDeltaY(ev),
                    deltaX: getMouseWheelDeltaX(ev)
                });
            });
        };

        var _keyDownHandlerStack = [];
        var _keyDownHandlersHover = {};


        Module.addKeyDownHandler = function (handler) {
            _keyDownHandlerStack.unshift(handler);
        };

        Module.removeKeyDownHandler = function (handler) {
            var fndIdx = null;
            $.each(_keyDownHandlerStack, function(idx, hnd) {
                if (hnd ===  handler)
                    fndIdx = idx;
            });
            if (fndIdx !== null)
                _keyDownHandlerStack.splice(fndIdx, 1);
        }




        var _onKeyDown = function(ev) {
            if (ev.keyCode == 27)
                ev.isEscape = true;
            if (_keyDownHandlerStack.length > 0) {
                _keyDownHandlerStack[0](ev);
                return;
            }
            //for (var id in _keyDownHandlersHover)
            //    if (DQX._keyDownHandlersHover[id])
            //        if (DQX._keyDownHandlersHover[id](ev)) {
            //            return false;
            //        }
        };

        $(document).keydown(_onKeyDown);


        return Module;
    });

