const database = firebase.database();

class UserStudy {
    constructor(params) {
        this.maxTimeToFinishPage = params.maxTimeToFinishPage;
        this.maxTimeToFinish = params.maxTimeToFinish;
    }

    init() {
        let _this = this;
        let d = new Date();
        let month = d.getMonth()+1;
        let day = d.getDay()+1;
        let h = d.getHours();
        let m = d.getMinutes();
        let second = d.getSeconds();
        let time = `${month}_${day}_${h}_${m}_${second}`
        let uuid = this.uuidv4();
        let json = this.json();
        let renderqueue = json.pages.filter(p=>p.questions[1].extraData).map(d=>d.questions[1].extraData);
        _this.survey = new Survey.Model(json);
        _this.survey
            .onComplete
            .add(function (result) {
                let val = _this.survey.currentPage.getValue();
                Object.keys(val).forEach(key=>{
                    let qname =key;
                    let qanwer = val[qname];
                    database.ref(`${time}/${qname}`).set({answer: qanwer, timespent:_this.survey.currentPage.timeSpent});
                })

            });
        _this.survey.onCurrentPageChanging.add(function (sender, options) {
            // console.log(`Page changing: `+ survey.currentPage.timeSpent)
            let val = _this.survey.currentPage.getValue();
            Object.keys(val).forEach(key=>{
                let qname =key;
                let qanwer = val[qname];

                database.ref(`${time}/${qname}`).set({answer: qanwer, timespent:_this.survey.currentPage.timeSpent, correct: _this.survey.currentPage.questions[0].correctAnswer});
                // console.log({answer: qanwer, timespent:_this.survey.currentPage.timeSpent, correct: _this.survey.currentPage.questions[0].correctAnswer})
            })
        });
        _this.survey.onTimerPanelInfoText.add((sender, options) => {
            if (sender.currentPage.isReadOnly) {
                options.text = '';
            } else {
                options.text = `Remaining time in seconds: ${60 -_this.survey.currentPage.timeSpent} `;
            }
        });

        _this.survey.onAfterRenderQuestion.add(function(survey, options){
            if (options.question.name.match("graphHolder"))
                renderdata(renderqueue[+options.question.name.split("_")[1]],'#chartRadar')
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
                        "<br/>Please click on <b>'Start Survey'</b> button when you are ready."},
                {
                    type: "html",
                    name: "info",
                    html: '<table width="100%"><tr><td align="center"><iframe width="940px" height="680px"  src="https://www.youtube.com/embed/2V_Y-5LtHTs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></td></tr></table>'
                },
                {
                    type: "html",
                    html: "Consent notice: The purpose of this study is to gather user's feedback to evaluate a visualization design. No personal information is collected and all user's reponses are confidential and anonymous"
                },

            ]
        }
        let finishPage ={
            maxTimeToFinish: 180,
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
                    name: "degree",
                    title: "What is your current degree?",
                    choices:['Undergraduate','Master','PhD','Other']
                }
            ]
        };
        function shuffle(array){
            array.sort(() => Math.random() - 0.5);

        }

        function generateobject(instance,timestep,task,type) {
            let data = generateData({INS:instance,TIMES:timestep,TASK:task,vizType:type});
            return  {
                questions: [
                    {
                        type: "dropdown",
                        name: `${instance}_${timestep}_${task ? 'b' : 'a'}_${type ? 'b' : 'l'}`,
                        title: task ? "Find the most dynamic time point (the timestamps, when many instances change their status)" : "Find the most dynamic instance (the instance that exhibits multiple statuses over time).",
                        choices: d3.range(0, task?timestep:instance).map(d => `${d + 1}`),
                        correctAnswer: ""+(data.correct+1),
                    },
                    {
                        type: "html",
                        name: "graphHolder",
                        html: `<table><body><row><td><svg id="chartRadar"></svg></td><td style='padding:20px'></td></row></body></table>`,
                        extraData: data,
                    }
                ]
            }
        }

        var set = [10, 30, 50];
        var questions = [];
        set.forEach(ins => {
            set.forEach(time => {
                d3.range(0, 2).forEach(ta => {
                    d3.range(0, 2).forEach(ty => {
                        questions.push(generateobject(ins, time, ta, ty))
                    })
                })
            })
        });

        shuffle(questions);
        questions.forEach((q,i)=>q.questions[1].name = "graphHolder_"+i)
        questions.unshift(startPage)
        questions.push(finishPage)
        return {
            title: "Timeline visualization - User study",
            showProgressBar: "bottom",
            showTimerPanel: "top",
            showTimerPanelMode: "page",
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
    maxTimeToFinish: 2500 //in seconds
}

let userstudy = new UserStudy(params);
userstudy.init();
