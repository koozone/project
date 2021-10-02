    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 공용 함수
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // 몇일 남았는지 계산
    function getDateCount(beginDate, endDate) {
        var return_num = endDate.getTime() - beginDate.getTime();
        return_num = return_num / 1000; 	// 밀리초
        return_num = return_num / 60; 		// 초
        return_num = return_num / 60; 		// 분
        return_num = return_num / 24; 		// 시

        return Math.floor(return_num);
    }
    // 몇달 남았는지 계산
    function getMonthCount(beginDate, endDate) {
        var beginMonth_num = beginDate.getFullYear() * 12 + beginDate.getMonth();
        var endMonth_num = endDate.getFullYear() * 12 + endDate.getMonth();
        var return_num = endMonth_num - beginMonth_num;

        return return_num;
    }
    // 몇년 남았는지 계산
    function getYearCount(beginDate, endDate) {
        var beginYear_num = beginDate.getFullYear();
        var endYear_num = endDate.getFullYear();
        var return_num = endYear_num - beginYear_num;

        return return_num;
    }

    // 기간 문자로 시기와 종기를 만들어 반환 (20160101~20160120, 20160201)
    function getTermDateData(termStr) {
        // 정의되지 않은 문자를 제거하여 "20120601" 형태로 만듦 (허용: 숫자, "_", "~")
        termStr = termStr.replace(/[^\d|_|~]/g, "");

        var term_arr = termStr.split("~");
        // 연속되는 날짜(20160401~20160405)인지, 단일 날짜(20160410)인지
        var begin_str = (term_arr.length == 1) ? term_arr[0] : term_arr[0];
        var end_str = (term_arr.length == 1) ? term_arr[0] : term_arr[1];

        var return_obj = {
            // "begin": changeStringToDate(begin_str),
            // "end": changeStringToDate(end_str)
            "begin": begin_str,
            "end": end_str
        };
        return return_obj;
    }

    // 해달 날짜가 속한 아젠다 리스트 반환
    function getLikeAgendaList(agendaArr, dateStr) {
        var return_arr = [];
        var schedule_arr;
        var scheduleTime_arr;
        var dateTime_num = changeStringToDate(dateStr).getTime();

        for (var i = 0; i < agendaArr.length; i++) {
            schedule_arr = (agendaArr[i].hasOwnProperty("schedule")) ? agendaArr[i]["schedule"] : [];

            for (var m = 0; m < schedule_arr.length; m++) {
                scheduleTime_arr = getTermTimeList(schedule_arr[m]["term"], schedule_arr[m]["repeat"]);

                // 기간에 속하면
                if (scheduleTime_arr.indexOf(dateTime_num) > -1) {
                    var clone_obj = jQuery.extend({}, schedule_arr[m]);
                    clone_obj["index"] = m;
                    clone_obj["class"] = agendaArr[i]["class"];

                    return_arr.push(clone_obj);
                }
            }
        }
        return return_arr;
    }

var globalTermTimeData = {};

    function getTermTimeList(termStr, repeatStr) {
        // 정의되지 않은 문자를 제거하여 "20120601" 형태로 만듦 (허용: 숫자, "_", "~")
        termStr = termStr.replace(/[^\d|_|~]/g, "");

        // 저장된 값이 있으면
        if (globalTermTimeData.hasOwnProperty(termStr+repeatStr)) return globalTermTimeData[termStr+repeatStr];

        var return_arr = [];

        var term_obj = getTermDateData(termStr);
        var begin_date = changeStringToDate(term_obj["begin"]);
        var end_date = changeStringToDate(term_obj["end"]);
        var term_num = getDateCount(begin_date, end_date) + 1;

        // 반복 설정 분석 (예> "day+100", "4y+10", "2week+5", 2M+3...)
        var repeat_str = (repeatStr) ? repeatStr : "d+1";
        var repeat_arr = repeat_str.split("+");
        if (repeat_arr.length == 1) {
            repeat_arr[1] = repeat_arr[0];
            repeat_arr[0] = "d";
        }
        // 반복 타입 (y:년, m:월, w:주, d:일)
        var repeatType_str = String(repeat_arr[0].match(/\D+/g));
        repeatType_str = repeatType_str.slice(0, 1).toLowerCase();
        // 반복 사이클
        var repeatCycle_num = Number(repeat_arr[0].match(/\d+/g));
        repeatCycle_num = Math.max(1, repeatCycle_num);
        var cycleY_num = (repeatType_str == "y") ? repeatCycle_num : 1;
        var cycleM_num = (repeatType_str == "m") ? repeatCycle_num : 1;
        var cycleD_num = (repeatType_str == "d") ? repeatCycle_num : 1;
        if (repeatType_str == "w") cycleD_num = repeatCycle_num * 7;
        // 반복 갯수
        var repeatCount_num = Number(repeat_arr[1].match(/\d+/g));
        repeatCount_num = Math.max(1, repeatCount_num);
        var countY_num = (repeatType_str == "y") ? repeatCount_num : 1;
        var countM_num = (repeatType_str == "m") ? repeatCount_num : 1;
        var countD_num = (repeatType_str == "d") ? repeatCount_num : 1;
        if (repeatType_str == "w") countD_num = repeatCount_num;

        for (var y = 0; y < countY_num; y++) {
            for (var m = 0; m < countM_num; m++) {
                for (var d = 0; d < countD_num; d++) {
                    for (var n = 0; n < term_num; n++) {
                        return_arr.push(new Date(
                            begin_date.getFullYear() + (y * cycleY_num),
                            begin_date.getMonth() + (m * cycleM_num),
                            begin_date.getDate() + (d * cycleD_num) + n
                        ).getTime());
                    }
                }
            }
        }
        // 값 저장
        globalTermTimeData[termStr+repeatStr] = return_arr;

        return return_arr;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // 일치하는 값을 가진 아이템의 인덱스를 배열에서 찾아서 반환
    function getListIndex(targetArr, keyStr, valueObj) {
        var return_num = -1;
        
        for (var i = 0; i < targetArr.length; i++) {
            // 항목이 array 형태면
            if (typeof(targetArr[i][keyStr]) == "object") {
                // 검색 대상 문자를 소문자 배열로 변경
                var valueLowerCase_arr = targetArr[i][keyStr].toString().toLowerCase().split(",");

                if (valueLowerCase_arr.indexOf(valueObj.toLowerCase()) > -1) {
                    return_num = i;
                    break;
                }
                
            } else {
                if (targetArr[i][keyStr] == valueObj) {
                    return_num = i;
                    break;
                }
            }
        }
        return return_num;
    }
    
    // 일치하는 값을 가진 아이템을 배열에서 찾아서 반환
    function getListItem(targetArr, keyStr, valueObj) {
        var index_num = getListIndex(targetArr, keyStr, valueObj);
        var return_obj = (index_num > -1) ? targetArr[index_num] : null;

        return return_obj;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////

    // 자릿수 갯수에 맞게 숫자를 변환후 반환 (1 -> 001)
    function changeNumberOfDigit(targetNum, digitNum, symbolStr) {
        if (!symbolStr) symbolStr = "0";

        var return_str = "";
        var number_arr = String(targetNum).split("");

        for (var i = 0; i < digitNum - number_arr.length; i++) {
            return_str += symbolStr;
        }
        return_str += number_arr.join("");

        return return_str;
    }

    // 날짜를 주어진 값만큼 조정후 반환
    function changeSateByCount(dayStr, addNum, propStr) {
        var day_date = changeStringToDate(dayStr);
        var return_date = changeDateByCount(day_date, addNum, propStr);

        return changeDateToString(return_date);
    }
    function changeDateByCount(dayDate, addNum, propStr) {
        if (!propStr) propStr = "d";

        var return_date = new Date(dayDate.getTime());

        if (propStr == "y") {
            return_date.setFullYear(return_date.getFullYear() + addNum);

        } else if (propStr == "m") {
            return_date.setMonth(return_date.getMonth() + addNum);

        } else if (propStr == "d") {
            return_date.setDate(return_date.getDate() + addNum);
        }
        return return_date;
    }

    // 주어진 날짜가 해당 월에 속하지 않으면 조정후 반환
    function changeDateOfMonth(targetDate, monthNum) {
        // 해당 월에 속하면
        if (targetDate.getMonth() == monthNum % 12) {
            return targetDate;

        } else {
            targetDate.setDate(targetDate.getDate() - 1);

            // 재귀 체크
            return changeDateOfMonth(targetDate, monthNum);
        }
    }

    // 데이트형 날짜를 문자형으로 변경
    function changeDateToString(targetDate) {
        var return_str = "";
        return_str += changeNumberOfDigit(targetDate.getFullYear(), 4, "0");
        return_str += changeNumberOfDigit(targetDate.getMonth() + 1, 2, "0");
        return_str += changeNumberOfDigit(targetDate.getDate(), 2, "0");
        return_str += "_";
        return_str += changeNumberOfDigit(targetDate.getHours(), 2, "0");
        return_str += changeNumberOfDigit(targetDate.getMinutes(), 2, "0");
        return_str += changeNumberOfDigit(targetDate.getSeconds(), 2, "0");

        var return_arr = return_str.split("_");

        return (return_arr[1] == "000000") ? return_arr[0] : return_str;
    }

    // 문자형 날짜를 데이트형으로 변경
    function changeStringToDate(targetStr) {
        // 정의되지 않은 문자를 제거하여 "20120601" 형태로 만듦 (허용: 숫자, "_")
        targetStr = targetStr.replace(/[^\d|_]/g, "");

        var target_arr = targetStr.split("_");
        if (target_arr.length == 1) target_arr[1] = "000000";

        var return_date = new Date(
            Number(target_arr[0].slice(0, 4)),
            Number(target_arr[0].slice(4, 6)) - 1,
            Number(target_arr[0].slice(6, 8)),
            Number(target_arr[1].slice(0, 2)),
            Number(target_arr[1].slice(2, 4)),
            Number(target_arr[1].slice(4, 6))
        );
        return return_date;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
