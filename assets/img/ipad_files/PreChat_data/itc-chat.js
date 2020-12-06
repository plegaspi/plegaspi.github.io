usingNamespace("Biz.ITC")["Chat"] = {
    CHAT_ENDPOINT: "",
    AUTH_TOKEN: "",
    CASE_NUMBER:"",
    SOURCE_ID: "",
    TEAM_ID: "",
    AUTH_API_KEY: "",
    AUTH_URL: "",
    USER_NAME: "",
    EMAIL: "",
    CHAT_TIMEOUT: 5000,
    CHAT_POSITION_TIME: 5000,
    CHAT_SESSION_TIIME: 0,
    CHAT_LOGIN: "login",
    CHAT_LOGOUT: "logout",
    CHAT_IN_QUEUE: 'inqueue',
    CHAT_TIME_OUT: 'timeout',
    CHAT_RESTART: "CHAT_RESTART",
    preChatData: { msg: '', orderNumber: '', selectLanguge: 'en-us' },
    socket: null,
    relogin: false,
    timer: function () { },
    positionTimer: function () { },
    myscroll: null,
    lastPosition: 0,
    isNewChat: true,
    lastmessageTime: 0,
    loginTime: 0,

    playsound: function () {
        var sound = document.getElementById("playsnd");
        try {
            sound.play();
        } catch (e) {
            //we are IE or other browser that isn't html5, try IE/opera bgsound
            try {
                var sc = document.getElementById("sndcontainer");
                var src = sc.attributes.getNamedItem("src");
                src = (src !== null) ? src.value : "";
                sc.innerHTML = "<span><bgsound loop=0 src='" + src + "'></span>";
            } catch (e2) { }
        }
    },

    canJoinChat: function () {
        var canJoin = false;

        var localData = Biz.ITC.LocalStorage.getData();
        if (localData) {
            var userName = localData.CHAT_USER_NAME;
            var email = localData.CHAT_EMAIL;
            if (!(userName || email)) {
                return false;
            }
            var localchatexpriationTime = localData.CHAT_EXPIRATION_TIME || 0;
            var chatexpritionTime = new Date(localchatexpriationTime);
            var dateNow = new Date();
            if (chatexpritionTime > dateNow) {
                var chatState = localData.CHAT_STATE || "";
                var lastChat = localData.LAST_CHAT_TIME || 0;
                var lastChatTime = new Date(lastChat + localData.CHAT_TIME_OUT);
                if (chatState) {
                    if ((chatState == Biz.ITC.Chat.CHAT_LOGIN  &&
                        lastChatTime > dateNow) || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
                        canJoin = true;
                    }
                }
            }
        }
        return canJoin;
    },

    init: function (endpoint, sourceId, teamId, apiKey, authUrl, sessionTime, chatTimeOut, positionTime) {
        Biz.ITC.Chat.myscroll = new IScroll("#chattextWrapper", {
            mouseWheel: true,
            bindToWrapper: true,
            click: true,
            scrollbars: true
        });

        var localData = Biz.ITC.LocalStorage.getData();
        var userName = '';
        var email = '';
        var isNewChat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.IS_NEW_CHAT);
        var preChatData = { msg: '', orderNumber: '', selectLanguge: 'en-us' };
        if (Biz.ITC.Chat.lastmessageTime == 0) {
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_USER, '');
        }
        if (localData) {
            var loginTime = localData.CHAT_LOGIN_TIME || 0;
            if (Biz.ITC.Chat.lastmessageTime != 0 && new Date(Biz.ITC.Chat.lastmessageTime) < new Date(loginTime)) {
                jQuery("#chattext").html('');
                Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_USER, '');
                Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_TIME, 0);
            }
            var chatFlag = window.sessionStorage.getItem("_ng_itc_chat");
            var chatState = localData.CHAT_STATE || "";
            userName = localData.CHAT_USER_NAME;
            email = localData.CHAT_EMAIL;
            var messageData = localData.CHAT_BASIC_INFO;
            preChatData = JSON.parse(messageData);
            if (chatFlag == "1" && chatState != Biz.ITC.Chat.CHAT_RESTART) {
                isNewChat = false;
            } else if (isNewChat && (chatState == Biz.ITC.Chat.CHAT_LOGIN || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE)) {
                isNewChat = false;
            } else {
                window.sessionStorage.setItem("_ng_itc_chat", "1");
            }
            var historyList = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_MSG_LIST) || '[]';
            if (!isNewChat) {

                if (chatState == Biz.ITC.Chat.CHAT_LOGOUT || chatState == Biz.ITC.Chat.CHAT_TIME_OUT) {
                    Biz.ITC.Chat.onHistory(JSON.parse(historyList));
                    Biz.ITC.Chat.showStartChat();
                    return;
                }

                var lastChatTime = new Date((localData.LAST_CHAT_TIME || 0) + chatTimeOut);
                var dateNow = new Date();
                if (lastChatTime < dateNow && chatState != Biz.ITC.Chat.CHAT_IN_QUEUE) {
                    Biz.ITC.Chat.onHistory(JSON.parse(historyList));
                    Biz.ITC.Chat.showStartChat();
                    return;
                }
            }
        } else {
            Biz.ITC.Chat.showSystemMsg('Connecting...', true);
            Biz.ITC.Chat.showStartChat();
            return;
        }

        if (isNewChat) {
            Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_MSG_LIST);
            Biz.ITC.Chat.showSystemMsg('Connecting...', true);
        } else {
            jQuery('#textarea').attr('disabled', 'disabled');
            jQuery('#sendButton').attr('disabled', 'disabled');
            jQuery("#textarea").removeAttr("placeholder");
            jQuery("#textarea").removeAttr("title");
            Biz.ITC.Chat.loginTime = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_LOGIN_TIME)||0;
            
        }
        Biz.ITC.Chat.relogin = false;
        Biz.ITC.Chat.CHAT_ENDPOINT = endpoint;
        Biz.ITC.Chat.SOURCE_ID = sourceId;
        Biz.ITC.Chat.TEAM_ID = teamId;
        Biz.ITC.Chat.AUTH_API_KEY = apiKey;
        Biz.ITC.Chat.AUTH_URL = authUrl;
        Biz.ITC.Chat.USER_NAME = userName;
        Biz.ITC.Chat.EMAIL = email;
        Biz.ITC.Chat.preChatData = preChatData;
        Biz.ITC.Chat.isNewChat = isNewChat;
        if (chatTimeOut) {
            Biz.ITC.Chat.CHAT_TIMEOUT = chatTimeOut;
        }
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_TIME_OUT, Biz.ITC.Chat.CHAT_TIMEOUT);
        if (positionTime) {
            Biz.ITC.Chat.CHAT_POSITION_TIME = positionTime;
        }
        Biz.ITC.Chat.CHAT_SESSION_TIIME = sessionTime * 60 * 1000;
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_CAN_SURVEY, "0");
        // get token
        jQuery.ajax({
            url: this.AUTH_URL,
            type: "POST",
            data: {
                uid: email,
                name: userName
            },
            contentType: "application/x-www-form-urlencoded",
            async: true,
            beforeSend: function (request) {
                request.setRequestHeader("ITC-WebChat-API-Key", apiKey);
                request.setRequestHeader("Accept", "application/json; charset=utf-8");
            },
            timeout: 15000,
            success: function (data) {
                var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
                if (chatState == Biz.ITC.Chat.CHAT_LOGOUT || chatState == "") {
                    Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.LAST_CHAT_USER);
                }
                if (isNewChat) {
                    Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_CS_NAME);
                    Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_STATE);
                    Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_POSITION);
                    Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.LAST_CHAT_USER);
                }
                Biz.ITC.Chat.AUTH_TOKEN = data.token;
                Biz.ITC.Chat.socket = io.connect(Biz.ITC.Chat.CHAT_ENDPOINT, { transports: ["websocket"] });
                Biz.ITC.Chat.socket.on("connect", Biz.ITC.Chat.onConnect);
                Biz.ITC.Chat.socket.on("init", Biz.ITC.Chat.onInit);
                Biz.ITC.Chat.socket.on("chat", Biz.ITC.Chat.onChat);
                Biz.ITC.Chat.socket.on("error", Biz.ITC.Chat.onError);
                Biz.ITC.Chat.socket.on("position", Biz.ITC.Chat.onPosition);
                Biz.ITC.Chat.socket.on("disconnect", Biz.ITC.Chat.onDisconnect);
                Biz.ITC.Chat.socket.on("case_id", Biz.ITC.Chat.getCaseId);
            },
            error: function (err) {
                console.error("get chat token error:" + JSON.stringify(err));
                Biz.ITC.Chat.showSystemMsg('Connect the chat service failed,please try again', false);
                Biz.ITC.Chat.showStartChat();
            }
        });
    },

    onConnect: function () {
        var payload = {
            to: Biz.ITC.Chat.TEAM_ID,
            auth_token: Biz.ITC.Chat.AUTH_TOKEN,
            source_id: Biz.ITC.Chat.SOURCE_ID,
            cx_name: Biz.ITC.Chat.USER_NAME,
            timestamp: (new Date()).getTime(),
            pre_chat_data: {
                name: Biz.ITC.Chat.USER_NAME,
                email: Biz.ITC.Chat.EMAIL,
                phone_number: '',
                notes: Biz.ITC.Chat.preChatData.msg + (Biz.ITC.Chat.preChatData.orderNumber ? ("order_number:" + Biz.ITC.Chat.preChatData.orderNumber) : ""),
            }
        }

        Biz.ITC.Chat.socket.emit("init", payload);
    },

    onInit: function (data) {
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_CAN_SURVEY, "1");
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        Biz.ITC.Chat.socket.emit('case_id', {});
        if (chatState == Biz.ITC.Chat.CHAT_LOGIN || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
            if (chatState == Biz.ITC.Chat.CHAT_LOGIN) {
                jQuery('#textarea').removeAttr('disabled');
                jQuery('#sendButton').removeAttr('disabled');
                jQuery("#textarea").attr("placeholder", "Type here");
                jQuery("#textarea").attr("title", "Type here");
            }

            var historyList = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_MSG_LIST) || '[]';
            Biz.ITC.Chat.onHistory(JSON.parse(historyList));
            if (chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
                Biz.ITC.Chat.socket.emit("position");
            }

        } else {
            var dateTimeNow = new Date().getTime();
            Biz.ITC.Chat.createMsg({
                from: 'cx',
                name: Biz.ITC.Chat.USER_NAME,
                message: 'Initial Question/Comment:' + Biz.ITC.Chat.preChatData.msg,
                timestamp: dateTimeNow
            }, Biz.ITC.Chat.isNewChat, true);
            Biz.ITC.Chat.showSystemMsg("Waiting for a Customer Representative...", true);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IS_NEW_CHAT, false);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_USER_NAME, Biz.ITC.Chat.USER_NAME);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_EMAIL, Biz.ITC.Chat.EMAIL);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_BASIC_INFO, JSON.stringify(Biz.ITC.Chat.preChatData));

            Biz.ITC.Chat.loginTime = dateTimeNow;
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_LOGIN_TIME, dateTimeNow);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_EXPIRATION_TIME, dateTimeNow + Biz.ITC.Chat.CHAT_SESSION_TIIME);
            if (Biz.ITC.Chat.isNewChat) {
                Biz.ITC.Chat.socket.emit("chat", { message: Biz.ITC.Chat.preChatData.msg });
            }

            Biz.ITC.Chat.socket.emit("position");
        }
    },

    onPosition: function (position) {
        
        if (!Biz.ITC.Chat.isSameChat()) {
            return;
        }
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        if (chatState != "" && !(chatState == Biz.ITC.Chat.CHAT_LOGIN || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE)) {
            return;
        }
        if (position == 0 || chatState == Biz.ITC.Chat.CHAT_LOGIN) {
            jQuery('#textarea').removeAttr('disabled');
            jQuery('#sendButton').removeAttr('disabled');
            jQuery("#textarea").attr("placeholder", "Type here");
            jQuery("#textarea").attr("title", "Type here");
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_LOGIN);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_POSITION, position);
        } else {
            clearTimeout(Biz.ITC.Chat.timer);
            var lastPosition = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_POSITION) || 0;
            if (lastPosition == 0 || (position < lastPosition)) {
                Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_POSITION, position);
                if (position == 1) {
                    Biz.ITC.Chat.showSystemMsg('You are next in queue...', true);
                } else {
                    Biz.ITC.Chat.showSystemMsg('You are number (' + position + ') in queue. ', true);
                }

                Biz.ITC.Chat.scrollToBottom();
            }
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_IN_QUEUE);
            Biz.ITC.Chat.positionTimer = setTimeout(function () {
                Biz.ITC.Chat.socket.emit("position");
            }, Biz.ITC.Chat.CHAT_POSITION_TIME);
        }
    },

    onChat: function (data) {
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        if (chatState == Biz.ITC.Chat.CHAT_IN_QUEUE || chatState == Biz.ITC.Chat.CHAT_LOGIN || Biz.ITC.Chat.socket.connected) {
            data.forEach(function (msg) {
                if (msg.from === 'ag') {
                    var csName = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_CS_NAME) || "";
                    if (csName == "" || csName != msg.name) {
                        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_CS_NAME, msg.name);
                        Biz.ITC.Chat.showSystemMsg(msg.name + ' has joined this session!', true);
                        Biz.ITC.Chat.showSystemMsg('Connected with ' + msg.name, true);
                        Biz.ITC.Chat.showSystemMsg('Hi ' + Biz.ITC.Chat.USER_NAME + '! My name is ' + msg.name + '.', true);
                    }
                    Biz.ITC.Chat.socket.emit('case_id',{});
                    Biz.ITC.Chat.createMsg(msg, true);
                    // if cs chat with first,removce input disabled status
                    if (chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
                        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_LOGIN);
                        Biz.ITC.Chat.socket.emit("position");
                    }
                }
            });
        }
    },

    onHistory: function (historyData) {
        if (historyData && historyData.length > 0) {
            for (var i = 0; i < historyData.length; i++) {
                var isFirst = i == 0;
                Biz.ITC.Chat.createMsg(historyData[i], false, isFirst);
            }
        }
    },

    onError: function (data) {
        console.error("Error: " + JSON.stringify(data));
        var oldHtml = jQuery("#chattext").html();
        var newHtml = oldHtml + '<div class="messageBlock system" tabindex="0"><p class="messageTextWrapper"><span class="screenReader">System message </span><span class="messageText"> System error,please refresh this page try agin.</span></p></div>';
        jQuery("#chattext").html(newHtml);
        clearTimeout(Biz.ITC.Chat.timer);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_LOGOUT);
        Biz.ITC.Chat.showStartChat();
    },

    onDisconnect: function () {
        jQuery("#textarea").blur();
        Biz.ITC.Chat.relogin = true;
        Biz.ITC.Chat.socket.connected = false;
        Biz.ITC.Chat.socket.disconnected = true;
        clearTimeout(Biz.ITC.Chat.timer);
        clearTimeout(Biz.ITC.Chat.positionTimer);
    },

    getCaseId:function(caseId) {
        Biz.ITC.Chat.CASE_NUMBER = caseId;
    },

    sendMessage: function () {
        if (!Biz.ITC.Chat.isSameChat()) {
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_LOGOUT);
        }
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        if (chatState != Biz.ITC.Chat.CHAT_LOGIN) {
            Biz.ITC.Chat.showStartChat();
            return;
        }
        var msg = jQuery('#textarea').val().trim();
        jQuery('#textarea').val('');
        if (msg == '') {
            return;
        }
        var payload = {
            message: msg
        };

        Biz.ITC.Chat.createMsg({
            from: 'cx',
            name: Biz.ITC.Chat.USER_NAME,
            message: msg,
            timestamp: new Date().getTime()
        }, true);
        Biz.ITC.Chat.socket.emit("chat", payload);

    },

    createMsg: function (msg, isNew, isFirst) {
        if (msg.from == 'sys') {
            Biz.ITC.Chat.showSystemMsg(msg.message, false, msg.timestamp);
            return;
        }
        var id = 'div[uniqmsgid="' + msg.timestamp + '"]';
        var existDom = jQuery(id);
        if (!existDom[0]) {
            var oldHtml = jQuery("#chattext").html();
            var getLastSendUser = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.LAST_CHAT_USER);
            var isSameUser = getLastSendUser && getLastSendUser == msg.from;
            var showNameDiv = isFirst ? false : isSameUser ? true : false;
            var newHtml = oldHtml + '<div class="messageBlock ' +
                (msg.from === 'ag' ? 'agent' : 'cust') + '" tabindex="0" uniqmsgid="' + msg.timestamp + '">' +
                (showNameDiv ? "" : '<hr class="divider" aria-hidden="true"><h5 class="messageSender" aria-hidden="true">' + Biz.ITC.Chat.HTMLEncode(msg.name) + '</h5>') +
                '<p class="messageTextWrapper">' +
                '<span class="screenReader">' +
                Biz.ITC.Chat.HTMLEncode(msg.name) + ' message </span><span class="messageText">' +
                Biz.ITC.Chat.HTMLEncode(msg.message) + '</span></p></div>';
            jQuery("#chattext").html(newHtml);

            Biz.ITC.Chat.lastmessageTime = msg.timestamp;
        }
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_USER, msg.from);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_TIME, msg.timestamp);
        if (isNew) {
           
            Biz.ITC.Chat.playsound();
            var historyListStr = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_MSG_LIST) || '[]';
            var historyList = JSON.parse(historyListStr);
            historyList.push(msg);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_MSG_LIST, JSON.stringify(historyList));
        }

        Biz.ITC.Chat.ResetTimer();
        Biz.ITC.Chat.scrollToBottom();
    },

    showSystemMsg: function (msg, isNew, timestamp) {
        var time = new Date().getTime();
        var getLastSendUser = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.LAST_CHAT_USER);
        timestamp = timestamp || 0;
        
        var id = 'div[uniqmsgid="' + (isNew?time:timestamp) + '"]';
        var existDom = jQuery(id);
        if (!existDom[0]) {
            var oldHtml = jQuery("#chattext").html();
            var newHtml = oldHtml + '<div class="messageBlock system" tabindex="0" uniqmsgid="' + (isNew ? time : timestamp) + '">' +
                (getLastSendUser == 'sys' ? '' : '<h5 class="messageSender" aria-hidden="true">System</h5>') +
                '<p class="messageTextWrapper">' +
                '<span class="screenReader">System message </span>' +
                '<span class="messageText">' + Biz.ITC.Chat.HTMLEncode(msg) + '</span></p></div>';
            jQuery("#chattext").html(newHtml);
        }

        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.LAST_CHAT_USER, 'sys');
        if (isNew) {
            var historyListStr = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_MSG_LIST) || '[]';
            var historyList = JSON.parse(historyListStr);
            historyList.push({ from: 'sys', name: 'System', message: msg, timestamp: time });
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_MSG_LIST, JSON.stringify(historyList));
            Biz.ITC.Chat.playsound();
        }
        Biz.ITC.Chat.scrollToBottom();
    },

    clickStartChat: function () {
        Biz.ITC.ChatWith.setWindowState('1', true);
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE);
        if (chatState == Biz.ITC.Chat.CHAT_LOGIN || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
            return;
        }
        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_MSG_LIST);
        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_CS_NAME);
        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_STATE);
        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.CHAT_POSITION);
        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.LAST_CHAT_USER);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_RESTART);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IS_NEW_CHAT, true);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IN_CHAT_CLICK, true);

    },

    scrollToBottom: function () {
        if (Biz.ITC.Chat.myscroll) {
            Biz.ITC.Chat.myscroll.refresh();
            var clientHeight = jQuery("#chattextWrapper").height();
            var realHeight = jQuery("#chattext").height();
            if (clientHeight < realHeight) {
                Biz.ITC.Chat.myscroll.scrollTo(0, clientHeight - realHeight);
            }
        }
    },

    showStartChat: function () {

        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        var userName = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_USER_NAME) || "";
        var email = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_EMAIL) || "";
        if (userName == Biz.ITC.Chat.USER_NAME && Biz.ITC.Chat.EMAIL == email) {
            if (chatState == Biz.ITC.Chat.CHAT_LOGIN || chatState == Biz.ITC.Chat.CHAT_IN_QUEUE) {
                var historyList = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_MSG_LIST) || '[]';
                Biz.ITC.Chat.onHistory(JSON.parse(historyList));
            }
        }

        clearTimeout(Biz.ITC.Chat.timer);
        Biz.ITC.Chat.showSystemMsg('The Session has ended', false);


        jQuery("#footerRow").addClass("hide");
        jQuery("#startNewChatRow").removeClass("hide");
        Biz.ITC.Chat.scrollToBottom();
    },

    closeChat: function () {
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_LOGOUT);
        window.sessionStorage.setItem("_ng_itc_chat", "0");
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_CAN_SURVEY, "0");
        if (Biz.ITC.Chat.socket) {
            Biz.ITC.Chat.showStartChat();
            Biz.ITC.Chat.socket.emit('close', {});
            Biz.ITC.Chat.socket.emit('disconnect');
        }
    },

    ResetTimer: function () {
        clearTimeout(Biz.ITC.Chat.timer);
        Biz.ITC.Chat.timer = setTimeout(function () {
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, Biz.ITC.Chat.CHAT_TIME_OUT);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_LOGIN_TIME, 0);
            //Biz.ITC.Chat.showStartChat();
            Biz.ITC.ChatWith.closeChatInframe();
            //Biz.ITC.Chat.socket.emit('disconnect');
        }, Biz.ITC.Chat.CHAT_TIMEOUT);
    },

    isChat: function () {
        // get current tab is in the chat
        var isIntheChat = Biz.ITC.Chat.socket && Biz.ITC.Chat.socket.connected;
        if (isIntheChat) {
            var ischat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_CAN_SURVEY) || "";
            return ischat == "1";
        } else {
            return false;
        }
    },

    offLine: function (e) {
        Biz.ITC.Chat.showSystemMsg('The network has been disconnected, please check the network', false,new Date().getTime());
        jQuery('#textarea').attr('disabled', 'disabled');
        jQuery('#sendButton').attr('disabled', 'disabled');
        jQuery("#textarea").removeAttr("placeholder");
        jQuery("#textarea").removeAttr("title");
    },

    online: function (e) {
        Biz.ITC.Chat.showSystemMsg('The network has been restored', false, new Date().getTime());
        var chatState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE) || "";
        if (chatState == Biz.ITC.Chat.CHAT_LOGIN) {
            jQuery('#textarea').removeAttr('disabled');
            jQuery('#sendButton').removeAttr('disabled');
            jQuery("#textarea").attr("placeholder", "Type here");
            jQuery("#textarea").attr("title", "Type here");
        }
    },

    isSameChat:function() {
        var userName = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_USER_NAME) || "";
        var email = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_EMAIL) || "";
        var localDataLoginTime = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_LOGIN_TIME) || 0;
        if (userName != Biz.ITC.Chat.USER_NAME ||
            email != Biz.ITC.Chat.EMAIL ||
            localDataLoginTime != Biz.ITC.Chat.loginTime) {
            Biz.ITC.Chat.onDisconnect();
            return false;
        }
        return true;
    },

    HTMLEncode: function (html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },

    setChatSource:function (source) {
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_SOURCE,source);
    },
}

usingNamespace("Biz.ITC")["LocalStorage"] = {
    CHAT_STATE: "CHAT_STATE",
    CHAT_USER_NAME: "CHAT_USER_NAME",
    CHAT_EMAIL: "CHAT_EMAIL",
    CHAT_WINDOW_IS_OPEN: "CHAT_WINDOW_IS_OPEN",
    CHAT_BASIC_INFO: "CHAT_BASIC_INFO",
    LAST_CHAT_USER: "LAST_CHAT_USER",
    CHAT_LOGIN_TIME: "CHAT_LOGIN_TIME",
    CHAT_EXPIRATION_TIME: "CHAT_EXPIRATION_TIME",
    LAST_CHAT_TIME: "LAST_CHAT_TIME",
    CHAT_MSG_LIST: 'CHAT_MSG_LIST',
    CHAT_CS_NAME: "CHAT_CS_NAME",
    CHAT_CAN_SURVEY: "CHAT_CAN_SURVEY",
    CHAT_POSITION: 'CHAT_POSITION',
    CHAT_TIME_OUT: 'CHAT_TIME_OUT',
    IS_NEW_CHAT: 'IS_NEW_CHAT',
    IN_CHAT_CLICK: 'IN_CHAT_CLICK',
    SHOW_CHAT_WINDOW_INIT:'SHOW_CHAT_WINDOW_INIT',
    CHAT_INFO: 'CHAT_INFO',
    CHAT_SOURCE:"CHAT_SOURCE",

    getData: function (key) {
        var storageKey = Biz.ITC.LocalStorage.CHAT_INFO;
        var dataStr = localStorage.getItem(storageKey);
        if (dataStr) {
            var dataJson = JSON.parse(dataStr);
            if (!key) {
                return dataJson;
            }
            var dataMap = Immutable.Map(dataJson);
            return dataMap.get(key);
        }
        return null;
    },

    setData: function (key, value) {
        var storageKey = Biz.ITC.LocalStorage.CHAT_INFO;
        var dataStr = localStorage.getItem(storageKey);
        if (dataStr) {
            var dataJson = JSON.parse(dataStr);
            var dataMap = Immutable.Map(dataJson);
            dataMap = dataMap.set(key, value);
            localStorage.setItem(storageKey, JSON.stringify(dataMap));
        } else {
            var data = {};
            var dataMap = Immutable.Map(data);
            dataMap = dataMap.set(key, value);
            localStorage.setItem(storageKey, JSON.stringify(dataMap));
        }
    },
    clearItem: function (key) {
        var storageKey = Biz.ITC.LocalStorage.CHAT_INFO;
        var dataStr = localStorage.getItem(storageKey);
        if (dataStr) {
            var dataJson = JSON.parse(dataStr);
            var dataMap = Immutable.Map(dataJson);
            dataMap = dataMap.delete(key);
            localStorage.setItem(storageKey, JSON.stringify(dataMap));
        }
    },
    clearKey: function () {
        var storageKey = Biz.ITC.LocalStorage.CHAT_INFO;
        localStorage.removeItem(storageKey);
    }
}

usingNamespace("Biz.ITC")["Survey"] = {
    apiUrl: '',
    invokeExitSurvey: function (apiUrl) {

        if (!Biz.ITC.Survey.apiUrl) {
            jQuery("a[data-source-id='popUpExitSurvey_Content']").click(function () {
                jQuery("#centerPopup461235").hide();
                jQuery("#popUpExitSurvey_Content #overlay").hide();
                jQuery("#popUpExitSurvey_Content .loading-text").hide();
            });
            jQuery("#popUpExitSurvey_Content #overlay").click(function () {
                jQuery("#centerPopup461235").hide();
                jQuery("#popUpExitSurvey_Content #overlay").hide();
                jQuery("#popUpExitSurvey_Content .loading-text").hide();
            });
        }

        Biz.ITC.Survey.apiUrl = apiUrl;
        // show overlay

        var backgorundOverview = jQuery("#popUpExitSurvey_Content #overlay");
        var loader = jQuery("#popUpExitSurvey_Content .loading-text");


        backgorundOverview.show();
        loader.show();


        jQuery.ajax({
            url: Biz.ITC.Survey.apiUrl
        }).then(function (data) {
            loader.hide();
            if (typeof data != undefined &&
                typeof data.Result != undefined &&
                typeof data.ResponseCode != undefined &&
                data.ResponseCode == 200) {
                //Fill in iframe
                var hcode = data.Result.Html.replace(/centerPopup-700-content/g, ' ')
                    .replace(/layout-half/g, 'layout-wide');

                var $showExitSurvey = jQuery("#centerPopup461235");
                Biz.ITC.Survey.loadExitSurvey($showExitSurvey, hcode);
            } else {
                loader.hide();
            }
        });
    },
    loadExitSurvey: function ($self, htmlCode) {
        if (htmlCode) {
            var iframesurvey = $self.find("#iframesurvey");
            //iframesurvey.attr("src", "");

            //jQuery(iframesurvey).attr('srcdoc', htmlCode);
            if (iframesurvey) {
                var iframe = iframesurvey[0];
                iframe.contentWindow.document.open();
                iframe.contentWindow.document.write(htmlCode);
                iframe.contentWindow.document.close();
            }

            //Show exit survey
            $self.show();
            jQuery('html,body').animate({ scrollTop: 0 }, 500);
        }
    }
}

usingNamespace("Biz.ITC")["ChatWith"] = {
    hasClass: function (elem, cls) {
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
    },

    addClass: function (elem, cls) {
        if (!Biz.ITC.ChatWith.hasClass(elem, cls)) {
            elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
        }
    },

    removeClass: function (elem, cls) {
        if (Biz.ITC.ChatWith.hasClass(elem, cls)) {
            var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
            while (newClass.indexOf(' ' + cls + ' ') >= 0) {
                newClass = newClass.replace(' ' + cls + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    },

    hideConciergeWindow: function (isShow) {

        Biz.ITC.ChatWith.removeClass(document.getElementById('concierge'), "con-open-widget");
        Biz.ITC.ChatWith.removeClass(document.getElementById('conciergeChatNow'), "con-active");
        Biz.ITC.ChatWith.removeClass(document.getElementById('conciergeChatNow'), "con-pressed");
        Biz.ITC.ChatWith.removeClass(document.getElementById('concierge-widget-area'), "con-open");
        if (isShow == false) {
            jQuery("#concierge").css('display', 'none');
        }
        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "hide", value: '' }, "*");
    },

    showConciergeWindow: function () {

        Biz.ITC.ChatWith.addClass(document.getElementById('concierge'), "con-open-widget");
        Biz.ITC.ChatWith.addClass(document.getElementById('conciergeChatNow'), "con-active");
        Biz.ITC.ChatWith.addClass(document.getElementById('conciergeChatNow'), "con-pressed");
        Biz.ITC.ChatWith.addClass(document.getElementById('concierge-widget-area'), "con-open");
        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "show", value: '' }, "*");
    },

    invokeStartChat: function (value) {

        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "startChat", value: JSON.stringify(value) }, "*");
    },

    invokeHeaderStartChat: function () {
        jQuery("#concierge").css('display', '');
        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "headerStartChat", value: '' }, "*");
    },

    invokeCancelOrderStartChat: function (message, loginName, email, ordernumber, siteBU) {
        jQuery("#concierge").css('display', '');
        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "CancelOrderStartChat", value: '', msg: message, loginName: loginName, email: email, ordernumber: ordernumber }, "*");
    },

    closeChat: function () {
        var chatframe = Biz.ITC.ChatWith.getframeWindow();
        chatframe.postMessage({ key: "close", value: '' }, "*");
    },
    getframeWindow: function () {
        return document.getElementById("chatiframe").contentWindow;
    },
    setWindowState: function (data, inChat) {
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_WINDOW_IS_OPEN, data);
        if (inChat) {
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IN_CHAT_CLICK, true);
        }
    },
    // main事件
    maininit: function (winshowState) {
        if (winshowState == "1") {
            Biz.ITC.ChatWith.showConciergeWindow();
        } else {
            Biz.ITC.ChatWith.hideConciergeWindow();
        }
    },
    showSurvey: function (value) {
        if (value.isShowSurvery) {
            window.sessionStorage.setItem("_neg_feedback_custom_url_", value.surveyUrl);
            Biz.ITC.Survey.invokeExitSurvey(value.faqurl);
        } else {
            var chatframe = Biz.ITC.ChatWith.getframeWindow();
            chatframe.postMessage({ key: "hiddenWindow", value: '' }, "*");
        }
    },

    clientIsShowChatWindow: function (isShow) {
        var result = isShow;
        if (isShow != true) {
            var localData = Biz.ITC.LocalStorage.getData();
            if (localData) {
                var localchatexpriationTime = localData.CHAT_EXPIRATION_TIME || 0;
                var chatexpritionTime = new Date(localchatexpriationTime);
                var dateNow = new Date();
                if (chatexpritionTime > dateNow) {
                    var lastChatTime = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.LAST_CHAT_TIME) || 0;
                    var chatTimeOut = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_TIME_OUT) || 0;
                    var isInChat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE);
                    if ((isInChat == Biz.ITC.Chat.CHAT_LOGIN && new Date() < new Date(lastChatTime + chatTimeOut) ||
                        isInChat == Biz.ITC.Chat.CHAT_IN_QUEUE)) {
                        result = true;
                    }
                }
            }
        }
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.SHOW_CHAT_WINDOW_INIT, isShow);
        window.parent.postMessage({ key: "isShowWindow", value: result }, "*");
    },
    clientCloseWindow: function () {
        var isShow = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.SHOW_CHAT_WINDOW_INIT);
        window.parent.postMessage({ key: "hiddenWindow", value: isShow }, "*");
    },

    // frame事件
    closeChatInframe: function () {
        var chatstate = Biz.ITC.Chat.isChat();
        var source = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_SOURCE) || '';
        var opdata_customVars = "{LoginName:\"##C_LOGIN_NAME\",AgentName:\"##C_AGENT_UNAME\",SessionID:\"##C_SESSION_ID\",Source:\"##C_SOURCE\"}";
        var opdata_result = opdata_customVars.replace("##C_LOGIN_NAME", Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_USER_NAME) || "")
            .replace("##C_AGENT_UNAME", Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_CS_NAME) || "")
            .replace("##C_SESSION_ID", Biz.ITC.Chat.CASE_NUMBER)
            .replace("##C_SOURCE", source);
        var surveyUrl = window.location.origin + "/contactus?opdata_customVars=" + opdata_result;
        if (chatstate) {
            Biz.ITC.Chat.closeChat();
        }
        window.parent.postMessage({ key: "showsurvery", value: { surveyUrl: surveyUrl, isShowSurvery: chatstate } }, "*");
    },
    getwindowstate: function () {
        var winshowState = "0";
        var isInChat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_STATE);
        var lastChatTime = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.LAST_CHAT_TIME) || 0;
        var chatTimeOut = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_TIME_OUT) || 0;
        var isNewChat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.IS_NEW_CHAT);
        var inChat = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.IN_CHAT_CLICK) || false;
        if (isNewChat) {
            if (isInChat == Biz.ITC.Chat.CHAT_RESTART && !inChat) {
                winshowState = "0";
            } else {
                winshowState = "1";
            }
        } else {
            if ((isInChat == Biz.ITC.Chat.CHAT_LOGIN && new Date() < new Date(lastChatTime + chatTimeOut))||
                isInChat == Biz.ITC.Chat.CHAT_IN_QUEUE) {
                    winshowState = Biz.ITC.LocalStorage.getData(Biz.ITC.LocalStorage.CHAT_WINDOW_IS_OPEN);
            } else {
                if (inChat) {
                    winshowState = "1";

                }
            }
        }

        Biz.ITC.LocalStorage.clearItem(Biz.ITC.LocalStorage.IN_CHAT_CLICK);
        window.sessionStorage.setItem("_ng_itc_chat", "0");
        window.parent.postMessage({ key: "windowstate", value: winshowState }, "*");
    },
    statrtChat: function (value) {
        var jsonvalue = JSON.parse(value);
        Biz.ITC.LocalStorage.clearKey();
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_USER_NAME, jsonvalue.loginName);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_EMAIL, jsonvalue.email);
        var message = { msg: jsonvalue.subject, orderNumber: jsonvalue.orderNumber, selectLanguge: 'en-us' };
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_BASIC_INFO, JSON.stringify(message));
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IS_NEW_CHAT, true);
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_STATE, "");
        Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_WINDOW_IS_OPEN, "1");
    }
}

usingNamespace("Biz.ITC")["Init"] = {
    loadITCInfo: function (surveryUrl) {
        jQuery(document).ready(function (e) {

            var iframe = document.getElementById("chatiframe");
            if (iframe.attachEvent) {
                iframe.attachEvent("onload",
                    function () {
                        Biz.ITC.ChatWith.init(surveryUrl);
                    });
            } else {
                iframe.onload = function () {
                    Biz.ITC.ChatWith.init(surveryUrl);
                }
            }
        })
    }
}

usingNamespace("Biz.ITC")["PreChat"] = {
    checkInputLength: function (taname) {
        var tlt = "Too many characters";
        var taval = document.getElementById(taname).value;
        var maxlen = parseInt(document.getElementById(taname).getAttribute("__namaxLength"));
        if (taval.length > maxlen) {
            alert(tlt);
            document.getElementById(taname).value = taval.substring(0, maxlen);
            document.getElementById(taname).focus();
            return false;
        }
    },
    confirmSubmit: function () {
        if (window.navigator.onLine) {
            var loginName = jQuery("#LoginName").val().trim();
            var email = jQuery("#Email").val().trim();
            var subject = jQuery("#Subject").val().trim();
            var ordernumber = jQuery("#OrderNumber").val().trim();
            var selectLangue = jQuery("#selectLanguage").val().trim();
            Biz.ITC.LocalStorage.clearKey();
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.IS_NEW_CHAT, true);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_USER_NAME, loginName);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_EMAIL, email);
            Biz.ITC.LocalStorage.setData(Biz.ITC.LocalStorage.CHAT_BASIC_INFO,
                JSON.stringify({ msg: subject, orderNumber: ordernumber, selectLanguge: selectLangue }));

            return true;
        } else {
            return false;
        }
       
    },
    validate: function (value) {
        if (value) {
            return value.trim();
        } else {
            return '';
        }
    }
}