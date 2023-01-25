
var donutsPick = $(".donutss");
var donutsSelect = $(".select");
var chocolate = $(".chocolate img");
var popup = $(".popup");
var chocolatePopup = $(".donut-image img");
var donutTop = $(".donut-min");
var claimCup = $(".cup");

var urlParams = new URLSearchParams(window.location.search);
var hashId = urlParams.get('player_id');

var chocolateList = new Map([
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

var deleteDonuts = {
    yellow_missions: [0, 2, 7],
    green_missions: [1, 3, 10],
    red_missions: [4, 11],
    blue_missions: [5, 8],
    purple_missions: [6, 9] 
}

var selectHistory = [];
var missionnameHistory = [];
var landingData;


landingApi();
// fakeApi();

$("#start-button").click(function() {
    registerUser();
    $("#start-landing").addClass("deactive");
})

function main() {

    var registerStatus = landingData.data.registered;
    
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


    // for(let i = 0; i < 12; i++) {
    //     console.log(donutsData.get(i).status);
    //     if(donutsData.get(i).reward_status == 'Claimed') {
    //         $(donutTop[chocolateList.get(i)]).removeClass("deactive");
    //     }
    // }

    selectDonut(donutsData);

    
    $("#select-mission-button").click(function(){
        if(donutsData.get(selectHistory[selectHistory.length-1]).reward_status == "Unlocked"){
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
        // claimApi()
    })

    $("#change-mission-button-popup").click(function(){
        changeMission(donutsData);
        landingApi();
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
    }
}

