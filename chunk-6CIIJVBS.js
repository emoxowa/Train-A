import{b as W}from"./chunk-WNQC6ED5.js";import{qb as K}from"./chunk-FEYVFRDP.js";import{o as Q}from"./chunk-RR4QGK55.js";import{$c as J,Ca as f,Db as o,Ea as B,Eb as r,Fa as m,Fb as A,Gb as L,H as M,Hb as $,Nb as w,Ob as H,Pb as _,Qc as V,Rc as Y,Uc as z,Vc as X,Wb as a,Xb as b,Xc as y,Yb as S,_c as G,da as O,db as p,eb as F,fc as h,h as x,ka as E,lc as l,mc as d,nc as g,oc as U,p as T,pa as j,t as k,tb as R,va as v,vb as D,xb as N}from"./chunk-2XEAWUUP.js";var Z=class i{http=v(J);apiUrl="/api/search";searchResponseSubject=new x(null);searchResponse$=this.searchResponseSubject.asObservable();loadingSubject=new x(!1);loading$=this.loadingSubject.asObservable();selectedDateSubject=new x(null);selectedDate$=this.selectedDateSubject.asObservable();setSelectedDate(t){this.selectedDateSubject.next(t)}searchTrips(t){this.loadingSubject.next(!0);let e=new G().set("fromLatitude",t.fromLatitude).set("fromLongitude",t.fromLongitude).set("toLatitude",t.toLatitude).set("toLongitude",t.toLongitude);return t.time&&(e=e.set("time",t.time)),this.http.get(this.apiUrl,{params:e}).pipe(E(n=>{this.searchResponseSubject.next(n),this.loadingSubject.next(!1)}),M(n=>(this.loadingSubject.next(!1),T(()=>n))))}getRideInformation(t){let e=`${this.apiUrl}/${t}`;return this.http.get(e).pipe(O(1),M(n=>T(()=>n)))}static \u0275fac=function(e){return new(e||i)};static \u0275prov=j({token:i,factory:i.\u0275fac,providedIn:"root"})};var I=class i{constructor(t){this.store=t}transform(t){return this.store.select(W).pipe(k(e=>e.find(n=>n.id===t)?.city))}static \u0275fac=function(e){return new(e||i)(F(Q,16))};static \u0275pipe=m({name:"cityName",type:i,pure:!0,standalone:!0})};var C=class i{transform(t,e,n){let s=new Date(t.time[0]).getTime(),c=e>0?new Date(n[e-1].time[1]).getTime():s;return`${(s-c)/(1e3*60)} min`}static \u0275fac=function(e){return new(e||i)};static \u0275pipe=m({name:"stopDuration",type:i,pure:!0,standalone:!0})};var P=class i{transform(t,e){return t>0?e[t-1].time[1]:""}static \u0275fac=function(e){return new(e||i)};static \u0275pipe=m({name:"segmentArrivalTime",type:i,pure:!0,standalone:!0})};function at(i,t){if(i&1&&(L(0),o(1,"td",6)(2,"div",11),a(3),l(4,"segmentArrivalTime"),l(5,"date"),r(),o(6,"div",11),a(7),l(8,"date"),r()(),o(9,"td",7),a(10),l(11,"cityName"),l(12,"async"),r(),o(13,"td",8),a(14),l(15,"stopDuration"),r(),$()),i&2){let e=w(),n=e.$implicit,s=e.index,c=w();p(3),S(" ",g(5,7,g(4,4,s,c.data.schedule.segments),"shortTime")," "),p(4),b(g(8,10,n.time[0],"shortTime")),p(3),b(d(12,15,d(11,13,c.data.path[s]))),p(4),b(U(15,17,n,s,c.data.schedule.segments))}}function st(i,t){if(i&1&&(o(0,"tr",2),R(1,at,16,21,"ng-container",10),r()),i&2){let e=t.index;p(),D("ngIf",e>0)}}var q=class i{context=v(K);get data(){return this.context.data}getSegmentArrivalTime(t){return t>0?this.data.schedule.segments[t-1].time[1]:""}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["app-route-modal"]],standalone:!0,features:[h],decls:32,vars:20,consts:[["tui-text_h6",""],[1,"tui-table"],[1,"tui-table__tr","tui-table__tr_border_none"],[1,"tui-table__th","tui-table__th_first"],[1,"tui-table__th"],[1,"tui-table__th","tui-table__th_last"],[1,"tui-table__td","tui-table__td_first"],[1,"tui-table__td"],[1,"tui-table__td","tui-table__td_last"],["class","tui-table__tr tui-table__tr_border_none",4,"ngFor","ngForOf"],[4,"ngIf"],[1,"tui-text_body-s-2"]],template:function(e,n){e&1&&(o(0,"h4",0),a(1),r(),o(2,"table",1)(3,"tbody")(4,"tr",2)(5,"th",3),a(6,"Time"),r(),o(7,"th",4),a(8,"Station"),r(),o(9,"th",5),a(10,"Stop"),r()(),o(11,"tr",2)(12,"td",6),a(13),l(14,"date"),r(),o(15,"td",7),a(16),l(17,"cityName"),l(18,"async"),r(),o(19,"td",8),a(20,"first station"),r()(),R(21,st,2,1,"tr",9),o(22,"tr",2)(23,"td",6),a(24),l(25,"date"),r(),o(26,"td",7),a(27),l(28,"cityName"),l(29,"async"),r(),o(30,"td",8),a(31,"last station"),r()()()()),e&2&&(p(),S("Route ",n.data.schedule.rideId||n.data.rideId,""),p(12),S(" ",g(14,6,n.data.schedule.segments[0].time[0],"MMM d, h:mm a")," "),p(3),b(d(18,11,d(17,9,n.data.from))),p(5),D("ngForOf",n.data.schedule.segments),p(3),S(" ",g(25,13,n.data.schedule.segments.at(-1).time[1],"MMM d, h:mm a")," "),p(3),b(d(29,18,d(28,16,n.data.to))))},dependencies:[y,V,Y,z,X,I,C,P],styles:['.tui-table__th[_ngcontent-%COMP%]{text-align:center}.tui-table__th[_ngcontent-%COMP%]{text-align:left}.tui-table__td[_ngcontent-%COMP%]{vertical-align:middle}.tui-table__td_first[_ngcontent-%COMP%]{border-right:1px solid var(--tui-text-action)}.tui-table__th_first[_ngcontent-%COMP%], .tui-table__td_first[_ngcontent-%COMP%], .tui-table__td_last[_ngcontent-%COMP%], .tui-table__th_last[_ngcontent-%COMP%]{text-align:end}.tui-table__td_first[_ngcontent-%COMP%], .tui-table__th_first[_ngcontent-%COMP%]{width:150px}.tui-table__td_first[_ngcontent-%COMP%]{position:relative;border-right:1px solid var(--tui-text-action)}.tui-table__td_first[_ngcontent-%COMP%]:after{content:"";position:absolute;top:50%;right:-5px;transform:translateY(-50%);width:8px;height:8px;border:1px solid var(--tui-text-action);border-radius:50%}.tui-table__tr[_ngcontent-%COMP%]:last-child   .tui-table__td_first[_ngcontent-%COMP%]:after{right:-8px;width:14px;height:14px;background-color:var(--tui-text-action)}.tui-table__tr[_ngcontent-%COMP%]:nth-child(2)   .tui-table__td_first[_ngcontent-%COMP%]:after{right:-7px;width:12px;height:12px;background-color:var(--tui-text-action)}']})};var tt=class i{transform(t){return Array.from(new Set(t))}static \u0275fac=function(e){return new(e||i)};static \u0275pipe=m({name:"uniqueCarriages",type:i,pure:!0,standalone:!0})};var et=class i{transform(t,e){return e===null?0:t.segments.reduce((n,s)=>n+(s.price[e]||0),0)}static \u0275fac=function(e){return new(e||i)};static \u0275pipe=m({name:"sumCarriagePrice",type:i,pure:!0,standalone:!0})};var lt=[[["","tuiSlot","top"]],[["h1"],["h2"],["h3"],["h4"],["h5"],["h6"]],"*",[["a"],["button"],["","tuiSlot","action"]]],pt=["[tuiSlot='top']","h1,h2,h3,h4,h5,h6","*","a,button,[tuiSlot='action']"],it=(()=>{let t=class t{constructor(){this.card=!1}};t.\u0275fac=function(s){return new(s||t)},t.\u0275cmp=f({type:t,selectors:[["tui-block-status"]],hostVars:2,hostBindings:function(s,c){s&2&&N("_card",c.card)},inputs:{card:"card"},standalone:!0,features:[h],ngContentSelectors:pt,decls:7,vars:0,consts:[[1,"t-block-image"],[1,"t-block-text"],[1,"t-block-actions"]],template:function(s,c){s&1&&(H(lt),o(0,"div",0),_(1),r(),_(2,1),o(3,"div",1),_(4,2),r(),o(5,"div",2),_(6,3),r())},styles:[`tui-block-status{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-sizing:border-box;overflow:hidden;width:100%;height:100%}tui-block-status._card{border-radius:var(--tui-radius-xl);padding:2rem}tui-block-status .t-block-image{margin-bottom:2rem}tui-block-status .t-block-text:not(:empty){font:var(--tui-font-text-m);color:var(--tui-text-secondary);margin-bottom:2rem;white-space:pre-line}tui-block-status .t-block-actions:not(:empty){display:flex;flex-direction:column;align-items:center;width:100%}tui-block-status h1,tui-block-status h2,tui-block-status h3,tui-block-status h4,tui-block-status h5,tui-block-status h6{font:var(--tui-font-heading-4);margin-top:0;margin-bottom:1rem}tui-block-status img{width:9rem;height:9rem}tui-block-status a:not(:last-child),tui-block-status button:not(:last-child){margin-bottom:.75rem}
`],encapsulation:2,changeDetection:0});let i=t;return i})(),nt=(()=>{let t=class t{constructor(){this.tuiSlot="top"}};t.\u0275fac=function(s){return new(s||t)},t.\u0275dir=B({type:t,selectors:[["","tuiSlot",""]],inputs:{tuiSlot:"tuiSlot"},standalone:!0});let i=t;return i})();var ot=class i{static \u0275fac=function(e){return new(e||i)};static \u0275cmp=f({type:i,selectors:[["app-no-rides-available"]],standalone:!0,features:[h],decls:5,vars:0,consts:[[1,"tui-block-status"],["alt","not found","src","./not-found.svg","tuiSlot","top",1,"image"]],template:function(e,n){e&1&&(o(0,"tui-block-status",0),A(1,"img",1),o(2,"h4"),a(3,"No direct trains found"),r(),a(4,` No seats on direct trains are available right now, but there's always hope. Try again later or travel with a transfer.
`),r())},dependencies:[y,it,nt],styles:[".tui-block-status[_ngcontent-%COMP%]{max-width:530px;margin:100px auto}"]})};export{Z as a,I as b,q as c,tt as d,et as e,ot as f};
