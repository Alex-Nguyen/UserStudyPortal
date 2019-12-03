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
        let startPage ={
            questions: [
                {
                    type: "html",
                    html: "You are about to start user study by evaluating visualization design. " +
                        "<br/>You have 1 minutes for every page and 20 minutes for the whole survey of 18 questions." +
                        "<br/>Please click on <b>'Start Survey'</b> button when you are ready." +
                        "<p> Consent notice: The purpose of this study is to gather user's feedback to evaluate a visualization design. No personal information is collected and all user's reponses are confidential and anonymous</p>"
                },
                {
                    type: "html",
                    name: "info",
                    html: '<iframe width="940px" height="680px"  src="https://www.youtube.com/embed/G6544NrpbrY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>'
                },

            ]
        }
        let finishPage ={
            questions: [
                {
                    type: "comment",
                    name: "suggestions",
                    title: "What is your opinion about each visual design, which one do you prefer? and why"
                },
                {
                    type: "radiogroup",
                    name: "gender",
                    title: "What is your gender?",
                    choices:['Male','Female','Prefer not to say']
                },
                {
                    type: "radiogroup",
                    name: "degee",
                    title: "What is your current degree?",
                    choices:['Undergraduate','Master','PhD','Other']
                }
            ]
        };
        function shuffle(array){
            array.sort(() => Math.random() - 0.5);

        }
        let questions = [
                {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table width='100%'><body><row><td align='center'><img src='images/10_10_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q0",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                },
                {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table width='100%'><body><row><td align='center'><img src='images/10_10_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q1",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                },
                {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_10_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q2",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["1am - 2am", "2am - 3am", "3am - 4am", "4am - 5am", "5am - 6am", "6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
                        "correctAnswer": "Group 2"
                    }]
                },
            {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_10_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q3",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["1am - 2am", "2am - 3am", "3am - 4am", "4am - 5am", "5am - 6am", "6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_30_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q4",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_30_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q5",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_30_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q6",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["0am - 3am", "3am - 6am", "6am - 9am", "9am - 12am", "12am - 3pm", "3pm - 6pm", "6pm - 9pm", "9pm - Wed 02", "Wed 02 - 3am", "3am - 6am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_30_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q7",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["0am - 3am", "3am - 6am", "6am - 9am", "9am - 12am", "12am - 3pm", "3pm - 6pm", "6pm - 9pm", "9pm - Wed 02", "Wed 02 - 3am", "3am - 6am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_50_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q8",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_50_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q9",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_50_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q10",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12am - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Wed 02", "Wed 02 - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Thu 3"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/10_50_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q11",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_10_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q12",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_10_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q13",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_10_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q14",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["1am - 2am", "2am - 3am", "3am - 4am", "4am - 5am", "5am - 6am", "6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_10_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q15",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_30_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q16",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_30_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q17",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_30_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q18",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12a - 3am", "3am - 6am", "6am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm", "9pm - Wed 02", "Wed 02 - 3am", "3am - 6am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_30_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q19",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_50_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q20",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_50_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q21",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_50_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q22",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12am - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Wed 02", "Wed 02 - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Thu 3"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/30_50_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q23",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12am - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Wed 02", "Wed 02 - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Thu 3"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_10_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q24",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_10_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q25",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_10_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q26",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["1am - 2am", "2am - 3am", "3am - 4am", "4am - 5am", "5am - 6am", "6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_10_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q27",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["1am - 2am", "2am - 3am", "3am - 4am", "4am - 5am", "5am - 6am", "6am - 7am", "7am - 8am", "8am - 9am", "9am - 10am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_30_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q28",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_30_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q29",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_30_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q30",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12a - 3am", "3am - 6am", "6am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm", "9pm - Wed 02", "Wed 02 - 3am", "3am - 6am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_30_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q31",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12a - 3am", "3am - 6am", "6am - 9am", "9am - 12pm", "12pm - 3pm", "3pm - 6pm", "6pm - 9pm", "9pm - Wed 02", "Wed 02 - 3am", "3am - 6am"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_50_a_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q32",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_50_a_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q33",
                        "title": "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        "choices": ["instance_0", "instance_1", "instance_2", "instance_3", "instance_4", "instance_5", "instance_6", "instance_7", "instance_8", "instance_9", "instance_10", "instance_11", "instance_12", "instance_13", "instance_14", "instance_15", "instance_16", "instance_17", "instance_18", "instance_19", "instance_20", "instance_21", "instance_22", "instance_23", "instance_24", "instance_25", "instance_26", "instance_27", "instance_28", "instance_29", "instance_30", "instance_31", "instance_32", "instance_33", "instance_34", "instance_35", "instance_36", "instance_37", "instance_38", "instance_39", "instance_40", "instance_41", "instance_42", "instance_43", "instance_44", "instance_45", "instance_46", "instance_47", "instance_48", "instance_49"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_50_b_t.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q34",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12am - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Wed 02", "Wed 02 - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Thu 3"],
                        "correctAnswer": "Group 2"
                    }]
                }, {
                    "questions": [{
                        "type": "html",
                        "name": "info",
                        "html": "<table><body><row><td align='center'><img src='images/50_50_b_b.PNG' width='auto' height='600px' /></td><td style='padding:20px'></td></row></body></table>"
                    }, {
                        "type": "radiogroup",
                        "name": "q35",
                        "title": "Find the most dynamic time point (the timestamps, when many instances change their status)",
                        "choices": ["12am - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Wed 02", "Wed 02 - 6am", "6am - 12pm", "12pm - 6pm", "6pm - Thu 3"],
                        "correctAnswer": "Group 2"
                    }]
                }]
        shuffle(questions);
        questions.unshift(startPage)
        questions.push(finishPage)
        return {
            title: "Timeline visualization - User study",
            showProgressBar: "top",
            showTimerPanel: "top",
            maxTimeToFinishPage: this.maxTimeToFinishPage,
            maxTimeToFinish: this.maxTimeToFinish,
            firstPageIsStarted: true,
            startSurveyText: "Start Survey",
            pages: questions,
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
