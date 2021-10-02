// document.write('<script src="./core/K_Class.js"></script>');

/**
 * @author KOOZone
 */
$(document).ready(function() {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 생성
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // 변수
    var calendar_arr = [];

    // var today_str = changeDateToString(new Date());
    var today_str = "20160504_235945";
    var viewday_str = "20160521";

    var dayForm1_str = "일, 월, 화, 수, 목, 금, 토";
    var dayForm2_str = "SUN, MON, TUE, WED, THU, FRI, SAT";
    var dayForm3_str = "日, 月, 火, 水, 木, 金, 土";

    var enableSchedule_arr = [
        // {term: "20150501~20150531", label: "가정의 달"},
        // {term: "20160505~20160511", label: "가정의 날 행사기간"},
        // {term: "20160514~20160520", label: "불교계 시민단체 행사기간"},
        {term: "20160418~20160510"},
        {term: "20160521~20160625"}
    ];

    var selectSchedule_arr = [
        {term: "20160526~20160527"}
    ];

    var areaAgenda_arr = [
        {
            class: "area_over",
            schedule: [
                
            ]
        },
        {
            class: "area_select",
            schedule: [
                
            ]
        }
    ];

    var memoryAgenda_arr = [
        {
            class: "memory_holiday",
            schedule: [
                {term: "20160207~20160210", label: "설날"},
                {term: "20160413", label: "선거일"},
                {term: "20160514", label: "석가탄신일"},
                {term: "20160914~20160916", label: "추석"},

                {term: "19500101", label: "신정", repeat: "y+100"},
                {term: "19500301", label: "삼일절", repeat: "y+100"},
                {term: "19500505", label: "어린이날", repeat: "y+100"},
                {term: "19500606", label: "현충일", repeat: "y+100"},
                {term: "19500815", label: "광복절", repeat: "y+100"},
                {term: "19501003", label: "개천절", repeat: "y+100"},
                {term: "19501009", label: "한글날", repeat: "y+100"},
                {term: "19501225", label: "크리스마스", repeat: "y+100"}
            ]
        },
        {
            class: "memory_normal",
            schedule: [
                {term: "20160511", label: "경칩", repeat: "2w+3"},
                {term: "19500505", label: "창립기념일", repeat: "y+100"}
            ]
        },
        {
            class: "memory_special",
            schedule: [
                // {term: "19730903", label: "쿠존 생일", repeat: "y+100"}
            ]
        }
    ];

    var eventAgenda_arr = [
        {
            class: "event_gmail",
            group: "koozone",
            schedule: [
                {term: "20160509~20160511", label: "휴가"},
                {term: "20000120", label: "난방 점검일", repeat: "m+600"},
                {term: "19730903", label: "친구 생일", repeat: "y+50"}
            ]
        }
    ];

    var self;
    
    // 생성자
    main();
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 초기화
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function main() {
        self = this;

        initMain();
        setMain();
    }

    function initMain() {
        Object.defineProperty(self, "today",            {get: getterToday,          set: setterToday});
        Object.defineProperty(self, "viewday",          {get: getterViewday,        set: setterViewday});

        Object.defineProperty(self, "enableSchedule",   {get: getterEnableSchedule, set: setterEnableSchedule});
        Object.defineProperty(self, "selectSchedule",   {get: getterSelectSchedule, set: setterSelectSchedule});

        Object.defineProperty(self, "areaAgenda",       {get: getterAreaAgenda,     set: setterAreaAgenda});
        Object.defineProperty(self, "memoryAgenda",     {get: getterMemoryAgenda,   set: setterMemoryAgenda});
        Object.defineProperty(self, "eventAgenda",      {get: getterEventAgenda,    set: setterEventAgenda});

        // 이벤트 설정
        $(self).on("CustomEvent.CHANGE_AGENDA_SELECT", changeAgendaSelect);

        $("#button_goToday").on("click", function() {
            self.viewday = self.today;
            // // 오늘 날짜 선택
            // self.selectSchedule = [{term: calendar_arr[2].today}];
        });
        $("#button_prevYear").on("click", function() {
            self.viewday = changeSateByCount(self.viewday, -1, "y");
        });
        $("#button_nextYear").on("click", function() {
            self.viewday = changeSateByCount(self.viewday, 1, "y");
        });
        $("#button_prevMonth").on("click", function() {
            self.viewday = changeSateByCount(self.viewday, -1, "m");
        });
        $("#button_nextMonth").on("click", function() {
            self.viewday = changeSateByCount(self.viewday, 1, "m");
        });
        $("#button_setSelect").on("click", function() {
            var term_str = $("#input_selectBegin").val();
            if (!term_str) return;

            if ($("#input_selectBegin") != $("#input_selectEnd")) {
                term_str += "~";
                term_str += $("#input_selectEnd").val();
            }
            var schedule_arr = [];
            schedule_arr.push({term: term_str});

            self.selectSchedule = schedule_arr;
        });
        $("#button_addSelect").on("click", function() {
            var term_str = $("#input_selectBegin").val();
            if (!term_str) return;

            if ($("#input_selectBegin") != $("#input_selectEnd")) {
                term_str += "~";
                term_str += $("#input_selectEnd").val();
            }
            var schedule_arr = self.selectSchedule;
            schedule_arr.push({term: term_str});

            self.selectSchedule = schedule_arr;
        });
        $("#button_removeSelect").on("click", function() {
            var schedule_arr = [];

            self.selectSchedule = schedule_arr;
        });
    }

    function setMain() {
        makeCalendar();

        viewday = viewday_str;

        // enableSchedule = enableSchedule_arr;
        selectSchedule = selectSchedule_arr;

        memoryAgenda = memoryAgenda_arr;
        eventAgenda = eventAgenda_arr;
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 속성
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // viewday
    function setterViewday(dayStr){
        viewday_str = dayStr.slice(0, 6) + "01";

        calendar_arr[0].viewday = changeSateByCount(self.viewday, -1, "m");
        calendar_arr[1].viewday = changeSateByCount(self.viewday, 1, "m");
        calendar_arr[2].viewday = changeSateByCount(self.viewday, 0, "m");
        calendar_arr[3].viewday = changeSateByCount(self.viewday, -12, "m");
        calendar_arr[4].viewday = changeSateByCount(self.viewday, 12, "m");
    }
    function getterViewday(){
        return viewday_str;
    }

    // today
    function setterToday(dayStr) {
        today_str = dayStr;
        
        calendar_arr[0].today = self.today;
        calendar_arr[1].today = self.today;
        calendar_arr[2].today = self.today;
        calendar_arr[3].today = self.today;
        calendar_arr[4].today = self.today;
    }
    function getterToday() {
        return today_str.split("_")[0];
    };

    // enableSchedule
    function setterEnableSchedule(scheduleArr) {
        enableSchedule_arr = scheduleArr;

        calendar_arr[0].enableSchedule = self.enableSchedule;
        calendar_arr[1].enableSchedule = self.enableSchedule;
        calendar_arr[2].enableSchedule = self.enableSchedule;
        calendar_arr[3].enableSchedule = self.enableSchedule;
        calendar_arr[4].enableSchedule = self.enableSchedule;
    }
    function getterEnableSchedule() {
        return enableSchedule_arr;
    };

    // selectSchedule
    function setterSelectSchedule(scheduleArr) {
        selectSchedule_arr = scheduleArr;

        var schedule_arr = self.selectSchedule;
        var agenda_arr = self.areaAgenda;
        agenda_arr = modifyAgenda(...[agenda_arr, "area_over", 0, NaN, ...schedule_arr]);
        agenda_arr = modifyAgenda(...[agenda_arr, "area_select", 0, NaN, ...schedule_arr]);

        self.areaAgenda = agenda_arr;

        // 이벤트 발생
        $(self).trigger("CustomEvent.CHANGE_AGENDA_SELECT");
    }
    function getterSelectSchedule() {
        return selectSchedule_arr;
    };

    // areaAgenda
    function setterAreaAgenda(agendaArr) {
        areaAgenda_arr = agendaArr;

        calendar_arr[0].areaAgenda = self.areaAgenda;
        calendar_arr[1].areaAgenda = self.areaAgenda;
        calendar_arr[2].areaAgenda = self.areaAgenda;
        calendar_arr[3].areaAgenda = self.areaAgenda;
        calendar_arr[4].areaAgenda = self.areaAgenda;
    }
    function getterAreaAgenda() {
        return areaAgenda_arr;
    };

    // memoryAgenda
    function setterMemoryAgenda(agendaArr) {
        memoryAgenda_arr = agendaArr;

        calendar_arr[0].memoryAgenda = self.memoryAgenda;
        calendar_arr[1].memoryAgenda = self.memoryAgenda;
        calendar_arr[2].memoryAgenda = self.memoryAgenda;
        calendar_arr[3].memoryAgenda = self.memoryAgenda;
        calendar_arr[4].memoryAgenda = self.memoryAgenda;
    }
    function getterMemoryAgenda() {
        return memoryAgenda_arr;
    };

    // eventAgenda
    function setterEventAgenda(agendaArr) {
        eventAgenda_arr = agendaArr;

        calendar_arr[0].eventAgenda = self.eventAgenda;
        calendar_arr[1].eventAgenda = self.eventAgenda;
        calendar_arr[2].eventAgenda = self.eventAgenda;
        calendar_arr[3].eventAgenda = self.eventAgenda;
        calendar_arr[4].eventAgenda = self.eventAgenda;
    }
    function getterEventAgenda() {
        return eventAgenda_arr;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 메소드
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 지역 함수
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    function makeCalendar() {
        var target_arr = $(".calendar");
        var calendar_mc;

        for (var i = 0; i < target_arr.length; i++) {
            // 대상 치환
            calendar_mc = replaceInstance($(target_arr[i]), new K_Calendar(today_str));

            if (i == 0) {
                calendar_mc.titleForm = '<span style="color:red;">{year}</span> - <u>{Month}</u>';
                calendar_mc.dayForm = dayForm3_str;
                calendar_mc.dateForm = '<p>{date}</p>';
            }
            if (i == 1) {
                calendar_mc.titleForm = '<small>··· {Year}년 {Month}월 ···</small>';
                calendar_mc.dateForm = '<small><u>{Date}</u></small>';
            }
            if (i == 2) {
                calendar_mc.dayForm = dayForm2_str;
                calendar_mc.dateForm = '<p style="text-align:right; margin-right:8px;">{date}</p>';
                calendar_mc.memoryForm = '<p style="text-align:right; margin-right:8px;">{label}</p>';
                calendar_mc.eventForm = '<p style="text-align:left; margin-right:8px;" class="event_bar">{label}</p>';
            }
            if (i == 3 || i == 4) {
                calendar_mc.dateForm = '<p>{Date}</p>';
                calendar_mc.memoryForm = '<span>●</span>';
                calendar_mc.eventForm = '<span><br><br>●</span>';
            }

            // 이벤트 설정
            calendar_mc.on("CustomEvent.MOUSE_OVER_CELL_DATE", mouseOverCellDate);
            calendar_mc.on("CustomEvent.MOUSE_OUT_CELL_DATE", mouseOutCellDate);
            calendar_mc.on("CustomEvent.CLICK_CELL_DATE", clickCellDate);

            calendar_arr.push(calendar_mc);
        }
    }

    function writeSelectSchedule() {
        var agendaSelect_obj = getListItem(self.areaAgenda, "class", "area_select");
        var term_str = (agendaSelect_obj["schedule"].length) ? agendaSelect_obj["schedule"][0]["term"] : "";
        var term_obj = getTermDateData(term_str);

        // 선택된 일정이 있으면
        if (term_str) {
            $("#input_selectInfo").val(getTermOfAgendaInfo(self.memoryAgenda, term_str));
            $("#input_selectBegin").val(term_obj["begin"]);
            $("#input_selectEnd").val(term_obj["end"]);

        } else {
            $("#input_selectInfo").val("");
            $("#input_selectBegin").val("");
            $("#input_selectEnd").val("");
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // 아젠다 수정
    function modifyAgenda(agendaArr, classStr, indexNum, deleteNum/*, ...args*/) {
        var args = Array.prototype.slice.call(arguments, 4);
        var return_arr = agendaArr.concat();

        var agenda_obj = getListItem(return_arr, "class", classStr);
        agenda_obj["schedule"] = modifySchedule(...[agenda_obj["schedule"], indexNum, deleteNum, ...args]);

        return return_arr;
    }

    // 일정 수정
    function modifySchedule(scheduleArr, indexNum, deleteNum/*, ...args*/) {
        var args = Array.prototype.slice.call(arguments, 3);
        var return_arr = scheduleArr.concat();

        if (isNaN(deleteNum)) {
            return_arr.splice(indexNum);
            deleteNum = 0;
        }
        return_arr.splice(...[indexNum, deleteNum, ...args]);

        return return_arr;
    }

    function getModifyAgenda(agendaArr, classStr, dateStr) {
        var agenda_obj = getListItem(agendaArr, "class", classStr);
        var retur_arr = getModifySchedule(agenda_obj["schedule"], dateStr);

        return retur_arr;
    }

    // 일정을 주어진 날짜와 비교하여 다시 조합후 리턴
    function getModifySchedule(scheduleArr, dateStr) {
        var term_str = (scheduleArr.length) ? scheduleArr[0]["term"] : "";
        var return_arr = [{term: dateStr}];

        // 일정이 있으면, 기존 날짜가 하루면
        if (term_str && term_str.indexOf("~") == -1) {
            var count_num = Number(dateStr) - Number(term_str);

            // 기존 날짜보다 비교 날짜가 이전이면
            if (count_num < 0) {
                return_arr = [{term: dateStr}];

            // 기존 날짜보다 비교 날짜가 이후면
            } else if (count_num > 0) {
                return_arr = [{term: term_str + "~" + dateStr}];

            // 기존 날짜와 비교 날짜가 같으면
            } else {
               return_arr = [];
            }
        }
        return return_arr;
    }

    function getTermOfAgendaInfo(agendaArr, termStr) {
        var return_str = "";
        var likeAgenda_arr;

        // 선택된 날이 하루면
        if (termStr.indexOf("~") == -1) {
            likeAgenda_arr = getLikeAgendaList(agendaArr, termStr);
            return_str += termStr.replace(/(\d{4})(\d{2})(\d{2})/i, "$1년 $2월 $3일");

            for (var m = 0; m < likeAgenda_arr.length; m++) {
                return_str += (m == 0) ? " (" : ", ";
                return_str += likeAgenda_arr[m]["label"];
                return_str += (m == likeAgenda_arr.length - 1) ? ")" : "";
            }

        } else {
            return_str += termStr.split("~")[0].replace(/(\d{4})(\d{2})(\d{2})/i, "$1년 $2월 $3일");
            return_str += " ~ ";
            return_str += termStr.split("~")[1].replace(/(\d{4})(\d{2})(\d{2})/i, "$1년 $2월 $3일");
        }
        return return_str;
    }

    function replaceInstance(targetMc, replaceMc) {
        // id 승계
        replaceMc.attr("id", targetMc.attr("id"));
        replaceMc.attr("style", targetMc.attr("style"));

        targetMc.replaceWith(replaceMc);

        return replaceMc;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 리스너 함수
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function mouseOverCellDate(event, cellMc) {
        var schedule_arr = getModifyAgenda(self.areaAgenda, "area_select", cellMc.data("cellday"));
        var agenda_arr = modifyAgenda(...[self.areaAgenda, "area_over", 0, NaN, ...schedule_arr]);
        
        self.areaAgenda = agenda_arr;
    }

    function mouseOutCellDate(event, cellMc) {
        var schedule_arr = [];
        var agenda_arr = modifyAgenda(...[self.areaAgenda, "area_over", 0, NaN, ...schedule_arr]);

        self.areaAgenda = agenda_arr;
    }

    function clickCellDate(event, cellMc) {
        var root_mc = cellMc.data("rootMc");

        console.log("today :", root_mc.today);
        console.log("viewday :", root_mc.viewday);
        console.log("areaAgenda :", root_mc.areaAgenda);
        console.log("memoryAgenda :", root_mc.memoryAgenda);
        console.log("eventAgenda :", root_mc.eventAgenda);

        console.log("cellday :", cellMc.data("cellday"));
        // console.log("cellEnable :", cellMc.data("cellEnable"));
        console.log("cellArea :", cellMc.data("cellArea"));
        console.log("cellMemory :", cellMc.data("cellMemory"));
        console.log("cellEvent :", cellMc.data("cellEvent"));
        console.log("----------");


        var schedule_arr = getModifyAgenda(self.areaAgenda, "area_select", cellMc.data("cellday"));

        self.selectSchedule = schedule_arr;
    }

    function changeAgendaSelect(event) {
        writeSelectSchedule();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////
});

