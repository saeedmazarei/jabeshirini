
const donutsPick = $(".donutss");
const donutsSelect = $(".select");
const chocolate = $(".chocolate img");
const popup = $(".popup");
const chocolatePopup = $(".donut-image img");
const donutTop = $(".donut-min");
const claimCup = $(".cup");

const urlParams = new URLSearchParams(window.location.search);
const hashId = urlParams.get('player_id');

const chocolateList = new Map([
    [0, 2],
    [1, 3],
    [2, 2],
    [3, 3],
    [4, 0],
    [5, 1],
    [6, 4],
    [7, 2],
    [8, 1],
    [9, 4],
    [10, 3],
    [11, 0],
]);


let landingData;

landingApi();
// fakeApi();


function main() {

    let registerStatus = landingData.data.registered;

    // register check    
    if (registerStatus == true) {
        showLand();
    }
        
    // when click on start button show loading
    $("#start-button").click(function() {
        registerUser();
        landingApi();
    })

    let selectHistory = [];
    let missionnameHistory = [];

    const donutsData = new Map([
        [0, landingData.data.yellow_missions[0]],
        [1, landingData.data.green_missions[0]],
        [2, landingData.data.yellow_missions[1]],
        [3, landingData.data.green_missions[1]],
        [4, landingData.data.red_missions[0]],
        [5, landingData.data.blue_missions[0]],
        [6, landingData.data.purple_missions[0]],
        [7, landingData.data.yellow_missions[2]],
        [8, landingData.data.blue_missions[1]],
        [9, landingData.data.purple_missions[1]],
        [10, landingData.data.green_missions[2]],
        [11, landingData.data.red_missions[1]],
    ]);

    const deleteDonuts = {
        yellow_missions: [0, 2, 7],
        green_missions: [1, 3, 10],
        red_missions: [4, 11],
        blue_missions: [5, 8],
        purple_missions: [6, 9] 
    }


    //  show 3 cup status
    if(landingData.data.finial_mission[0].reward_status == "Unlocked") {
        $(claimCup[0]).addClass("deactive");
        $(claimCup[1]).removeClass("deactive");
        $(".coin1").removeClass("deactive");
    }
    else if(landingData.data.finial_mission[0].reward_status == "Claimed"){
        $(claimCup[0]).addClass("deactive");
        $(claimCup[1]).addClass("deactive");
        $(claimCup[2]).removeClass("deactive");
        $('.coin1').addClass("deactive");
    }

    $(claimCup[1]).click(function() {
        $(claimCup[1]).addClass("deactive");
        $(claimCup[2]).removeClass("deactive");
        $(".coin1").addClass("deactive");
        claimApi(landingData.data.finial_mission[0].name);
    });


    // delete donuts when of of them claiming
    for(let i in deleteDonuts){
        for(let y = 0; y < (landingData.data[i]).length; y++) {
            if((landingData.data[i])[y].reward_status == "Claimed") {
                for(let x = 0; x < deleteDonuts[i].length; x++) {
                    $(donutsPick[(deleteDonuts[i])[x]]).addClass("deactive");
                    $(donutsSelect[(deleteDonuts[i])[x]]).addClass("deactive");
                }
            }
        }
    }


    selectDonut();





// show landing when click start or user register before
    function showLand() {
        $("#start-landing").addClass("deactive");
        $("#show-landing").removeClass("deactive");
    }


    
  // select donut in box
    function selectDonut() {
    for(let i=0; i < donutsPick.length; i++) {
        $(donutsPick[i]).click(function(){
            $(".choosing").addClass("deactive");
            $(".mission").removeClass("deactive");
            showMission(i);
            selectHistory.push(i);
            $(this).addClass("deactive");
            $(donutsSelect[i]).removeClass("deactive");
            if(selectHistory.length > 1) {
                $(donutsSelect[selectHistory[selectHistory.length-2]]).addClass("deactive");
                $(donutsPick[selectHistory[selectHistory.length-2]]).removeClass("deactive");
            }
            });
            $(donutsSelect[i]).click(function() {
                selectHistory.push(i);
            })
    }
    }

    // show mission detail
    function showMission(missionName) {
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
        selectDonut();
    }

    // get reward
    function getReward(){
        changeMission();
        $(".gold-reward").addClass("deactive");
        $(".reward-number").addClass("deactive");
        claimApi(donutsData.get(selectHistory[selectHistory.length-1]).name);
    }


    $("#select-mission-button").click(function(){
        if(donutsData.get(selectHistory[selectHistory.length-1]).max_score == donutsData.get(selectHistory[selectHistory.length-1]).score){
            $(donutsPick).unbind();
            $(".coin2").removeClass("deactive");
            claiming();
        }
        else {
            $(donutsPick).unbind();
            $(".choos-mission-button").addClass("deactive");
            $(".progress-bar").removeClass("deactive");
            $(".progress-bar-text").removeClass("deactive");
            $(".change-mission-button").removeClass("deactive");
        }
        $(".popup").addClass("deactive");
    })

    $("#change-mission-button-popup").click(function(){
        changeMission();
        $(".popup").addClass("deactive");
    })

    $(".choos-mission-button").click(function() {
        $(popup[0]).removeClass("deactive");
    })

    $(".change-mission-button").click(function() {
        $(popup[1]).removeClass("deactive");
    })

    $(".close-button").click(function() {
        $(".popup").addClass("deactive");
    })

    $(".cancel-button").click(function() {
        $(".popup").addClass("deactive");
    })

    $(".gold-reward").click(function(){
        getReward();
    })

    $(".reward-number").click(function(){
        getReward();
    })

    for(let i = 0; i < 12; i++) {
        if(donutsData.get(i).reward_status == 'Claimed') {
            $(donutTop[chocolateList.get(i)]).removeClass("deactive");
        }
    }

}

