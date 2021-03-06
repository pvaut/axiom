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
        "AXM/Windows/PopupWindow", "AXM/Controls/Controls"],
    function (
        require, $, _,
        PopupWindow, Controls) {

        var Module = {};

        Module.MessageBox = function(content, title) {
            if (!title)
                title = "Message";

            var window = PopupWindow.create({
                title: title,
                blocking:true,
                autoCenter: true
            });

            var grp = Controls.Compound.GroupVert({});
            grp.add(Controls.Static({text: content+'<p/>'}));

            var btOK = Controls.Button({
                text: 'OK',
                icon: 'fa-check'
            })
                .addNotificationHandler(function() {
                    window.close();
                });
            grp.add(btOK);

            window.setRootControl(Controls.Compound.StandardMargin(grp));
            window.start();

        };

        return Module;
    });

