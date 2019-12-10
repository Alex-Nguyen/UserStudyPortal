function generateData(dataopt) {
    let INS=dataopt.INS,TIMES =dataopt.TIMES,TASK =dataopt.TASK;
    let data = generateDataSurvey(INS,TIMES,TASK);
    data.vizType = dataopt.vizType;
   return data;
}

function renderdata(data,id) {
    let opt = {
        margin:{top:50,bottom:20,left:50,right:20},
        width: 1000,
        height:500,
        radaropt:{}
    };
    let runopt = {
        compute:{type:"timeline"},
    };
    let vizType = data.vizType;
    runopt.compute.bundle = vizType
    let timelinemap = TimeRadar().svg(d3.select(id)).graphicopt(opt).runopt(runopt).init();

    // generate data

    let hosts,timerange,timespan,cluster_info,serviceFullList;
    hosts = data.hosts;
    timespan = data.timespan;
    serviceFullList = data.serviceFullList;
    timerange = [timespan[0],timespan[timespan.length-1]];
    cluster_info = data.cluster_info;
    // arrcluster
    timelinemap.hosts(hosts).schema(serviceFullList).maxTimestep(timespan.length);
    timelinemap.clusterData(cluster_info).colorCluster(d3.scaleOrdinal().range(d3.schemeCategory10));
    timelinemap.data(timerange,timespan.length-1)
    timelinemap.draw()



}