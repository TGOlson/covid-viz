(this["webpackJsonpcovid-viz"]=this["webpackJsonpcovid-viz"]||[]).push([[0],{271:function(e,t,a){e.exports=a(453)},280:function(e,t,a){},281:function(e,t,a){},416:function(e,t){},418:function(e,t){},451:function(e,t){},453:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(96),i=a.n(l),o=a(58),c=a(59),s=a(218),u=a(219),d=a.n(u),m=a(41),f={cases:null,deaths:null,filteredCountries:["Italy","US","United Kingdom","Singapore","France","Spain","Germany","Korea, South"]},h=Object(c.c)({global:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCHED_GLOBAL_CASES":return Object(m.a)({},e,{cases:t.values});case"FETCHED_GLOBAL_DEATHS":return Object(m.a)({},e,{deaths:t.values});default:return e}}}),v=Object(c.d)(h,Object(c.a)(s.a,d.a)),b=(a(280),a(103)),g=a(42),p=(a(281),a(0)),y=a.n(p),E=(y.a.arrayOf(y.a.shape({x:y.a.oneOfType([y.a.string,y.a.number]),y:y.a.oneOfType([y.a.string,y.a.number])})),a(22)),S=a(17),O=a(234),D=a(235),L=a(220),_=function(e){Object(D.a)(a,e);var t=Object(O.a)(a);function a(e){var n;Object(E.a)(this,a);var r=e.enableLogScale,l=e.enableNormalizeDays;return(n=t.call(this,e)).onLogScaleToggle=function(){var e=n.state.logScale;n.setState({logScale:!e})},n.onNormalizeDaysToggle=function(){var e=n.state.normalizeDays;n.setState({normalizeDays:!e})},n.state={logScale:r,normalizeDays:!!l},n}return Object(S.a)(a,[{key:"render",value:function(){var e,t=this.props,a=t.size,n=t.data,l=t.enableLogScale,i=t.enableNormalizeDays,o=this.state,c=o.logScale,s=o.normalizeDays,u=s?(e=i,n.map((function(t){var a=t.data.filter((function(t){return t.y>=e})).map((function(e,t){return{x:t,y:e.y}}));return Object(m.a)({},t,{data:a})}))):n,d="large"===a?{height:"500px",maxWidth:"800px"}:{height:"300px",maxWidth:"500px"},f={type:"linear",min:s?0:"auto",max:"auto"},h=c?{type:"log",base:10,max:3e5}:{type:"linear",min:0,max:"auto"},v=s?void 0:function(e){return new Date(e).toLocaleDateString("en-US",{month:"short",day:"numeric"})},b=c?[10,100,1e3,1e4,1e5,1e6,1e7]:void 0,g={orient:"bottom",tickSize:5,tickPadding:5,tickRotation:-66,tickValues:10,format:v},p={orient:"left",tickValues:c?[10,100,1e3,1e4,1e5,1e6,1e7]:void 0,tickSize:5,tickPadding:5,tickRotation:0},y=l?r.a.createElement("button",{type:"button",onClick:this.onLogScaleToggle},c?"Linear scale":"Log scale"):null,E=i?r.a.createElement("button",{type:"button",onClick:this.onNormalizeDaysToggle},s?"Absolute timeline":"Normalized days"):null;return r.a.createElement("div",{style:d},r.a.createElement(L.a,{data:u,margin:{top:50,right:110,bottom:50,left:60},xScale:f,yScale:h,xFormat:v,axisBottom:g,gridYValues:b,axisLeft:p,isInteractive:!0,useMesh:!0,enableGridX:!1,enableSlices:"x",legends:[{anchor:"right",direction:"column",justify:!1,translateX:100,translateY:0,itemsSpacing:0,itemDirection:"left-to-right",itemWidth:80,itemHeight:20,itemOpacity:.75,symbolSize:12,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]}),y,E)}}]),a}(r.a.Component);_.defaultProps={enableLogScale:!1,enableNormalizeDays:null};var x=_;function z(e){var t=e.countries,a=e.cases,n=e.deaths;if(!a||!n)return r.a.createElement("p",null,"loading...");var l=a.filter((function(e){var a=e.id;return t.includes(a)})),i=n.filter((function(e){var a=e.id;return t.includes(a)}));return r.a.createElement("div",null,r.a.createElement("h3",null,"Global Cases"),r.a.createElement("p",null,"Overview of coronavirus cases around the world."),r.a.createElement(x,{size:"large",data:l,enableLogScale:!0,enableNormalizeDays:50}),r.a.createElement("h3",null,"Global Deaths"),r.a.createElement("p",null,"Overview of coronavirus deaths around the world."),r.a.createElement(x,{size:"large",data:i,enableLogScale:!0,enableNormalizeDays:10}))}z.defaultProps={cases:null,deaths:null};var j=Object(o.b)((function(e){var t=e.global;return{cases:t.cases,deaths:t.deaths,countries:t.filteredCountries}}))(z);function C(e){var t=e.countries,a=e.cases,n=e.deaths;if(!a||!n)return r.a.createElement("p",null,"loading...");var l=a.filter((function(e){var a=e.id;return t.includes(a)})),i=n.filter((function(e){var a=e.id;return t.includes(a)}));return r.a.createElement("div",null,r.a.createElement("h3",null,"Global Cases"),r.a.createElement("p",null,"Overview of coronavirus cases around the world."),r.a.createElement(x,{size:"large",data:l,enableLogScale:!0}),r.a.createElement("h3",null,"Global Deaths"),r.a.createElement("p",null,"Overview of coronavirus deaths around the world."),r.a.createElement(x,{size:"large",data:i,enableLogScale:!0}))}C.defaultProps={cases:null,deaths:null};var k=Object(o.b)((function(e){var t=e.global;return{cases:t.cases,deaths:t.deaths,countries:t.filteredCountries}}))(C);var w=function(){return r.a.createElement(b.a,{basename:"/"},r.a.createElement("div",null,r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(b.b,{to:"/"},"Global")),r.a.createElement("li",null,r.a.createElement(b.b,{to:"/unitedstates"},"United States"))),r.a.createElement("hr",null),r.a.createElement(g.a,{exact:!0,path:"/",component:j}),r.a.createElement(g.a,{path:"/unitedstates",component:k})))},T=a(75),G=a(233),N=a.n(G),A="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series",H="".concat(A,"/time_series_covid19_confirmed_global.csv"),B="".concat(A,"/time_series_covid19_deaths_global.csv"),F={"Province/State":!0,Lat:!0,Long:!0},I={"Country/Region":"id"},P=function(e){return!isNaN(e)},V={mapHeaders:function(e){var t=e.header;e.index;return F[t]?null:I[t]?I[t]:/\d{1,2}\/\d{1,2}\/\d{2}/.test(t)?new Date(t).getTime():(console.warn("Header not transformed:",t),t)},mapValues:function(e){var t=e.header,a=(e.index,e.value);return P(t)?parseInt(a,10):a}},U=function(e,t){var a=e[t.id]||{},n=Object.keys(t).filter(P).reduce((function(e,n){return Object(m.a)({},e,Object(T.a)({},n,t[n]+(a[n]||0)))}),{id:t.id});return Object(m.a)({},e,Object(T.a)({},t.id,n))},R=function(e){var t=Object.keys(e).filter(P).map((function(t){return{x:t,y:e[t]}}),[]).filter((function(e){return 0!==e.y}));return{id:e.id,data:t}},W=function(e){return fetch(e).then((function(e){return e.text()})).then((function(e){return N()(e,V)})).then((function(e){return Object.values(e.reduce(U,{})).map(R)}))};i.a.render(r.a.createElement(o.a,{store:v},r.a.createElement(w,null)),document.getElementById("root")),v.dispatch((function(e){return W(H).then((function(t){return e({type:"FETCHED_GLOBAL_CASES",values:t})}))})),v.dispatch((function(e){return W(B).then((function(t){return e({type:"FETCHED_GLOBAL_DEATHS",values:t})}))}))}},[[271,1,2]]]);
//# sourceMappingURL=main.c7c570ce.chunk.js.map