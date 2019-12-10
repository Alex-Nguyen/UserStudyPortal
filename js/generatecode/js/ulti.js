function fixName2Class(s) {
    return 'h'+s.replace(/ |#|\./gi,''); //avoid . and number format
}
function fixstr(s) {
    return s.replace(/ |#/gi,'');
}
function trimNameArray(text){
    let namearr = text.split(' ');
    if (namearr.length<3)
        return namearr.join(', ');
    else{
        nametr = namearr.slice(0,2).join(', ');
        nametr += `, +${namearr.length-2} more`;
        return nametr;
    }
}
function generateDataSurvey(INS,TIMES,TASK){
    var cluster = [[44,20,5.101402755487004,9870,9870,9870,10010,90.3125,57],
        [64,17,40.01604935698356,9310,8890,9310,8890,98.75,77],
        [45,14,95.14767492756947,8890,8890,8750,8890,93.75,57],
        [27,11,3.5725451778977426,10920,10850,10920,10850,40.3125,29],
        [76,17,3.1129499551868602,10920,11060,11130,11060,97.8125,87]
    ];
    var servicelist = [{"text":"CPU2 Temp","id":1,"enable":true,"idroot":0,"angle":0,"range":[3,98]},{"text":"Inlet Temp","id":2,"enable":true,"idroot":0,"angle":0.6981317007977318,"range":[3,98]},{"text":"Memory usage","id":0,"enable":true,"idroot":1,"angle":1.5707963267948966,"range":[0,99]},{"text":"Fan1 speed","id":0,"enable":true,"idroot":2,"angle":2.4870941840919194,"range":[1050,17850]},{"text":"Fan2 speed","id":1,"enable":true,"idroot":2,"angle":2.923426497090502,"range":[1050,17850]},{"text":"Fan3 speed","id":2,"enable":true,"idroot":2,"angle":3.3597588100890845,"range":[1050,17850]},{"text":"Fan4 speed","id":3,"enable":true,"idroot":2,"angle":3.796091123087667,"range":[1050,17850]},{"text":"Power consumption","id":0,"enable":true,"idroot":3,"angle":4.71238898038469,"range":[0,200]},{"text":"CPU1 Temp","id":0,"enable":true,"idroot":0,"angle":5.585053606381854,"range":[3,98]}];
    var INSTANCE = INS;
    var TIMESTEP = TIMES;
    var VARNUM = 9;
    var CLUSTERNUM = cluster.length-1;

    var ROW = TASK?TIMESTEP:INSTANCE;
    var COLLUM = TASK?INSTANCE:TIMESTEP;
    var MARK = Math.round(Math.random()*(ROW-1));
    // console.log('MARK: ',MARK)
    var instance_name = d3.range(0,INSTANCE).map(d=>''+(d+1));
    var var_name = ["CPU2 Temp","Inlet Temp","Memory usage","Fan1 speed","Fan2 speed","Fan3 speed","Fan4 speed","Power consumption","CPU1 Temp"];

    var startTime = new Date('Jan 01 2019 1:00:00');
    var timescale = d3.scaleTime().domain([startTime,new Date(+startTime+60*60*1000)]).range([0,1]);

// make header
    var listheader = ['timestamp'];

// generate data
    var LOWLIMIT,HIGHLIMIT;
    switch(COLLUM) {
        case 10:
            LOWLIMIT = 3;
            HIGHLIMIT = 5;
            break;
        case 30:
            LOWLIMIT = 6;
            HIGHLIMIT = 10;
            break;
        case 50:
            LOWLIMIT = 8;
            HIGHLIMIT = 15;
            break;
        default:
            LOWLIMIT = ROW/12;
            HIGHLIMIT = ROW/6;
            break;
    }
    function ranint(n){
        return Math.round(Math.random()*n);
    }
    var matrix = d3.range(0,ROW).map((r)=>{
        var clustern = r!==MARK?ranint(LOWLIMIT):HIGHLIMIT;
        var randc = d3.range(0,clustern).map(d=>{
            return{cnum:ranint(CLUSTERNUM),pos:ranint(COLLUM-3)+1};
        }).sort((a,b)=>a.pos-b.pos);
        if (r===MARK){
            do {
                var key = false;
                var old = undefined;
                randc.forEach(r => {
                    if (r.cnum===old) {
                        key=true;
                        r.cnum = cc();
                    }
                    old = r.cnum;

                    function cc() {
                        let tem = ranint(CLUSTERNUM)
                        while (tem === old)
                            tem = ranint(CLUSTERNUM)
                        return tem;
                    }
                })
                old = undefined;
                randc.forEach(r => {
                    if (r.pos===old) {
                        key = true;
                        r.pos = cc();
                    }
                    old = r.pos;

                    function cc() {
                        let tem = ranint(ranint(COLLUM - 3) + 1)
                        while (tem === old)
                            tem = ranint(ranint(COLLUM - 3) + 1)
                        return tem;
                    }
                })
                randc.sort((a, b) => a.pos - b.pos)
            }while(key)
        }else{
            randc = _.uniqBy(randc,'pos')
        }
        return randc;
    });

    if (!TASK){
        var old=[];
        matrix = d3.range(0,TIMESTEP).map(t=>d3.range(0,INSTANCE).map(i=>{
            if (!t) {
                old[i] = ranint(CLUSTERNUM);
                return old[i];
            }
            if (matrix[i][0]&&t===matrix[i][0].pos){
                old[i] = matrix[i].shift().cnum;
            }
            return old[i];
        }));
    }else{
        var old=[];
        matrix = d3.range(0,TIMESTEP).map(t=>d3.range(0,INSTANCE).map(i=>{
            if (!t) {
                old[i] = ranint(CLUSTERNUM);
                return old[i];
            }
            if (matrix[t][0]&&i===matrix[t][0].pos){
                old[i] = cc();
                function cc (){
                    let tem = ranint(CLUSTERNUM)
                    while(tem===old[i])
                        tem = ranint(CLUSTERNUM)
                    return tem;
                }
                matrix[t].shift();
            }
            return old[i];
        }));
    }
    let timespan = [];
    let hosts = instance_name.map(ins=>{
        return {name:ins}});
    let cluster_info =cluster.map((c,ci)=>{
        let temp  ={};
        temp.__metrics = [];
        temp.__metrics.normalize = [];
        servicelist.forEach((s,si)=>{
            temp[s.text] = c[si];
            let tempv = d3.scaleLinear().domain(s.range)(c[si]);
            temp.__metrics.push({axis: s.text, value: tempv })
            temp.__metrics.normalize.push(tempv);
        });
        temp.arr = [];
        temp.index = ci;
        temp.labels = ""+ci;
        temp.name = "group_"+ci;
        temp.order = ci;
        return temp;
    });

    d3.range(0,TIMESTEP).forEach(t=>{
        let temp = {};
        timespan.push(timescale.invert(t));
        instance_name.forEach((ins,insi)=>{
            if (!cluster_info[matrix[t][insi]].arr[t])
                cluster_info[matrix[t][insi]].arr[t] = [];
            cluster_info[matrix[t][insi]].arr[t].push(ins);
        })

    });
    return {timespan:timespan,hosts:hosts,cluster_info:cluster_info,serviceFullList:servicelist,correct:MARK};
}
