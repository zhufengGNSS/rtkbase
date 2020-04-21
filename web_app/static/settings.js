// ReachView code is placed under the GPL license.
// Written by Egor Fedorov (egor.fedorov@emlid.com)
// Copyright (c) 2015, Emlid Limited
// All rights reserved.

// If you are interested in using ReachView code as a part of a
// closed source project, please contact Emlid Limited (info@emlid.com).

// This file is part of ReachView.

// ReachView is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// ReachView is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with ReachView.  If not, see <http://www.gnu.org/licenses/>.

// ####################### HANDLE WINDOW FOCUS/UNFOCUS #######################




// ############################### MAIN ###############################

$(document).ready(function () {

	if(window.location.hash != '')
		window.location.href = "/";

    // We don't want to do extra work like updating the graph in background

    // SocketIO namespace:
    namespace = "/test";

    // initiate SocketIO connection
    socket = io.connect("http://" + document.domain + ":" + location.port + namespace);

    // say hello on connect
    socket.on("connect", function () {
        socket.emit("browser connected", {data: "I'm connected"});
    });
    console.log("main.js Asking for service status");
    socket.emit("get services status");

    socket.on('disconnect', function(){
        console.log('disconnected');
    });

    // Current active tab




    // ####################### HANDLE REACH MODES, START AND STOP MESSAGES #######################

    // handle data broadcast

   

    // ####################### HANDLE RTKBASE SERVICES    #######################

    socket.on("services status", function(msg) {
        // gestion des services
        var servicesStatus = JSON.parse(msg);
        console.log("service status: " + servicesStatus);
        

        // ################ MAiN service Switch  ######################
        console.log("REFRESHING  service switch");

        
        // set the switch to on/off depending of the service status
        if (servicesStatus[0].active === true) {
            //document.querySelector("#main-switch").bootstrapToggle('on');
            $('#main-switch').bootstrapToggle('on', true);
        } else {
            //document.querySelector("#main-switch").bootstrapToggle('off');
            $('#main-switch').bootstrapToggle('off', true);
        }
        
        // event for switching on/off service on user mouse click
        //TODO When the switch changes its position, this event seems attached before
        //the switch finish its transition, then fire another event.
        $( "#main-switch" ).one("change", function(e) {
            var switchStatus = e.target.value;
            //console.log(" e : " + e);
            console.log("Main SwitchStatus : " + switchStatus);
            socket.emit("services switch", {"name" : "main", "active" : switchStatus});
            
        })

        // ####################  NTRIP service Switch #########################

        // set the switch to on/off depending of the service status
        if (servicesStatus[1].active === true) {
            //document.querySelector("#main-switch").bootstrapToggle('on');
            $('#ntrip-switch').bootstrapToggle('on', true);
        } else {
            //document.querySelector("#main-switch").bootstrapToggle('off');
            $('#ntrip-switch').bootstrapToggle('off', true);
        }
        
        // event for switching on/off service on user mouse click
        //TODO When the switch changes its position, this event seems attached before
        //the switch finish its transition, then fire another event.
        $( "#ntrip-switch" ).one("change", function(e) {
            var switchStatus = e.target.value;
            //console.log(" e : " + e);
            console.log("Ntrip SwitchStatus : " + switchStatus);
            socket.emit("services switch", {"name" : "ntrip", "active" : switchStatus});
            
        })
    
        // ####################  LOG service Switch #########################

        // set the switch to on/off depending of the service status
        if (servicesStatus[2].active === true) {
            //document.querySelector("#main-switch").bootstrapToggle('on');
            $('#file-switch').bootstrapToggle('on', true);
        } else {
            //document.querySelector("#main-switch").bootstrapToggle('off');
            $('#file-switch').bootstrapToggle('off', true);
        }
        
        // event for switching on/off service on user mouse click
        //TODO When the switch changes its position, this event seems attached before
        //the switch finish its transition, then fire another event.
        $( "#file-switch" ).one("change", function(e) {
            var switchStatus = e.target.value;
            //console.log(" e : " + e);
            console.log("File SwitchStatus : " + switchStatus);
            socket.emit("services switch", {"name" : "file", "active" : switchStatus});
            
        })

    })

    socket.on("system time corrected", function(msg) {
        $('.warning_footer h1').text("Reach time synced with GPS!");
        setTimeout(function(){$('.warning_footer').slideUp()}, 5000);
        $('#stop_button').removeClass('ui-disabled');
        $('#start_button').removeClass('ui-disabled');
    })

    // ####################### HANDLE SATELLITE LEVEL BROADCAST #######################

    // ####################### HANDLE COORDINATE MESSAGES #######################

    // end of document.ready
});