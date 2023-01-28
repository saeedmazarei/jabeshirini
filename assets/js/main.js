
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


const deleteDonuts = {
    yellow_missions: [0, 2, 7],
    green_missions: [1, 3, 10],
    red_missions: [4, 11],
    blue_missions: [5, 8],
    purple_missions: [6, 9] 
}

const donutMap = new Map([
    ['play_7_games_yellow', 0],
    ['play_15_games_green', 1],
    ['play_10_games_yellow', 2],
    ['right_70_questions_green', 3],
    ['tournament_2_time_first_rank_red', 4],
    ['perfect_35_game_round_blue', 5],
    ['win_1_clan_game_purple', 6],
    ['play_12_games_yellow', 7],
    ['reach_record_12_blue', 8],
    ['perfect_2_games_purple', 9],
    ['win_7_games_green', 10],
    ['perfect_1_games_red', 11],
]);

let landingData;


landingApi();

$("#start-button").click(function() {
    registerUser();
    $("#start-landing").addClass("deactive");
})

function main() {
    
    let registerStatus = landingData.data.registered;
    let selectHistory = [];
    let missionnameHistory = [];
    
    // register check    
    if (registerStatus == true) {
        var donutsData = new Map([
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
        showLand();

    
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
        claimApi(landingData.data.finial_mission[0].name, selectHistory);
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

    // let history;
    // for(let i = 0; i < 12; i++) {
    //     if(donutsData.get(i).status == 'Unlocked') {
    //         history = i;
    //         $(donutsPick).off("click");
    //         showMission(i);
    //         $(".choosing").addClass("deactive");
    //         $(".mission").removeClass("deactive");
    //         $(".progress-bar").removeClass("deactive");
    //         $(".choos-mission-button").addClass("deactive");
    //         $(".progress-bar-text").removeClass("deactive");
    //         $(".change-mission-button").removeClass("deactive");
    //         $(donutsPick[i]).addClass("deactive");
    //         $(donutsSelect[i]).removeClass("deactive");
    //     }
    //     else {
    //     }
    // }

    selectDonut();
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
        $(chocolatePopup[missionnameHistory[missionnameHistory.length-2]]).addClass("deactive");
        $(chocolatePopup[missionnameHistory[missionnameHistory.length-1]]).removeClass("deactive");
        $(".mission-reward-text").text((donutsData.get(missionName)).rewards[1].num);
        $(".progress-bar-text").text(`${(donutsData.get(missionName)).score}/${donutsData.get(missionName).max_score}`);
        var x = donutsData.get(missionName).score * 100;
        x = x / donutsData.get(missionName).max_score;
        $(".pr-bar").css("width", x + "%");
        $(".donut-mission-text").text(changeName((donutsData.get(missionName)).name));
        $(".text-box-text").text(changeName((donutsData.get(missionName)).name));
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
            // claimApi(`CH_${donutsData.get(selectHistory[selectHistory.length-1])}`);
        })

        $("#change-mission-button-popup").click(function(){
            changeMission();
            $(donutsSelect[history]).addClass("deactive");
            $(donutsPick[history]).removeClass("deactive");
            $(".popup").addClass("deactive");
            // claimApi('cancel-missions');
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
            selectHistory.push(-1);
        })

        $(".reward-number").click(function(){
            getReward();
            selectHistory.push(-1);
        })

        for(let i = 0; i < 12; i++) {
            if(donutsData.get(i).reward_status == 'Claimed') {
                $(donutTop[chocolateList.get(i)]).removeClass("deactive");
            }
        }

    }
    else {
        $("#start-landing").removeClass("deactive");
        // when click on start button show loading
    }
}

