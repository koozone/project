
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    var K_Data = (function() {

        var data_obj = {};
        var allow_obj = {string:1, number:1, boolean:1};
        var prefix_str = (Math.random() + "_").slice(2);

        return {
            hasOwnProperty: function(keyStr) {
                return Object.prototype.hasOwnProperty.call(data_obj, prefix_str + keyStr);
            },

            setValue: function(keyStr, valueObj) {
                if (this.hasOwnProperty(keyStr)) {
                    return false;
                }
                if (!Object.prototype.hasOwnProperty.call(allow_obj, typeof valueObj)) {
                    return false;
                }
                data_obj[prefix_str + keyStr] = valueObj;
                return true;
            },

            getValue: function(keyStr) {
                if (this.hasOwnProperty(keyStr)) {
                    return data_obj[prefix_str + keyStr];
                }
                return null;
            }
        };

    }());

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    var K_Gadget = (function() {

        var instance_mc;
        var amount_num = 500;
        var color_str = "red";
        var index_num = 0;

        K_Gadget = function(indexNum) {
            instance_mc = $('<div class="table" style="width:200px; height:200px; border: 1px solid #cccccc;" />');
            index_num = indexNum;

            this.instance = instance_mc;
            this.amount = amount_num;
            this.color = color_str;
            this.index = index_num;
        };

        K_Gadget.prototype.setColor = function() {
            this.instance.css("color", "red");
        };

        return K_Gadget;

    }());

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    var K_Calendar = (function() {
        return function(todayDate) {
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // 생성
            ////////////////////////////////////////////////////////////////////////////////////////////////////

            // 변수
            var today_date;
            var today_str = (todayDate) ? todayDate : changeDateToString(new Date());
            var viewday_str = today_str;

            var titleForm_str = "{Year}년 {month}월";
            var dayForm_str = "일, 월, 화, 수, 목, 금, 토";
            var dateForm_str = "{date}";
            var memoryForm_str = "";
            var eventForm_str = "";

            var enableSchedule_arr = [
                {term: "19000101~20991231"}
            ];
            var areaAgenda_arr = [];
            var memoryAgenda_arr = [];
            var eventAgenda_arr = [];

            var self;

            // 생성자
            // return function(viewdayDate, todayDate) {
                // viewday_str = (viewdayDate) ? viewdayDate : new Date();
                // today_str = (todayDate) ? todayDate : new Date();

                return function() {
                    self = this;

                    initMain.call(self);
                    setMain.call(self);

                    return self;
                }.call($("<div />"));
            // };

            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // 초기화
            ////////////////////////////////////////////////////////////////////////////////////////////////////

            function initMain() {
                Object.defineProperty(self, "today",            {get: getterToday,          set: setterToday});
                Object.defineProperty(self, "viewday",          {get: getterViewday,        set: setterViewday});

                Object.defineProperty(self, "titleForm",        {get: getterTitleForm,      set: setterTitleForm});
                Object.defineProperty(self, "dayForm",          {get: getterDayForm,        set: setterDayForm});
                Object.defineProperty(self, "dateForm",         {get: getterDateForm,       set: setterDateForm});
                Object.defineProperty(self, "memoryForm",       {get: getterMemoryForm,     set: setterMemoryForm});
                Object.defineProperty(self, "eventForm",        {get: getterEventForm,      set: setterEventForm});

                Object.defineProperty(self, "enableSchedule",   {get: getterEnableSchedule, set: setterEnableSchedule});

                Object.defineProperty(self, "areaAgenda",       {get: getterAreaAgenda,     set: setterAreaAgenda});
                Object.defineProperty(self, "memoryAgenda",     {get: getterMemoryAgenda,   set: setterMemoryAgenda});
                Object.defineProperty(self, "eventAgenda",      {get: getterEventAgenda,    set: setterEventAgenda});
            };

            function setMain() {
                self.addClass("calendar_table");

                self.append(makeRowTitle.call(self));
                self.append(makeRowDay.call(self));
                self.append(makeRowDate.call(self));

                makeTimer.call(self, today_str);
                self.viewday = viewday_str;

                self.on("CustomEvent.TIMER_MIDNIGHT", function(event, todayDate) {
                    self.today = changeDateToString(todayDate);
                });
            };

            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // 속성
            ////////////////////////////////////////////////////////////////////////////////////////////////////

            // viewday
            function setterViewday(dayStr) {
                viewday_str = dayStr;

                setCellTitle.call(self);
                setCellDay.call(self);
                setCellDate.call(self);

                setCellDateEnable.call(self);
                setCellDateArea.call(self);
                setCellDateToday.call(self);

                setCellDateMemory.call(self);
                setCellDateEvent.call(self);
            }
            function getterViewday() {
                return viewday_str;
            };

            // today
            function setterToday(dayStr) {
                today_str = dayStr;
                today_date = changeStringToDate(today_str);

                setCellDateToday.call(self);
            }
            function getterToday() {
                return changeDateToString(today_date).split("_")[0];
            };

            // titleForm
            function setterTitleForm(formStr) {
                titleForm_str = formStr;
     
                setCellTitle.call(self);
            }
            function getterTitleForm() {
                return titleForm_str;
            };

            // dayForm
            function setterDayForm(formStr) {
                dayForm_str = formStr;
     
                setCellDay.call(self);
            }
            function getterDayForm() {
                return dayForm_str;
            };

            // dateForm
            function setterDateForm(formStr) {
                dateForm_str = formStr;
     
                setCellDate.call(self);
            }
            function getterDateForm() {
                return dateForm_str;
            };

            // memoryForm
            function setterMemoryForm(formStr) {
                memoryForm_str = formStr;
     
                setCellDateMemory.call(self);
            }
            function getterMemoryForm() {
                return memoryForm_str;
            };

            // eventForm
            function setterEventForm(formStr) {
                eventForm_str = formStr;
     
                setCellDateEvent.call(self);
            }
            function getterEventForm() {
                return eventForm_str;
            };

            // enableSchedule
            function setterEnableSchedule(scheduleArr) {
                enableSchedule_arr = scheduleArr;
     
                setCellDateEnable.call(self);
            }
            function getterEnableSchedule() {
                return enableSchedule_arr;
            };

            // areaAgenda
            function setterAreaAgenda(agendaArr) {
                areaAgenda_arr = agendaArr;
     
                setCellDateArea.call(self);
            }
            function getterAreaAgenda() {
                return areaAgenda_arr;
            };

            // memoryAgenda
            function setterMemoryAgenda(agendaArr) {
                memoryAgenda_arr = agendaArr;
     
                setCellDateMemory.call(self);
            }
            function getterMemoryAgenda() {
                return memoryAgenda_arr;
            };

            // eventAgenda
            function setterEventAgenda(agendaArr) {
                eventAgenda_arr = agendaArr;

                setCellDateEvent.call(self);
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

            // 타이머
            function makeTimer(dayStr) {
                today_date = changeStringToDate(dayStr);

                setInterval(function() {
                    today_date.setSeconds(today_date.getSeconds() + 1);

                    if (today_date.getHours() == 0 &&
                        today_date.getMinutes() == 0 &&
                        today_date.getSeconds() == 0) {

                        self.trigger("CustomEvent.TIMER_MIDNIGHT", [today_date]);
                    }
                }, 1000);
            }

            // areaTitle
            function makeRowTitle() {
                var return_mc = $('<div class="calendar_row row_title" />');
                var cell_mc = $('<div class="calendar_cell cell_title" />');
                cell_mc.appendTo(return_mc);

                return return_mc;
            };

            // areaDay
            function makeRowDay() {
                var return_mc = $('<div class="calendar_row row_day" />');
                var cell_mc;

                for (var i = 0; i < 7; i++) {
                    cell_mc = $('<div class="calendar_cell cell_day" />');
                    cell_mc.appendTo(return_mc);

                    // 일요일이면
                    if (i % 7 === 0) {
                        cell_mc.addClass("day_sunday");
                    // 토요일이면
                    } else if (i % 7 === 6) {
                        cell_mc.addClass("day_saturday");
                    }
                }
                return return_mc;
            };

            // areaDate
            function makeRowDate() {
                var return_mc = $('<div class="calendar_row row_date" />');
                var cell_mc;

                for (var i = 0; i < 42; i++) {
                    //////////////////////////////////////////////////
                    // 날짜 세팅
                    //////////////////////////////////////////////////
                    cell_mc = $('<div class="calendar_cell cell_date" />');
                    cell_mc.append($('<div class="group_area" />'));
                    cell_mc.append($('<p class="group_date" />'));
                    cell_mc.append($('<p class="group_memory" />'));
                    cell_mc.append($('<div class="group_event" />'));
                    cell_mc.append($('<div class="group_icon" />'));
                    cell_mc.appendTo(return_mc);

                    // 값 저장
                    cell_mc.data("rootMc", self);

                    cell_mc.on("mouseover", function(event) {
                        if (!$(this).hasClass("date_other") && !$(this).hasClass("date_disable")) {
                            self.trigger("CustomEvent.MOUSE_OVER_CELL_DATE", [$(this)]);
                        }
                    });
                    cell_mc.on("mouseout", function(event) {
                        if (!$(this).hasClass("date_other") && !$(this).hasClass("date_disable")) {
                            self.trigger("CustomEvent.MOUSE_OUT_CELL_DATE", [$(this)]);
                        }
                    });
                    cell_mc.on("click", function(event) {
                        if (!$(this).hasClass("date_other") && !$(this).hasClass("date_disable")) {
                            self.trigger("CustomEvent.CLICK_CELL_DATE", [$(this)]);
                        }
                    });

                    // 일요일이면
                    if (i % 7 === 0) {
                        cell_mc.addClass("date_sunday");
                    // 토요일이면
                    } else if (i % 7 === 6) {
                        cell_mc.addClass("date_saturday");
                    }
                }
                return return_mc;
            };

            ////////////////////////////////////////////////////////////////////////////////////////////////////

            function setCellTitle() {
                var cell_arr = self.find(".cell_title");
                var cell_mc;
                var viewday_date = changeStringToDate(self.viewday);
                var year_str = String(viewday_date.getFullYear());
                var month_str = String(viewday_date.getMonth() + 1);
                var html_str = self.titleForm;
                html_str = html_str.replace(/{Year}/, year_str);
                html_str = html_str.replace(/{year}/, year_str.slice(2, 4));
                html_str = html_str.replace(/{Month}/, changeNumberOfDigit(month_str, 2));
                html_str = html_str.replace(/{month}/, month_str);

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 문자 표기
                    cell_mc.html(html_str);
                }
            };

            function setCellDay() {
                var cell_arr = self.find(".cell_day");
                var cell_mc;
                var html_arr = self.dayForm.split(/, */);

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 문자 표기
                    cell_mc.html(html_arr[i]);
                }
            };

            function setCellDate() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var scope_bln;
                var viewday_date = changeStringToDate(self.viewday);
                // 달력의 첫 표기 날짜로 조정
                var cellday_date = new Date(viewday_date.getFullYear(), viewday_date.getMonth(), 1);
                cellday_date.setDate(1 - cellday_date.getDay());
                var html_str;

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 값 저장
                    cell_mc.data("viewday", changeDateToString(viewday_date));
                    cell_mc.data("cellday", changeDateToString(cellday_date));

                    html_str = self.dateForm;
                    html_str = html_str.replace(/{Date}/, changeNumberOfDigit(cellday_date.getDate(), 2));
                    html_str = html_str.replace(/{date}/, cellday_date.getDate());

                    // 문자 표기
                    cell_mc.find(".group_date").html(html_str);

                    // 해당 달에 속한 날짜인지 여부
                    scope_bln = (cellday_date.getMonth() == viewday_date.getMonth());

                    // 해당 달에 속한 날짜면
                    if (scope_bln) {
                        cell_mc.removeClass("date_other");

                    } else {
                        cell_mc.addClass("date_other");
                    }

                    // 다음 날짜로 조정
                    cellday_date.setDate(cellday_date.getDate() + 1);
                }
            };

            ////////////////////////////////////////////////////////////////////////////////////////////////////

            function setCellDateEnable() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var likeAgenda_arr;

                var agenda_arr = [
                    {
                        class: "enable_default",
                        schedule: self.enableSchedule
                    }
                ];

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 해당 날짜가 속한 아젠다
                    likeAgenda_arr = getLikeAgendaList(agenda_arr, cell_mc.data("cellday"));
                    // // 값 저장
                    // cell_mc.data("cellEnable", likeAgenda_arr);

                    // 아젠다 값이 있으면
                    if (likeAgenda_arr.length) {
                        cell_mc.removeClass("date_disable");

                    } else {
                        cell_mc.addClass("date_disable");
                    }
                }
            };

            function setCellDateToday() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var today_bln;
                var unit_mc;

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 오늘인지 여부
                    today_bln = (self.today == cell_mc.data("cellday"));

                    // 유닛 삭제
                    cell_mc.find(".group_icon").html("");
                    cell_mc.removeClass("date_today");

                    // 오늘이면
                    if (today_bln &&
                        !cell_mc.hasClass("date_other") && !cell_mc.hasClass("date_disable")) {

                        unit_mc = $('<div class="icon_today" />');

                        // 유닛 표기
                        cell_mc.find(".group_icon").append(unit_mc);
                        cell_mc.addClass("date_today");
                    }
                }
            };

            function setCellDateArea() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var likeAgenda_arr;
                var unit_mc;
                var term_arr;

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 해당 날짜가 속한 아젠다
                    likeAgenda_arr = getLikeAgendaList(self.areaAgenda, cell_mc.data("cellday"));
                    // 값 저장
                    cell_mc.data("cellArea", likeAgenda_arr);

                    // 유닛 삭제
                    cell_mc.find(".group_area").html("");
                    cell_mc.removeClass("date_area");

                    // 아젠다 값이 있으면
                    if (likeAgenda_arr.length &&
                        !cell_mc.hasClass("date_other") && !cell_mc.hasClass("date_disable")) {

                        for (var m = 0; m < likeAgenda_arr.length; m++) {
                            unit_mc = $('<div></div>');
                            unit_mc.addClass(likeAgenda_arr[m]["class"]);

                            term_arr = likeAgenda_arr[m]["term"].split("~");
                            // 추가 클래스
                            if (cell_mc.data("cellday") == term_arr[0]) unit_mc.addClass("term_begin");
                            if (cell_mc.data("cellday") == term_arr[1] || term_arr.length == 1) unit_mc.addClass("term_end");

                            // 유닛 표기
                            cell_mc.find(".group_area").append(unit_mc);
                            cell_mc.addClass("date_area");
                        }
                    }
                }
            };

            function setCellDateMemory() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var likeAgenda_arr;
                var unit_mc;
                var html_str;

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 해당 날짜가 속한 아젠다
                    likeAgenda_arr = getLikeAgendaList(self.memoryAgenda, cell_mc.data("cellday"));
                    // 값 저장
                    cell_mc.data("cellMemory", likeAgenda_arr);

                    // 유닛 삭제
                    cell_mc.find(".group_memory").html("");
                    cell_mc.find(".group_date").children().removeClass();

                    // 아젠다 값이 있으면
                    if (likeAgenda_arr.length &&
                        !cell_mc.hasClass("date_other") && !cell_mc.hasClass("date_disable")) {

                        for (var m = 0; m < likeAgenda_arr.length; m++) {
                            html_str = self.memoryForm;
                            html_str = html_str.replace(/{label}/, likeAgenda_arr[m]["label"]);

                            unit_mc = $(html_str);
                            unit_mc.addClass(likeAgenda_arr[m]["class"]);

                            // 유닛 표기
                            cell_mc.find(".group_memory").append(unit_mc);
                            cell_mc.find(".group_date").children().addClass(likeAgenda_arr[m]["class"]);
                        }
                    }
                }
            };

            function setCellDateEvent() {
                var cell_arr = self.find(".cell_date");
                var cell_mc;
                var likeAgenda_arr;
                var unit_mc;
                var html_str;
                var term_arr;

                for (var i = 0; i < cell_arr.length; i++) {
                    cell_mc = cell_arr.eq(i);

                    // 해당 날짜가 속한 아젠다
                    likeAgenda_arr = getLikeAgendaList(self.eventAgenda, cell_mc.data("cellday"));
                    // 값 저장
                    cell_mc.data("cellEvent", likeAgenda_arr);

                    // 유닛 삭제
                    cell_mc.find(".group_event").html("");
                    // cell_mc.find(".group_date").children().removeClass();

                    // 아젠다 값이 있으면
                    if (likeAgenda_arr.length &&
                        !cell_mc.hasClass("date_other") && !cell_mc.hasClass("date_disable")) {

                        for (var m = 0; m < likeAgenda_arr.length; m++) {
                            html_str = self.eventForm;
                            html_str = html_str.replace(/{label}/, likeAgenda_arr[m]["label"]);

                            unit_mc = $(html_str);
                            unit_mc.addClass(likeAgenda_arr[m]["class"]);

                            term_arr = likeAgenda_arr[m]["term"].split("~");
                            // 추가 클래스
                            if (term_arr.length == 1) {
                                unit_mc.addClass("term_begin");
                                unit_mc.addClass("term_end");
                            } else {
                                if (cell_mc.data("cellday") == term_arr[0]) unit_mc.addClass("term_begin");
                                if (cell_mc.data("cellday") == term_arr[1]) unit_mc.addClass("term_end");
                            }

                            // 유닛 표기
                            cell_mc.find(".group_event").append(unit_mc);
                            // cell_mc.find(".group_date").children().addClass(likeAgenda_arr[m]["class"]);
                        }
                    }
                }
            };

            ////////////////////////////////////////////////////////////////////////////////////////////////////
            // 리스너 함수
            ////////////////////////////////////////////////////////////////////////////////////////////////////
            
            
            
            ////////////////////////////////////////////////////////////////////////////////////////////////////
        };
    }());

    ////////////////////////////////////////////////////////////////////////////////////////////////////

