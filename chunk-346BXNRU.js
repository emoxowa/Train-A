import{$c as I,_c as u,g as c,pa as l,va as m}from"./chunk-2XEAWUUP.js";var f=class a{http=m(I);alertMessage$=new c;getOrders(e=!1){let t;return e&&(t=new u().set("all",!0)),this.http.get("/api/order",{params:t})}createOrder(e){return this.http.post("/api/order",e)}cancelActiveOrder(e){return this.http.delete(`/api/order/${e}`)}getStartStationIndex(e){return e.path.findIndex(t=>t===e.stationStart)}getEndStationIndex(e){return e.path.findIndex(t=>t===e.stationEnd)-1}getOrderPrice(e,t){return e.schedule.segments.slice(this.getStartStationIndex(e),this.getEndStationIndex(e)+1).reduce((i,n)=>i+n.price[t],0)}getCarriageIndex(e,t,i){let n={};i.forEach(r=>{n[r.name]=(r.leftSeats+r.rightSeats)*r.rows});let o=0,s=-1,d=e;for(let r=0;r<t.length;r+=1){let p=t[r];if(o+=n[p],o>=e){s=r;break}d-=n[p]}return[s,d]}static \u0275fac=function(t){return new(t||a)};static \u0275prov=l({token:a,factory:a.\u0275fac,providedIn:"root"})};export{f as a};
