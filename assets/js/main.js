
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

let selectHistory = [];
let missionnameHistory = [];
let landingData;


landingApi();
// fakeApi();


function main() {

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

    let registerStatus = landingData.data.registered;

    // register check    
    if (registerStatus == true) {
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

    // select donut in box
    for(let i=0; i < donutsPick.length; i++) {
        $(donutsPick[i]).click(function(){
            $(".choosing").addClass("deactive");
            $(".mission").removeClass("deactive");
            showMission(i, donutsData);
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
        getReward(donutsData);
    })

    $(".reward-number").click(function(){
        getReward(donutsData);
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
        $("#start-button").click(function() {
            registerUser();
            landingApi();
        })
    }
}

