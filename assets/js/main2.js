"use strict";

var donutsPick = $(".donutss");
var donutsSelect = $(".select");
var chocolate = $(".chocolate img");
var popup = $(".popup");
var chocolatePopup = $(".donut-image img");
var donutTop = $(".donut-min");
var claimCup = $(".cup");
var qsp = 'player_id',
  hashId = getUrlParameter(qsp);
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var chocolateList = [2, 3, 2, 3, 0, 1, 4, 2, 1, 4, 3, 0];
var deleteDonuts = {
  yellow_missions: [0, 2, 7],
  green_missions: [1, 3, 10],
  red_missions: [4, 11],
  blue_missions: [5, 8],
  purple_missions: [6, 9]
};
var landingData;
landingApi();
$("#start-button").click(function () {
  registerUser();
  $("#start-landing").addClass("deactive");
});
function main() {
  console.log(landingData)
  var registerStatus = landingData.data.registered;
  var selectHistory = [];
  var missionnameHistory = [];
  var history = 0;
  var unlockCounter = 0;
  var lockAddress = -1;

  // register check    
  if (registerStatus == true) {
    var donutsData = {
      0: landingData.data.yellow_missions[0],
      1: landingData.data.green_missions[0],
      2: landingData.data.yellow_missions[1],
      3: landingData.data.green_missions[1],
      4: landingData.data.red_missions[0],
      5: landingData.data.blue_missions[0],
      6: landingData.data.purple_missions[0],
      7: landingData.data.yellow_missions[2],
      8: landingData.data.blue_missions[1],
      9: landingData.data.purple_missions[1],
      10: landingData.data.green_missions[2],
      11: landingData.data.red_missions[1]
    };
    showLand();

    //  show 3 cup status

    if (landingData.data.finial_mission[0].reward_status == "Unlocked") {
      $(claimCup[0]).addClass("deactive");
      $(claimCup[1]).removeClass("deactive");
      $(".coin1").removeClass("deactive");
    } 
    
    else if (landingData.data.finial_mission[0].reward_status == "Claimed") {
      $(claimCup[0]).addClass("deactive");
      $(claimCup[1]).addClass("deactive");
      $(claimCup[2]).removeClass("deactive");
      $('.coin1').addClass("deactive");
    }

    // delete donuts when of of them claiming
    for (var i in deleteDonuts) {
      for (var y = 0; y < landingData.data[i].length; y++) {
        if (landingData.data[i][y].reward_status == "Claimed") {
          for (var x = 0; x < deleteDonuts[i].length; x++) {
            $(donutsPick[deleteDonuts[i][x]]).addClass("deactive");
            $(donutsSelect[deleteDonuts[i][x]]).addClass("deactive");
          }
        }
      }
    }
    for (var _i3 = 0; _i3 < 12; _i3++) {
      for (var donutCounter = 0; donutCounter < 12; donutCounter++) {
        if (donutsData[donutCounter].status == 'Unlocked' && donutsData[donutCounter].reward_status != "Claimed") {
          lockAddress = donutCounter;
          $(".change-mission-button").removeClass("deactive");
          if (donutsData[lockAddress].reward_status == "Unlocked") {
            $(".coin2").removeClass("deactive");
            claiming();
          }
          unlockCounter += 1;
          $(donutsPick).unbind();
          $(".choosing").addClass("deactive");
          showMissions(donutsData, donutCounter);
          $(".mission").removeClass("deactive");
          $(".progress-bar").removeClass("deactive");
          $(".choos-mission-button").addClass("deactive");
          $(".progress-bar-text").removeClass("deactive");
          $(donutsPick[donutCounter]).addClass("deactive");
          $(donutsSelect[donutCounter]).removeClass("deactive");
        }
      }
      if (unlockCounter == 0) {
        // select donut in box
        var selectDonut = function selectDonut() {
          var _loop = function _loop(i) {
            $(donutsPick[i]).click(function () {
              $(".choosing").addClass("deactive");
              $(".mission").removeClass("deactive");
              showMission(i);
              selectHistory.push(i);
              history = selectHistory[selectHistory.length - 1];
              $(this).addClass("deactive");
              $(donutsSelect[i]).removeClass("deactive");
              if (selectHistory.length > 1) {
                $(donutsSelect[selectHistory[selectHistory.length - 2]]).addClass("deactive");
                $(donutsPick[selectHistory[selectHistory.length - 2]]).removeClass("deactive");
              }
            });
            $(donutsSelect[i]).click(function () {
              selectHistory.push(i);
            });
          };
          for (var _i = 0; _i < donutsPick.length; _i++) {
            _loop(_i);
          }
        };
        selectDonut();

        // show mission detail
        var showMission = function showMission(missionName) {
          missionnameHistory.push(chocolateList[missionName]);
          $(chocolate[missionnameHistory[missionnameHistory.length - 2]]).addClass("deactive");
          $(chocolate[missionnameHistory[missionnameHistory.length - 1]]).removeClass("deactive");
          $(chocolatePopup[missionnameHistory[missionnameHistory.length - 2]]).addClass("deactive");
          $(chocolatePopup[missionnameHistory[missionnameHistory.length - 1]]).removeClass("deactive");
          $(".mission-reward-text").text(donutsData[missionName].rewards[1].num);
          $(".progress-bar-text").text("".concat(donutsData[missionName].score, "/").concat(donutsData[missionName].max_score));
          var x = donutsData[missionName].score * 100;
          x = x / donutsData[missionName].max_score;
          $(".pr-bar").css("width", x + "%");
          $(".donut-mission-text").text(changeName(donutsData[missionName].name));
          $(".text-box-text").text(changeName(donutsData[missionName].name));
        };
        $("#select-mission-button").unbind().click(function () {
          if (donutsData[selectHistory[selectHistory.length - 1]].max_score == donutsData[selectHistory[selectHistory.length - 1]].score) {
            $(donutsPick).unbind();
            $(".coin2").removeClass("deactive");
            claiming();
          } else {
            $(donutsPick).unbind();
            $(".choos-mission-button").addClass("deactive");
            $(".progress-bar").removeClass("deactive");
            $(".progress-bar-text").removeClass("deactive");
            $(".change-mission-button").removeClass("deactive");
          }
          $(".popup").addClass("deactive");
          claimApi("CH_".concat(donutsData[history].name));
        });
        $(".choos-mission-button").click(function () {
          $(popup[0]).removeClass("deactive");
        });
        break;
      }
    }
    $(".change-mission-button").click(function () {
      $(popup[1]).removeClass("deactive");
    });
    $(".close-button").click(function () {
      $(".popup").addClass("deactive");
    });
    $(".cancel-button").click(function () {
      $(".popup").addClass("deactive");
    });
    $("#change-mission-button-popup").unbind().click(function () {
      changeMissions(lockAddress);
      $(".popup").addClass("deactive");
      claimApi("cancel-missions");
    });
    $(".gold-reward").click(function () {
      getReward();
      selectHistory.push(-1);
    });
    $(".reward-number").click(function () {
      getReward();
      selectHistory.push(-1);
    });

    // get reward
    var getReward = function getReward() {
      changeMissions(lockAddress);
      $(".gold-reward").addClass("deactive");
      $(".reward-number").addClass("deactive");
      claimApi(donutsData[lockAddress].name);
    };

    $(claimCup[1]).click(function () {
      $(claimCup[1]).addClass("deactive");
      $(claimCup[2]).removeClass("deactive");
      $(".coin1").addClass("deactive");
      claimApi(landingData.data.finial_mission[0].name, selectHistory);
    });

    for (var _i2 = 0; _i2 < 12; _i2++) {
      if (donutsData[_i2].reward_status == 'Claimed') {
        $(donutTop[chocolateList[_i2]]).removeClass("deactive");
      }
    }
  } else {
    $("#start-landing").removeClass("deactive");
    // when click on start button show loading
  }
}
