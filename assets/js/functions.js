
// show landing when click start or user register before
    function showLand() {
        $("#show-landing").removeClass("deactive");
    }
  

    // show mission detail
    function showMission(missionName, donutsData) {
        missionnameHistory.push(chocolateList.get(missionName));
        $(chocolate[missionnameHistory[missionnameHistory.length-2]]).addClass("deactive");
        $(chocolate[missionnameHistory[missionnameHistory.length-1]]).removeClass("deactive");
        $(chocolatePopup[missionnameHistory[missionnameHistory.length-1]]).removeClass("deactive");
        $(chocolatePopup[missionnameHistory[missionnameHistory.length-2]]).addClass("deactive");
        $(".mission-reward-text").text((donutsData.get(missionName)).rewards[1].num);
        $(".progress-bar-text").text(`${(donutsData.get(missionName)).score}/${donutsData.get(missionName).max_score}`);
        let x = donutsData.get(missionName).score * 100;
        x = x / donutsData.get(missionName).max_score;
        $(".pr-bar").css("width", `${x}%`);
        $(".donut-mission-text").text(changeName((donutsData.get(missionName)).name));
        $(".text-box-text").text(changeName((donutsData.get(missionName)).name));
    }
   


    // change name from english to persian
    function changeName(name) {
        switch (name) {
            case 'play_5_games_yellow':
                return 'تموم کردن 5 بازی با حریف‌ شانسی'
            case 'play_7_games_yellow':
                return 'تموم کردن 7 بازی با حریف‌ شانسی'
            case 'play_10_games_yellow':
                return 'تموم کردن 10 بازی با حریف‌ شانسی'
            case 'play_12_games_yellow':
                return 'تموم کردن 12 بازی با حریف‌ شانسی'
            case 'play_15_games_green':
                return 'تموم کردن 15 بازی با حریف‌ شانسی'
            case 'win_7_games_green':
                return 'بردن 7 بازی با حریف‌های شانسی'
            case 'right_70_questions_green':
                return 'پاسخ درست به 70 سوال (حریف شانسی)'
            case 'perfect_35_game_round_blue':
                return '35 راند بدون اشتباه در بازی با حریف‌ شانسی'
            case 'reach_record_12_blue':
                return 'رسیدن به رکورد 12 در بخش رکورد'
            case 'tournament_2_time_first_rank_red':
                return 'نفر اول در 2 بازی لیگ ستاره'
            case 'perfect_1_games_red':
                return '1 بازی بدون اشتباه با حریف‌های شانسی'
            case 'win_1_clan_game_purple':
                return 'بردن 1 بازی گروهی'
            case 'perfect_2_games_purple':
                return '2 بازی بدون اشتباه با حریف‌های شانسی'
            case '':
                return ''
        }

    }

    // claiming reward
    function claiming() {
        $(".change-mission-button").addClass("deactive");
        $(".claiming-button").removeClass("deactive");
        $(".mission-reward").addClass("deactive");
        $(".gold-reward").removeClass("deactive");
        $(".reward-number").removeClass("deactive");
        $(".choos-mission-button").addClass("deactive");
    }

    // change mission button
    function changeMission() {
        $(".coin2").addClass("deactive")
        $(".choosing").removeClass("deactive");
        $(".mission").addClass("deactive");
        $(".choos-mission-button").removeClass("deactive");
        $(".progress-bar").addClass("deactive");
        $(".progress-bar-text").addClass("deactive");
        $(".change-mission-button").addClass("deactive");
        $(donutsSelect[selectHistory[selectHistory.length-1]]).addClass("deactive");
        $(donutsPick[selectHistory[selectHistory.length-1]]).removeClass("deactive");
        main();
    }

    // get reward
    function getReward(donutsData){
        changeMission();
        $(".gold-reward").addClass("deactive");
        $(".reward-number").addClass("deactive");
        claimApi(donutsData.get(selectHistory[selectHistory.length-1]).name);
    }