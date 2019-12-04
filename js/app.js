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
        _this.survey.onTimerPanelInfoText.add((sender, options) => {
            if (sender.currentPage.isReadOnly) {
                options.text = '';
            } else {
                options.text = `REMAINING TIME IN SECONDS: ${60 -_this.survey.currentPage.timeSpent}`;
            }
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
                    html: '<table width="100%"><tr><td align="center"><iframe width="940px" height="680px"  src="https://www.youtube.com/embed/7qZWQh1CWSY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe></td></tr></table>'
                },
                {
                    type: "html",
                    html: "Consent notice: The purpose of this study is to gather user's feedback to evaluate a visualization design. No personal information is collected and all user's reponses are confidential and anonymous"
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
        let questions = [{"questions":[{"type":"dropdown","name":"10_10_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_10_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_10_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_10_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_10_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_10_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_10_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_10_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_30_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_30_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_30_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_30_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_30_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_30_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_30_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_30_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_50_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_50_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_50_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_50_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_50_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_50_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"10_50_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/10_50_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_10_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_10_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_10_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_10_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_10_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_10_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_10_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_10_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_30_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_30_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_30_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_30_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_30_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_30_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_30_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_30_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_50_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_50_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_50_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_50_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_50_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_50_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"30_50_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/30_50_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_10_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_10_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_10_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_10_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_10_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_10_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_10_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_10_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_30_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_30_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_30_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_30_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_30_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_30_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_30_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_30_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_50_a_l","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_50_a_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_50_a_b","title":"Find the most dynamic instance (the instance that exhibits multiple statuses over time).","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_50_a_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_50_b_l","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_50_b_l.svg' /></td><td style='padding:20px'></td></row></body></table>"}]},{"questions":[{"type":"dropdown","name":"50_50_b_b","title":"Find the most dynamic time point (the timestamps, when many instances change their status)","choices":["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50"],"correctAnswer":"Group 2"},{"type":"html","name":"info","html":"<table><body><row><td><img src='images/50_50_b_b.svg' /></td><td style='padding:20px'></td></row></body></table>"}]}]
        shuffle(questions);
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
    maxTimeToFinish: 1300 //in seconds
}

let userstudy = new UserStudy(params);
userstudy.init();
