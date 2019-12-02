const database = firebase.database();

class UserStudy {
    constructor(params) {
        this.maxTimeToFinishPage = params.maxTimeToFinishPage;
        this.maxTimeToFinish = params.maxTimeToFinish;
    }

    init() {
        let _this = this;
        let uuid = this.uuidv4();
        let json = this.json();
        _this.survey = new Survey.Model(json);
        _this.survey
            .onComplete
            .add(function (result) {
                let val = _this.survey.currentPage.getValue();
                let qname = Object.keys(val)[0];
                let qanwer = val[qname];

                database.ref(`${uuid}/${qname}`).set({answer: qanwer, timespent: _this.survey.currentPage.timeSpent});
            });
        _this.survey.onCurrentPageChanging.add(function (sender, options) {
            // console.log(`Page changing: `+ survey.currentPage.timeSpent)
            let val = _this.survey.currentPage.getValue();
            let qname = Object.keys(val)[0];
            let qanwer = val[qname];

            database.ref(`${uuid}/${qname}`).set({answer: qanwer, timespent: _this.survey.currentPage.timeSpent});
        });

        $("#surveyElement").Survey({
            model: _this.survey
        });
    }

    json() {
        return {
            title: "Timeline visualization - User study",
            showProgressBar: "top",
            showTimerPanel: "top",
            maxTimeToFinishPage: this.maxTimeToFinishPage,
            maxTimeToFinish: this.maxTimeToFinish,
            firstPageIsStarted: true,
            startSurveyText: "Start Survey",
            pages: [
                {
                    questions: [
                        {
                            type: "html",
                            html: "You are about to start user study by evaluating visualization design. " +
                                "<br/>You have 1 minutes for every page and 20 minutes for the whole survey of 18 questions." +
                                "<br/>Please click on <b>'Start Survey'</b> button when you are ready."+
                                "<p> Consent notice: The purpose of this study is to gather user's feedback to evaluate a visualization design. No personal information is collected and all user's reponses are confidential and anonymous</p>"
                        },
                        {
                            type: "html",
                            name: "info",
                            html: '<iframe width="940px" height="680px"  src="https://www.youtube.com/embed/G6544NrpbrY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>'
                        },

                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_10_a_t.PNG' width='100%' height='400px /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q1",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"


                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_10_b_b.PNG' width='100%' height='400px /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q2",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_10_b_t.PNG' width='100%' height='400px /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q3",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_30_a_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q4",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_30_a_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q5",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_30_b_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q6",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_30_b_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q7",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_50_a_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q8",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_50_a_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q9",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_50_b_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q10",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_50_b_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q11",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_10_a_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q12",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_10_a_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q13",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_10_b_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q14",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_10_b_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q15",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_30_a_b.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q16",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29"                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/30_30_a_t.PNG' width='100%' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q17",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_10_a_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q18",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_10_a_t.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q19",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_10_b_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "q19",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_10_b_t.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "20",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_30_b_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "21",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_30_b_t.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "22",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_50_a_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "23",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                //24
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_50_a_t.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "24",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                //25
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/50_50_b_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "25",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                //26
                {
                    questions: [
                        {
                            type: "html",
                            name: "info",
                            html: "<table><body><row><td><img src='images/10_10_a_b.PNG' width='100%' height='400px' /></td><td style='padding:20px'></td></row></body></table>"
                        },
                        {
                            type: "radiogroup",
                            name: "26",
                            title: "From the design above, which group shows most sudden change over time?",
                            choices: [
                                "Instance 0",
                                "Instance 1",
                                "Instance 2",
                                "Instance 3",
                                "Instance 4",
                                "Instance 5",
                                "Instance 6",
                                "Instance 7",
                                "Instance 8",
                                "Instance 9",
                                "Instance 10",
                                "Instance 11",
                                "Instance 12",
                                "Instance 13",
                                "Instance 14",
                                "Instance 15",
                                "Instance 16",
                                "Instance 17",
                                "Instance 18",
                                "Instance 19",
                                "Instance 20",
                                "Instance 21",
                                "Instance 22",
                                "Instance 23",
                                "Instance 24",
                                "Instance 25",
                                "Instance 26",
                                "Instance 27",
                                "Instance 28",
                                "Instance 29",
                                "Instance 30",
                                "Instance 31",
                                "Instance 32",
                                "Instance 33",
                                "Instance 34",
                                "Instance 35",
                                "Instance 36",
                                "Instance 37",
                                "Instance 38",
                                "Instance 39",
                                "Instance 40",
                                "Instance 41",
                                "Instance 42",
                                "Instance 43",
                                "Instance 44",
                                "Instance 45",
                                "Instance 46",
                                "Instance 47",
                                "Instance 48",
                                "Instance 49"
                            ],
                            correctAnswer: "Group 2"
                        }
                    ]
                },

                {
                    questions: [
                        {
                            "type": "comment",
                            "name": "comment",
                            "title": "What is your comment about each visualization design, which representation you would like to see most and why?"
                        },
                        {
                            type: "radiogroup",
                            name: "info1",
                            title: "Are you Male or Female ?",
                            choices: [
                                "Male", "Female", "Other", "Prefer not to say"
                            ]
                        },
                        {
                            type: "radiogroup",
                            name: "info2",
                            title: "Are you Undergraduate/Master/Ph.D. student ?",
                            choices: [
                                "Undergraduate student", "Master student", "Ph.D. student", "Others"
                            ]
                        }
                    ],
                }
            ],
            completedHtml: "<h4>You have finished user study section, thank you very much for your time.</h4>"
        };
    }

    uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
}

const params = {
    maxTimeToFinishPage: 60, //in seconds
    maxTimeToFinish: 1300 //in seconds
}

let userstudy = new UserStudy(params);
userstudy.init();
