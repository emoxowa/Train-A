import{a as Ft}from"./chunk-LRBDKUDH.js";import{A as l,B as O,C as bt,I as P,L as b,Mb as Pt,Na as xt,Oa as St,Tb as Mt,U as Ct,Ua as Nt,Y as C,a as gt,ba as x,c as vt,d as Tt,db as kt,eb as S,f as yt,gb as _t,hb as zt,ob as Dt,qb as M,tb as At}from"./chunk-FEYVFRDP.js";import{a as It,b as Ot}from"./chunk-RR4QGK55.js";import{$a as tt,A as z,B as W,Ba as Y,Ca as u,Db as h,Ea as d,Eb as g,Fa as G,Fb as et,Gb as nt,Hb as ot,Ib as rt,Jb as at,La as J,Lb as st,Ma as X,Mb as ut,Na as q,Nb as I,Pa as Q,Pc as mt,Qc as lt,Ra as Z,Rc as ft,Uc as dt,Wb as F,Xc as ht,Yb as D,aa as R,b as E,db as c,ec as v,fc as p,h as B,ha as V,ia as $,k as U,lc as A,mc as ct,nc as pt,o as _,pa as K,pb as T,t as H,tb as m,u as j,ub as it,va as a,vb as s,wb as y}from"./chunk-2XEAWUUP.js";import{a as f,b as k}from"./chunk-T527G4PA.js";var wt={appearance:"link",pseudo:!1},w=l(wt);function Lt(i){return P(w,i,wt)}var Wt=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=u({type:t,selectors:[["ng-component"]],hostAttrs:[1,"tui-link"],standalone:!0,features:[p],decls:0,vars:0,template:function(e,o){},styles:[`[tuiLink]{--tui-text-tertiary: var(--tui-text-secondary);padding:0;background:transparent;border:none;cursor:pointer;font:inherit;color:inherit;-webkit-text-decoration:none dashed currentColor;text-decoration:none dashed currentColor;text-underline-offset:.2em;text-decoration-thickness:.7px;text-decoration-color:color-mix(in lch,currentColor,transparent)}[tuiLink]:hover{--tui-text-secondary: var(--tui-text-primary)}[tuiLink]:before{margin-inline-end:.25rem}[tuiLink]:after{margin-inline-start:.25rem}[tuiLink][tuiIcons]:before,[tuiLink][tuiIcons]:after{content:"\\2060";padding:calc(var(--tui-icon-size, 1rem) / 2);vertical-align:super;font-size:0;line-height:0}[tuiLink]:focus-visible:not([data-focus=false]){outline:none;background:var(--tui-service-selection-background);background:color-mix(in lch,currentColor 12%,transparent)}[tuiLink][data-focus=true]{outline:none;background:var(--tui-service-selection-background);background:color-mix(in lch,currentColor 12%,transparent)}
`],encapsulation:2,changeDetection:0});let i=t;return i})(),mi=(()=>{let t=class t{constructor(){this.nothing=b(Wt),this.pseudo=a(w).pseudo}};t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=d({type:t,selectors:[["a","tuiLink",""],["button","tuiLink",""]],hostAttrs:["tuiLink",""],hostVars:2,hostBindings:function(e,o){e&2&&y("text-decoration-line",o.pseudo?"underline":null)},inputs:{pseudo:"pseudo"},standalone:!0,features:[v([C(w)]),T([x,S])]});let i=t;return i})();var Rt={info:"@tui.info",success:"@tui.circle-check",error:"@tui.circle-x",warning:"@tui.circle-alert",neutral:"@tui.info"},Vt={appearance:"info",icon:i=>Rt[i],size:"l"},N=l(Vt);var $t=(()=>{let t=class t{};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=u({type:t,selectors:[["ng-component"]],hostAttrs:[1,"tui-notification"],standalone:!0,features:[p],decls:0,vars:0,template:function(e,o){},styles:[`tui-notification,[tuiNotification]{-webkit-appearance:none;appearance:none;padding:0;border:0;background:none;font-size:inherit;line-height:inherit;position:relative;display:flex;max-height:100%;color:var(--tui-text-primary);gap:.5rem;padding:1rem;font:var(--tui-font-text-m);border-radius:var(--tui-radius-l);box-sizing:border-box;overflow:hidden;text-align:left;text-decoration:none}tui-notification:after,[tuiNotification]:after{font-size:1rem;margin:0 -.25rem 0 auto;align-self:center;color:var(--tui-text-tertiary)!important}tui-notification[data-size=s],[tuiNotification][data-size=s]{gap:.5rem;padding:.375rem .625rem;font:var(--tui-font-text-s);border-radius:var(--tui-radius-m)}tui-notification[data-size=s]:before,[tuiNotification][data-size=s]:before,tui-notification[data-size=s] tui-icon,[tuiNotification][data-size=s] tui-icon{font-size:1rem;margin-top:.125rem;margin-bottom:.125rem}tui-notification[data-size=s] [tuiTitle],[tuiNotification][data-size=s] [tuiTitle]{font:var(--tui-font-text-s);font-weight:700}tui-notification[data-size=s] [tuiSubtitle],[tuiNotification][data-size=s] [tuiSubtitle]{font:var(--tui-font-text-s)}tui-notification[data-size=s] [tuiSubtitle]+*,[tuiNotification][data-size=s] [tuiSubtitle]+*{gap:1rem;margin:.375rem 0 .25rem}tui-notification[data-size=s]>[tuiIconButton],[tuiNotification][data-size=s]>[tuiIconButton]{margin:-.375rem -.625rem -.375rem auto}tui-notification[data-size=m],[tuiNotification][data-size=m]{gap:.375rem;padding:.75rem;font:var(--tui-font-text-s);border-radius:var(--tui-radius-m)}tui-notification[data-size=m]:before,[tuiNotification][data-size=m]:before,tui-notification[data-size=m] tui-icon,[tuiNotification][data-size=m] tui-icon{font-size:1.25rem}tui-notification[data-size=m] [tuiTitle],[tuiNotification][data-size=m] [tuiTitle]{font:var(--tui-font-text-ui-m);font-weight:700}tui-notification[data-size=m] [tuiSubtitle],[tuiNotification][data-size=m] [tuiSubtitle]{font:var(--tui-font-text-s)}tui-notification[data-size=m] [tuiSubtitle]+*,[tuiNotification][data-size=m] [tuiSubtitle]+*{gap:1rem;margin:.625rem 0 .25rem}tui-notification[data-size=m]>[tuiIconButton],[tuiNotification][data-size=m]>[tuiIconButton]{margin:-.375rem -.25rem -.375rem auto}tui-notification [tuiTitle],[tuiNotification] [tuiTitle]{gap:.125rem;font:var(--tui-font-text-ui-l);font-weight:700}tui-notification [tuiSubtitle],[tuiNotification] [tuiSubtitle]{font:var(--tui-font-text-m)}tui-notification [tuiSubtitle]+*,[tuiNotification] [tuiSubtitle]+*{display:flex;align-items:center;gap:1.25rem;margin-top:.625rem;font:var(--tui-font-text-s)}tui-notification>[tuiIconButton],[tuiNotification]>[tuiIconButton]{box-shadow:none!important;background:transparent!important;margin:-.25rem -.25rem -.25rem auto}[tuiNotification]{cursor:pointer}
`],encapsulation:2,changeDetection:0});let i=t;return i})(),Et=(()=>{let t=class t{constructor(){this.options=a(N),this.nothing=b($t),this.icons=a(kt),this.appearance=this.options.appearance,this.icon=this.options.icon,this.size=this.options.size}ngOnInit(){this.refresh()}ngOnChanges(){this.refresh()}refresh(){this.icons.iconStart=bt(this.icon)?this.icon:this.icon(this.appearance)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=d({type:t,selectors:[["tui-notification"],["a","tuiNotification",""],["button","tuiNotification",""]],hostVars:1,hostBindings:function(e,o){e&2&&it("data-size",o.size)},inputs:{appearance:"appearance",icon:"icon",size:"size"},standalone:!0,features:[v([C(N),Lt({appearance:"",pseudo:!0}),_t({appearance:"whiteblock",size:"s"})]),T([S,x]),J]});let i=t;return i})();var Bt=(()=>{let t=class t{transform(n,e,...o){return e(n,...o)}};t.\u0275fac=function(e){return new(e||t)},t.\u0275pipe=G({name:"tuiMapper",type:t,pure:!0,standalone:!0});let i=t;return i})();function Kt(i,t){if(i&1&&(nt(0),F(1),ot()),i&2){let r=t.polymorpheusOutlet;c(),D(" ",r," ")}}function Yt(i,t){if(i&1&&et(0,"span",6),i&2){let r=t.polymorpheusOutlet;s("innerHTML",r,tt)}}function Gt(i,t){if(i&1){let r=at();h(0,"button",7),ut("click",function(){X(r);let e=I();return q(e.item.$implicit.complete())}),F(1),g()}if(i&2){let r=I();s("iconStart",r.icons.close),c(),D(" ",r.close()," ")}}function Jt(i,t){if(i&1&&(rt(0,3),A(1,"tuiMapper")),i&2){let r=t.$implicit,n=I(2);s("ngComponentOutlet",r.component.component)("ngComponentOutletInjector",pt(1,2,r,n.mapper))}}function Xt(i,t){if(i&1&&(h(0,"div",1),m(1,Jt,2,5,"ng-container",2),g()),i&2){let r=t.$implicit;s("@tuiParentAnimation",void 0),c(),s("ngForOf",r)}}var qt={autoClose:3e3,label:"",closeable:!0,data:void 0},Qt=O(()=>f(f({},qt),a(N))),Zt=O(()=>a(Pt)?"1rem 1rem 0 auto":"2rem 3rem 0 auto"),Ut=l(new B([])),ti=O(()=>j([_(new Map),a(Ut)]).pipe(H(([i,t])=>(i.forEach((r,n)=>i.set(n,[])),t.forEach(r=>{let n=r.component.component,e=i.get(n)||[];i.set(n,[...e,r])}),Array.from(i.values()))))),ii=(()=>{let t=class t{constructor(){this.el=Ct(),this.icons=a(St),this.options=Dt(a(xt)),this.close=Ot(a(Nt)),this.position=a(Zt),this.item=a(M),this.animation=this.position.endsWith("auto")?k(f({},this.options),{value:"right"}):k(f({},this.options),{value:"left"}),this.sub=_(typeof this.item.autoClose=="function"?this.item.autoClose(this.item.appearance):this.item.autoClose).pipe(V(n=>n?W(n):U),$(z(this.el,"mouseenter")),R({delay:()=>z(this.el,"mouseleave")}),It()).subscribe(()=>this.item.$implicit.complete())}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=u({type:t,selectors:[["tui-alert"]],hostAttrs:["role","alert"],hostVars:5,hostBindings:function(e,o){e&2&&(st("@tuiFadeIn",o.options)("@tuiSlideIn",o.animation)("@tuiHeightCollapse",o.animation),y("margin",o.position))},standalone:!0,features:[p],decls:6,vars:7,consts:[["size","m",3,"appearance","icon"],["tuiTitle",""],[4,"polymorpheusOutlet","polymorpheusOutletContext"],["tuiSubtitle",""],[3,"innerHTML",4,"polymorpheusOutlet","polymorpheusOutletContext"],["tuiIconButton","",3,"iconStart","click",4,"ngIf"],[3,"innerHTML"],["tuiIconButton","",3,"click","iconStart"]],template:function(e,o){e&1&&(h(0,"tui-notification",0)(1,"span",1),m(2,Kt,2,1,"ng-container",2),h(3,"span",3),m(4,Yt,1,1,"span",4),g()(),m(5,Gt,2,2,"button",5),g()),e&2&&(s("appearance",o.item.appearance)("icon",o.item.icon),c(2),s("polymorpheusOutlet",o.item.label)("polymorpheusOutletContext",o.item),c(2),s("polymorpheusOutlet",o.item.content)("polymorpheusOutletContext",o.item),c(),s("ngIf",o.item.closeable))},dependencies:[ft,At,Et,zt,Ft],styles:["[_nghost-%COMP%]{display:block;width:18rem;flex-shrink:0;background:var(--tui-background-elevation-1);border-radius:var(--tui-radius-m);box-shadow:var(--tui-shadow-medium)}[_nghost-%COMP%]:not(:first-child){margin-top:.75rem!important}[_nghost-%COMP%]:not(:last-child){margin-bottom:0!important}"],data:{animation:[Tt,yt,vt]},changeDetection:0});let i=t;return i})(),Zi=(()=>{let t=class t extends Mt{};t.\u0275fac=(()=>{let n;return function(o){return(n||(n=Q(t)))(o||t)}})(),t.\u0275prov=K({token:t,factory:()=>new t(Ut,ii,a(Qt)),providedIn:"root"});let i=t;return i})();var te=(()=>{let t=class t{constructor(){this.injector=a(Y),this.alerts$=a(ti),this.trackBy=E,this.mapper=n=>Z.create({providers:[{provide:M,useValue:n}],parent:this.injector})}};t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=u({type:t,selectors:[["tui-alerts"]],standalone:!0,features:[p],decls:2,vars:4,consts:[["class","t-wrapper",4,"ngFor","ngForOf","ngForTrackBy"],[1,"t-wrapper"],[3,"ngComponentOutlet","ngComponentOutletInjector",4,"ngFor","ngForOf"],[3,"ngComponentOutlet","ngComponentOutletInjector"]],template:function(e,o){e&1&&(m(0,Xt,2,2,"div",0),A(1,"async")),e&2&&s("ngForOf",ct(1,2,o.alerts$))("ngForTrackBy",o.trackBy)},dependencies:[ht,mt,lt,dt,Bt],styles:[`tui-alerts>.t-wrapper{position:fixed;top:0;left:0;width:100%;height:100%;display:flex;flex-direction:column;pointer-events:none}tui-alerts>.t-wrapper>*{pointer-events:auto}
`],encapsulation:2,data:{animation:[gt]}});let i=t;return i})();export{mi as a,Bt as b,Zi as c,te as d};
