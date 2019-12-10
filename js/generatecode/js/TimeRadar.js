let TimeRadar = function() {
    let graphicopt = {
            margin: {top: 20, right: 0, bottom: 0, left: 0},
            width: 250,
            height: 50,
            scalezoom: 1,
            widthView: function () {
                return this.width * this.scalezoom
            },
            heightView: function () {
                return this.height * this.scalezoom
            },
            widthG: function () {
                return this.widthView() - this.margin.left - this.margin.right
            },
            heightG: function () {
                return this.heightView() - this.margin.top - this.margin.bottom
            },
        }, runopt = {}, radarcreate,
        colorscale,
        svg, g, first = true,
        dataRaw = [], data = [], arr = [],
        Hosts = [],hostOb={};

    let master = {};
    let timebox, nodeg, schema = [];
    let fisheye_scale = {x: d3.scaleLinear(), y: d3.scaleLinear()};
    let first__timestep = new Date(),
    last_timestep = new Date(),
    maxTimestep,
    lastIndex = 0,
    deltaTime = 0;
    let triggerCal_Cluster = true;
    let yscale,linkscale = function(){return 2};
    let scaleNode = d3.scaleLinear();
    let scaleNode_y = d3.scaleLinear();
    //----------------------cluster----------------------
    let clusterdata,clusterdata_timeline;
    let timelineStep = 20;
    let timelineScale = d3.scaleLinear().range([-timelineStep,0]);
    //----------------------color----------------------
    let colorCategory  = d3.scaleOrdinal().range(d3.schemeCategory20);
    let colorCluster  = d3.scaleOrdinal().range(d3.schemeCategory10);


    master.init = function() {

        svg.attrs({
            width: graphicopt.width,
            height: graphicopt.height,

        }).styles({
            'fill': 'none',
            'font-size': '10px',
            'font-family': 'sans-serif',
        });
        let svdefs = svg.select('defsmain');
        if (svdefs.empty())
            svdefs = svg.append('defs').attr('id', 'defsmain');
        if (svdefs.select('#userpic').empty())
            svdefs.append('pattern')
                .attrs({'id': 'userpic', width: '100%', height: '100%', 'patternContentUnits': 'objectBoundingBox'})
                .append('image')
                .attrs({
                    'height': 1, width: 1, preserveAspectRatio: 'none',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink', 'xlink:href': 'src/images/u.png'
                });
        if (svdefs.select('marker').empty())
            svdefs.append('marker').attrs({
                id: "arrow",
                markerWidth: "10",
                markerHeight: "10",
                refX: "0",
                refY: "3",
                orient: "auto",
                markerUnits: "strokeWidth"
            }).append('path').attrs({'d': "M0,0 L0,6 L9,3 z"}).styles({fill: "black"});
        svg.append('rect').attr('class', 'pantarget')
            .attrs({
                'opacity': 0,
                width: graphicopt.width,
                height: graphicopt.height,
            })

        g = svg.append("g")
            .attr('class', 'pannel')
            .attr('transform', `translate(${graphicopt.margin.left},${graphicopt.margin.top})`);

        g.append('text').attr('class', 'Time').styles({
            'font-weight': 'bold',
            'fill': 'black'
        }).attrs({'text-anchor': "middle", 'x': graphicopt.margin.left - 10, 'dy': -30}).text('Time');
        g.append('line').attrs({
            x1: 60,
            x2: 95,
            y1: -33,
            y2: -33,
            'marker-end': "url(#arrow)"
        }).style('stroke', 'black');
        g.append('text').attr('class', 'Time').styles({
            'font-weight': 'bold',
            'fill': 'black'
        }).attrs({'text-anchor': "middle", 'x': -5, 'dy': '-1rem',}).text('Instance');
        g.append('line').attrs({
            x1: 5,
            x2: 5,
            y1: -5,
            y2: 30,
            'marker-end': "url(#arrow)"
        }).style('stroke', 'black');
        const gNodeaxis = g.append('g').attr('class', 'gNodeaxis hide').attr('transform', `translate(200,0)`);
        gNodeaxis.append('g').attr('class', 'gMainaxis');
        gNodeaxis.append('g').attr('class', 'gSubaxis');
        nodeg = g.append("g")
            .attr('class', 'nodeg');

        return master;
    };

    // calculate section
    function handle_links (timeStep_r,lastIndex_r){
        if (timeStep_r) {
            last_timestep = new Date(timeStep_r[1].toString());
            lastIndex = lastIndex_r;
            first__timestep = new Date(timeStep_r[0].toString());
            deltaTime = (last_timestep - first__timestep)/maxTimestep;
        }

        Hosts.forEach(h=>{
            h.arrcluster = [];
            if (triggerCal_Cluster) {
                h.timeline = {clusterarr: [], line: [], lineFull: [], clusterarr_sudden: []};
            }
        });


                updateClusterTimeline();




            if (runopt.compute.type==='timeline') {
                clusterdata_timeline = [];

                clusterdata_timeline = Hosts.map(h=>{
                    let e = h.name;
                    return {
                        name: e,
                        values_name: [e],
                        timeline: hostOb[e].timeline,
                        arr: hostOb[e].arrcluster,
                    }});
                }

            data.forEach(d=>{
                let clust=_.last(hostOb[d.nodes[0]].timeline.clusterarr).cluster;
                let key = true;
                for (let i=1;i<d.nodes.length;i++) {
                    if (clust!=_.last(hostOb[d.nodes[i]].timeline.clusterarr).cluster) {
                        key = false;
                        break;
                    }
                }
                if (key)
                    d.cluster = clust;
                else
                    d.cluster = undefined;
            });
    };

    function updateClusterTimeline() {
        let maxstep = d3.max(clusterdata, c => c.arr.length) - 1;
        for (let ts = 0; ts < maxstep + 1; ts++) {
            clusterdata.forEach(c => {
                ct = c.arr[ts];
                if (ct)
                    ct.forEach(h => {
                        hostOb[h].arrcluster[ts] = c.name;
                        let currentarr = hostOb[h].timeline.clusterarr;
                        if (currentarr.length && c.name === hostOb[h].timeline.clusterarr[currentarr.length - 1].cluster) {
                            hostOb[h].timeline.clusterarr.stack++;
                            hostOb[h].timeline.lineFull[hostOb[h].timeline.lineFull.length - 1].end = ts;
                            if (hostOb[h].timeline.clusterarr.stack === 1)
                                hostOb[h].timeline.line.push({cluster: c.name, start: ts - 1, end: ts});
                            else if (hostOb[h].timeline.clusterarr.stack > 1)
                                hostOb[h].timeline.line[hostOb[h].timeline.line.length - 1].end = ts;
                        } else {
                            hostOb[h].timeline.clusterarr.push({cluster: c.name, timestep: ts});
                            hostOb[h].timeline.lineFull.push({cluster: c.name, start: ts, end: ts});
                            hostOb[h].timeline.clusterarr.stack = 0;
                        }
                    });

            });
        }
        timelineScale.domain([maxstep - 1, maxstep]);
    }

    function makeOb (){
        hostOb={};
        Hosts.forEach(h=>{h.data=[]; hostOb[h.name]=h;});
    }

    function updateMaxTimestep(){
        timelineScale.range([-timelineStep,0]);
    }

    function renderManual(computers) {
        if (runopt.compute.type==='timeline') {
            if (!runopt.compute.bundle) {
                computers.data().sort((a, b) => (+a.name) - (+b.name)).forEach((d, i) => d.order = i);
                scaleNode_y_middle = d3.scaleLinear().range([0,(computers.data().length - 1)*15]).domain([0, computers.data().length - 1]);
                g.selectAll('.computeNode.new').classed('new',false).attr('transform', d => {
                    d.x2 = graphicopt.widthG()-20;
                    d.y2 = scaleNode_y_middle(d.order);
                    return `translate(${d.x2},0)`
                }).style('opacity',0);
                computers.attr('transform', function(d) {
                    d.x2 = graphicopt.widthG()-20;
                    d.y2 = scaleNode_y_middle(d.order);
                    d3.select(this).select('.computeSig_label').classed('hide',false).text(d=>d.name).attr('transform',`translate(${fisheye_scale.x(timelineScale(0))},${d.y2})`)
                    return `translate(${d.x2},0)`
                }).style('opacity',undefined);
            }else{
                let bundle_cluster = clusterdata.map(c=>{return {cluster:c.name,maxinstance:d3.max(c.arr,e=>e?e.length:0),arr:d3.range(0,maxTimestep).map(()=>[]),orderscale:{_last:0},crossing:{},totalcrossing:0}});
                let bundle_cluster_ob = {};
                bundle_cluster.forEach((b,i)=>(b.bid=i,bundle_cluster_ob[b.cluster] = b));
                //

                // arrange group for avoid crossing
                //<editor-fold desc="Arrange group">
                computers.data().forEach(c=> {
                    for (let i = 0;i<c.timeline.clusterarr.length-1;i++) {
                        bundle_cluster_ob[c.timeline.clusterarr[i].cluster].crossing[c.timeline.clusterarr[i+1].cluster] = (bundle_cluster_ob[c.timeline.clusterarr[i].cluster].crossing[c.timeline.clusterarr[i+1].cluster]||0) +1;
                        bundle_cluster_ob[c.timeline.clusterarr[i+1].cluster].crossing[c.timeline.clusterarr[i].cluster] = (bundle_cluster_ob[c.timeline.clusterarr[i+1].cluster].crossing[c.timeline.clusterarr[i].cluster]||0) +1;
                        bundle_cluster_ob[c.timeline.clusterarr[i].cluster].totalcrossing++;
                        bundle_cluster_ob[c.timeline.clusterarr[i+1].cluster].totalcrossing++;
                    }
                });

                bundle_cluster.sort((a,b)=>b.totalcrossing-a.totalcrossing);

                let list = bundle_cluster.map(b=>b.cluster);
                let headB = list.pop();
                bundle_cluster_ob[headB].orderbycross = 0;
                let count = 1;

                //<editor-fold desc="Arrange group base on newest element">
                while(count<bundle_cluster.length){
                    let max_n=0;
                    let headB_temp =undefined;
                    list.forEach(l=>{if(bundle_cluster_ob[headB].crossing[l]>max_n){
                        max_n = bundle_cluster_ob[headB].crossing[l];
                        headB_temp = l;
                    }});
                    if (!headB_temp)
                        headB_temp = list.pop();
                    bundle_cluster_ob[headB_temp].orderbycross = count;
                    _.pull(list,headB_temp);
                    headB = headB_temp;
                    count++;
                }
                //</editor-fold>

                //<editor-fold desc="Arrange group base on maximum connection">
                while(count<bundle_cluster.length){
                    let max_n=0;
                    let headB_temp =undefined;
                    list.forEach(l=>{if(bundle_cluster_ob[headB].crossing[l]>max_n){
                        max_n = bundle_cluster_ob[headB].crossing[l];
                        headB_temp = l;
                    }});
                    if (!headB_temp)
                        headB_temp = list.pop();
                    bundle_cluster_ob[headB_temp].orderbycross = count;
                    _.pull(list,headB_temp);
                    headB = headB_temp;
                    count++;
                }
                //</editor-fold>

                bundle_cluster.sort((a,b)=>a.orderbycross-b.orderbycross).forEach((b,i)=>b.bid = i);
                //</editor-fold>


                // max instance stay top
                // bundle_cluster.sort((a,b)=>b.maxinstance-a.maxinstance).forEach((b,i)=>b.bid = i);

                computers.data().forEach(c=>{
                    c.order=0;
                    c.bundle={};
                    c.arr.forEach((t,i)=>{
                        const bi = bundle_cluster_ob[t].bid;
                        c.order+=bi;
                        const old = c.bundle[bundle_cluster[bi].cluster];
                        c.bundle[bundle_cluster[bi].cluster] = Math.min(old===undefined?Infinity:old,i);
                    });
                });
                computers.data().sort((a,b)=>a.order-b.order)
                    .forEach(c=>{
                        c.arr.forEach((t,i)=>{
                            const bi = bundle_cluster.findIndex(b=>b.cluster===t);
                            if (!bundle_cluster[bi].orderscale[c.name]){
                                bundle_cluster[bi].orderscale[c.name] = bundle_cluster[bi].orderscale._last;
                                bundle_cluster[bi].orderscale._last++;
                            }
                            // bundle_cluster[bi].arr[i][c.name] = bundle_cluster[bi].orderscale(i);

                        });
                    });
                const maxBundle = bundle_cluster.map((d,i)=>(d.totalc = d.orderscale._last||1,d.offset= i?(bundle_cluster[i-1].offset+bundle_cluster[i-1].totalc):0,d.totalc));
                // const maxBundle = bundle_cluster.map((d,i)=>(d.totalc = d3.max(d.lastindex_arr),d.offset= i?(bundle_cluster[i-1].offset+bundle_cluster[i-1].totalc):0,d.totalc));
                const fullScaleB =  d3.scaleLinear().range([0, (computers.data().length - 1)*15]).domain([0, d3.sum(maxBundle)-1]);
                scaleNode_y_middle = function(clustername,ti,computeID){
                    const masteb = bundle_cluster_ob[clustername];
                    return fullScaleB(masteb.orderscale[computeID]+masteb.offset);
                    // return fullScaleB(masteb.arr[ti][computeID]+masteb.offset);
                };
                computers.attr('transform', function(d){
                    d.x2 = graphicopt.widthG()-20;
                    const lastItem = _.last(d.timeline.lineFull);
                    const firstItem = d.timeline.lineFull[0];
                    d.y2 = scaleNode_y_middle(lastItem.cluster,lastItem.end,d.name);
                    d3.select(this).select('.computeSig_label').classed('hide',false).text(d=>d.name).attr('transform',`translate(${fisheye_scale.x(timelineScale(0))},${scaleNode_y_middle(firstItem.cluster,firstItem.end,d.name)})`)
                    d.y = 0;
                    return `translate(${d.x2},0)`
                });
            }
            updateaxis();
        }else{
            computers.data().sort((a, b) => (b.arr[lastIndex]||[]).length - (a.arr[lastIndex]||[]).length).forEach((d, i) => d.order = i);// sort by temperal instance
            g.select('.host_title').attrs({'text-anchor':"middle",'x':300,'dy':-20}).text("Major host groups");
            // computers.data().sort((a, b) => b.arr ? b.arr[b.arr.length - 1].length : -1 - a.arr ? a.arr[a.arr.length - 1].length : -1).forEach((d, i) => d.order = i);
            g.selectAll('.computeNode.new')
            computers.transition().duration(animation_time).attr('transform', d => {
                d.x = graphicopt.widthG()-20;
                d.x2 = graphicopt.widthG()-20;
                d.y = scaleNode_y(d.order);
                return `translate(${d.x2},${d.y})`
            });
            let barhis = g.select('.majorbar').selectAll('g.m').data(computers.data(),d=>d.name);
            barhis.exit().remove();
            barhis. enter().append('g').attr('class',d=>`${d.name} m`);
            barhis.attr('class',d=>`${d.name} m`);
            g.select('.majorbar').selectAll('g.m').transition().duration(animation_time).attr('transform',d=>`translate(${d.x2},${d.y})`);

        }
        // link.transition().duration(animation_time)
        //     .call(updatelink);
    }
    // draw section
    master.draw = function (){
        graphicopt.width = maxTimestep*timelineStep+30+graphicopt.margin.left+graphicopt.margin.right;
        graphicopt.height = 15*(clusterdata_timeline).length+30+graphicopt.margin.top+graphicopt.margin.bottom;
        svg.attrs({'width':graphicopt.width,'height':graphicopt.height})
        yscale = d3.scaleLinear().domain([-1,graphicopt.heightG()/20]).range([0,graphicopt.heightG()]);
        let deltey = yscale(1)-yscale(0);

        let computers = nodeg.selectAll('.computeNode').data(clusterdata_timeline||clusterNode_data||Hosts,d=> d.name);
        computers.select('.computeSig').datum(d=>d);
        computers.exit().remove();
        let computers_n = computers.enter().append('g').attr('class',d=>'node computeNode new '+fixName2Class(fixstr(d.name)));

        computers_n.append('g').attrs(
            {'class':'computeSig',
                'stroke':'black',
            });
        computers_n.append('text').attrs(
            {'class':'computeSig_label label',
                // 'opacity':0,
                'text-anchor':'end',
                'dy':'0.5rem',
                'fill':'black',
            }).merge(computers.select('.computeSig_label')).text(d=>d.orderG!==undefined?`Group ${d.orderG+1}${d.text!==''?`: ${d.text}`:''}`:trimNameArray(d.name))
        ;

        computers = nodeg.selectAll('.computeNode');
        computers.select('.label').classed('hide',runopt.compute.type==='timeline');

        computers.classed('statics', true);
        renderManual(computers);
        master.drawComp();
        return master;
    };
    master.drawComp = function() {
        drawEmbedding_timeline(clusterdata.map(d => {
            let temp = d.__metrics.normalize;
            temp.name = d.name;
            return temp;
        }), true);
    };

    function drawEmbedding_timeline(data, colorfill) {
        // xscale
        let newdata = handledata(data);
        let bg = svg.selectAll('.computeSig');

        if (!runopt.compute.bundle) {
            const radaropt = {colorfill: colorfill, size: (scaleNode_y_middle(1) - scaleNode_y_middle(0)) * 2};
            let datapoint;
            if (!runopt.suddenGroup) {
                datapoint = bg.selectAll(".linkLinegg").interrupt().data(d => d.timeline.clusterarr.map((e, i) => {
                    temp = _.cloneDeep(newdata.find(n => n.name === e.cluster));
                    temp.name = e.cluster;
                    temp.timestep = e.timestep;
                    if (!i)
                        temp.hide = true;
                    return temp;
                }), d => d.name + d.timestep);
            } else {
                datapoint = bg.selectAll(".linkLinegg").data(d => d.timeline.clusterarr_sudden.map(e => {
                    temp = _.cloneDeep(newdata.find(n => n.name === e.cluster));
                    temp.name = e.cluster;
                    temp.timestep = e.timestep;
                    return temp;
                }), d => d.name + d.timestep);
            }

            let dataline = bg.selectAll(".linegg").data(d => d.timeline.line, d => d.cluster + '_' + d.start).attr('class', d => `linegg timeline ${fixName2Class(d.cluster)}`);
            dataline
                .attr('d', function (d) {
                    return d3.line().curve(d3.curveMonotoneX).x(function (d) {
                        return fisheye_scale.x(timelineScale(d))
                    }).y(() => scaleNode_y_middle(d3.select(this.parentNode).datum().order))(d3.range(d.start, d.end + 1))
                });
            ;
            dataline.exit().remove();
            dataline.enter().append('path')
                .attr('class', d => `linegg timeline ${fixName2Class(d.cluster)}`)
                .attr('d', function (d) {
                    return d3.line().curve(d3.curveMonotoneX).x(function (d) {
                        return fisheye_scale.x(timelineScale(d))
                    }).y(() => scaleNode_y_middle(d3.select(this.parentNode).datum().order))(d3.range(d.start, d.end + 1))
                })
                .merge(dataline)
                .styles({
                    stroke: d => colorFunc(d.cluster),
                    'stroke-width': function (d) {
                        return linkscale(d3.select(this.parentNode).datum().values_name.length)
                    }
                });

            datapoint.exit().remove();
            let datapoint_n = datapoint.enter().append('g')
                .attr('class', 'linkLinegg timeline');
            datapoint
                .merge(datapoint_n).each(function (d, i) {
                createRadar(d3.select(this).select('.linkLineg'), d3.select(this), newdata, radaropt).style('display', d.hide ? "none" : undefined);// hide 1st radar
            });
            datapoint_n.attr('transform', function (d) {
                return `translate(${fisheye_scale.x(timelineScale(d.timestep))},${scaleNode_y_middle(d3.select(this.parentNode).datum().order)})`
            });
            datapoint.attr('transform', function (d) {
                return `translate(${fisheye_scale.x(timelineScale(d.timestep))},${scaleNode_y_middle(d3.select(this.parentNode).datum().order)})`
            });
            bg.style('stroke-width', d => linkscale(d.values_name.length));
        }
        else {
            let curveBundle = d3.line()
                .curve(d3.curveMonotoneX)
                .x(function (d) {
                    return d[0];
                })
                .y(function (d) {
                    return d[1];
                });

            bg.selectAll(".linkLinegg.timeline").remove();
            let datacurve = bg.selectAll(".linegg").data(d => d.timeline.lineFull, d => d.cluster + '_' + d.start).attr('class', d => `linegg timeline ${fixName2Class(d.cluster)}`).style('fill', 'none');
            datacurve
                .attr("d", function (d, i) {
                    const datap = d3.select(d3.select(this).node().parentNode).datum();
                    let supportp = false;
                    let data_path = d3.range(d.start, (d.end + 1) === maxTimestep ? (d.end + 1) : (d.end + 2)).map(e =>
                        e > d.end ? (supportp = true, [fisheye_scale.x(timelineScale(e) - timelineStep * 0.5), scaleNode_y_middle(d.cluster, e, datap.name)]) : [fisheye_scale.x(timelineScale(e)), scaleNode_y_middle(d.cluster, e, datap.name)]
                    );
                    if (supportp)
                        data_path.push([fisheye_scale.x(timelineScale(d.end + 1)), scaleNode_y_middle(datap.timeline.lineFull[i + 1].cluster, d.end + 1, datap.name)]);
                    return curveBundle(data_path);
                })
            datacurve.exit().remove();
            datacurve.enter()
                .append('path')
                .attr('class', d => `linegg timeline ${fixName2Class(d.cluster)}`)
                .attr("d", function (d, i) {
                    const datap = d3.select(d3.select(this).node().parentNode).datum();
                    let supportp = false;
                    let data_path = d3.range(d.start, (d.end + 1) === maxTimestep ? (d.end + 1) : (d.end + 2)).map(e =>
                        e > d.end ? (supportp = true, [fisheye_scale.x(timelineScale(e) - timelineStep * 0.5), scaleNode_y_middle(d.cluster, e, datap.name)]) : [fisheye_scale.x(timelineScale(e)), scaleNode_y_middle(d.cluster, e, datap.name)]
                    );
                    if (supportp)
                        data_path.push([fisheye_scale.x(timelineScale(d.end + 1)), scaleNode_y_middle(datap.timeline.lineFull[i + 1].cluster, d.end + 1, datap.name)]);
                    return curveBundle(data_path);
                })
                .merge(datacurve)
                .styles({
                    stroke: d => colorFunc(d.cluster),
                    'stroke-width': function (d) {
                        return linkscale(d3.select(this.parentNode).datum().values_name.length)
                    }
                });
        }
        updateaxis();
    }

    function colorFunc (key){
        return key===undefined?'black':colorCluster(key);
    }

    function createRadar(datapoint, bg, newdata, customopt) {
        let size_w = customopt ? (customopt.size ? customopt.size : graphicopt.radaropt.w) : graphicopt.radaropt.w;
        let size_h = customopt ? (customopt.size ? customopt.size : graphicopt.radaropt.h) : graphicopt.radaropt.h;
        let colorfill = (customopt && customopt.colorfill) ? 0.8 : false;
        let radar_opt = {
            w: size_w,
            h: size_h,
            schema: schema,
            margin: {left: 0, right: 0, top: 0, bottom: 0},
            levels: 6,
            mini: true,
            radiuschange: false,
            isNormalize: true,
            maxValue: 0.5,
            showText: false,
            fillin: colorfill,
        };


        if (datapoint.empty()) {
            datapoint = bg
                .append("g")
                .datum(d => newdata.find(n => n.name === d.name))
                .attr("class", d => "compute linkLineg " + fixName2Class(d.name));

        }

        // replace thumnail with radar mini
        datapoint.each(function (d) {
            d3.select(this).attr('transform', `translate(${-radar_opt.w / 2},${-radar_opt.h / 2})`)
            if (colorfill)
                radar_opt.color = function () {
                    return colorFunc(d.name)
                };
            RadarChart(this, [d], radar_opt, "");
        });
        return datapoint;
    }

    function handledata(data) {
        let objectarr = data.map(a => {
            let temp = a.map((d, i) => {
                return {axis: schema[i].text, value: d, enable: schema[i].enable};
            });
            temp = _.sortBy(temp, d => schema.find(e => e.text === d.axis).angle);
            temp.name = a.name;
            return temp;
        });
        return objectarr;
    }

    function updateaxis() {
        let bg = svg.selectAll('.computeSig');
        let rangey = [-10, (bg.data().length - 1) * 15];

        let scale = d3.scaleTime().range([timelineScale(0), timelineScale(timelineScale.domain()[1])]).domain([first__timestep, last_timestep]);

        let axis = svg.select('.gNodeaxis')
            .classed('hide', false)
            .attr('transform', `translate(${bg.datum().x2 || bg.datum().x},${rangey[0]})`);

        let Maxis = axis.select('.gMainaxis')
            .call(d3.axisTop(scale).tickSize(rangey[0] - rangey[1]).tickArguments([d3.timeHour.every(1)]).tickFormat(function (d, i) {
                return i + 1;
            }));
        Maxis.select('.domain').remove();
        let mticks = Maxis.selectAll('.tick');
        mticks.attr('transform', d => `translate(${fisheye_scale.x(scale(d))},0)`);
        mticks.select('text').attr('dy', '-0.5rem');
        mticks.select('line').attr("vector-effect", "non-scaling-stroke").style('stroke-width', 0.1).styles({
            'stroke': 'black',
            'stroke-width': 0.1,
            'stroke-dasharray': '1,2',
            'opacity': 0.5
        })

        let Saxis = axis.select('.gSubaxis').classed('hide', true);
        if (fisheye_scale.x.focus) {
            const timearray = scale.ticks();
            Saxis.classed('hide', false);
            let pos2time = scale.invert(fisheye_scale.x.focus());
            let timesubarray = [new Date(+pos2time - (timearray[1] - timearray[0])), new Date(+pos2time + (timearray[1] - timearray[0]))];
            if (timesubarray[0] < first__timestep) {
                timesubarray[0] = first__timestep;
                timesubarray[1] = new Date(+timesubarray[0] + (timearray[1] - timearray[0]) * 2)
            } else if (timesubarray[1] > last_timestep) {
                timesubarray[1] = last_timestep;
                timesubarray[0] = new Date(+timesubarray[1] - (timearray[1] - timearray[0]) * 2)
            }
            let subaxis = d3.scaleTime().range(timesubarray.map(t => scale(t))).domain(timesubarray);

            let timearray_sub = _.differenceBy(subaxis.ticks(), timearray, multiFormat)

            Saxis.call(d3.axisTop(subaxis).tickSize(rangey[0] - rangey[1]).tickFormat(multiFormat).tickValues(timearray_sub));
            Saxis.select('.domain').remove();
            let sticks = Saxis.selectAll('.tick').attr('transform', d => `translate(${fisheye_scale.x(subaxis(d))},0)`);
            sticks.select('line').attr("vector-effect", "non-scaling-stroke").style('stroke-width', 0.1).style('stroke-dasharray', '1 3')
            sticks.select('text').style('font-size', 8)
        }
    }
    master.graphicopt = function (_) {
        //Put all of the options into a variable called graphicopt
        if (arguments.length) {
            for (let i in _) {
                if ('undefined' !== typeof _[i]) {
                    graphicopt[i] = _[i];
                }
            }
            if (graphicopt.radaropt)
                graphicopt.radaropt.schema = schema;
            return master;
        }else {
            return graphicopt;
        }

    };

    master.runopt = function (_) {
        //Put all of the options into a variable called graphicopt
        if (arguments.length) {
            for (let i in _) {
                if ('undefined' !== typeof _[i]) {
                    runopt[i] = _[i];
                }
            }
            return master;
        }else {
            return runopt;
        }

    };

    master.hosts = function (a) {
        return arguments.length ? (Hosts = _.cloneDeep( a),makeOb(), master) : Hosts;
    };
    master.svg = function (_) {
        return arguments.length ? (svg = _, master) : svg;
    };

    master.data = function (_) {
        return handle_links (arguments[0],arguments[1]), master;
    };
    master.clusterData = function (v) {
        return arguments.length ? (clusterdata = v, master) : clusterdata;
    };
    master.color = function (_) {
        return arguments.length ? (colorscale=_,master):colorscale;
    };
    
    master.schema = function (_) {
        return arguments.length ? (graphicopt.radaropt.schema = _,schema = _, master) : schema;
    };
    master.colorCluster = function (_) {
        return arguments.length ? (colorCluster = _,master) : colorCluster;
    };
    master.maxTimestep = function (_) {
        return arguments.length ? (maxTimestep=_,updateMaxTimestep(),master):maxTimestep;
    };
    return master;
}