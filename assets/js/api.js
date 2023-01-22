
// register user
function registerUser() {
    $("#loading").removeClass("deactive");
    let formdata = new FormData();
    formdata.append("hash_id", hashId);
    formdata.append("challenge", "GemBox");

    let requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://quizofkings.com/challenge-api/v1/challenge/register", requestOptions)
    .then(response => {response.text();
    })
    .then(result => console.log(result))
    .catch(error => {console.log('error', error)
    $("#loading").addClass("deactive");
    $("#show-landing").removeClass("deactive");
    });
}

// claim api

function claimApi(mission) {
    $("#loading").removeClass("deactive");
    let formdata = new FormData();
    formdata.append("hash_id", hashId);
    formdata.append("challenge", "GemBox");
    formdata.append("mission_id", mission)
    let requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
    };

    fetch("https://quizofkings.com/challenge-api/v1/challenge/claim", requestOptions)
    .then(response => {response.text();
    })
    .then(result => {console.log(result);
    landingApi();
})
    .catch(error => {console.log('error', error)
    $("#loading").addClass("deactive");
    $("#show-landing").removeClass("deactive");
    });
}

// landing api

function landingApi() {
    $("#loading").removeClass("deactive");
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    console.log(hashId)
    
    fetch(`https://quizofkings.com/challenge-api/v1/challenge/landing?hash_id=${hashId}&challenge=GemBox`, requestOptions)
        .then(response => response.json())
        .then(result => {
            landingData = result;
            main();
            $("#loading").addClass("deactive");
        })
        .catch(error => {console.log('error', error);
        $("#loading").addClass("deactive");
    });
        
}

function fakeApi() {
    landingData = {
        "data": {
            "registered": false,
            "red_missions": [
                {
                    "name": "tournament_2_time_first_rank_red",
                    "score": 2,
                    "max_score": 2,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "red-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 250
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "perfect_1_games_red",
                    "score": 0,
                    "max_score": 1,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "red-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 250
                        }
                    ],
                    "reward_status": "Locked"
                }
            ],
            "blue_missions": [
                {
                    "name": "perfect_35_game_round_blue",
                    "score": 0,
                    "max_score": 35,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "blue-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 200
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "reach_record_12_blue",
                    "score": 0,
                    "max_score": 12,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "blue-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 200
                        }
                    ],
                    "reward_status": "Locked"
                }
            ],
            "green_missions": [
                {
                    "name": "play_15_games_green",
                    "score": 0,
                    "max_score": 15,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "green-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 150
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "right_70_questions_green",
                    "score": 0,
                    "max_score": 70,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "green-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 150
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "win_7_games_green",
                    "score": 0,
                    "max_score": 7,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "green-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 150
                        }
                    ],
                    "reward_status": "Locked"
                }
            ],
            "purple_missions": [
                {
                    "name": "win_1_clan_game_purple",
                    "score": 0,
                    "max_score": 1,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "purple-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 300
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "perfect_2_games_purple",
                    "score": 0,
                    "max_score": 2,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "purple-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 300
                        }
                    ],
                    "reward_status": "Locked"
                }
            ],
            "yellow_missions": [
                {
                    "name": "play_7_games_yellow",
                    "score": 0,
                    "max_score": 7,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "yellow-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 100
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "play_10_games_yellow",
                    "score": 0,
                    "max_score": 10,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "yellow-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 100
                        }
                    ],
                    "reward_status": "Locked"
                },
                {
                    "name": "play_12_games_yellow",
                    "score": 0,
                    "max_score": 12,
                    "status": "Locked",
                    "rewards": [
                        {
                            "item": "Currency",
                            "num": 1,
                            "item_details": {
                                "currency_name": "yellow-gem-cy",
                                "currency_amount": 1
                            }
                        },
                        {
                            "item": "Coin",
                            "num": 100
                        }
                    ],
                    "reward_status": "Locked"
                }
            ],
            "finial_mission": [
                {
                    "name": "final_reward",
                    "score": 0,
                    "max_score": 5,
                    "status": "Complete",
                    "rewards": [
                        {
                            "item": "Coin",
                            "num": 750
                        },
                        {
                            "item": "Award",
                            "num": 1,
                            "item_details": {
                                "id": 50
                            }
                        },
                        {
                            "item": "RoadMapGoldenGem",
                            "num": 20,
                            "item_details": {
                                "reason": "on_finish_claim_golden_gem"
                            }
                        }
                    ],
                    "reward_status": "Unlocked"
                }
            ],
            "chosen_mission": [
                {
                    "name": "CH_play_15_games_green",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_right_70_questions_green",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_win_7_games_green",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_perfect_35_game_round_blue",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_reach_record_12_blue",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_tournament_2_time_first_rank_red",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_perfect_1_games_red",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_win_1_clan_game_purple",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_perfect_2_games_purple",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_play_7_games_yellow",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_play_10_games_yellow",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                },
                {
                    "name": "CH_play_12_games_yellow",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Unlocked"
                }
            ],
            "cancel_mission": [
                {
                    "name": "cancel-missions",
                    "score": 0,
                    "max_score": 0,
                    "status": "Complete",
                    "rewards": null,
                    "reward_status": "Locked"
                }
            ],
            "red_gem_count": 0,
            "blue_gem_count": 0,
            "green_gem_count": 0,
            "purple_gem_count": 0,
            "yellow_gem_count": 0,
            "user_have_phone": true
        },
        "status": true
      }
      main();
}