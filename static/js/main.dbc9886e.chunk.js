(this["webpackJsonpcovid-viz"]=this["webpackJsonpcovid-viz"]||[]).push([[0],{345:function(e,t,a){e.exports=a(554)},489:function(e,t){},513:function(e,t,a){},517:function(e,t){},519:function(e,t){},552:function(e,t){},554:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"filters",(function(){return ae})),a.d(n,"idGroupings",(function(){return ne})),a.d(n,"abbreviations",(function(){return re})),a.d(n,"defaultChartId",(function(){return oe})),a.d(n,"spec",(function(){return ie}));var r={};a.r(r),a.d(r,"filters",(function(){return ce})),a.d(r,"idGroupings",(function(){return le})),a.d(r,"abbreviations",(function(){return ue})),a.d(r,"defaultChartId",(function(){return se})),a.d(r,"spec",(function(){return de}));var o=a(1),i=a.n(o),c=a(19),l=a.n(c),u=a(89),s=a(21),d=a(93),m=a(283),p=a(284),g=a.n(p),f=a(14),h="US",b="global",y="confirmed",v=function(e,t){return"".concat("csse_covid_19_data/csse_covid_19_time_series","/time_series_covid19_").concat(t,"_").concat(e,".csv")},E=function(e,t){return"".concat("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master","/").concat(v(e,t))},S=function(e,t){return"".concat("https://api.github.com/repos/CSSEGISandData/COVID-19/commits","?path=").concat(v(e,t).replace(/\//g,"%2F"),"&page=1&per_page=1&ref=master")},O=(E(b,"deaths"),E(b,y),S(b,"deaths"),S(b,y),a(285)),x=a(118),D=a.n(x),C=a(623),T=a(0),w=a.n(T),k=w.a.arrayOf(w.a.shape({x:w.a.number,y:w.a.number})),A=(w.a.shape({cases:k,deaths:k,filters:w.a.objectOf(w.a.bool).isRequired,chartState:w.a.objectOf(w.a.shape({logScale:w.a.bool,normalizeDays:w.a.bool})).isRequired}),w.a.shape({title:w.a.string,group:w.a.string,label:w.a.string,getData:w.a.func,getUpdatedAt:w.a.func,logScale:w.a.bool,normalizeDays:w.a.number}),a(91)),j=function(e){return e.cases},M=function(e){return function(t){var a=e(t),n=function(e){return e.filters}(t);return a.filter((function(e){var t=e.id;return n[t]}))}},I=function(e){return function(t){return function(a){var n=new Date(e).getTime();return t(a).map((function(e){return{id:e.id,data:e.data.filter((function(e){return e.x>=n}))}}))}}},_=M((function(e){return e.deaths})),N=M(j),U=function(e){return e.deathsTimestamp},G=function(e){return e.casesTimestamp},z=function(e){var t=e.id,a=e.data;return{id:t,data:a.map((function(e,t){var n=e.x,r=e.y,o=a[t-1];return{x:n,y:r,change:0===t?0:r-o.y}}))}},R=function(e){return function(t){return e(t).map(z).map((function(e){return{id:e.id,data:e.data.map((function(e){return{x:e.x,y:e.change}}))}}))}},P=function(e){return function(t){return e(t).map(z).map((function(e){return{id:e.id,data:e.data.map((function(e){var t=e.x,a=e.y,n=e.change;return{x:t,y:0===a?0:n/a}}))}}))}},L=function(e){return function(t){return function(a){return t(a).map((function(t){var a=t.id,n=t.data;return{id:a,data:n.map((function(t,a){var r=t.x;return a<6?{x:r,y:null}:{x:r,y:Object(A.a)(Array(e).keys()).map((function(e){return n[a-e].y})).reduce((function(e,t){return e+t}),0)/e}}))}}))}}},B=function(e){return _(e).map((function(t){var a=t.id,n=t.data,r=N(e).find((function(e){return e.id===a})).data,o=n.map((function(e,t){var a=e.x,n=e.y,o=r[t].y;return{x:a,y:0===o?0:n/o}}));return{id:a,data:o}}))},F=function(e){return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"})},H=a(619),W=a(622),V=a(99),K=function(e){var t=e.label,a=e.color,n=e.xFormat,r=e.yFormat,o=e.x,c=e.y,l=e.dense;return i.a.createElement(H.a,{variant:"outlined"},i.a.createElement(W.a,{style:{padding:l?"6px 6px 4px":"8px 8px 6px"}},i.a.createElement("span",{style:{width:"12px",height:"12px",borderRadius:"6px",backgroundColor:a,display:"inline-block",marginRight:"6px"}}),i.a.createElement(V.a,{variant:"body2",component:"span",style:{fontWeight:l?null:500},gutterBottom:!0},t),l&&i.a.createElement(V.a,{variant:"body2",component:"span"}," - "),i.a.createElement(V.a,{variant:"body2",component:l?"span":"p"},n(o)),l&&i.a.createElement(V.a,{variant:"body2",component:"span"},": "),i.a.createElement(V.a,{variant:"body2",component:l?"span":"p",style:{fontWeight:l?500:null}},r(c))))};K.defaultProps={xFormat:function(e){return e},yFormat:function(e){return e},dense:!1};var J=K,Y=["rgb(255, 245, 235)","rgb(253, 208, 162)","rgb(253, 141, 60)","rgb(241, 105, 19)","rgb(217, 72, 1)"],X=function(e){return e>=1&&e<=10?Y[0]:e>=11&&e<=100?Y[1]:e>=101&&e<=1e3?Y[2]:e>=1001&&e<=1e4?Y[3]:e>=10001?Y[4]:Y[0]},q=function(e){return Object.values(e).filter((function(e){return!isNaN(e)})).reduce((function(e,t){return e+t}),0)},Q=function(){};Q.domain=function(){return X};var Z,$=function(e){var t=e.reducer,a=R(j)(t),n=a[0].data.map((function(e){return e.x})),r=n.sort().slice(n.length-21,n.length),o=r.reduce((function(e,t){return Object(f.a)({},e,Object(s.a)({},t,!0))}),{}),c=a.map((function(e){var t=e.id,a=e.data.reduce((function(e,t){var a=t.x,n=t.y;return o[a]?Object(f.a)({},e,Object(s.a)({},a,n)):e}),{});return Object(f.a)({},a,{id:t})})).sort((function(e,t){return q(t)-q(e)})),l=25*c.length;return i.a.createElement(C.a,{style:{width:"800px",height:"".concat(l,"px")}},i.a.createElement(O.a,{data:c,keys:r.map((function(e){return e.toString()})),indexBy:"id",minValue:0,maxValue:1e4,forceSquare:!0,sizeVariation:0,colors:Q,margin:{top:50,right:0,bottom:100,left:0},pixelRatio:2,axisTop:{orient:"top",tickSize:5,tickPadding:5,tickRotation:-90,legend:"",legendOffset:36,format:function(e){return F(parseInt(e,10))}},cellOpacity:1,cellBorderColor:{from:"color",modifiers:[["darker","0.3"]]},enableLabels:!1,labelTextColor:{from:"color",modifiers:[["darker",1.8]]},animate:!1,hoverTarget:"row",cellHoverOthersOpacity:.7,tooltip:function(e){var t=e.xKey,a=e.yKey,n=e.value,r=e.color;return i.a.createElement(J,{label:a,color:r,x:F(parseInt(t,10)),y:D()(n).format("0,0"),dense:!0})},theme:{tooltip:{container:{background:"none",border:0,borderRadius:0,boxShadow:"none",padding:0}}}}))},ee=new Date("3/1/2020"),te=function(e){return{"deaths-cumulative":{title:"Cumulative ".concat(e," Deaths"),group:"Deaths",label:"Cumulative Count",getData:I(ee)(_),getUpdatedAt:U,logScale:!0,normalizeDays:10},"deaths-daily":{title:"Daily ".concat(e," Deaths"),group:"Deaths",label:"Daily Count",getData:R(I(ee)(_)),getUpdatedAt:U,logScale:!0},"deaths-change-rate":{title:"".concat(e," Deaths Daily Rate of Change (7 Day Average)"),group:"Deaths",label:"Rate of Change",getData:I(ee)(L(7)(P(_))),getUpdatedAt:U},"cases-cumulative":{title:"Cumulative ".concat(e," Cases"),group:"Cases",label:"Cumulative Count",getData:I(ee)(N),getUpdatedAt:G,logScale:!0,normalizeDays:50},"cases-daily":{title:"Daily ".concat(e," Cases"),group:"Cases",label:"Daily Count",getData:R(I(ee)(N)),getUpdatedAt:G,logScale:!0},"cases-change-rate":{title:"".concat(e," Cases Daily Rate of Change (7 Day Average)"),group:"Cases",label:"Rate of Change",getData:I(ee)(L(7)(P(N))),getUpdatedAt:G},"mortality-rate":{title:"".concat(e," Mortality Rate"),group:"Other",label:"Mortality Rate",getData:I(ee)(B),getUpdatedAt:U},heatmap:{title:"".concat(e," Case Heatmap"),group:"Other",label:"Case Heatmap",component:function(e){return i.a.createElement($,{reducer:e})}}}},ae={Italy:!0,US:!0,UK:!0,Singapore:!0,France:!1,Spain:!1,Germany:!1,"S. Korea":!1},ne=[{label:"Americas",ids:["US","Canada","Mexico","Brazil"]},{label:"Europe",ids:["UK","Spain","France","Germany","Italy","Switzerland","Belgium","Netherlands"]},{label:"APAC",ids:["Singapore","Taiwan","Japan","South Korea","Australia"]}],re={US:"US",Canada:"CA",Mexico:"MX",Brazil:"BR",UK:"UK",Spain:"ES",France:"FR",Germany:"DE",Italy:"IT",Switzerland:"CH",Belgium:"BE",Netherlands:"NL",Singapore:"SG",Taiwan:"TW",Japan:"JP","South Korea":"SK",Australia:"AU"},oe="deaths-cumulative",ie=te("Global"),ce={California:!0,Florida:!0,Minnesota:!0,"New York":!0,Washington:!0},le=[{label:"Northeast",ids:["Maine","New Hampshire","Vermont","Massachusetts","New York","Rhode Island","Connecticut","New Jersey","Pennsylvania"]},{label:"Midwest",ids:["Ohio","Michigan","Indiana","Illinois","Wisconsin","Minnesota","North Dakota","South Dakota","Nebraska","Iowa","Kansas","Missouri"]},{label:"Southeast",ids:["Maryland","Delaware","District of Columbia","West Virginia","Virginia","Kentucky","Tennessee","North Carolina","South Carolina","Georgia","Florida","Alabama","Mississippi"]},{label:"South",ids:["Arkansas","Louisiana","Oklahoma","Texas"]},{label:"Mountain",ids:["Montana","Idaho","Wyoming","Nevada","Utah","Colorado","Arizona","New Mexico"]},{label:"West",ids:["California","Oregon","Washington","Alaska","Hawaii"]},{label:"Other US Territories",ids:["American Samoa","Guam","Northern Mariana Islands","Puerto Rico","Virgin Islands"]}],ue={Alabama:"AL",Alaska:"AK","American Samoa":"AS",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE","District of Columbia":"DC",Florida:"FL",Georgia:"GA",Guam:"GU",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND","Northern Mariana Islands":"OH",Ohio:"OK",Oklahoma:"OR",Oregon:"PW",Pennsylvania:"PA","Puerto Rico":"PR","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT","Virgin Islands":"VI",Virginia:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY"},se="deaths-cumulative",de=te("US"),me=function(e){return Object.values(Object.keys(e).reduce((function(t,a){var n=e[a],r=n.group,o=n.label,i=t[r]?t[r].pages:[],c=[].concat(Object(A.a)(i),[{id:a,label:o}]);return Object(f.a)({},t,Object(s.a)({},r,{group:r,pages:c}))}),{}))},pe=function(e){return Object.keys(e).reduce((function(e,t){return Object(f.a)({},e,Object(s.a)({},t,{logScale:!1,normalizeDays:!1}))}),{})},ge=function(e){var t=e.filters,a=e.spec;return{cases:null,casesTimestamp:null,deaths:null,deathsTimestamp:null,allIds:null,filters:t,idGroupings:e.idGroupings,abbreviations:e.abbreviations,chartState:pe(a),loading:!0}},fe=function(e,t){return function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"".concat(e,"_FETCHED_DATASET_deaths"):return Object(f.a)({},a,{deaths:n.value});case"".concat(e,"_FETCHED_DATASET_confirmed"):return Object(f.a)({},a,{allIds:n.value.map((function(e){return e.id})),cases:n.value});case"".concat(e,"_FETCHED_TIMESTAMP_deaths"):return Object(f.a)({},a,{deathsTimestamp:n.value});case"".concat(e,"_FETCHED_TIMESTAMP_confirmed"):return Object(f.a)({},a,{casesTimestamp:n.value});case"".concat(e,"_TOGGLE_ID_FILTER"):return Object(f.a)({},a,{filters:Object(f.a)({},a.filters,Object(s.a)({},n.id,!a.filters[n.id]))});case"".concat(e,"_FORM_CONTROL_TOGGLE"):return Object(f.a)({},a,{chartState:Object(f.a)({},a.chartState,Object(s.a)({},n.value.chartId,Object(f.a)({},a.chartState[n.value.chartId],{},n.value.update)))});case"".concat(e,"_DATA_LOADED"):return Object(f.a)({},a,{loading:!1});default:return a}}},he=fe(b,ge(n)),be=fe(h,ge(r)),ye=Object(d.c)((Z={},Object(s.a)(Z,b,he),Object(s.a)(Z,h,be),Z)),ve=Object(d.d)(ye,Object(d.a)(m.a,g.a)),Ee=a(32),Se=a(68),Oe=a(625),xe=a(624),De=function(e){var t=e.spec,a=e.base;return i.a.createElement("div",{id:"right-nav"},t.map((function(e){var t=e.group,n=e.pages;return i.a.createElement(xe.a,{key:t,component:"nav"},i.a.createElement(V.a,{variant:"body1",gutterBottom:!0,style:{paddingLeft:"12px"}},t),n.map((function(e){var t=e.id,n=e.label;return i.a.createElement("li",{className:"right-nav-item",key:t},i.a.createElement(Oe.a,{color:"textSecondary",underline:"none",variant:"body1",component:Ee.c,to:"".concat(a,"/").concat(t),activeClassName:"active"},n))})))})))},Ce=function(){return i.a.createElement("div",{id:"main-container"},i.a.createElement(C.a,{maxWidth:"sm",id:"main-content"},i.a.createElement(V.a,{variant:"h4",gutterBottom:!0},"About This Project"),i.a.createElement(V.a,{variant:"body2",gutterBottom:!0},"As the coronavirus spreads across the world, it can be hard to keep up with the day to day impact, as well as the variance of impact around the world. The goal of this project is to provide detailed but easy to understand visualizations to help people follow this pandemic."),i.a.createElement(V.a,{variant:"body2",gutterBottom:!0},"Most charts provided offer multiple views. You can toggle log scale or visualize growth normalized by days since 50 cases in a specific region. There are also different cuts, such as cumulative growth or rate of change."),i.a.createElement(V.a,{variant:"body2"},"Not sure where to start? Try one of these:"),i.a.createElement("ul",null,i.a.createElement("li",null,i.a.createElement(Oe.a,{variant:"body2",component:Ee.c,to:"global/deaths-cumulative"},"Cumulative Global Deaths")),i.a.createElement("li",null,i.a.createElement(Oe.a,{variant:"body2",component:Ee.c,to:"united-states/cases-cumulative"},"Cumulative US Cases"))),i.a.createElement(V.a,{variant:"h5",gutterBottom:!0},"Data"),i.a.createElement(V.a,{variant:"body2",gutterBottom:!0},"All data provided by Center for Systems Science and Engineering at Johns Hopkins University (",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/CSSEGISandData/COVID-19"},"source"),")."),i.a.createElement(V.a,{variant:"body2",gutterBottom:!0},"The underlying datasets from Johns Hopkins University are updated roughly every 12 hours, and all visualizations will show when the data was last updated."),i.a.createElement(V.a,{variant:"h5",gutterBottom:!0},"Questions or Feedback?"),i.a.createElement(V.a,{variant:"body2",gutterBottom:!0},"Tweet me at"," ",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://twitter.com/TyGuyO"},"@tyguyo"),", ","or open an issue on"," ",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/TGOlson/covid-viz"},"GitHub"),".")),i.a.createElement(De,{base:"/",spec:[]}))},Te=a(29),we=a(26),ke=a(90),Ae=a(92),je=a(637),Me=a(633),Ie=a(639),_e=a(626),Ne=a(627),Ue=a(629),Ge=a(628),ze=a(298),Re=a.n(ze),Pe=function(e){var t=e.showMenuIcon,a=e.onMenuToggle;return i.a.createElement(_e.a,{position:"fixed",color:"default",id:"top-nav"},i.a.createElement(Ne.a,null,t?i.a.createElement(Ge.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:a},i.a.createElement(Re.a,null)):null,i.a.createElement("div",{style:{flex:"auto"}}),i.a.createElement(Ue.a,{color:"inherit",component:Ee.c,activeClassName:"active",to:"/"},"About"),i.a.createElement(Ue.a,{color:"inherit",component:Ee.c,activeClassName:"active",to:"/global"},"Global"),i.a.createElement(Ue.a,{color:"inherit",component:Ee.c,activeClassName:"active",to:"/united-states"},"United States")))};Pe.defaultProps={showMenuIcon:!1};var Le=Pe,Be=function(e,t){return i.a.createElement(Oe.a,{href:e,target:"_blank",rel:"noopener noreferrer",color:"textSecondary",variant:"body2",style:{fontSize:"12px"}},t)},Fe=function(){return i.a.createElement("div",{style:{display:"flex"}},i.a.createElement("div",{style:{height:"58px",paddingLeft:"16px",paddingTop:"6px"}},i.a.createElement(Oe.a,{component:Ee.b,to:"/",color:"textSecondary",variant:"h6",style:{marginTop:"6px"}},"Covid Dashboard"),i.a.createElement("div",null,Be("https://twitter.com/TyGuyO","@tyguyo"),i.a.createElement(V.a,{component:"span",color:"textSecondary",variant:"body2",style:{fontSize:"12px"}}," / "),Be("https://github.com/TGOlson/covid-viz","GitHub"))))},He=a(120),We=a.n(He),Ve=a(641),Ke=a(630),Je=a(631),Ye=a(632),Xe=a(299),qe=a.n(Xe),Qe=function(e){Object(Ae.a)(a,e);var t=Object(ke.a)(a);function a(e){var n;Object(Te.a)(this,a),(n=t.call(this,e)).onToggle=function(e){var t=n.state.toggleState,a=Object(f.a)({},t,Object(s.a)({},e,!t[e]));n.setState({toggleState:a})};var r=e.idGroupings.reduce((function(e,t){var a=t.label;return Object(f.a)({},e,Object(s.a)({},a,!0))}),{});return n.state={toggleState:r},n}return Object(we.a)(a,[{key:"componentDidUpdate",value:function(e){var t=this.props.idGroupings;if(!We()(e.idGroupings,t)){var a=t.reduce((function(e,t){var a=t.label;return Object(f.a)({},e,Object(s.a)({},a,!0))}),{});this.setState({toggleState:a})}}},{key:"render",value:function(){var e=this,t=this.props,a=t.filteredIds,n=t.idGroupings,r=t.onFilterToggle,o=this.state.toggleState,c=i.a.createElement(Ke.a,null,i.a.createElement(qe.a,{color:"primary",fontSize:"small"})),l=function(e){return i.a.createElement(Ve.a,{key:e,button:!0,onClick:function(){return r(e)}},i.a.createElement(Je.a,{key:e,primary:e,style:{marginLeft:"24px"},primaryTypographyProps:{variant:"body2"}}),a[e]?c:null)};return i.a.createElement("div",{style:{marginTop:"12px",marginBottom:"36px"}},n.map((function(t){var a=t.label,n=t.ids;return i.a.createElement(xe.a,{component:"nav",key:a,dense:!0,disablePadding:!0},i.a.createElement(Ve.a,{button:!0,onClick:function(){return e.onToggle(a)}},i.a.createElement(Je.a,{primary:a,style:{marginLeft:"6px"},primaryTypographyProps:{variant:"body2",style:{fontWeight:500}}})),i.a.createElement(Ye.a,{in:o[a],timeout:"auto",unmountOnExit:!0},i.a.createElement(xe.a,{component:"nav",dense:!0,disablePadding:!0},n.map(l))))})))}}]),a}(i.a.Component),Ze=function(e){Object(Ae.a)(a,e);var t=Object(ke.a)(a);function a(e){var n;return Object(Te.a)(this,a),(n=t.call(this,e)).onMenuToggle=function(){var e=n.state.drawerOpen;n.setState({drawerOpen:!e})},n.state={drawerOpen:!1},n}return Object(we.a)(a,[{key:"render",value:function(){var e=this.props,t=e.store,a=e.dispatch,n=e.location,r=this.state.drawerOpen,o=function(e){switch(e.split("/")[1]){case"global":return b;case"united-states":return h;default:return null}}(n.pathname),c=o&&function(e,t){switch(e){case b:return t.global;case h:return t.US;default:throw new Error("Unexpected match fail 'getReducer': ".concat(e))}}(o,t),l=c||{},u=l.filters,s=l.idGroupings,d=c?i.a.createElement(Qe,{filteredIds:u,idGroupings:s,onFilterToggle:function(e){return a({type:"".concat(o,"_TOGGLE_ID_FILTER"),id:e})}}):null;return i.a.createElement("div",null,i.a.createElement(Ie.a,{lgUp:!0,implementation:"css"},i.a.createElement(Le,{showMenuIcon:!0,onMenuToggle:this.onMenuToggle}),i.a.createElement(je.a,{variant:"temporary",anchor:"left",open:r,onClose:this.onMenuToggle,PaperProps:{style:{width:"240px"}},ModalProps:{keepMounted:!0}},i.a.createElement(Fe,null),i.a.createElement(Me.a,{style:{marginRight:"24px"}}),d)),i.a.createElement(Ie.a,{mdDown:!0,implementation:"css"},i.a.createElement(Le,{onMenuToggle:this.onMenuToggle}),i.a.createElement(je.a,{variant:"permanent",open:!0,style:{width:"240px"},PaperProps:{style:{width:"240px"}}},i.a.createElement(Fe,null),i.a.createElement(Me.a,{style:{marginRight:"24px"}}),d)))}}]),a}(i.a.Component);Ze.defaultProps={};var $e=Object(Se.g)(Object(u.b)((function(e){return{store:e}}))(Ze)),et=a(636),tt=a(334),at=a(634),nt=a(635),rt=a(640),ot=a(300),it=function(e){return{id:e.id,data:e.data.filter((function(e){return e.y>0}))}},ct=function(e){return Math.max.apply(Math,Object(A.a)(e))},lt=function(e){Object(Ae.a)(a,e);var t=Object(ke.a)(a);function a(e){var n;return Object(Te.a)(this,a),(n=t.call(this,e)).state={chart:null},n}return Object(we.a)(a,[{key:"componentDidMount",value:function(){this.renderChart()}},{key:"componentDidUpdate",value:function(e,t){var a=!We()(e,this.props),n=!We()(Object(f.a)({},t,{chart:null}),Object(f.a)({},this.state,{chart:null}));(a||n)&&this.renderChart()}},{key:"renderChart",value:function(){var e,t=this,a=this.props,n=a.data,r=a.logScale,o=a.normalizeDays,c=a.group,l=a.smallScreen,u=a.label,s=a.abbreviations,d=n;o&&(e=o,d=d.map((function(t){var a=t.data.filter((function(t){return t.y>=e})).map((function(e,t){return{x:t,y:e.y}}));return Object(f.a)({},t,{data:a})}))),r&&(d=d.map(it)),l&&(d=d.map((function(e){return s[e.id]?Object(f.a)({},e,{id:s[e.id]}):e})));var m,p={type:"linear",min:o?0:"auto",max:"auto"},g=r?{type:"log",base:10,min:1,max:(m=d,ct(m.map((function(e){var t=e.data;return ct(t.map((function(e){return e.y})))}))))}:{type:"linear",min:0,max:"auto"},h=o?void 0:F,b=u.includes("Rate")?function(e){return D()(e).format("0.00%")}:function(e){return D()(e).format("0,0")},y=r?[1,10,100,1e3,1e4,1e5,1e6,1e7]:void 0,v=r?[1,10,100,1e3,1e4,1e5,1e6,1e7]:void 0,E=o?"Number of days since ".concat(o,"th ").concat(c.toLowerCase().slice(0,c.length-1)):"Date",S={orient:"bottom",tickSize:5,tickPadding:5,tickRotation:o?0:-40,tickValues:10,format:h,legend:E,legendOffset:50,legendPosition:"middle"},O={orient:"left",tickValues:v,tickSize:5,tickPadding:5,tickRotation:0,format:b,legend:u,legendOffset:-65,legendPosition:"middle"},x={anchor:l?"top-left":"top-right",direction:l?"row":"column",justify:!1,translateX:l?-65:100,translateY:l?-35:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:l?40:80,itemHeight:20,itemOpacity:.75,symbolSize:l?8:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)"},C=i.a.createElement(ot.a,{data:d,margin:{top:50,right:l?30:110,bottom:65,left:80},colors:{scheme:"category10"},xScale:p,yScale:g,axisBottom:S,gridYValues:y,axisLeft:O,isInteractive:!0,lineWidth:l?1:2,pointSize:l?4:6,useMesh:!0,enableGridX:!1,enableCrosshair:!1,tooltip:function(e){var t=e.point,a=t.serieId,n=t.color,r=t.data,l=r.xFormatted,s=r.yFormatted,d=o?"".concat(l," days"):new Date(l).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),m=b(s),p=u.includes("Rate")?m:"".concat(m," ").concat(c.toLowerCase());return i.a.createElement(J,{label:a,color:n,x:d.toString(),y:p.toString()})},legends:[x]});setTimeout((function(){return t.setState({chart:C})}),0)}},{key:"render",value:function(){return this.state.chart}}]),a}(i.a.Component);lt.defaultProps={logScale:!1,normalizeDays:null,smallScreen:!1};var ut=lt,st=function(e){var t=e.title,a=e.data,n=e.updatedAt,r=e.logScaleToggle,o=e.normalizeDaysToggle,c=e.logScale,l=e.normalizeDays,u=e.onControlToggle,s=e.group,d=e.label,m=e.abbreviations,p=new Date(n),g=p.toLocaleTimeString([],{hour12:!0,hour:"2-digit",minute:"2-digit"}),f=p.toLocaleDateString([],{year:"numeric",month:"long",day:"numeric"}),h=n?"Data as of ".concat(g," on ").concat(f,"."):"Data normally updated every 12 hours.";return i.a.createElement("div",null,i.a.createElement(V.a,{variant:"h4",style:{marginBottom:"12px"}},t),i.a.createElement(V.a,{variant:"caption",display:"block",gutterBottom:!0,style:{fontStyle:"italic",marginBottom:"12px",marginTop:"12px"}},h),i.a.createElement(at.a,{id:"chart-toggles",row:!0,style:{flexDirection:"row-reverse",marginBottom:"6px"}},i.a.createElement(nt.a,{control:i.a.createElement(rt.a,{size:"small",checked:c,onChange:function(){return u("logScale")}}),label:"Log Scale",disabled:!r}),i.a.createElement(nt.a,{control:i.a.createElement(rt.a,{size:"small",checked:l,onChange:function(){return u("normalizeDays")}}),label:"Normalize Days",disabled:!o})),i.a.createElement(tt.a,{variant:"outlined",style:{marginTop:"12px",marginBottom:"6px",margin:"auto",padding:"0 0 0 0"}},i.a.createElement(Ie.a,{xsDown:!0,implementation:"css"},i.a.createElement(C.a,{style:{height:"500px",maxWidth:"800px"},disableGutters:!0},i.a.createElement(ut,{data:a,logScale:c,normalizeDays:l?o:void 0,group:s,label:d,abbreviations:m}))),i.a.createElement(Ie.a,{smUp:!0,implementation:"css"},i.a.createElement(C.a,{style:{height:"400px",maxWidth:"800px"},disableGutters:!0},i.a.createElement(ut,{smallScreen:!0,data:a,logScale:c,normalizeDays:l?o:void 0,group:s,label:d,abbreviations:m})))),i.a.createElement(V.a,{variant:"caption",display:"block",gutterBottom:!0,style:{textAlign:"center",fontStyle:"italic",marginBottom:"12px",marginTop:"12px"}},"Source:"," ",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://github.com/CSSEGISandData/COVID-19"},"Center for Systems Science and Engineering at Johns Hopkins University"),"."))};st.defaultProps={updatedAt:null,logScaleToggle:!1,normalizeDaysToggle:!1};var dt=st,mt=Object(u.b)((function(e){return{store:e}}))((function(e){var t=e.store,a=e.match,o=e.location,c=e.dispatch,l=function(e){switch(e){case"/global":return b;case"/united-states":return h;default:throw new Error("Unexpected match fail 'getNamespace': ".concat(e))}}(a.path),u=function(e){switch(e){case b:return n;case h:return r;default:throw new Error("Unexpected match fail 'getSpec': ".concat(e))}}(l),d=u.spec,m=u.defaultChartId,p=function(e,t){switch(e){case b:return t.global;case h:return t.US;default:throw new Error("Unexpected match fail 'getReducer': ".concat(e))}}(l,t),g=a.path,f=function(e){return i.a.createElement("div",{id:"main-container"},i.a.createElement(C.a,{maxWidth:"md",id:"main-content"},e),i.a.createElement(De,{base:g,spec:me(d)}))},y=o.pathname.split("/")[2],v=d[y];if(!y||!v)return i.a.createElement(Se.a,{to:"".concat(g,"/").concat(m)});if(p.loading)return f(i.a.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:"120px"}},i.a.createElement("div",{style:{textAlign:"center"}},i.a.createElement(V.a,{variant:"body2",style:{marginBottom:"24px",fontStyle:"italic"}},"Fetching most recent data"),i.a.createElement(et.a,null))));if(v.component)return f(v.component(p));var E=p.chartState[y],S=v.getData(p),O=v.getUpdatedAt(p);return f(i.a.createElement(dt,{title:v.title,data:S,updatedAt:O,logScaleToggle:v.logScale,normalizeDaysToggle:v.normalizeDays,chartState:E,group:v.group,label:v.label,logScale:E.logScale,normalizeDays:E.normalizeDays,onControlToggle:function(e){return c({type:"".concat(l,"_FORM_CONTROL_TOGGLE"),value:{chartId:y,update:Object(s.a)({},e,!E[e])}})},abbreviations:p.abbreviations}))}));var pt=function(){return i.a.createElement(Ee.a,{basename:"/"},i.a.createElement("div",{style:{display:"flex"}},i.a.createElement($e,null),i.a.createElement(Se.d,null,i.a.createElement(Se.b,{exact:!0,path:"/",component:Ce}),i.a.createElement(Se.b,{path:"/global",component:mt}),i.a.createElement(Se.b,{path:"/united-states",component:mt}),i.a.createElement(Se.b,{render:function(){return i.a.createElement(Se.a,{to:"/"})}}))))},gt=(a(513),a(303)),ft=a.n(gt),ht={columnMap:{"Province/State":null,Lat:null,Long:null,"Country/Region":"id"},idMap:{"Korea, South":"South Korea","Taiwan*":"Taiwan","United Kingdom":"UK"}},bt={columnMap:{UID:null,iso2:null,iso3:null,code3:null,FIPS:null,Admin2:null,Province_State:"id",Country_Region:null,Lat:null,Long_:null,Combined_Key:null,Population:"population"},idMap:{}},yt=function(e){var t=e.columnMap,a=e.idMap;return{mapHeaders:function(e){var a=e.header;e.index;return Object.prototype.hasOwnProperty.call(t,a)?t[a]:/\d{1,2}\/\d{1,2}\/\d{2}/.test(a)?new Date(a).getTime():(console.warn("Header not transformed:",a),a)},mapValues:function(e){var t=e.header,n=(e.index,e.value);return isNaN(t)?"id"===t&&a[n]?a[n]:n:parseInt(n,10)}}},vt=function(e){return Object.keys(e).map((function(e){return parseInt(e,10)})).filter((function(e){return!isNaN(e)}))},Et=function(e,t){return fetch(E(e,t)).then((function(e){return e.text()})).then((function(t){var a=yt(e===b?ht:bt);return ft()(t,a)})).then((function(e){return function(e){for(var t={},a=vt(e[0]),n=0;n<e.length;n++){var r=e[n],o=t[r.id];if(o)for(var i=0;i<a.length;i++){var c=vt[n];o[c]=r[c]+o[c]}else t[r.id]=r}return Object.values(t).map((function(e){var t=a.map((function(t){return{x:t,y:e[t]}}),[]);return{id:e.id,data:t}}))}(e)}))},St=function(e,t){return function(a){return Et(e,t).then((function(n){return a({type:"".concat(e,"_FETCHED_DATASET_").concat(t),value:n})})).then((function(){return function(e,t){return fetch(S(e,t)).then((function(e){return e.json()})).then((function(e){return e[0]?e[0].commit.committer.date:null})).catch((function(e){return console.error("Error fetching timestamps",e),null}))}(e,t).then((function(n){return a({type:"".concat(e,"_FETCHED_TIMESTAMP_").concat(t),value:n})}))}))}};l.a.render(i.a.createElement(u.a,{store:ve},i.a.createElement(pt,null)),document.getElementById("root")),ve.dispatch((function(e){return St(b,"deaths")(e).then((function(){return St(b,y)(e)})).then((function(){return e({type:"".concat(b,"_DATA_LOADED")})}))})),ve.dispatch((function(e){return St(h,"deaths")(e).then((function(){return St(h,y)(e)})).then((function(){return e({type:"".concat(h,"_DATA_LOADED")})}))}))}},[[345,1,2]]]);
//# sourceMappingURL=main.dbc9886e.chunk.js.map